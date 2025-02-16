# BoardCard Component

## Beschreibung
Diese Komponente stellt eine Karte für eine Aufgabe auf dem Board dar. Sie zeigt verschiedene Details der Aufgabe, einschließlich Titel, Beschreibung, Kategorie, Subtasks und Zuordnungen. Die Karte zeigt auch den Fortschritt der Subtasks und das zugewiesene Avatar-Icon der beteiligten Kontakte. Zudem wird die Priorität der Aufgabe visuell dargestellt.

## Struktur
- **board-card**: Container für die gesamte Aufgabenkarte.
  - **card-category**: Zeigt die Kategorie der Aufgabe mit einer Hintergrundfarbe an, die auf die Kategorie basiert.
  - **card-content**: Enthält den Titel und die Beschreibung der Aufgabe.
  - **card-progress**: Zeigt den Fortschritt der Aufgabe an, basierend auf der Anzahl der erledigten Subtasks.
  - **card-bottom-div**: Enthält die Avatare der zugewiesenen Kontakte und das Icon für die Priorität der Aufgabe.

## Funktionen und Methoden
- **getTextColor**: Ein Composable, das die Textfarbe für die Aufgabe basierend auf der Hintergrundfarbe der Kategorie bestimmt.
  - **Rückgabewert**: Eine Funktion, die entweder `#fff` (weiß) oder `#000` (schwarz) als Textfarbe zurückgibt, abhängig von der Hintergrundfarbe der Kategorie.

## Computed Properties
- **title**: Der Titel der Aufgabe, extrahiert aus dem `task`-Prop.
- **description**: Die Beschreibung der Aufgabe, extrahiert aus dem `task`-Prop.
- **category**: Die Kategorie der Aufgabe, basierend auf der Kategorie-ID in `task.category`. Wenn keine Kategorie gefunden wird, wird eine Standardkategorie zurückgegeben.
- **subtasks**: Die Liste der Unteraufgaben der Aufgabe, extrahiert aus `task.subtasks`.
- **subtasksDone**: Die Anzahl der erledigten Unteraufgaben, berechnet durch das Zählen der Unteraufgaben, deren `is_completed` auf `true` gesetzt ist.
- **assignedTo**: Eine Liste der Kontakte, die der Aufgabe zugewiesen sind, extrahiert aus `task.selected_contacts`.
- **prio**: Die Priorität der Aufgabe, extrahiert aus `task.prio`.
- **buttonImg**: Das Bild für die Prioritätsanzeige, basierend auf dem Wert der Priorität (`high`, `medium`, `low`). Es zeigt das entsprechende Icon an.

## Props
- **task**: Das Aufgabenobjekt, das verschiedene Details zur Aufgabe enthält (z. B. Name, Beschreibung, Kategorie, Unteraufgaben, Zuordnung und Priorität).
  - **Typ**: `Object`
  - **Beispiel**:
    ```json
    {
      "name": "Task Title",
      "description": "Task description",
      "category": "category_id",
      "subtasks": [{ "name": "Subtask 1", "is_completed": true }],
      "selected_contacts": ["contact1", "contact2"],
      "prio": "high"
    }
    ```

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **board-card**: Container für die gesamte Karte.
- **card-category**: Stil für die Kategoriebezeichnung, die die Hintergrundfarbe und Textfarbe basierend auf der Kategorie ändert.
- **card-title**: Stil für den Titel der Aufgabe.
- **card-description**: Stil für die Beschreibung der Aufgabe.
- **card-progress**: Stil für die Fortschrittsanzeige der Unteraufgaben.
- **card-bottom-div**: Stil für den unteren Teil der Karte, einschließlich der Avatare und des Prioritäts-Icons.

## Weitere Hinweise
- Die Kategorie wird durch die Hintergrundfarbe hervorgehoben, die aus der `category.color.hex_value` extrahiert wird.
- Der Fortschritt der Aufgabe wird durch ein `progress`-Element angezeigt, das den Prozentsatz der erledigten Unteraufgaben darstellt.
- Die Priorität der Aufgabe wird durch ein Icon visualisiert, das je nach Priorität (`high`, `medium`, `low`) ändert.
