# Contacts Service

## Beschreibung
Das `ContactsService`-Modul enthält Funktionen zum Verwalten von Kontakten auf dem Server. Es ermöglicht das Abrufen, Hinzufügen, Aktualisieren und Löschen von Kontakten.

## Struktur

### Reaktive Werte
- **getToken()**: Ruft das gespeicherte Authentifizierungs-Token des Benutzers aus `localStorage` ab.
  - **Typ**: `Function`
  - **Rückgabewert**: `string | null`

---

## Funktionen

### fetchContacts()
Lädt alle gespeicherten Kontakte des Benutzers vom Server.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API.
3. Falls erfolgreich, gibt es eine Liste von Kontakten zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Array<Object>>`
- **Fehlermeldung**: `"Error fetching contacts: ${response.statusText}"`

---

### addContactFetch(contact)
Fügt einen neuen Kontakt hinzu.

#### Parameter:
- `contact` (`Object`): Die Daten des neuen Kontakts.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `POST`-Anfrage an die API mit den Kontaktdaten.
3. Falls erfolgreich, gibt es das erstellte Kontaktobjekt zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error adding contact: ${response.statusText}"`

---

### updateContactFetch(contact, contactId)
Aktualisiert einen bestehenden Kontakt.

#### Parameter:
- `contact` (`Object`): Die aktualisierten Daten des Kontakts.
- `contactId` (`number`): Die ID des zu aktualisierenden Kontakts.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `PUT`-Anfrage an die API mit den neuen Kontaktdaten.
3. Falls erfolgreich, gibt es das aktualisierte Kontaktobjekt zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen, die detaillierte Fehlerdaten enthält.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error updating contact: ${response.statusText} - ${JSON.stringify(errorData)}"`

---

### deleteContactFetch(contactId)
Löscht einen bestehenden Kontakt.

#### Parameter:
- `contactId` (`number`): Die ID des zu löschenden Kontakts.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `DELETE`-Anfrage an die API.
3. Falls erfolgreich, wird nichts zurückgegeben.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<void>`
- **Fehlermeldung**: `"Error deleting contact: ${response.statusText}"`

---

## Abhängigkeiten
- **API_BASE_URL**: Die Basis-URL für API-Anfragen.
- **getToken()**: Holt das gespeicherte Token für die API-Authentifizierung.

---

## Beispiel für die Verwendung:
```javascript
import { fetchContacts, addContactFetch, updateContactFetch, deleteContactFetch } from "@/services/contactsService";

// Kontakte abrufen
fetchContacts()
  .then(contacts => console.log(contacts))
  .catch(error => console.error(error));

// Neuen Kontakt hinzufügen
const newContact = { name: "Max Mustermann", email: "max@example.com" };
addContactFetch(newContact)
  .then(contact => console.log("Kontakt hinzugefügt:", contact))
  .catch(error => console.error(error));

// Kontakt aktualisieren
const updatedContact = { name: "Max Muster", email: "max.muster@example.com" };
updateContactFetch(updatedContact, 1)
  .then(contact => console.log("Kontakt aktualisiert:", contact))
  .catch(error => console.error(error));

// Kontakt löschen
deleteContactFetch(1)
  .then(() => console.log("Kontakt gelöscht"))
  .catch(error => console.error(error));

```