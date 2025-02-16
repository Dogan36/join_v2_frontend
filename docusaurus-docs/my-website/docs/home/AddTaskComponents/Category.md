# Category Select Component

## Beschreibung
Diese Komponente ermöglicht die Auswahl einer Kategorie für eine Aufgabe. Benutzer können eine bestehende Kategorie auswählen oder eine neue Kategorie hinzufügen. Es wird eine Dropdown-Liste mit den verfügbaren Kategorien angezeigt, und der Benutzer kann eine Kategorie auswählen. Wenn keine Kategorie ausgewählt ist, wird eine Fehlermeldung angezeigt. Es gibt auch eine Funktion zum Löschen von Kategorien.

## Struktur
- **input-container**: Container für die Kategorieauswahl.
- **label**: Beschriftung für das Eingabefeld ("Category").
- **dropdown**: Dropdown-Menü, das eine Liste der verfügbaren Kategorien anzeigt. 
  - **Dropdown Option (Select Category)**: Zeigt die aktuell ausgewählte Kategorie an.
  - **Neue Kategorie**: Ermöglicht es dem Benutzer, eine neue Kategorie hinzuzufügen.
  - **Kategorien anzeigen**: Zeigt die verfügbaren Kategorien an, die der Benutzer auswählen kann. Jede Kategorie kann mit einem "Löschen"-Symbol entfernt werden.
- **CategoryNew**: Ein Formular zur Erstellung einer neuen Kategorie, das angezeigt wird, wenn der Benutzer eine neue Kategorie hinzufügen möchte.
- **Fehlermeldung**: Zeigt eine Fehlermeldung an, wenn keine Kategorie ausgewählt wurde.

## Funktionen und Methoden
- **setCategory(categoryId)**: Setzt die ausgewählte Kategorie basierend auf der bereitgestellten Kategorie-ID.
  - **Parameter**: `categoryId` (number) - Die ID der Kategorie, die ausgewählt werden soll.
  - **Rückgabewert**: `void`

- **clear()**: Setzt die ausgewählte Kategorie zurück und löscht die zugehörige Fehlermeldung.
  - **Rückgabewert**: `void`

- **toggleSelectCategory()**: Wechselt den Zustand des Auswahlmodus für Kategorien.
  - **Rückgabewert**: `void`

- **selectCategory(category)**: Setzt die ausgewählte Kategorie.
  - **Parameter**: `category` (Object) - Die Kategorie, die ausgewählt werden soll.
  - **Rückgabewert**: `void`

- **deleteCategory(categoryId)**: Löscht eine Kategorie aus dem aktuellen Arbeitsbereich.
  - **Parameter**: `categoryId` (string | number) - Die ID der zu löschenden Kategorie.
  - **Rückgabewert**: `Promise<void>` - Ein Promise, das aufgelöst wird, wenn die Löschoperation abgeschlossen ist.

- **toggleAddingNewCategory()**: Wechselt den Zustand für das Hinzufügen einer neuen Kategorie.
  - **Rückgabewert**: `void`

- **validate()**: Validiert die Auswahl der Kategorie. Gibt eine Fehlermeldung aus, wenn keine Kategorie ausgewählt wurde.
  - **Rückgabewert**: `boolean` - `true`, wenn eine Kategorie ausgewählt wurde, andernfalls `false`.

## Props
Keine Props werden verwendet.

## Events
- **@toggle**: Wird ausgelöst, wenn das Hinzufügen einer neuen Kategorie aktiviert oder deaktiviert wird.

## Stil
- **input-container**: Container für das Eingabefeld und das Dropdown-Menü.
- **dropdown-option**: Stil für jede Option im Dropdown-Menü.
- **dropdown-option-content**: Stil für den Text jeder Dropdown-Option.
- **color-category-button**: Zeigt den Farbcode für jede Kategorie an.
- **arrow-icon-dropdown**: Stil für den Pfeil, der die Dropdown-Richtung anzeigt.
- **error-message**: Zeigt eine Fehlermeldung an, wenn keine Kategorie ausgewählt wurde.

## Weitere Hinweise
- Diese Komponente bietet die Möglichkeit, zwischen bestehenden Kategorien zu wählen oder eine neue Kategorie hinzuzufügen.
- Der Benutzer kann Kategorien auch löschen, wenn sie nicht mehr benötigt werden.
- Bei fehlerhafter Auswahl wird eine Fehlermeldung angezeigt.


---
