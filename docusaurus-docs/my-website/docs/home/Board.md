# Board Component

## Beschreibung
Diese Komponente zeigt ein Board mit mehreren Spalten für verschiedene Aufgabenstatus. Sie ermöglicht das Hinzufügen neuer Aufgaben, das Filtern von Aufgaben durch eine Suchleiste und das Drag-and-Drop von Aufgaben zwischen den Spalten. Es gibt auch eine Detailansicht für jede Aufgabe.

## Struktur
- **Headline**: Zeigt den Titel "Board" und eine Suchleiste sowie einen Button zum Hinzufügen einer neuen Aufgabe.
- **Board Columns**: Vier Spalten für unterschiedliche Aufgabenstatus: 
  - `To do`
  - `In Progress`
  - `Awaiting Feedback`
  - `Done`
- **Task Cards**: Jede Spalte enthält Karten für Aufgaben, die per Drag-and-Drop verschoben werden können.
- **Overlays**: 
  - Ein Overlay zum Hinzufügen einer neuen Aufgabe.
  - Ein Overlay zur Detailansicht einer Aufgabe.

## Funktionen und Methoden
- **startScrolling(direction, e)**: Startet das Scrollen der Hauptansicht, wenn sich der Touch-Ereignis in Richtung oben oder unten bewegt.
  - **Parameter**: `direction` (String) - Die Richtung des Scrollens ('up' oder 'down').
  - **Parameter**: `e` (TouchEvent) - Das Touch-Ereignis, das die Position des Touches enthält.

- **stopScrolling()**: Stoppt das Scrollen der Hauptansicht.
  
- **onTouchStart(task, e)**: Behandelt den Beginn eines Touch-Ereignisses für eine Aufgabe. Setzt die Position der Drag-Vorschau und startet einen Timer für die Langdruck-Erkennung.

- **onTouchMove(e)**: Behandelt das Touch-Bewegungs-Ereignis und aktualisiert die Position der Drag-Vorschau und die gespannte Spalte.

- **onTouchEnd(e)**: Behandelt das Ende des Touch-Ereignisses. Beendet das Scrollen und führt entweder eine Aufgabe in die richtige Spalte ein oder öffnet die Detailansicht der Aufgabe.

- **updateHoveredColumn(e)**: Aktualisiert die gespannte Spalte basierend auf der Position des Touches.

- **isHighlighted(task)**: Überprüft, ob eine Aufgabe hervorgehoben ist.
  - **Parameter**: `task` (Object) - Die zu überprüfende Aufgabe.
  - **Rückgabewert**: Boolean - Gibt `true` zurück, wenn die Aufgabe hervorgehoben ist, andernfalls `false`.

- **removeHighlight()**: Entfernt die Hervorhebung von Aufgaben, indem die `selectedTasks`-Liste gelöscht wird.

- **onDragStart(task)**: Behandelt den Drag-Start für eine Aufgabe.
  - **Parameter**: `task` (Object) - Die Aufgabe, die gezogen wird.

- **onDragEnd()**: Behandelt das Ende des Drag-Ereignisses und setzt den Zustand zurück.

- **onDrop(status)**: Behandelt das Ablegen einer Aufgabe in eine andere Spalte und aktualisiert den Status der Aufgabe.
  - **Parameter**: `status` (String) - Der neue Status der Aufgabe.

- **openAddTaskOverlay(status)**: Öffnet das Overlay zum Hinzufügen einer neuen Aufgabe und setzt den Status.
  - **Parameter**: `status` (String) - Der Status der neuen Aufgabe.

- **openTaskDetail(task)**: Öffnet die Detailansicht für eine Aufgabe.
  - **Parameter**: `task` (Object) - Die Aufgabe, deren Details angezeigt werden.

- **closeOverlay()**: Schließt alle offenen Overlays (hinzufügen und Detailansicht).

## Berechnete Eigenschaften (Computed Properties)
- **filteredTasks**: Filtert Aufgaben basierend auf der Suchanfrage. Die Suche berücksichtigt den Namen der Aufgabe, die Beschreibung und den Kategorienamen.
  - **Rückgabewert**: Array - Eine Liste der gefilterten Aufgaben.

- **tasksByStatus**: Gruppiert die gefilterten Aufgaben nach ihrem Status (`todo`, `inProgress`, `awaitingFeedback`, `done`).
  - **Rückgabewert**: Object - Ein Objekt, das Aufgaben nach Status gruppiert.

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
Die Komponente verwendet benutzerdefinierte CSS-Klassen, um das Layout und die visuelle Darstellung zu definieren. Sie enthält responsive Stile, die sich an verschiedene Bildschirmgrößen anpassen, und Styles für das Drag-and-Drop-Feature.

## Weitere Hinweise
- Die Komponente verwendet Drag-and-Drop, um Aufgaben zwischen verschiedenen Spalten zu verschieben. Die Drag-Vorschau wird beim Ziehen der Aufgabe angezeigt.
- Es gibt zwei Overlays: eines für das Hinzufügen einer neuen Aufgabe und eines für die Detailansicht einer Aufgabe.
