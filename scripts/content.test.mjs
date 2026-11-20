import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { validateFields, validateContent, validateServiceImages } from './validate-content.mjs';

const config = parse(await readFile(new URL('../.pages.yml', import.meta.url), 'utf8'));
const fields = name => config.content.find(entry => entry.name === name).fields;
const readContent = async name => JSON.parse(await readFile(new URL(`../content/${name}.json`, import.meta.url), 'utf8'));

test('CMS-Schema, aktuelle Inhalte und alle Bildpfade passen zusammen', async () => {
  assert.deepEqual(await validateContent(), []);
});

test('Neue PNG-Fotos und mehr als fünf Galerieeinträge sind im Schema möglich', async () => {
  const gallery = await readContent('gallery');
  gallery.items = Array.from({ length: 8 }, (_, index) => ({ title: `Bild ${index}`, image: '/images/neues-foto.png', alt: 'Garten', text: '' }));
  assert.deepEqual(validateFields(fields('gallery'), gallery), []);
});

test('Eine leere Galerie und optionale Bildunterschriften sind erlaubt', async () => {
  const gallery = await readContent('gallery');
  assert.deepEqual(validateFields(fields('gallery'), { ...gallery, items: [] }), []);
  const services = await readContent('services');
  delete services.items[0].caption;
  assert.deepEqual(validateFields(fields('services'), services), []);
});

test('Leistungen ohne Foto erlauben Platzhalter auch bei fehlenden oder leeren Bildfeldern', async () => {
  const services = await readContent('services');
  services.items = [
    { title: 'Obstbaumpflege', text: 'Pflege von Obstbäumen.', image: '', alt: '' },
    { title: 'Rasenpflege', text: 'Rasen mähen.', image: null, alt: null },
    { title: 'Baumfällung', text: 'Bäume fällen.' }
  ];
  assert.deepEqual(validateFields(fields('services'), services), []);
  assert.deepEqual(validateServiceImages(services.items), []);
});

test('Ein später ergänztes Leistungsfoto benötigt eine Bildbeschreibung', () => {
  assert.equal(validateServiceImages([{ image: '/images/garten.jpeg', alt: '' }]).length, 1);
  assert.deepEqual(validateServiceImages([{ image: '/images/garten.jpeg', alt: 'Garten mit gepflegten Sträuchern' }]), []);
});

test('Doppelte Leistungsbilder werden erkannt, mehrere leere Platzhalter bleiben erlaubt', () => {
  const errors = validateServiceImages([
    { title: 'Gartenarbeiten', image: '/images/garten.jpeg', alt: 'Garten' },
    { title: 'Heckenschnitt', image: '/images/garten.jpeg', alt: 'Hecke' },
    { title: 'Obstbaumpflege', image: '' },
    { title: 'Facility Management', image: '' }
  ]);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Gartenarbeiten/);
});

test('Ungültige Kontaktlinks und fehlende Bildbeschreibungen werden abgefangen', async () => {
  const contact = await readContent('contact');
  assert.equal(validateFields(fields('contact'), { ...contact, phone: 'javascript:alert(1)', email: 'keine-adresse' }).length, 2);
  const about = await readContent('about');
  assert.equal(validateFields(fields('about'), { ...about, alt: '' }).length, 1);
});

test('HTML in CMS-Texten bleibt unveränderter Klartext', async () => {
  const about = await readContent('about');
  assert.deepEqual(validateFields(fields('about'), { ...about, text: '<script>alert(1)</script>\n\nEin Absatz.' }), []);
});

test('Anbieterangaben sind unabhängig vom optionalen Hinweis, Datenschutz kann sie übernehmen', async () => {
  const legal = await readContent('legal');
  const imprint = { provider: 'Gartenpflege Beispiel\nInhaber Beispiel\nBeispielweg 1\n69412 Eberbach' };
  assert.deepEqual(validateFields(fields('legal'), { ...legal, imprint }), []);
  assert.match(validateFields(fields('legal'), { ...legal, imprint: { notice: imprint.provider } }).join('\n'), /imprint\.provider/);
  assert.deepEqual(validateFields(fields('legal'), { ...legal, imprint, privacy: { ...legal.privacy, provider: '' } }), []);
  assert.deepEqual(validateFields(fields('legal'), { ...legal, imprint, privacy: { ...legal.privacy, provider: 'Abweichender Verantwortlicher\nBeispielweg 2' } }), []);
});

test('Datenschutz-Links sind optional und erlauben nur vollständige HTTPS-Adressen', async () => {
  const legal = await readContent('legal');
  const withLink = url => ({ ...legal, privacy: { ...legal.privacy, sections: [{ title: 'Weitere Informationen', text: 'Datenschutz beim Anbieter.', links: [{ label: 'Anbieterinformationen', url }] }] } });
  assert.deepEqual(validateFields(fields('legal'), withLink('https://www.netlify.com/privacy/')), []);
  for (const url of ['javascript:alert(1)', 'http://www.netlify.com/privacy/', 'https://ungueltige adresse.de']) {
    assert.match(validateFields(fields('legal'), withLink(url)).join('\n'), /HTTPS-Adresse/);
  }
  assert.deepEqual(validateFields(fields('legal'), { ...legal, privacy: { ...legal.privacy, sections: [{ title: 'Kontakt', text: 'Fragen per E-Mail.' }] } }), []);
});
