# useWorkspaces

## Beschreibung
Das `useWorkspaces`-Composable verwaltet Workspaces, einschließlich Laden, Erstellen, Wechseln, Verlassen und Löschen von Workspaces. Zudem ermöglicht es das Versenden von Einladungen per E-Mail.

## Struktur

### Reaktive Werte
- **currentWorkspace**: Der aktuell ausgewählte Workspace.
  - **Typ**: `Object | null`

- **workspaces**: Eine Liste aller verfügbaren Workspaces des Benutzers.
  - **Typ**: `Array<Object>`

- **currentUser**: Der aktuell angemeldete Benutzer.
  - **Typ**: `Object | null`

- **token**: Das Authentifizierungs-Token des Benutzers.
  - **Typ**: `string | null`

## Funktionen

### loadWorkspaces()
Lädt alle verfügbaren Workspaces des Benutzers und bestimmt den initialen Workspace.

#### Ablauf:
1. Prüft, ob ein Token vorhanden ist.
2. Ruft `fetchWorkspaces()` auf und speichert das Ergebnis in `workspaces.value`.
3. Bestimmt den initialen Workspace (`determineInitialWorkspace`).

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### determineInitialWorkspace()
Bestimmt den initialen Workspace für den Benutzer.

#### Ablauf:
1. Prüft, ob ein Token vorhanden ist.
2. Prüft, ob eine `currentWorkspaceId` in `localStorage` gespeichert ist.
3. Falls eine gespeicherte ID existiert, wird versucht, diesen Workspace zu laden.
4. Falls nicht, wird der erste verfügbare Workspace geladen (`fetchFirstWorkspace()`).

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### loadCurrentWorkspace(workspaceId)
Lädt einen spezifischen Workspace anhand seiner ID.

#### Parameter:
- `workspaceId` (`number`): Die ID des zu ladenden Workspaces.

#### Ablauf:
1. Ruft `fetchWorkspaceById(workspaceId)` auf.
2. Falls der Workspace existiert, wird er als `currentWorkspace` gesetzt.
3. Falls nicht, wird eine Warnung ausgegeben.

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### createWorkspace(name)
Erstellt einen neuen Workspace und setzt ihn als `currentWorkspace`.

#### Parameter:
- `name` (`string`): Der Name des neuen Workspaces.

#### Ablauf:
1. Ruft `createWorkspaceAPI(name)` auf.
2. Fügt den neuen Workspace zur `workspaces`-Liste hinzu.
3. Setzt `currentWorkspace` auf den neuen Workspace.
4. Zeigt eine Bestätigungsmeldung (`showConfirmation`).

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### changeWorkspace(workspace)
Wechselt den aktuellen Workspace.

#### Parameter:
- `workspace` (`Object`): Das neue Workspace-Objekt.

#### Ablauf:
1. Setzt `currentWorkspace.value` auf den neuen Workspace.
2. Speichert die `currentWorkspaceId` in `localStorage`.
3. Lädt Workspace-Daten (`loadWorkspaceData`).
4. Zeigt eine Bestätigungsmeldung (`showConfirmation`).

#### Rückgabewert:
- **Typ**: `void`

---

### leaveWorkspace()
Lässt den Benutzer den aktuellen Workspace verlassen.

#### Ablauf:
1. Falls der Benutzer ein Gast in einem eingeschränkten Workspace ist, wird eine Fehlermeldung ausgegeben.
2. Falls nicht, wird `leaveWorkspaceAPI()` aufgerufen.
3. Zeigt eine Bestätigungsmeldung (`showConfirmation`).
4. Setzt `currentWorkspace` auf `null` und lädt die verfügbaren Workspaces neu.

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### deleteWorkspace()
Löscht den aktuellen Workspace.

#### Ablauf:
1. Falls der Benutzer ein Gast in einem eingeschränkten Workspace ist, wird eine Fehlermeldung ausgegeben.
2. Falls nicht, wird `deleteWorkspaceAPI()` aufgerufen.
3. Zeigt eine Bestätigungsmeldung (`showConfirmation`).
4. Setzt `currentWorkspace` auf `null` und lädt die verfügbaren Workspaces neu.

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

### invitePerEmail(email, join_code)
Versendet eine Einladung per E-Mail, um einem Workspace beizutreten.

#### Parameter:
- `email` (`string`): Die E-Mail-Adresse des Empfängers.
- `join_code` (`string`): Der Beitrittscode des Workspaces.

#### Ablauf:
1. Ruft `invitePerEmailAPI(email, join_code)` auf.
2. Zeigt eine Bestätigungsmeldung (`showConfirmation`).

#### Rückgabewert:
- **Typ**: `Promise<void>`

---

## Abhängigkeiten
- **fetchWorkspaces()**: Lädt die Workspaces des Benutzers.
- **fetchWorkspaceById()**: Holt einen Workspace anhand seiner ID.
- **fetchFirstWorkspace()**: Lädt den ersten verfügbaren Workspace.
- **createWorkspaceAPI()**: Erstellt einen neuen Workspace.
- **deleteWorkspaceAPI()**: Löscht einen Workspace.
- **leaveWorkspaceAPI()**: Lässt den Benutzer einen Workspace verlassen.
- **invitePerEmailAPI()**: Sendet eine E-Mail-Einladung für den Workspace.
- **useLoadingOverlay()**: Zeigt und versteckt Ladeanzeigen.
- **useConfirmationOverlay()**: Zeigt Bestätigungsnachrichten.

## Automatische Aktualisierung
Das Composable überwacht `currentWorkspace` und speichert Änderungen in `localStorage`.

---

## Beispiel für die Verwendung
```javascript
import useWorkspaces from "@/composables/useWorkspaces";

const {
  loadWorkspaces,
  createWorkspace,
  changeWorkspace,
  leaveWorkspace,
  deleteWorkspace,
  invitePerEmail
} = useWorkspaces();

// Workspaces laden
loadWorkspaces();

// Neuen Workspace erstellen
createWorkspace("Mein neuer Workspace");

// Workspace wechseln
changeWorkspace({ id: 5, name: "Design Team" });

// Aktuellen Workspace verlassen
leaveWorkspace();

// Aktuellen Workspace löschen
deleteWorkspace();

// Einladung per E-Mail versenden
invitePerEmail("test@example.com", "JOIN-CODE-123");
```