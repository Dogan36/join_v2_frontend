# PrioButtons Component

## Beschreibung
Diese Komponente ermöglicht es dem Benutzer, die Priorität einer Aufgabe auszuwählen. Die verfügbaren Prioritäten sind "Urgent", "Medium" und "Low". Die Priorität wird durch Schaltflächen dargestellt, die durch Farben und Icons visuell hervorgehoben werden. Der Benutzer kann auf die Schaltflächen klicken, um die Priorität zu ändern. Der ausgewählte Wert wird an die Elternkomponente über ein Event übergeben.

## Struktur
- **input-container**: Container für das Eingabefeld zur Priorität.
- **prio-buttons**: Container für die Prioritätsschaltflächen.
  - **prio-button**: Jede Schaltfläche stellt eine Prioritätsoption dar:
    - **Urgent**: Rote Schaltfläche für hohe Priorität.
    - **Medium**: Gelbe Schaltfläche für mittlere Priorität.
    - **Low**: Grüne Schaltfläche für niedrige Priorität.
  - Jede Schaltfläche zeigt das entsprechende Icon und ändert die Hintergrundfarbe und Textfarbe, je nachdem, ob sie ausgewählt ist.
- **error-message**: Zeigt eine Fehlermeldung an (falls erforderlich).

## Funktionen und Methoden
- **updatePrio(newPrio)**: Aktualisiert die aktuelle Priorität und gibt den neuen Wert an die Elternkomponente weiter.
  - **Parameter**: `newPrio` (string) - Der neue Prioritätswert, der auf "high", "medium" oder "low" gesetzt wird.
  - **Rückgabewert**: `void`

- **clear()**: Setzt die Priorität auf "medium" zurück.
  - **Rückgabewert**: `void`

## Props
- **modelValue**: Der initiale Prioritätswert, der standardmäßig auf "medium" gesetzt wird.
  - **Typ**: `String`
  - **Standardwert**: `'medium'`

## Events
- **@update:modelValue**: Wird ausgelöst, wenn die Priorität geändert wird. Der neue Prioritätswert wird als Argument übergeben.

## Stil
- **input-container**: Container für das Prioritätsfeld.
- **prio-buttons**: Stil für den Container, der die Prioritätsschaltflächen hält.
- **prio-button**: Stil für jede der Prioritätsschaltflächen. Jede Schaltfläche hat eine Hintergrundfarbe und ein Icon, das je nach Priorität geändert wird.
  - **img**: Stil für das Icon in der Schaltfläche.
  - **span**: Stil für den Text in der Schaltfläche.

## Weitere Hinweise
- Die Schaltflächen ändern ihre Hintergrundfarbe und das Icon, um die aktuell ausgewählte Priorität zu visualisieren.
- Beim Klicken auf eine Schaltfläche wird die `updatePrio`-Methode aufgerufen, die die neue Priorität setzt und das `modelValue`-Event auslöst.


---
