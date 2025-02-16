# Leave Workspace Component

## Beschreibung
Die `LeaveWorkspace`-Komponente ermöglicht es einem Benutzer, entweder einen Workspace zu verlassen oder ihn zu löschen, wenn er der Besitzer des Workspaces ist. Der Benutzer wird gefragt, ob er sicher ist, den Workspace zu verlassen oder zu löschen.

## Struktur
- **workspace-info-overlay**: Der Hauptcontainer für das Overlay.
  - **workspace-info-header**: Der Header-Bereich, der das Logo und eine Information über die Aktion enthält.
  - **workspace-info-main**: Der Bereich mit der Bestätigungsnachricht und den Schaltflächen zum Verlassen oder Löschen des Workspaces.

## Funktionen und Methoden
- **confirmDelete**: Bestätigt und führt das Löschen des aktuellen Workspaces aus.
  - **Rückgabewert**: `void`
  
- **confirmLeave**: Bestätigt und führt das Verlassen des aktuellen Workspaces aus.
  - **Rückgabewert**: `void`
  
- **close**: Schließt das Modal.
  - **Rückgabewert**: `void`

## Props
- **currentWorkspace**: Der aktuelle Workspace, aus dem der Benutzer entweder austreten oder den Workspace löschen möchte.
  - **Typ**: `Object`
  - **Erforderlich**: `true`

- **currentUser**: Der aktuelle Benutzer, der den Workspace verlässt oder löscht.
  - **Typ**: `Object`
  - **Erforderlich**: `true`

## Computed Properties
- Keine spezifischen Computed Properties in dieser Komponente.

## Events
- **close**: Wird ausgelöst, um das Modal zu schließen.
- **setActiveModal**: Wird verwendet, um das Modal auf den aktiven Zustand zu setzen.

## Stil
- **workspace-info-overlay**: Der Container für das Overlay.
- **workspace-info-header**: Der Header des Modals.
- **workspace-info-main**: Der Hauptbereich des Modals, das die Bestätigung und Schaltflächen enthält.
- **button-container**: Der Bereich mit den Schaltflächen zum Bestätigen oder Abbrechen der Aktion.

## Weitere Hinweise
- Wenn der Benutzer der Besitzer des Workspaces ist, wird er gewarnt, dass das Löschen des Workspaces ihn permanent entfernt.
