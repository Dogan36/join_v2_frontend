# Create Workspace Component

## Beschreibung
Die `CreateWorkspace`-Komponente ermöglicht es einem Benutzer, einen neuen Workspace zu erstellen, indem er einen Namen für den Workspace eingibt. Die Komponente zeigt ein Eingabefeld, eine Fehlernachricht bei ungültiger Eingabe und Buttons zum Erstellen oder Abbrechen des Workspaces.

## Struktur
- **workspace-info-overlay**: Der Container für das Modal, das die gesamte Benutzeroberfläche für die Workspace-Erstellung enthält.
  - **workspace-info-header**: Der Header-Bereich, der das Logo und die Überschrift „Create New Workspace“ anzeigt.
  - **workspace-info-main**: Der Hauptbereich, in dem das Eingabefeld für den Workspace-Namen und die Schaltflächen zum Erstellen oder Abbrechen des Workspaces angezeigt werden.
    - **input-container**: Ein Container für das Eingabefeld, das den Namen des neuen Workspaces entgegennimmt.
    - **error-message**: Zeigt eine Fehlermeldung an, wenn der Benutzer keine gültige Eingabe gemacht hat.
    - **button-container**: Beinhaltet zwei Schaltflächen: eine zum Erstellen des Workspaces und eine zum Abbrechen der Aktion.

## Methoden
- **submitNewWorkspace**: Diese Methode überprüft, ob der eingegebene Workspace-Name gültig ist. Falls ja, wird die `createWorkspace`-Funktion aufgerufen, um den neuen Workspace zu erstellen. Bei einem Fehler wird eine entsprechende Fehlermeldung angezeigt.
- **close**: Schließt das Modal zur Workspace-Erstellung.

## Validierung
- **newWorkspaceName**: Das Eingabefeld für den Workspace-Namen wird validiert, um sicherzustellen, dass es nicht leer ist.
- **Fehlermeldungen**: Wenn das Eingabefeld leer ist, wird die Fehlermeldung „The workspace name is required“ angezeigt.

## Events
- **close**: Wird verwendet, um das Modal zu schließen, wenn der Benutzer die Erstellung des Workspaces abgeschlossen hat oder abbricht.

## API-Aufruf
- Die Methode `createWorkspace` sendet eine `POST`-Anfrage an die API, um den neuen Workspace zu erstellen:
  - Endpoint: `/workspaces/`
  - Methode: `POST`
  - Body: `{ name: "new-workspace-name" }`

## Stil
- **workspace-info-overlay**: Der Hauptcontainer für das Modal.
- **input-container**: Der Container für das Eingabefeld, das den Workspace-Namen aufnimmt.
- **button-container**: Der Container für die Schaltflächen zum Erstellen und Abbrechen des Workspaces.
