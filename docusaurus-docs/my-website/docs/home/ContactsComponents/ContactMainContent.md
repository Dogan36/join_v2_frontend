# Contact Main Content Component

## Beschreibung
Diese Komponente zeigt die Detailansicht eines Kontakts. Sie zeigt Informationen wie den Namen, die E-Mail-Adresse, die Telefonnummer und das Avatar des Kontakts. Es gibt auch Optionen, den Kontakt zu bearbeiten oder zu löschen, wenn der Kontakt nicht Mitglied ist. Zusätzlich können Benutzer die Ansicht schließen oder einen neuen Kontakt hinzufügen.

## Struktur
- **contact-main-content**: Container für den gesamten Inhalt des Kontaktbereichs.
  - **headline-component**: Enthält den Titel und Untertitel der Seite ("Contacts" und "Better with a Team").
  - **contact-card**: Zeigt die Detailinformationen des ausgewählten Kontakts.
    - **card-header**: Enthält das Avatar des Kontakts sowie die Option zum Bearbeiten oder Löschen, wenn der Kontakt nicht Mitglied ist.
    - **card-info-header**: Überschrift für die Kontaktinformationen.
    - **card-info**: Enthält die E-Mail-Adresse und Telefonnummer des Kontakts.
  - **button-container**: Enthält die Schaltflächen zum Schließen der Kontaktansicht und zum Erstellen eines neuen Kontakts.

## Funktionen und Methoden
- **deleteContact**: Löscht den ausgewählten Kontakt.
  - **Rückgabewert**: `void`

## Computed Properties
- **getTextColor**: Ein Composable, das die Textfarbe für das Avatar des Kontakts bestimmt, basierend auf der Hintergrundfarbe des Avatars.

## Props
Keine Props werden verwendet.

## Events
- **@openOverlay**: Wird ausgelöst, wenn das Bearbeitungsoverlay geöffnet oder geschlossen werden soll. Der Wert `true` öffnet das Overlay, während `false` es schließt.
- **@close**: Wird ausgelöst, wenn die Kontaktansicht geschlossen werden soll.

## Stil
- **contact-main-content**: Container für den gesamten Inhalt der Komponente.
- **headline-component**: Stil für die Überschrift der Seite.
- **contact-card**: Stil für das Kontakt-Detaillayout.
- **card-header**: Stil für den Kopfbereich der Kontaktkarte, einschließlich Avatar und Bearbeitungs-/Löschoptionen.
- **card-info-header**: Stil für die Überschrift der Kontaktinformationen.
- **card-info**: Stil für die Anzeige der Kontaktinformationen (E-Mail, Telefon).
- **button-container**: Stil für die Schaltflächen am unteren Rand der Kontaktkarte.

## Weitere Hinweise
- Das Avatar des Kontakts zeigt das `avatar`-Symbol des Kontakts und verwendet die `color.hex_value` für den Hintergrund.
- Die Schaltflächen für das Bearbeiten und Löschen des Kontakts werden nur angezeigt, wenn der Kontakt kein Mitglied ist (über `selectedContact.isMember`).
- Es gibt Schaltflächen zum Schließen der Ansicht und zum Hinzufügen eines neuen Kontakts.

