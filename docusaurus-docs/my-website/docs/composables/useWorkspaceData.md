# useWorkspaceData

## Beschreibung
Das `useWorkspaceData`-Composable lädt und verwaltet Daten für den aktuellen Workspace, einschließlich Aufgaben (Tasks), Mitglieder und Kategorien. Es ruft diese Daten über API-Requests ab und speichert sie im globalen Zustand.

## Struktur

### Reaktive Werte
- **tasks**: Eine Liste der im aktuellen Workspace vorhandenen Aufgaben.
  - **Typ**: `Array<Object>`

- **members**: Eine Liste der Mitglieder des aktuellen Workspaces.
  - **Typ**: `Array<Object>`

- **categories**: Eine Liste der im Workspace definierten Kategorien.
  - **Typ**: `Array<Object>`

- **currentWorkspace**: Enthält den aktuell ausgewählten Workspace.
  - **Typ**: `Object | null`

## Funktionen

### loadWorkspaceData()
Lädt die aktuellen Daten des Workspaces, einschließlich:
- **Tasks** (`fetchTasks`)
- **Mitglieder** (werden aus `currentWorkspace.value.members` übernommen)
- **Kategorien** (`fetchCategories`)

#### Ablauf:
1. Prüft, ob ein Workspace ausgewählt wurde (`currentWorkspace.value !== null`).
2. Ruft `fetchTasks` mit der Workspace-ID auf und speichert das Ergebnis in `tasks.value`.
3. Setzt `members.value` auf die Mitglieder des aktuellen Workspaces.
4. Ruft `fetchCategories` mit der Workspace-ID auf und speichert das Ergebnis in `categories.value`.

#### Rückgabewert:
- **Typ**: `Promise<void>`

## Abhängigkeiten
- **fetchTasks()**: Holt Aufgaben für den aktuellen Workspace von der API.
- **fetchCategories()**: Holt die Kategorien für den aktuellen Workspace von der API.
- **currentWorkspace**: Enthält den aktuell gewählten Workspace.
- **tasks, members, categories**: Globale State-Variablen aus `@/store/state`.

## Beispiel für die Verwendung
```javascript
import useWorkspaceData from "@/composables/useWorkspaceData";

const { loadWorkspaceData, tasks, members, categories } = useWorkspaceData();

// Daten für den aktuellen Workspace laden
loadWorkspaceData();

```

