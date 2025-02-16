# Workspace Service

## Beschreibung
Das `WorkspaceService`-Modul enthält Funktionen zur Verwaltung von Workspaces, einschließlich Abrufen, Erstellen, Verlassen, Löschen und Einladen von Mitgliedern.

## Struktur

### Reaktive Werte
- **getToken()**: Ruft das gespeicherte Authentifizierungs-Token des Benutzers aus `localStorage` ab.
  - **Typ**: `Function`
  - **Rückgabewert**: `string | null`

---

## Funktionen

### fetchWorkspaceById(workspaceId)
Lädt ein spezifisches Workspace-Objekt anhand seiner ID.

#### Parameter:
- `workspaceId` (`number`): Die ID des Workspaces, der abgerufen werden soll.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API mit der Workspace-ID.
3. Falls erfolgreich, gibt es das Workspace-Objekt zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error fetching workspace: ${response.statusText}"`

---

### fetchFirstWorkspace()
Lädt den ersten verfügbaren Workspace für den aktuellen Benutzer.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API, um den ersten Workspace des Benutzers abzurufen.
3. Falls erfolgreich, gibt es den Workspace zurück.
4. Falls kein Workspace existiert oder ein Fehler auftritt, wird `null` zurückgegeben.

#### Rückgabewert:
- **Typ**: `Promise<Object | null>`
- **Fehlermeldung**: Falls kein Workspace vorhanden ist, wird `null` zurückgegeben.

---

### fetchWorkspaces()
Lädt alle verfügbaren Workspaces für den Benutzer.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `GET`-Anfrage an die API.
3. Falls erfolgreich, gibt es eine Liste von Workspaces zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Array<Object>>`
- **Fehlermeldung**: `"Error fetching workspaces: ${response.statusText}"`

---

### createWorkspace(name)
Erstellt einen neuen Workspace.

#### Parameter:
- `name` (`string`): Der Name des neuen Workspaces.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `POST`-Anfrage an die API mit dem Namen des neuen Workspaces.
3. Falls erfolgreich, gibt es das erstellte Workspace-Objekt zurück.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error creating workspace: ${response.statusText}"`

---

### leaveWorkspace(token, workspaceId)
Ermöglicht dem Benutzer, einen Workspace zu verlassen.

#### Parameter:
- `token` (`string`): Das Authentifizierungs-Token des Benutzers.
- `workspaceId` (`number`): Die ID des Workspaces, den der Benutzer verlassen möchte.

#### Ablauf:
1. Sendet eine `POST`-Anfrage an die API mit der `workspace_id`.
2. Falls erfolgreich, bestätigt die API das Verlassen des Workspaces.
3. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error leaving workspace: ${response.status}"`

---

### deleteWorkspace(token, workspaceId)
Löscht einen Workspace.

#### Parameter:
- `token` (`string`): Das Authentifizierungs-Token des Benutzers.
- `workspaceId` (`number`): Die ID des Workspaces, der gelöscht werden soll.

#### Ablauf:
1. Sendet eine `DELETE`-Anfrage an die API mit der `workspace_id`.
2. Falls erfolgreich, bestätigt die API das Löschen des Workspaces.
3. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error deleting workspace: ${response.statusText}"`

---

### invitePerEmail(email, join_code)
Sendet eine Einladung per E-Mail mit einem Join-Code.

#### Parameter:
- `email` (`string`): Die E-Mail-Adresse des eingeladenen Benutzers.
- `join_code` (`string`): Der Join-Code für den Workspace.

#### Ablauf:
1. Ruft das gespeicherte Token über `getToken()` ab.
2. Sendet eine `POST`-Anfrage an die API mit der E-Mail-Adresse und dem Join-Code.
3. Falls erfolgreich, bestätigt die API den Versand der Einladung.
4. Falls ein Fehler auftritt, wird eine Exception geworfen.

#### Rückgabewert:
- **Typ**: `Promise<Object>`
- **Fehlermeldung**: `"Error inviting user: ${response.statusText}"`

---

## Abhängigkeiten
- **API_BASE_URL**: Die Basis-URL für API-Anfragen.
- **getToken()**: Holt das gespeicherte Token für die API-Authentifizierung.

---

## Beispiel für die Verwendung:
```javascript
import { fetchWorkspaces, createWorkspace, leaveWorkspace } from "@/services/workspaceService";

// Workspaces abrufen
fetchWorkspaces()
  .then(workspaces => console.log("Workspaces:", workspaces))
  .catch(error => console.error(error));

// Neuen Workspace erstellen
createWorkspace("New Workspace")
  .then(newWorkspace => console.log("Created:", newWorkspace))
  .catch(error => console.error(error));

// Einen Workspace verlassen
leaveWorkspace("user-token", 123)
  .then(() => console.log("Successfully left workspace"))
  .catch(error => console.error(error));
