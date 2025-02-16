# Title Component

## Beschreibung
Diese Komponente ermöglicht es dem Benutzer, einen Titel für eine Aufgabe einzugeben. Das Eingabefeld prüft, ob der Titel eingegeben wurde, und zeigt eine Fehlermeldung an, wenn das Eingabefeld leer bleibt. Der Benutzer kann auch den Titel setzen oder löschen.

## Struktur
- **input-container**: Container für das Eingabefeld des Titels.
  - **label**: Beschriftung für das Eingabefeld ("Title").
  - **input**: Ein Textfeld, in dem der Benutzer den Titel der Aufgabe eingibt. Es gibt eine maximale Länge von 30 Zeichen.
- **error-message**: Zeigt eine Fehlermeldung an, wenn der Titel nicht eingegeben wurde.

## Funktionen und Methoden
- **setTitle(value)**: Setzt den Titel auf den angegebenen Wert.
  - **Parameter**: `value` (string) - Der neue Wert für den Titel.
  - **Rückgabewert**: `void`

- **clear()**: Löscht den Titel und die Fehlermeldung.
  - **Rückgabewert**: `void`

- **validate()**: Validiert das Titel-Eingabefeld, indem überprüft wird, ob der Titel eingegeben wurde.
  - **Rückgabewert**: `boolean` - Gibt `true` zurück, wenn der Titel gültig ist, andernfalls `false`.

## Props
Keine Props werden verwendet.

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **input-container**: Container für das Eingabefeld des Titels.
- **input**: Stil für das Textfeld, in dem der Titel eingegeben wird.
- **error-message**: Stil für die Fehlermeldung, die angezeigt wird, wenn der Titel nicht ausgefüllt ist.

## Weitere Hinweise
- Das Eingabefeld prüft, ob der Titel eingegeben wurde. Wenn nicht, wird eine Fehlermeldung angezeigt.
- Der Titel wird auf eine maximale Länge von 30 Zeichen begrenzt.

---
