# Join Workspace Component

## Beschreibung
Die `JoinWorkspace`-Komponente ermöglicht es Benutzern, einem Workspace beizutreten, indem sie den zugehörigen Code eingeben. Der Benutzer kann den Code in ein Textfeld eingeben und den Beitrittsprozess abschließen.

## Struktur
- **workspace-info-overlay**: Der Hauptcontainer der Overlay-Komponente.
  - **workspace-info-header**: Der Header-Bereich, der das Logo und die Überschrift enthält.
  - **workspace-info-main**: Der Bereich, der die Eingabeaufforderung und die Schaltflächen enthält.
    - **input-container**: Das Eingabefeld, in das der Benutzer den Workspace-Code eingeben kann.
    - **button-container**: Der Bereich mit den Schaltflächen zum Absenden des Codes oder Schließen des Modals.

## Funktionen und Methoden
- **submitWorkspaceCode**: Versucht, den Workspace zu betreten, indem der eingegebene Code überprüft und verwendet wird.
  - **Rückgabewert**: `void`
  
- **close**: Schließt das Modal.
  - **Rückgabewert**: `void`
  
## Props
- **error**: Ein Flag, das anzeigt, ob ein Fehler beim Beitrittsversuch aufgetreten ist.
  - **Typ**: `Boolean`
  
- **workspaceCode**: Der Workspace-Code, der zur Anmeldung verwendet wird.
  - **Typ**: `String`

## Computed Properties
- Keine spezifischen Computed Properties in dieser Komponente.

## Events
- **close**: Wird ausgelöst, um das Modal zu schließen.

## Stil
- **workspace-info-overlay**: Der Container für das Overlay.
- **workspace-info-header**: Der Header des Modals.
- **workspace-info-main**: Der Hauptbereich des Modals, das das Eingabefeld und die Schaltflächen enthält.
- **input-container**: Der Bereich für das Eingabefeld zum Eingeben des Workspace-Codes.
- **button-container**: Der Bereich mit den Schaltflächen zum Absenden oder Schließen.

## Weitere Hinweise
- Wenn der Workspace-Code ungültig oder der Benutzer bereits Mitglied des Workspaces ist, wird eine Fehlermeldung angezeigt.
