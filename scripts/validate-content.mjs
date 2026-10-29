import { readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));

export function validateFields(fields, values, path = 'Inhalt') {
  const errors = [];
  if (!values || typeof values !== 'object' || Array.isArray(values)) return [`${path}: Objekt erwartet.`];
  for (const field of fields) {
    const name = `${path}.${field.name}`;
    const value = values[field.name];
    if (value === undefined || value === null || value === '') {
      if (field.required) errors.push(`${name}: Pflichtfeld fehlt.`);
      continue;
    }
    if (field.list) {
      if (!Array.isArray(value)) { errors.push(`${name}: Liste erwartet.`); continue; }
      if (typeof field.list === 'object' && field.list.min && value.length < field.list.min) errors.push(`${name}: Zu wenige Einträge.`);
      for (const [index, item] of value.entries()) {
        errors.push(...validateFields([{ ...field, name: 'value', list: false }], { value: item }, `${name}[${index}]`));
      }
    } else if (field.type === 'object') {
      errors.push(...validateFields(field.fields ?? [], value, name));
    } else if (typeof value !== 'string') {
      errors.push(`${name}: Text erwartet.`);
    } else {
      if (field.required && !value.trim()) errors.push(`${name}: Pflichtfeld ist leer.`);
      const pattern = typeof field.pattern === 'string' ? field.pattern : field.pattern?.regex;
      if (pattern && !new RegExp(pattern).test(value)) errors.push(`${name}: ${field.pattern?.message ?? 'Ungültiger Wert.'}`);
    }
  }
  return errors;
}

async function checkImages(value, path, media) {
  const errors = [];
  for (const [key, item] of Object.entries(value ?? {})) {
    const name = `${path}.${key}`;
    if (key === 'image' && item) {
      if (typeof item !== 'string' || !item.startsWith(media.output + '/')) { errors.push(`${name}: Bitte ein Foto aus der Mediathek auswählen.`); continue; }
      const mediaRoot = resolve(root, media.input);
      const file = resolve(mediaRoot, item.slice(media.output.length + 1));
      const relativePath = relative(mediaRoot, file);
      if (relativePath.startsWith('..') || !media.extensions.includes(extname(file).slice(1).toLowerCase())) { errors.push(`${name}: Ungültiger Bildpfad.`); continue; }
      try { if (!(await stat(file)).isFile()) throw new Error(); }
      catch { errors.push(`${name}: Foto fehlt (${item}). Bitte hochladen und erneut auswählen.`); }
    } else if (item && typeof item === 'object') errors.push(...await checkImages(item, name, media));
  }
  return errors;
}

export async function validateContent() {
  const config = parse(await readFile(resolve(root, '.pages.yml'), 'utf8'));
  const errors = [];
  for (const entry of config.content) {
    try {
      const values = JSON.parse(await readFile(resolve(root, entry.path), 'utf8'));
      errors.push(...validateFields(entry.fields, values, entry.path));
      errors.push(...await checkImages(values, entry.path, config.media));
    } catch (error) { errors.push(`${entry.path}: ${error.message}`); }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = await validateContent();
  if (errors.length) {
    console.error('Inhalte konnten nicht veröffentlicht werden:\n' + errors.map(error => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else console.log('CMS-Konfiguration, Pflichtfelder und Bilddateien sind gültig.');
}
