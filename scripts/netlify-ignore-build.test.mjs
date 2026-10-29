import test from 'node:test';
import assert from 'node:assert/strict';
import { canSkipBuild } from './netlify-ignore-build.mjs';

const used = new Set(['public/images/garten.jpeg', 'public/images/team.jpeg']);

test('Ein neuer, noch nicht ausgewählter Foto-Upload löst keine Veröffentlichung aus', () => {
  assert.equal(canSkipBuild(['public/images/neues-foto.png'], used), true);
});

test('Ausgewählte Fotos ersetzen oder löschen löst eine Veröffentlichung aus', () => {
  assert.equal(canSkipBuild(['public/images/team.jpeg'], used), false);
});

test('CMS-Speichern und Codeänderungen werden auch zusammen mit Foto-Uploads gebaut', () => {
  assert.equal(canSkipBuild(['content/gallery.json', 'public/images/neues-foto.png'], used), false);
  assert.equal(canSkipBuild(['src/main.jsx'], used), false);
  assert.equal(canSkipBuild(['public/admin/index.html'], used), false);
  assert.equal(canSkipBuild([], used), false);
});

test('Reine Anleitung und CMS-Konfiguration benötigen keinen Webseiten-Build', () => {
  assert.equal(canSkipBuild(['.pages.yml', 'CMS-ANLEITUNG.md'], used), true);
});
