# Eberbacher Garten- und Landschaftspflege

Responsive Webseite mit React und Vite. Die Informationen und Fotos stammen aus den bereitgestellten Unterlagen.

## Lokal starten

```sh
npm install
npm run dev
```

## Produktionsbuild

```sh
npm run build
npm run preview
```

Der fertige statische Build liegt in `dist/` und kann auf einem statischen Webhosting bereitgestellt werden.

## Inhalte ohne Programmieren bearbeiten

Texte und Fotos werden mit dem kostenlosen [Pages CMS](https://app.pagescms.org/) gepflegt. Die deutschen Bearbeitungsmasken sind in `.pages.yml` vorbereitet. Die einmalige GitHub-Freigabe und die Verbindung der vorhandenen Netlify-Seite sind in [CMS-ANLEITUNG.md](CMS-ANLEITUNG.md) erklärt.

- Texte, Leistungen, Kontaktdaten und Galerie: `content/*.json`
- CMS-Einstieg auf der veröffentlichten Webseite: `/admin/`
- Farben und Layout: `src/style.css`
- Fotos: `public/images/`

`netlify.toml` baut mit `npm run build` und veröffentlicht `dist`. Vor jedem Build werden die Inhaltsdateien und Bildpfade geprüft. `npm test` prüft zusätzlich die CMS-Felder und das Überspringen unnötiger Netlify-Builds.

Die Galerie bietet eine vergrößerte Ansicht und weitere Bilder per Schaltfläche. Das mobile Menü, Telefon- und E-Mail-Links sind funktionsfähig. Es gibt kein Kontaktformular und keine serverseitige Datenverarbeitung durch die Anwendung.

## Vor öffentlicher Veröffentlichung

Die Rechtstexte sind ausdrücklich Entwürfe. Name des Inhabers, vollständige Anbieterangaben sowie Hostinganbieter und tatsächliche Datenverarbeitung müssen ergänzt und geprüft werden. Die Geschäftsanschrift, Kontaktdaten, angebotenen Leistungen und Freigaben für die verwendeten Fotos ebenfalls bestätigen.
