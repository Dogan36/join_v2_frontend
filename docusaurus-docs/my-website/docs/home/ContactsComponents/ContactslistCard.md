# Contactslist Card

## Beschreibung
Die `ContactslistCard`-Komponente zeigt die Details eines einzelnen Kontakts an, einschließlich des Namens, der E-Mail-Adresse und eines Avatars. Zusätzlich wird das Kontaktbild angezeigt, wenn der Kontakt Mitglied ist. Wenn die Karte aktiviert wird, wird ein Event ausgelöst, um den Kontakt als ausgewählt zu markieren.

## Struktur
- **contacts-list-card**: Der Container für die Kontaktkarte. Wird aktiviert, wenn der Kontakt ausgewählt ist (`active`-Klasse).
  - **avatar**: Zeigt das Avatar des Kontakts an. Der Hintergrund wird basierend auf der Farbe des Kontakts angepasst.
  - **info**: Zeigt den Namen und die E-Mail-Adresse des Kontakts an.
  - **contact-image**: Wird nur angezeigt, wenn der Kontakt Mitglied ist. Zeigt das Logo des Join-Tools an.

## Funktionen und Methoden
- **getTextColor**: Bestimmt die Textfarbe für den Kontakt, abhängig von der Hintergrundfarbe.
  - **Rückgabewert**: `string` - Der Textfarbwert basierend auf der Hintergrundfarbe des Kontakts.

## Props
- **contact**: Ein Objekt, das die Details des Kontakts enthält (z. B. Name, E-Mail, Avatar, Farbe).
  - **Typ**: `Object`
- **isActive**: Ein Boolean-Wert, der angibt, ob der Kontakt aktiv ist.
  - **Typ**: `Boolean`

## Events
- **select**: Wird ausgelöst, wenn der Benutzer auf die Kontaktkarte klickt. Der Kontakt wird als ausgewählt markiert.
  - **Parameter**: `contact` - Der ausgewählte Kontakt.
  - **Rückgabewert**: `void`

## Stil
- **contacts-list-card**: Der äußere Container der Kontaktkarte, der bei Auswahl eine `active`-Klasse erhält.
- **avatar**: Das Avatar des Kontakts mit einer Hintergrundfarbe basierend auf der Kontaktfarbe.
- **info**: Der Bereich, der den Namen und die E-Mail-Adresse des Kontakts anzeigt.
- **contact-image**: Zeigt das Logo des Join-Tools an, wenn der Kontakt ein Mitglied ist.

## Weitere Hinweise
- Die `active`-Klasse wird angewendet, wenn der Kontakt aktiv ist, und ändert das Aussehen der Karte.
- Das Event `select` wird beim Klicken auf die Karte ausgelöst, um den Kontakt als ausgewählt an das Parent-Component weiterzugeben.

