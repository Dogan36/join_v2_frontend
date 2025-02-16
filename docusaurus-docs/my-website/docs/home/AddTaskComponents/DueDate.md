# DueDate Component

## Beschreibung
Diese Komponente ermöglicht es dem Benutzer, ein Fälligkeitsdatum für eine Aufgabe auszuwählen. Das Eingabefeld ist auf das heutige Datum und zukünftige Daten beschränkt. Es wird eine Fehlermeldung angezeigt, wenn kein Fälligkeitsdatum angegeben ist.

## Struktur
- **input-container**: Container für das Eingabefeld des Fälligkeitsdatums.
  - **label**: Beschriftung für das Eingabefeld ("Due date").
  - **input**: Ein Eingabefeld vom Typ "date", das es dem Benutzer ermöglicht, ein Datum auszuwählen. Das minimale Datum ist das heutige Datum.
- **error-message**: Zeigt eine Fehlermeldung an, wenn das Fälligkeitsdatum nicht ausgefüllt wurde.

## Funktionen und Methoden
- **setDueDate(date)**: Setzt das Fälligkeitsdatum auf den angegebenen Wert.
  - **Parameter**: `date` (string) - Der neue Wert für das Fälligkeitsdatum.
  - **Rückgabewert**: `void`

- **clear()**: Löscht das Fälligkeitsdatum und die Fehlermeldung.
  - **Rückgabewert**: `void`

- **validate()**: Validiert das Fälligkeitsdatum, indem überprüft wird, ob es eingegeben wurde.
  - **Rückgabewert**: `boolean` - Gibt `true` zurück, wenn das Fälligkeitsdatum gültig ist, andernfalls `false`.

## Props
Keine Props werden verwendet.

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **input-container**: Container für das Datumseingabefeld.
- **input**: Stil für das Eingabefeld des Fälligkeitsdatums.
- **error-message**: Stil für die Fehlermeldung, die angezeigt wird, wenn das Fälligkeitsdatum nicht ausgefüllt wurde.

## Weitere Hinweise
- Das Fälligkeitsdatum wird auf das heutige Datum beschränkt, damit keine vergangene Daten ausgewählt werden können.
- Wenn das Fälligkeitsdatum nicht eingegeben wird, wird eine Fehlermeldung angezeigt.
