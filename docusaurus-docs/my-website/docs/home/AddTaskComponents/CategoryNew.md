# Category New Component

## Beschreibung
Diese Komponente ermöglicht es dem Benutzer, eine neue Kategorie zu erstellen, indem sie einen Namen und eine Farbe für die Kategorie auswählt. Die Komponente überprüft, ob der Name der neuen Kategorie gültig und einzigartig ist und ob die maximale Anzahl von Kategorien nicht überschritten wird. Nach der Validierung wird die neue Kategorie erstellt und zur Liste der Kategorien hinzugefügt.

## Struktur
- **input-container**: Container für das Eingabefeld der neuen Kategorie.
  - **input**: Ein Eingabefeld, in dem der Benutzer den Namen der neuen Kategorie eingibt. Es hat eine maximale Länge von 25 Zeichen.
  - **new-category-color**: Ein Farbfeld, das den Hintergrund der ausgewählten Farbe anzeigt.
  - **icon-container**: Enthält Symbole für das Schließen und Bestätigen der Kategorie.
- **color-container**: Container, der eine Auswahl von Farben anzeigt, die für die neue Kategorie verfügbar sind.
- **error-message**: Zeigt eine Fehlermeldung an, wenn der Benutzer eine ungültige Eingabe macht.

## Funktionen und Methoden
- **chooseColor(index)**: Wählt die Farbe aus der Liste der verfügbaren Farben basierend auf dem angegebenen Index aus.
  - **Parameter**: `index` (number) - Der Index der gewünschten Farbe in der Liste.
  - **Rückgabewert**: `void`

- **checkNewCategoryName()**: Überprüft, ob der Benutzer einen gültigen Namen für die neue Kategorie eingegeben hat.
  - **Rückgabewert**: `boolean` - `true`, wenn der Name gültig ist, andernfalls `false`.

- **checkCatgeoriesLength()**: Überprüft, ob die maximale Anzahl von 20 Kategorien erreicht wurde.
  - **Rückgabewert**: `boolean` - `true`, wenn weniger als 20 Kategorien existieren, andernfalls `false`.

- **checkCatgeoriesNameTaken()**: Überprüft, ob der Name der neuen Kategorie bereits von einer anderen Kategorie verwendet wird.
  - **Rückgabewert**: `boolean` - `true`, wenn der Name einzigartig ist, andernfalls `false`.

- **loadColors()**: Lädt die verfügbaren Farben aus der API und zeigt sie in der Auswahl an.
  - **Rückgabewert**: `Promise<void>` - Ein Promise, das aufgelöst wird, wenn die Farben erfolgreich geladen wurden.

- **fetchColors()**: Ruft die verfügbaren Farben von der API ab.
  - **Rückgabewert**: `Promise<Object[]|undefined>` - Ein Promise, das eine Liste der Farben zurückgibt.

- **addNewCategoryToList(createdCategory)**: Fügt die neu erstellte Kategorie der Liste der Kategorien hinzu und setzt sie als die aktuell ausgewählte Kategorie.
  - **Parameter**: `createdCategory` (Object) - Die neu erstellte Kategorie, einschließlich ihrer ID.
  - **Rückgabewert**: `void`

- **addNewCategory()**: Erstellt eine neue Kategorie, indem sie die Eingaben des Benutzers validiert und einen POST-Request an die API sendet. Bei Erfolg wird die Kategorie der lokalen Liste hinzugefügt.
  - **Rückgabewert**: `Promise<void>` - Ein Promise, das aufgelöst wird, wenn die neue Kategorie erfolgreich hinzugefügt wurde.

## Props
Keine Props werden verwendet.

## Events
- **@toggle**: Wird ausgelöst, um das Hinzufügen einer neuen Kategorie abzubrechen oder abzuschließen.

## Stil
- **input-container**: Container für das Eingabefeld und die Farbauswahl.
- **new-category-color**: Stil für das Farbfeld, das die ausgewählte Farbe anzeigt.
- **color-category-button**: Stil für jede der verfügbaren Farben zur Auswahl.
- **error-message**: Stil für die Fehlermeldung, die angezeigt wird, wenn die Eingabe ungültig ist.

## Weitere Hinweise
- Die Farbe für die neue Kategorie wird aus einer Liste verfügbarer Farben ausgewählt, die von der API abgerufen werden.
- Die Komponente stellt sicher, dass der Name der Kategorie eindeutig ist und dass die maximale Anzahl von Kategorien nicht überschritten wird.
- Die Farben werden zufällig angezeigt und auf maximal fünf Farben beschränkt.
