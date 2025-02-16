# BoardTask Detail Component

## Beschreibung
Diese Komponente zeigt die Detailansicht einer Aufgabe. Sie enthält Informationen wie Titel, Beschreibung, Kategorie, Fälligkeitsdatum, Priorität, zugewiesene Benutzer und Unteraufgaben. Zusätzlich können Subtasks abgehakt werden und es gibt die Möglichkeit, die Aufgabe zu bearbeiten oder zu löschen.

## Struktur
- **board-task-detail**: Container für die gesamte Detailansicht der Aufgabe.
  - **active-task-header**: Enthält die Kategorie der Aufgabe und einen Schließen-Button.
  - **active-task-category**: Zeigt die Kategorie der Aufgabe an, mit einer Hintergrundfarbe, die von der Kategorie abhängt.
  - **active-task-title**: Zeigt den Titel der Aufgabe.
  - **active-task-description**: Zeigt die Beschreibung der Aufgabe.
  - **active-task-duedate**: Zeigt das Fälligkeitsdatum der Aufgabe.
  - **active-task-priority**: Zeigt die Priorität der Aufgabe sowie ein entsprechendes Icon.
  - **active-task-element (Assigned To)**: Zeigt die Liste der Benutzer, die der Aufgabe zugewiesen sind.
  - **active-task-element (Subtasks)**: Zeigt eine Liste der Unteraufgaben, die der Aufgabe zugeordnet sind.
  - **active-task-change-container**: Enthält Buttons zum Bearbeiten und Löschen der Aufgabe.

## Funktionen und Methoden
- **closeOverlay()**: Schließt das Overlay, wenn der Benutzer auf den Schließen-Button klickt.
  - **Rückgabewert**: `void`

- **updateSubtask(subtask)**: Aktualisiert den Status einer Unteraufgabe, wenn der Benutzer das Häkchen setzt oder entfernt.
  - **Parameter**: `subtask` (Object) - Das Subtask-Objekt, dessen Status aktualisiert werden soll.
  - **Rückgabewert**: `Promise<void>`

- **deleteTask()**: Löscht die Aufgabe aus dem aktuellen Arbeitsbereich.
  - **Rückgabewert**: `Promise<void>`

- **editTask()**: Leitet den Bearbeitungsprozess der Aufgabe ein.
  - **Rückgabewert**: `void`

## Computed Properties
- **title**: Der Titel der Aufgabe, extrahiert aus `props.task.name`.
- **description**: Die Beschreibung der Aufgabe, extrahiert aus `props.task.description`.
- **category**: Die Kategorie der Aufgabe, basierend auf der Kategorie-ID, die in `props.task.category` gespeichert ist. Wenn keine Kategorie gefunden wird, wird eine Standardkategorie zurückgegeben.
- **assignedTo**: Eine Liste der Benutzer, die der Aufgabe zugewiesen sind. Diese wird aus den `members` gefiltert.
- **dueDate**: Das Fälligkeitsdatum der Aufgabe, extrahiert aus `props.task.due_date`.
- **subtasks**: Die Liste der Unteraufgaben der Aufgabe, extrahiert aus `props.task.subtasks`.
- **prio**: Die Priorität der Aufgabe, extrahiert aus `props.task.prio`.
- **buttonImg**: Das Bild für das Prioritäts-Icon, das je nach Priorität der Aufgabe angezeigt wird.
- **buttonColor**: Die Hintergrundfarbe des Prioritäts-Buttons, die auf der Priorität basiert.

## Props
- **task**: Das Aufgabenobjekt, das alle Details zur Aufgabe enthält.
  - **Typ**: `Object`
  - **Beispiel**:
    ```json
    {
      "name": "Task Title",
      "description": "Task description",
      "category": "category_id",
      "subtasks": [{ "name": "Subtask 1", "is_completed": true }],
      "selected_contacts": ["contact1", "contact2"],
      "prio": "high",
      "due_date": "2025-12-31"
    }
    ```

## Events
- **@close**: Wird ausgelöst, wenn das Overlay geschlossen wird.
- **@edit**: Wird ausgelöst, wenn die Aufgabe bearbeitet werden soll.

## Stil
- **active-task-header**: Stil für den Kopfbereich der Aufgabenkarte, der die Kategorie und den Schließen-Button enthält.
- **active-task-category**: Stil für die Kategoriebezeichnung, die die Hintergrundfarbe und Textfarbe anzeigt.
- **active-task-title**: Stil für den Titel der Aufgabe.
- **active-task-description**: Stil für die Beschreibung der Aufgabe.
- **active-task-priority**: Stil für den Prioritätsbereich der Aufgabe, einschließlich eines Buttons mit einer Farbanpassung.
- **active-task-element**: Stil für die Bereiche, die Informationen zu den zugewiesenen Benutzern und Unteraufgaben enthalten.

## Weitere Hinweise
- Die Priorität wird mit einem entsprechenden Icon und einer Farbe angezeigt, die aus dem `Prioicons`-Objekt extrahiert wird.
- Wenn keine Unteraufgaben vorhanden sind, wird die Nachricht "No Subtasks assigned" angezeigt.
- Es gibt eine Möglichkeit, die Aufgabe zu löschen oder zu bearbeiten, indem die entsprechenden Icons geklickt werden.
