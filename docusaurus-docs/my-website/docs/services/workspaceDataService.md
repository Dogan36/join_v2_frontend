# WorkspaceData Service

## Beschreibung
Das `WorkspaceDataService`-Modul enthält Funktionen zum Abrufen von workspace-spezifischen Daten, einschließlich Aufgaben (Tasks) und Kategorien.

## Struktur

### Reaktive Werte
- **getToken()**: Ruft das gespeicherte Authentifizierungs-Token des Benutzers aus `localStorage` ab.
  - **Typ**: `Function`
  - **Rückgabewert**: `string | null`

---

## Funktionen

### fetchTasks(workspaceId)
Lädt alle gespeicherten Aufgaben (Tasks) eines spezifischen Workspaces.

#### Parameter:
- `workspaceId` (`number`): Die ID des Workspaces, aus dem die Aufgaben abgerufen werden sollen.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API mit der Workspace-ID.
3. Falls erfolgreich, gibt es eine Liste von Aufgaben zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Array<Object>>`
- **Fehlermeldung**: `"Failed to fetch tasks: ${response.statusText}"`

---

### fetchCategories(workspaceId)
Lädt alle gespeicherten Kategorien eines spezifischen Workspaces.

#### Parameter:
- `workspaceId` (`number`): Die ID des Workspaces, aus dem die Kategorien abgerufen werden sollen.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API mit der Workspace-ID.
3. Falls erfolgreich, gibt es eine Liste von Kategorien zurück.

#### Rückgabewert:
- **Typ**: `Promise<Array<Object>>`

---

## Abhängigkeiten
- **API_BASE_URL**: Die Basis-URL für API-Anfragen.
- **getToken()**: Holt das gespeicherte Token für die API-Authentifizierung.

---

## Beispiel für die Verwendung:
```javascript
import { fetchTasks, fetchCategories } from "@/services/workspaceDataService";

// Aufgaben eines Workspaces abrufen
fetchTasks(1)
  .then(tasks => console.log("Tasks:", tasks))
  .catch(error => console.error(error));

// Kategorien eines Workspaces abrufen
fetchCategories(1)
  .then(categories => console.log("Categories:", categories))
  .catch(error => console.error(error));
```