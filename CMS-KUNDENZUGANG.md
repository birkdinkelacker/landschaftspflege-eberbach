# CMS an den Kunden übergeben

Stand: 01.11.2026. Empfohlener Weg: **Pages-CMS-Einladung per E-Mail**. Der Kunde benötigt weder dein Passwort noch ein eigenes GitHub- oder Netlify-Konto.

## Die fertigen Links

- Kunden-Einstieg: https://landschaftspflege-eberbach.netlify.app/admin/
- Kunden-Anleitung: https://landschaftspflege-eberbach.netlify.app/admin/hilfe.html
- CMS-Projekt: https://app.pagescms.org/birkdinkelacker/landschaftspflege-eberbach/main
- Einladungen verwalten (nur als Betreiber): https://app.pagescms.org/birkdinkelacker/landschaftspflege-eberbach/main/collaborators

## Den Zugang einmalig freigeben

1. Öffne [Pages CMS](https://app.pagescms.org/) und melde dich mit deinem GitHub-Konto `birkdinkelacker` an.
2. Öffne `landschaftspflege-eberbach` und den Branch `main`.
3. Klicke links unter **Admin** auf **Collaborators**.
4. Klicke auf **Invite a collaborator**.
5. Trage die mit dem Kunden vereinbarte persönliche E-Mail-Adresse ein und bestätige mit **Send invite**. Dadurch wird ein Zugang zu diesem Repository eingerichtet und eine Einladung versendet. Prüfe die Adresse vor dem Absenden.
6. Der Kunde öffnet die Einladung, meldet sich per E-Mail an und verwendet danach den Kunden-Einstieg.

Der Bereich „Collaborators“ und das leere Einladungsformular wurden am 01.11.2026 im bestehenden Projekt geprüft. Dabei wurde **keine Einladung versendet und kein Kundenzugang eingerichtet**. Im Projekt waren zu diesem Zeitpunkt noch keine Collaborators vorhanden.

Die Kundendaten werden in Pages CMS verwaltet, nicht in `.pages.yml`. Trage deshalb keine Kunden-E-Mail-Adressen oder Zugangsdaten in die Projektdateien ein.

## Was der Kunde bearbeiten darf

Der E-Mail-Zugang gilt für dieses Repository und erlaubt die Bearbeitung der in `.pages.yml` angebotenen Inhalte und der Mediathek. Der Kunde kann die CMS-Konfiguration nicht verwalten, keine weiteren Kunden einladen und keine Cache-Verwaltung öffnen. Eine Einschränkung auf einzelne Inhaltsbereiche wird mit dieser Einrichtung nicht zugesagt: Auch die angebotenen Kontakt- und Rechtstextfelder sind bearbeitbar.

Die CMS-Masken zeigen den aktuellen Inhalt der Webseite, einschließlich der neun Leistungen und der sieben unterschiedlichen Leistungsfotos. Bei Obstbaumpflege und Facility Management darf das Bildfeld leer bleiben. Dann wird „Foto folgt“ angezeigt.

Die fest eingebundenen Inhaltsdateien können über die CMS-Masken nicht mehr gelöscht oder umbenannt werden. Leistungen und Galeriebilder lassen sich weiterhin innerhalb ihrer Listen hinzufügen, entfernen und umsortieren. Die Inhaltsprüfung verhindert doppelt zugeordnete Leistungsbilder und verlangt bei ausgewählten Fotos eine Bildbeschreibung.

Quelle: [Pages CMS – Collaborators](https://pagescms.org/docs/configuration/collaborators/) und [Authentifizierung](https://pagescms.org/docs/development/authentication/).

## Vor der Übergabe einmal zusammen prüfen

1. Der Kunde kann mit der eingeladenen Adresse das richtige Projekt öffnen.
2. Er kann einen vereinbarten kleinen Text ändern und speichern. Eine solche Änderung kann direkt eine Veröffentlichung auslösen, deshalb einen tatsächlich gewünschten Text verwenden.
3. Die Änderung wird in GitHub gespeichert und der Netlify-Deploy ist erfolgreich.
4. Die Änderung erscheint auf der öffentlichen Webseite.

Mit dem E-Mail-Kundenzugang wurde noch kein vollständiger Speichern-und-Veröffentlichen-Test durchgeführt. Dafür muss der Kunde zuerst eingeladen sein. Bei Problemen die Veröffentlichungsprotokolle prüfen; keine zusätzlichen kostenpflichtigen Netlify-Teammitglieder anlegen, nur um einen CMS-Zugang zu ermöglichen.

## Vorlage für deine Nachricht nach erfolgreicher Einladung

Die folgende Nachricht kannst du selbst nach erfolgter Einladung an deinen Kunden schicken:

> Guten Tag,
>
> Sie erhalten separat eine persönliche Einladung zum Bearbeiten Ihrer Webseite. Öffnen Sie die Einladung und melden Sie sich mit der E-Mail-Adresse an, an die sie gesendet wurde. Ein GitHub-Konto ist nicht nötig.
>
> Ihr Einstieg: https://landschaftspflege-eberbach.netlify.app/admin/
>
> Die Anleitung: https://landschaftspflege-eberbach.netlify.app/admin/hilfe.html
>
> Dort können Sie Texte und Fotos ändern. Bitte speichern Sie nach der Bearbeitung den gesamten Bereich mit „Save“. Nach der Veröffentlichung sind die Änderungen auf Ihrer Webseite sichtbar.
>
> Bei Fragen oder Problemen melden Sie sich bitte bei mir.

## Kosten und Betrieb

Die gehostete [Pages-CMS-Version](https://pagescms.org/) ist laut Anbieter kostenlos. Es wird kein zusätzlicher CMS-Server benötigt. Der Kunde wird als Pages-CMS-Collaborator eingeladen, nicht als Netlify-Teammitglied. Der bestehende Netlify-Tarif und seine Nutzungslimits bleiben maßgeblich; weitere Veröffentlichungen zählen weiterhin zur Nutzung. Es wurden keine kostenpflichtigen Zusatzdienste eingerichtet.

Pages CMS wird als gehosteter Dienst beim Anbieter betrieben. Es liegt keine lokale CMS-Serverinstallation vor, deren Versionsnummer hier aktualisiert werden müsste. Im Projekt gepflegt werden die aktuelle CMS-Konfiguration, die Inhaltsdateien und die Kundeneinstiegsseiten.

Wenn der Kunde nicht mehr bearbeiten soll, verwalte bzw. entferne den Zugang im Bereich **Collaborators**. Ein Austausch der Webseite oder Löschen des Links `/admin/` entzieht den CMS-Zugang nicht.
