# Summary Component

## Beschreibung
Diese Komponente zeigt eine Kopfzeile mit dem Titel "Join 360" und eine Übersicht über verschiedene Aufgabenstatus an. Sie enthält interaktive Buttons, die den Benutzer zu spezifischen Board-Ansichten führen, basierend auf den Filtern für Aufgaben.

## Struktur
- **Headline**: Zeigt den Titel "Join 360" und eine Unterüberschrift mit den wichtigsten Kennzahlen.
- **Content Summary**: Zeigt verschiedene Aufgabenstatistiken und -kategorien, die durch interaktive Buttons zugänglich sind:
  - `Tasks in Board`
  - `Tasks in Progress`
  - `Tasks in Feedback`
  - `Urgent`
  - `Upcoming Deadline`
  - `To-do`
  - `Done`
- **Welcome Desk**: Zeigt eine personalisierte Begrüßung mit dem Namen des Benutzers, abhängig von der Tageszeit.

## Funktionen und Methoden
- **goToBoard(filter)**: Navigiert zur Board-Ansicht und wendet den angegebenen Filter auf die Aufgaben an.  
  - **Parameter**: `filter` (Array) - Der Filter, der auf die Aufgaben angewendet werden soll.

## Berechnete Eigenschaften (Computed Properties)
- **userName**: Extrahiert den Vornamen des aktuellen Benutzers aus der `currentUser`-Datenquelle.
  - **Rückgabewert**: String - Der Vorname des Benutzers.
  
- **boardTasks**: Gibt alle Aufgaben für die Board-Ansicht zurück.
  - **Rückgabewert**: Array - Alle Aufgaben.

- **inProgressTasks**: Filtert Aufgaben mit dem Status 'inProgress'.
  - **Rückgabewert**: Array - Aufgaben mit dem Status 'inProgress'.

- **awaitingFeedbackTasks**: Filtert Aufgaben mit dem Status 'awaitingFeedback'.
  - **Rückgabewert**: Array - Aufgaben mit dem Status 'awaitingFeedback'.

- **urgentTasks**: Filtert Aufgaben mit hoher Priorität.
  - **Rückgabewert**: Array - Aufgaben mit hoher Priorität.

- **upcomingDeadline**: Berechnet Aufgaben mit den frühesten anstehenden Fristen.
  - **Rückgabewert**: Array - Aufgaben mit den frühesten anstehenden Fristen.

- **deadlineLabel**: Berechnet das Label für die anstehende oder verpasste Frist.
  - **Rückgabewert**: String - "Upcoming Deadline" oder "Missed Deadline".

- **toDoTasks**: Filtert Aufgaben mit dem Status 'todo'.
  - **Rückgabewert**: Array - Aufgaben mit dem Status 'todo'.

- **doneTasks**: Filtert Aufgaben mit dem Status 'done'.
  - **Rückgabewert**: Array - Aufgaben mit dem Status 'done'.

- **greetingByDaytime**: Berechnet eine Begrüßung basierend auf der Tageszeit.
  - **Rückgabewert**: String - Eine Begrüßung, abhängig von der Tageszeit (z.B. "Good Morning", "Good Afternoon", "Good Evening").

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
Die Komponente verwendet benutzerdefinierte CSS-Klassen für das Layout und die visuelle Darstellung, einschließlich verschiedener Button-Designs und einer responsiven Anpassung für verschiedene Bildschirmgrößen.

## Weitere Hinweise
- Die Begrüßung des Benutzers wird zu Beginn für 3 Sekunden angezeigt und danach ausgeblendet.
- Die Button-Elemente bieten eine interaktive Möglichkeit, durch verschiedene Aufgabenkategorien zu navigieren und Aufgaben anzuzeigen.
