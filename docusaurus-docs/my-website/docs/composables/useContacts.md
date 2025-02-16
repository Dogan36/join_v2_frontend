# useContacts

## Beschreibung
Das `useContacts`-Composable bietet eine Sammlung von Funktionen zur Verwaltung von Kontakten. Dies umfasst das Abrufen, Hinzufügen, Aktualisieren und Löschen von Kontakten. Es verwendet `useLoadingOverlay` zur Anzeige von Ladeanzeigen und `useConfirmationOverlay` zur Anzeige von Bestätigungsnachrichten.

## Struktur
- **contacts**: Ein reaktives Array, das die Liste der Kontakte speichert.
  - **Typ**: `Array<Object>`

- **selectedContact**: Ein reaktiver Wert, der den aktuell ausgewählten Kontakt speichert.
  - **Typ**: `Object | null`

- **contactOverlayIsEditMode**: Ein reaktiver Wert, der den Bearbeitungsmodus für das Kontaktformular steuert (editieren oder hinzufügen).
  - **Typ**: `boolean`

- **contactOverlayIsVisible**: Ein reaktiver Wert, der die Sichtbarkeit des Kontaktformulars steuert.
  - **Typ**: `boolean`

## Funktionen

- **loadContacts**: Lädt die Kontakte vom Server und aktualisiert die lokale Liste der Kontakte. Während des Ladevorgangs wird eine Ladeanzeige angezeigt.
  - **Rückgabewert**: `Promise<void>`

- **saveContact**: Speichert einen Kontakt, entweder durch Hinzufügen eines neuen Kontakts oder durch Aktualisieren eines bestehenden Kontakts.
  - **Parameter**:
    - `contact` (Object): Das Kontaktobjekt, das gespeichert werden soll.
  - **Rückgabewert**: `Promise<void>`

- **addContact**: Fügt einen neuen Kontakt hinzu und aktualisiert die lokale Kontaktliste. Zeigt eine Bestätigungsmeldung an, wenn der Kontakt erfolgreich hinzugefügt wurde.
  - **Parameter**:
    - `contact` (Object): Das Kontaktobjekt, das hinzugefügt werden soll.
  - **Rückgabewert**: `Promise<void>`

- **updateContact**: Aktualisiert einen bestehenden Kontakt und die lokale Kontaktliste. Zeigt eine Bestätigungsmeldung an, wenn der Kontakt erfolgreich aktualisiert wurde.
  - **Parameter**:
    - `contact` (Object): Das Kontaktobjekt mit den aktualisierten Informationen.
  - **Rückgabewert**: `Promise<void>`

- **deleteContact**: Löscht den ausgewählten Kontakt und entfernt ihn aus der lokalen Kontaktliste. Zeigt eine Bestätigungsmeldung an, wenn der Kontakt erfolgreich gelöscht wurde.
  - **Rückgabewert**: `Promise<void>`

## Abhängigkeiten
- **useLoadingOverlay**: Wird verwendet, um die Ladeanzeige während der Anfrage anzuzeigen.
- **useConfirmationOverlay**: Wird verwendet, um eine Bestätigungsmeldung nach erfolgreicher Aktion anzuzeigen.
- **fetchContacts**: Eine Funktion aus `contactsService`, um die Kontakte vom Server abzurufen.
- **addContactFetch**: Eine Funktion aus `contactsService`, um einen neuen Kontakt zu erstellen.
- **updateContactFetch**: Eine Funktion aus `contactsService`, um einen bestehenden Kontakt zu aktualisieren.
- **deleteContactFetch**: Eine Funktion aus `contactsService`, um einen Kontakt zu löschen.

## Beispiel für die Verwendung:
```javascript
import useContacts from "@/composables/useContacts";

const { contacts, loadContacts, saveContact, selectedContact, deleteContact } = useContacts();

// Kontakte laden
loadContacts();

// Einen neuen Kontakt speichern
saveContact({ name: 'John Doe', email: 'john@example.com' });

// Einen Kontakt löschen
deleteContact();
