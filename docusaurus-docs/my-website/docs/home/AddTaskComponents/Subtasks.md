# Subtasks Component

## Beschreibung
Diese Komponente ermöglicht das Hinzufügen und Verwalten von Unteraufgaben für eine Aufgabe. Benutzer können Unteraufgaben hinzufügen, löschen und den Status einer Unteraufgabe (abgeschlossen/nicht abgeschlossen) ändern. Die Unteraufgaben werden in einer Liste angezeigt und können bearbeitet oder entfernt werden.

## Struktur
- **input-container**: Container für das Eingabefeld der Unteraufgabe.
  - **label**: Beschriftung für das Eingabefeld ("Subtasks").
  - **dropdown**: Zeigt die Option zum Hinzufügen einer neuen Unteraufgabe an, wenn keine Unteraufgabe hinzugefügt wird.
  - **Eingabefeld**: Ein Textfeld, in dem der Benutzer eine neue Unteraufgabe eingeben kann. Es erscheint, wenn der Benutzer auf "Add new Subtask" klickt.
  - **icon-container**: Enthält Icons zum Abbrechen der Eingabe oder zum Bestätigen der neuen Unteraufgabe.

- **subtasks-container**: Container für die Liste der Unteraufgaben.
  - Jede Unteraufgabe wird mit einem Namen, einem Checkbox-Element (zur Markierung als erledigt) und einem "Löschen"-Icon angezeigt.

## Funktionen und Methoden
- **addNewSubtask()**: Fügt eine neue Unteraufgabe zur Liste der Unteraufgaben hinzu. Überprüft, ob die Eingabe nicht leer ist und setzt die Eingabe zurück.
  - **Rückgabewert**: `void`

- **toggleAddingNewSubtask()**: Wechselt den Zustand, ob das Eingabefeld für eine neue Unteraufgabe angezeigt wird.
  - **Rückgabewert**: `void`

- **setSubtasks(newSubtasks)**: Setzt die Liste der Unteraufgaben mit den bereitgestellten Werten.
  - **Parameter**: `newSubtasks` (Array) - Eine Liste von Unteraufgaben.
  - **Rückgabewert**: `void`

- **clear()**: Löscht alle Unteraufgaben, indem die Unteraufgabenliste zurückgesetzt wird.
  - **Rückgabewert**: `void`

- **deleteSubtask(index)**: Löscht eine Unteraufgabe an der angegebenen Stelle in der Liste.
  - **Parameter**: `index` (number) - Der Index der zu löschenden Unteraufgabe.
  - **Rückgabewert**: `void`

- **watch()**: Überwacht die `subtasks`-Liste und sendet eine Aktualisierung an die Elternkomponente, wenn sich die Liste ändert.
  - **Rückgabewert**: `void`

## Props
Keine Props werden verwendet.

## Events
- **@update:subtasks**: Wird ausgelöst, wenn sich die Liste der Unteraufgaben ändert. Die neue Liste der Unteraufgaben wird als Argument übergeben.

## Stil
- **input-container**: Container für das Textfeld und das Dropdown-Menü für das Hinzufügen von Unteraufgaben.
- **subtasks-container**: Container für die Liste der Unteraufgaben.
- **subtask**: Stil für jede Unteraufgabe, die in der Liste angezeigt wird.
  - Jede Unteraufgabe enthält den Namen, eine Checkbox und ein "Löschen"-Icon.
- **icon-container-subtask**: Stil für das Container-Layout der Icons in jeder Unteraufgabe.

## Weitere Hinweise
- Die Komponente bietet eine dynamische Liste von Unteraufgaben, die hinzugefügt und entfernt werden können.
- Jede Unteraufgabe hat einen Erledigungsstatus, der durch eine Checkbox markiert wird.
- Beim Hinzufügen einer neuen Unteraufgabe wird die Eingabe überprüft, um sicherzustellen, dass sie nicht leer ist. Wenn keine Eingabe erfolgt, wird eine Fehlermeldung angezeigt.

---
