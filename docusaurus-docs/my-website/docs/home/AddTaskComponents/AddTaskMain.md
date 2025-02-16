# Add Task Main Component

## Beschreibung
Diese Komponente zeigt ein Overlay zum Hinzufügen oder Bearbeiten von Aufgaben. Sie enthält ein Formular zur Eingabe von Aufgabeninformationen, einschließlich Titel, Beschreibung, Kategorie, Fälligkeitsdatum, Priorität, zugewiesenen Kontakten und Unteraufgaben. Abhängig vom Modus (Hinzufügen oder Bearbeiten) wird das Overlay entweder für das Erstellen einer neuen Aufgabe oder zum Bearbeiten einer bestehenden Aufgabe angezeigt.

## Struktur
- **addtask-overlay**: Das Overlay, das die Eingabeformulare enthält.
- **addtask-headline**: Die Überschrift des Overlays, die "Add Task" oder "Edit Task" anzeigt, je nach Modus.
- **Formular**: Enthält die verschiedenen Eingabefelder:
  - **Title**: Titel der Aufgabe.
  - **Description**: Beschreibung der Aufgabe.
  - **Category**: Kategorie der Aufgabe.
  - **AssignContacts**: Kontakte, die der Aufgabe zugewiesen werden.
  - **DueDate**: Fälligkeitsdatum der Aufgabe.
  - **PrioButtons**: Priorität der Aufgabe.
  - **Subtasks**: Unteraufgaben der Aufgabe.
- **Form Buttons**: Zwei Buttons:
  - **Cancel**: Schließt das Overlay ohne Änderungen.
  - **Submit**: Speichert die Aufgabe (entweder als neue Aufgabe oder als bearbeitete Aufgabe).

## Funktionen und Methoden
- **closeOverlay()**: Schließt das Overlay und setzt alle Formulare zurück. Ein "close"-Event wird ausgelöst, um das Overlay zu schließen.
  
- **clearForm()**: Setzt alle Formulareingaben zurück.

- **initializeForm()**: Initialisiert das Formular basierend auf dem aktuellen Modus:
  - Im Bearbeitungsmodus wird das Formular mit den Daten der aktuellen Aufgabe gefüllt.
  - Im Hinzufügungsmodus wird die Kategorie auf `null` gesetzt.
  
- **updateSubtasks(newSubtasks)**: Aktualisiert die Unteraufgaben mit den neuen Daten.
  - **Parameter**: `newSubtasks` (Array) - Das Array der neuen Unteraufgaben.

- **validateForm()**: Validiert das Formular, indem überprüft wird, ob Titel, Kategorie und Fälligkeitsdatum korrekt ausgefüllt sind.
  - **Rückgabewert**: Boolean - `true`, wenn das Formular gültig ist, andernfalls `false`.

- **handleSubmit()**: Behandelt das Absenden des Formulars:
  - Validiert das Formular und erstellt oder aktualisiert eine Aufgabe, wenn das Formular gültig ist.
  
- **createTaskObject()**: Erstellt ein Aufgabenobjekt basierend auf den Formulardaten.

- **createTask()**: Sendet eine POST- oder PUT-Anfrage an die API, um eine neue Aufgabe zu erstellen oder eine bestehende Aufgabe zu aktualisieren. Bei Erfolg wird die Aufgabenliste aktualisiert.

- **createTaskFetch(taskData)**: Sendet eine POST-Anfrage, um eine neue Aufgabe zu erstellen.
  - **Parameter**: `taskData` (Object) - Die Daten der Aufgabe.
  - **Rückgabewert**: Das erstellte Aufgabenobjekt.

- **updateTaskFetch(taskData)**: Sendet eine PUT-Anfrage, um eine bestehende Aufgabe zu aktualisieren.
  - **Parameter**: `taskData` (Object) - Die zu aktualisierenden Aufgabendaten.
  - **Rückgabewert**: Das aktualisierte Aufgabenobjekt.

## Events
- **@close**: Wird ausgelöst, wenn das Overlay geschlossen wird.

## Stil
- **addtask-overlay**: Container für das gesamte Overlay.
- **addtask-headline**: Stil für die Überschrift des Overlays.
- **addtask-main-content**: Stil für das Formularlayout.
- **form-left**: Container für die Felder zur Titel-, Beschreibung-, Kategorie- und Kontaktzuweisung.
- **form-right**: Container für die Felder zur Fälligkeitsdatum-, Prioritäts- und Unteraufgaben-Verwaltung.
- **form-buttons**: Container für die Schaltflächen "Cancel" und "Submit".

## Weitere Hinweise
- Im Bearbeitungsmodus wird das Formular mit den aktuellen Aufgabendaten gefüllt, sodass der Benutzer die Aufgabe bearbeiten kann.
- Im Hinzufügungsmodus wird das Formular für die Eingabe einer neuen Aufgabe angezeigt.
- Es gibt eine Validierung für Titel, Kategorie und Fälligkeitsdatum.
- Das Overlay kann sowohl zum Hinzufügen als auch zum Bearbeiten von Aufgaben verwendet werden.

