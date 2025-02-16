# Contact Overlay Component

## Beschreibung
Diese Komponente zeigt ein Overlay an, das verwendet wird, um Kontaktdaten zu bearbeiten oder einen neuen Kontakt hinzuzufügen. Es ermöglicht dem Benutzer, Kontaktinformationen wie Name, E-Mail und Telefonnummer zu bearbeiten oder zu erstellen. Je nach Bearbeitungsmodus wird entweder der Kontaktname und die E-Mail des vorhandenen Kontakts angezeigt oder ein leeres Formular für einen neuen Kontakt.

## Struktur
- **workspace-info-overlay**: Container für das gesamte Overlay.
  - **workspace-info-content**: Enthält den gesamten Inhalt des Overlays, einschließlich der Überschrift, der Kontaktinformationen und der Formulare.
    - **workspace-info-header**: Enthält das Logo und die Überschrift des Overlays.
    - **workspace-info-main**: Zeigt das Formular für das Hinzufügen oder Bearbeiten eines Kontakts.
      - **card-contact-img**: Zeigt ein Standardbild, wenn im Bearbeitungsmodus kein Kontakt ausgewählt ist.
      - **card-avatar**: Zeigt das Avatar des Kontakts im Bearbeitungsmodus.
      - **form**: Formular zur Eingabe von Kontaktinformationen (Name, E-Mail und Telefonnummer).
    - **form-buttons**: Enthält die Schaltflächen zum Speichern oder Abbrechen der Änderungen.

## Funktionen und Methoden
- **initializeForm**: Initialisiert das Formular, indem es die Kontaktinformationen im Bearbeitungsmodus lädt.
  - **Rückgabewert**: `void`

- **save**: Speichert die eingegebenen Kontaktinformationen, wenn das Formular keine Fehler enthält.
  - **Rückgabewert**: `void`

- **resetErrors**: Setzt alle Fehlerflags zurück.
  - **Rückgabewert**: `void`

- **resetForm**: Setzt das Formular zurück, indem alle Felder geleert werden.
  - **Rückgabewert**: `void`

- **cancel**: Bricht die Eingabe ab und schließt das Overlay.
  - **Rückgabewert**: `void`

- **checkForErrors**: Überprüft, ob das Formular gültig ist, und gibt einen Fehler zurück, wenn eines der Felder ungültig ist.
  - **Rückgabewert**: `boolean`

- **checkIfNameEmpty**: Überprüft, ob der Name des Kontakts leer ist.
  - **Rückgabewert**: `boolean`

- **checkIfEmailEmpty**: Überprüft, ob die E-Mail-Adresse des Kontakts leer ist.
  - **Rückgabewert**: `boolean`

- **checkEmailFormat**: Überprüft, ob die E-Mail-Adresse des Kontakts im richtigen Format vorliegt.
  - **Rückgabewert**: `boolean`

## Computed Properties
- **contactName**: Der Name des Kontakts, der vom Benutzer eingegeben wird.
- **contactEmail**: Die E-Mail-Adresse des Kontakts, die vom Benutzer eingegeben wird.
- **contactPhone**: Die Telefonnummer des Kontakts, die vom Benutzer eingegeben wird.
- **nameError**: Flag, das anzeigt, ob ein Fehler bei der Eingabe des Namens vorliegt.
- **emailError**: Flag, das anzeigt, ob ein Fehler bei der Eingabe der E-Mail-Adresse vorliegt.
- **emailFormatError**: Flag, das anzeigt, ob ein Fehler bei der Formatierung der E-Mail-Adresse vorliegt.
- **emailTakenError**: Flag, das anzeigt, ob die E-Mail-Adresse bereits in Verwendung ist.
- **contactOverlayIsEditMode**: Flag, das angibt, ob der Overlay im Bearbeitungsmodus oder im Hinzufügemodus ist.

## Props
- **contactOverlayIsEditMode**: Gibt an, ob das Overlay im Bearbeitungsmodus oder im Hinzufügemodus ist.
  - **Typ**: `Boolean`
  - **Beispiel**: `true` (Bearbeitungsmodus), `false` (Hinzufügemodus)

## Events
- **@close**: Wird ausgelöst, wenn der Benutzer das Overlay schließen möchte.
- **@openOverlay**: Wird ausgelöst, wenn der Benutzer das Overlay öffnen möchte, entweder zum Bearbeiten oder Hinzufügen eines Kontakts.

## Stil
- **workspace-info-overlay**: Der äußere Container für das Overlay.
- **workspace-info-header**: Stil für den Kopfbereich des Overlays mit Logo und Titel.
- **workspace-info-main**: Stil für den Hauptinhalt des Overlays, der das Formular zur Kontaktbearbeitung enthält.
- **card-avatar**: Stil für das Avatar des Kontakts.
- **form-buttons**: Stil für die Schaltflächen "Abbrechen" und "Speichern".

## Weitere Hinweise
- Das Overlay zeigt entweder ein Formular zum Hinzufügen eines neuen Kontakts oder ein Formular zum Bearbeiten eines vorhandenen Kontakts, je nachdem, ob `contactOverlayIsEditMode` auf `true` oder `false` gesetzt ist.
- Es gibt eine Validierung der E-Mail-Adresse, die sicherstellt, dass sie im richtigen Format vorliegt und dass sie nicht bereits in Verwendung ist.
