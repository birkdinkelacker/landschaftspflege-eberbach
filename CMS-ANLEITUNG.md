# Texte und Fotos bearbeiten

Die Webseite verwendet **Pages CMS**. Es speichert Texte und Fotos in deinem vorhandenen GitHub-Repository. Die React-Webseite liest die Inhalte beim Build. Du brauchst keine eigene CMS-Datenbank, keinen zusätzlichen Server und keinen API-Schlüssel in der Webseite.

## Einmalig freischalten

1. Öffne [app.pagescms.org](https://app.pagescms.org/).
2. Melde dich mit dem GitHub-Konto an, dem `birkdinkelacker/landschaftspflege-eberbach` gehört.
3. Installiere bzw. autorisiere die offizielle Pages-CMS-GitHub-App. Wähle **Only select repositories** und ausschließlich **landschaftspflege-eberbach**. Das CMS benötigt Schreibzugriff, damit es deine Texte und Fotos in diesem Repository speichern kann. Diese Freigabe erteilst du selbst in GitHub.
4. Öffne das Repository in Pages CMS und wähle den Branch **main**. Die vorbereitete Datei `.pages.yml` liefert die Bearbeitungsmasken automatisch.

Später kannst du direkt `https://DEINE-WEBSEITE/admin/` aufrufen. Diese Seite erklärt die Schritte und führt zum CMS. Die eigentliche Anmeldung und Bearbeitung erfolgt bei Pages CMS.

## Was du bearbeiten kannst

| Bereich | Bearbeitbare Inhalte |
| --- | --- |
| Allgemeine Angaben | Unternehmensname, Logo-Schriftzug, Browser-Titel, Suchmaschinenbeschreibung, Kurzangaben |
| Startseite | Hauptüberschrift, Einleitung, großes Hintergrundfoto, Leistungslink |
| Über uns | Überschrift, Textabsätze, Foto, Bildbeschreibung und Bildunterschrift |
| Leistungen | Überschrift, Einleitung, Leistungen hinzufügen, ändern, entfernen und umsortieren; je ein Foto und Text |
| Bildergalerie | Bilder hinzufügen, ersetzen, entfernen und umsortieren; Titel und Beschreibungen |
| Kontakt und Adresse | Kontakttext, Telefonnummer, E-Mail-Adresse, Straße und Ort |
| Impressum und Datenschutz | Zusätzliche Anbieterangaben und Abschnitte der Datenschutzerklärung |

Das Design und die Standardschrift bleiben erhalten. Das Foto im Bereich „Über uns“ wird weiterhin vollständig ohne Beschnitt dargestellt.

Bei Leistungen ohne passendes Foto bleibt das Bildfeld leer. Die Webseite zeigt automatisch den neutralen Platzhalter „Foto folgt“. Sobald ein passendes Foto vorhanden ist, kannst du es im Bildfeld auswählen, die Bildbeschreibung ergänzen und speichern. Der Platzhalter wird dadurch ersetzt. Die Bilder in der Galerie bleiben weiterhin Pflichtfelder.

## Einen Text ändern

1. Den gewünschten Bereich in Pages CMS öffnen.
2. Den Text ändern. Im Über-uns-Text trennt eine Leerzeile zwei Absätze.
3. Speichern. Die Änderung landet als Commit in GitHub.
4. Den Netlify-Deploy abwarten und dann die Webseite neu laden.

## Ein Foto ändern oder hinzufügen

1. Im gewünschten Bereich das Bildfeld öffnen und ein Foto hochladen oder ein vorhandenes Foto auswählen.
2. Eine kurze Bildbeschreibung ergänzen. Sie wird unter anderem von Screenreadern genutzt.
3. Den **Inhaltsbereich speichern**. Ein Upload allein fügt das Bild noch nicht zur Webseite hinzu.
4. In der Galerie kannst du weitere Einträge hinzufügen und umsortieren. Auch mehr als fünf Bilder werden unterstützt.

JPG, JPEG, PNG, WebP, AVIF und GIF sind vorbereitet. Verwende möglichst komprimierte Bilder, zum Beispiel etwa 1600–2000 Pixel breit und unter 1 MB, damit die Webseite schnell bleibt und wenig Datenvolumen verbraucht. Das CMS komprimiert Bilder nicht automatisch. Noch verwendete Fotos bitte nicht aus der Mediathek löschen; zuerst alle Verwendungen ersetzen.

## Netlify einmal prüfen

Die vorhandene Netlify-Webseite muss mit diesem GitHub-Repository verbunden sein:

- Repository: `birkdinkelacker/landschaftspflege-eberbach`
- Produktionsbranch: `main`
- Basisverzeichnis: Repository-Wurzel
- Build-Befehl: `npm run build`
- Veröffentlichungsverzeichnis: `dist`
- Automatische Builds und Veröffentlichung: aktiviert

`netlify.toml` enthält Build-Befehl, Veröffentlichungsverzeichnis und Node-Version bereits. Wenn du bisher nur einen fertigen Ordner zu Netlify hochgeladen hast, muss das bestehende Projekt zuerst mit GitHub verbunden werden. Dafür ist kein neuer Tarif erforderlich. Die tatsächliche Kontoverbindung und die Live-Veröffentlichung lassen sich erst in deinem Netlify-Konto bestätigen.

Bleibt ein Deploy auf „Pending approval“, prüfe die Zuordnung deines GitHub-Kontos zu deinem vorhandenen Netlify-Benutzer. In der CMS-Konfiguration wird deine Benutzeridentität für Commits angefordert. Füge keine kostenpflichtigen Teammitglieder hinzu, nur um einen CMS-Build zu ermöglichen.

## Kosten niedrig halten

- [Pages CMS](https://pagescms.org/) ist laut Anbieter kostenlos, einschließlich der gehosteten Version. Stand der Prüfung: 29.10.2026.
- Die Webseite benötigt weiterhin nur statisches Hosting. Es kommen keine CMS-Server, Datenbanken oder bezahlten Erweiterungen hinzu.
- Deine tatsächlichen Hostingkosten richten sich nach deinem bestehenden Netlify-Tarif und dessen Nutzung; eine unbegrenzte kostenlose Veröffentlichung wird nicht zugesagt.
- Im aktuellen [Netlify Free-Tarif](https://www.netlify.com/pricing/) stehen 300 Credits im Monat bereit. Ein erfolgreicher Produktions-Deploy kostet aktuell 15 Credits; auch Traffic verbraucht Credits. Bei Erreichen der Free-Grenze pausieren Projekte. Für ältere Legacy-Tarife gelten andere Grenzen. Siehe [Netlify-Credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/).
- Speichere möglichst mehrere Textänderungen im gleichen Bereich zusammen. Jeder gespeicherte Bereich kann einen eigenen Deploy auslösen.
- Der vorbereitete Netlify-Ignore-Befehl überspringt reine Anleitungsänderungen und Uploads noch unbenutzter Fotos. Das Auswählen und Speichern eines Fotos im Inhalt sowie das Ersetzen bereits verwendeter Fotos lösen reguläre Builds aus. Manuell oder über Build-Hooks gestartete Builds sind davon ausgenommen.
- Dein Tarif, Abrechnungseinstellungen und Teamzugänge werden durch diesen Code nicht verändert. Eine eigene Domain kann unabhängig davon Geld kosten.

## Wenn eine Änderung nicht erscheint

1. Ist der Inhaltsbereich gespeichert und der Branch `main` ausgewählt?
2. Ist der Commit in GitHub angekommen?
3. Ist der zugehörige Netlify-Deploy erfolgreich? Die vorherige Webseite bleibt bei einem fehlgeschlagenen Build normalerweise online.
4. Ist das hochgeladene Foto auch im gewünschten Bildfeld ausgewählt?
5. Ist eine Bilddatei gelöscht worden, auf die andere Bereiche noch verweisen? Dann die Datei wiederherstellen oder die Bildauswahl korrigieren.
6. Bei einer roten Inhaltsprüfung nennt das Build-Log die Datei und das Feld, das korrigiert werden muss.

## Für die technische Pflege

- `content/*.json`: Texte, Kontaktdaten und Bildzuordnungen.
- `.pages.yml`: Deutsche CMS-Masken, Pflichtfelder und Mediathek.
- `public/images/`: Fotos; im Inhalt werden öffentliche Pfade wie `/images/garten.jpeg` gespeichert.
- `public/admin/index.html`: Öffentliche Einstiegsseite zum CMS, ohne Passwörter oder Schreib-API.
- `scripts/validate-content.mjs`: Prüft die CMS-Daten und vorhandene Bilddateien vor jedem Produktionsbuild.
- `scripts/netlify-ignore-build.mjs`: Vermeidet unnötige Veröffentlichungen bei unbenutzten Uploads und Dokumentation.
- `vite.config.js`: Übernimmt Seitentitel und Beschreibung aus dem CMS auch in das gebaute HTML.

Prüfen: `npm test` und `npm run build`. Vor lokaler Weiterentwicklung zuerst die CMS-Änderungen aus GitHub mit `git pull --ff-only` abrufen. Die Git-Historie erlaubt, alte Inhaltsstände wiederherzustellen.

Die rechtlichen Texte bleiben Entwürfe, bis sie vervollständigt und für den tatsächlichen Betrieb geprüft wurden. Das CMS erzeugt keine rechtssicheren Erklärungen.
