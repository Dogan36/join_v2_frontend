# Contacts Component

## Beschreibung
Diese Komponente zeigt eine Liste von Kontakten sowie deren Detailansicht an. Auf mobilen Geräten wird zwischen der Kontaktliste und der Detailansicht basierend auf der Auswahl des Kontakts umgeschaltet. Es gibt auch ein Overlay zur Bearbeitung von Kontaktdaten.

## Struktur
- **Contactslist**: Zeigt die Liste der Kontakte an, die der Benutzer auswählen kann.
- **ContactMainContent**: Zeigt die Detailansicht des ausgewählten Kontakts an.
- **ContactOverlay**: Ein Overlay, das für die Bearbeitung oder Anzeige der Kontaktdetails verwendet wird.
- **DarkBackground**: Wird angezeigt, wenn das Overlay sichtbar ist, um den Hintergrund abzudunkeln.

## Funktionen und Methoden
- **setActiveContact(contact)**: Setzt den aktiven Kontakt, der in der Detailansicht angezeigt wird.
  - **Parameter**: `contact` (Object) - Der Kontakt, der als aktiv gesetzt wird.
  - **Rückgabewert**: `void`

- **openOverlay(isEditMode)**: Öffnet das Overlay für die Anzeige oder Bearbeitung eines Kontakts.
  - **Parameter**: `isEditMode` (Boolean) - Gibt an, ob das Overlay im Bearbeitungsmodus oder im Anzeigemodus geöffnet wird.
  - **Rückgabewert**: `void`

- **closeOverlay()**: Schließt das Kontakt-Overlay.
  - **Rückgabewert**: `void`

## Berechnete Eigenschaften (Computed Properties)
- **showMainContent**: Bestimmt, ob die Hauptansicht (Kontakt-Detailansicht) angezeigt werden soll. Auf mobilen Geräten wird die Hauptansicht nur angezeigt, wenn ein Kontakt ausgewählt wurde.
  - **Rückgabewert**: Boolean - `true`, wenn die Hauptansicht angezeigt werden soll, andernfalls `false`.

- **showList**: Bestimmt, ob die Kontaktliste angezeigt werden soll. Auf mobilen Geräten wird die Kontaktliste ausgeblendet, wenn ein Kontakt ausgewählt wurde.
  - **Rückgabewert**: Boolean - `true`, wenn die Kontaktliste angezeigt werden soll, andernfalls `false`.

## Events
- **@updateContact**: Wird ausgelöst, wenn ein Kontakt aus der Liste ausgewählt wird.
- **@openOverlay**: Wird ausgelöst, wenn das Overlay geöffnet wird, entweder im Bearbeitungs- oder Anzeigemodus.
- **@close**: Wird ausgelöst, wenn das Overlay geschlossen wird.

## Stil
Die Komponente verwendet benutzerdefinierte CSS-Klassen für das Layout und die visuelle Darstellung, einschließlich flexibler Anordnung und mobiler Optimierungen.

## Weitere Hinweise
- Auf mobilen Geräten wird die Kontaktliste ausgeblendet, wenn ein Kontakt ausgewählt wird, um Platz für die Detailansicht zu schaffen.
- Das Kontakt-Overlay ermöglicht sowohl die Anzeige als auch die Bearbeitung der Kontaktdaten, je nach Modus.
