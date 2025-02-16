# Assign Contacts Component

## Beschreibung
Diese Komponente zeigt eine Dropdown-Auswahl zum Zuweisen von Kontakten zu einer Aufgabe. Benutzer können Kontakte auswählen, indem sie die Dropdown-Liste öffnen und Checkboxen aktivieren. Es wird eine Liste der ausgewählten Kontakte in Form von Avataren angezeigt.

## Struktur
- **input-container**: Container für das Eingabefeld und das Dropdown.
- **label**: Beschriftung für das Eingabefeld ("Assigned to").
- **inputfield dropdown**: Das Dropdown-Menü, das es dem Benutzer ermöglicht, Kontakte auszuwählen.
  - **Dropdown Toggle**: Ein Bereich, der das Dropdown-Menü öffnet und schließt. Zeigt den Text "Select Contacts to Assign" und einen Pfeil an.
  - **Dropdown Options**: Eine Liste von Kontakten, die angezeigt wird, wenn das Dropdown-Menü geöffnet ist. Jeder Kontakt kann durch ein Kontrollkästchen ausgewählt werden.
- **AssignedToAvatars**: Zeigt Avatare der ausgewählten Kontakte an.

## Funktionen und Methoden
- **toggleSelectContacts()**: Wechselt den Zustand des Kontakt-Auswahlmodus.
  - **Rückgabewert**: `void`

- **clear()**: Setzt den Zustand der Auswahl zurück und schließt das Dropdown-Menü.
  - **Rückgabewert**: `void`

- **setContacts(selectedContactsIds)**: Setzt die ausgewählten Kontakte basierend auf einer Liste von Kontakt-IDs.
  - **Parameter**: `selectedContactsIds` (Array) - Eine Liste der IDs der ausgewählten Kontakte.
  - **Rückgabewert**: `void`

## Computed Properties
- **selectedContacts**: Gibt eine Liste der IDs der ausgewählten Kontakte zurück.
  - **Rückgabewert**: Array - Eine Liste von Kontakt-IDs, die ausgewählt wurden.

## Props
- **AssignedToAvatars**: Ein benutzerdefinierter Komponenten-Wrapper, der Avatare der ausgewählten Kontakte anzeigt.

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **input-container**: Container für die gesamte Eingabe- und Dropdown-Struktur.
- **dropdown-option**: Stil für jede Option im Dropdown-Menü, das die Kontakte anzeigt.
- **dropdown-option-content**: Stil für den Text jedes Dropdown-Elements.
- **arrow-icon-dropdown**: Stil für den Pfeil, der die Dropdown-Richtung anzeigt.
- **form-buttons**: Enthält die Schaltflächen zum Abbrechen und zum Bestätigen der Auswahl.

## Weitere Hinweise
- Diese Komponente ermöglicht es dem Benutzer, mehrere Kontakte auszuwählen, indem er auf die entsprechenden Checkboxen klickt.
- Avatare der ausgewählten Kontakte werden unterhalb der Dropdown-Liste angezeigt, um dem Benutzer eine visuelle Rückmeldung zu geben.
