# Description Component

## Beschreibung
Diese Komponente ermöglicht es dem Benutzer, eine Beschreibung für eine Aufgabe einzugeben. Sie enthält ein Textarea-Eingabefeld für die Beschreibung und zeigt eine Fehlermeldung an, wenn die Eingabe ungültig ist.

## Struktur
- **input-container**: Container für das Eingabefeld der Beschreibung.
  - **label**: Beschriftung für das Eingabefeld ("Description").
  - **textarea**: Ein Textarea-Feld, in dem der Benutzer die Beschreibung eingibt.
  - **error-message**: Zeigt eine Fehlermeldung an, wenn die Eingabe ungültig ist.

## Funktionen und Methoden
- **setDescription(value)**: Setzt die Beschreibung auf den angegebenen Wert.
  - **Parameter**: `value` (string) - Der neue Wert für die Beschreibung.
  - **Rückgabewert**: `void`

- **clear()**: Löscht die Beschreibung und die Fehlermeldung.
  - **Rückgabewert**: `void`

## Props
Keine Props werden verwendet.

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **input-container**: Container für das Textarea-Feld.
- **textarea**: Stil für das Textarea-Eingabefeld.
- **error-message**: Stil für die Fehlermeldung, die angezeigt wird, wenn die Eingabe ungültig ist.

## Weitere Hinweise
- Die Beschreibung wird als Text in einem `textarea`-Feld eingegeben. 

