# ContactsList Component

## Beschreibung
Die `ContactsListComponent` zeigt eine Liste von Kontakten an, die nach dem ausgewählten Filter kategorisiert werden können. Es gibt drei Filteroptionen:
- **All Contacts**: Zeigt alle Kontakte an.
- **Own Contacts**: Zeigt nur die eigenen Kontakte an.
- **Workspace Members**: Zeigt nur die Mitglieder des aktuellen Workspaces an.

Die Kontakte werden nach dem ersten Buchstaben ihres Namens gruppiert, und es gibt eine Option zum Hinzufügen eines neuen Kontakts.

## Struktur
- **contacts-list**: Der Container für die gesamte Liste von Kontakten.
  - **dropdown-contacts**: Ein Dropdown-Menü zur Auswahl des Filters (alle Kontakte, eigene Kontakte, Workspace-Mitglieder).
  - **main-button-layout contact-list-add-new-contact**: Schaltfläche zum Hinzufügen eines neuen Kontakts.
  - **letter-section**: Enthält die Kontakte, gruppiert nach dem ersten Buchstaben ihres Namens.
    - **letter-separator**: Der Trennheader für jede Gruppe.
    - **ContactslistCard**: Eine Karte für jeden Kontakt, die Kontaktinformationen anzeigt.
  - **emptyMessage**: Zeigt eine Nachricht an, wenn keine Kontakte den ausgewählten Filter erfüllen.

## Funktionen und Methoden
- **emitSelectedContact**: Gibt das ausgewählte Kontaktobjekt an das Parent-Component weiter.
  - **Parameter**: `contact` - Das ausgewählte Kontaktobjekt.
  - **Rückgabewert**: `void`

## Computed Properties
- **combinedContacts**: Kombiniert und filtert die Liste der Kontakte und Mitglieder basierend auf dem ausgewählten Filter.
  - **Rückgabewert**: `Array` - Eine kombinierte Liste der Kontakte, die nach dem aktuellen Filter ausgewählt wurden.
  
- **groupedContacts**: Gruppiert die Kontakte nach dem ersten Buchstaben des Namens.
  - **Rückgabewert**: `Object` - Ein Objekt, das die Kontakte nach den Buchstaben des Namens gruppiert und alphabetisch sortiert.

- **isEmpty**: Überprüft, ob die Liste der Kontakte leer ist.
  - **Rückgabewert**: `boolean` - `true`, wenn keine Kontakte vorhanden sind, andernfalls `false`.

- **emptyMessage**: Zeigt eine entsprechende Nachricht an, wenn keine Kontakte für den aktuellen Filter vorhanden sind.
  - **Rückgabewert**: `string` - Eine Nachricht, die dem Benutzer anzeigt, dass keine Kontakte verfügbar sind.

## Props
- Keine spezifischen Props für diese Komponente.

## Events
- **@openOverlay**: Wird ausgelöst, wenn der Benutzer das Overlay zum Erstellen eines neuen Kontakts öffnen möchte.
- **updateContact**: Wird ausgelöst, wenn der Benutzer einen Kontakt aus der Liste auswählt.

## Stil
- **contacts-list**: Der Container, der die gesamte Kontaktliste enthält.
- **letter-section**: Der Bereich, in dem Kontakte gruppiert und angezeigt werden.
- **emptyMessage**: Stil für die Nachricht, die angezeigt wird, wenn keine Kontakte verfügbar sind.

## Weitere Hinweise
- Die Kontakte können gefiltert werden, um nur die eigenen Kontakte oder Mitglieder des aktuellen Workspaces anzuzeigen.
- Die Kontakte werden nach dem ersten Buchstaben des Namens gruppiert, um die Navigation zu erleichtern.
- Das Hinzufügen neuer Kontakte wird durch ein externes Overlay gesteuert, das durch die `openOverlay`-Methode geöffnet wird.

