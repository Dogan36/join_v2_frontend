# Share Joining Code

## Beschreibung
Die `ShareJoiningCode`-Komponente ermöglicht es Benutzern, einen Beitrittscode für einen Workspace zu kopieren oder per E-Mail zu versenden. Benutzer können den Code direkt kopieren oder die E-Mail-Adresse eines Empfängers eingeben, um den Code zu teilen.

## Struktur
- **workspace-info-overlay**: Der Hauptcontainer der Overlay-Komponente.
  - **workspace-info-header**: Enthält das Header-Bild und die Überschrift.
  - **workspace-info-main**: Der Hauptinhalt des Modals, der die Eingabefelder und die Schaltflächen enthält.
    - **copy-code**: Der Bereich zum Kopieren des Beitrittscodes. Zeigt den Code an und ermöglicht es, ihn zu kopieren.
    - **input-container**: Ein Eingabefeld, um die E-Mail-Adresse für das Versenden des Codes einzugeben.
    - **button-container**: Der Bereich für die Schaltflächen zum Senden oder Schließen des Modals.

## Funktionen und Methoden
- **trySend**: Versucht, eine Einladung per E-Mail zu senden, indem die E-Mail-Adresse und der Workspace-Beitrittscode überprüft werden.
  - **Rückgabewert**: `void`
  
- **resetErrors**: Setzt alle Fehlermeldungen zurück, die während der Eingabevalidierung angezeigt werden.
  - **Rückgabewert**: `void`
  
- **checkForErrors**: Validiert die eingegebene E-Mail-Adresse. Wenn die E-Mail ungültig oder leer ist, wird eine Fehlermeldung gesetzt.
  - **Rückgabewert**: `boolean` - Gibt `true` zurück, wenn Fehler gefunden wurden, andernfalls `false`.
  
- **close**: Schließt das Modal, indem das "close"-Event ausgelöst wird.
  - **Rückgabewert**: `void`
  
- **copyToClipboard**: Kopiert den Beitrittscode des Workspaces in die Zwischenablage und zeigt eine Bestätigungsmeldung an.
  - **Rückgabewert**: `void`

## Props
- **error**: Ein Flag, das anzeigt, ob ein Fehler vorliegt.
  - **Typ**: `Boolean`
  
- **currentWorkspace**: Der aktuelle Workspace mit dem Beitrittscode.
  - **Typ**: `Object`
  
- **shareCodeEmail**: Die E-Mail-Adresse, an die der Code gesendet werden soll.
  - **Typ**: `String`

## Computed Properties
- **copyToClipboardText**: Der Text, der auf dem "Copy to Clipboard"-Button angezeigt wird.
  - **Rückgabewert**: `String`

## Events
- **close**: Wird ausgelöst, um das Modal zu schließen.

## Stil
- **workspace-info-overlay**: Der Hauptcontainer des Overlays.
- **workspace-info-header**: Der Header-Bereich mit dem Logo und der Überschrift.
- **workspace-info-main**: Der Bereich, der die Eingabefelder und Schaltflächen enthält.
- **copy-code**: Der Bereich, der es Benutzern ermöglicht, den Beitrittscode zu kopieren.
- **error-message**: Der Bereich, in dem Fehlermeldungen angezeigt werden.

## Weitere Hinweise
- Der Beitrittscode kann kopiert oder per E-Mail versendet werden, indem die E-Mail-Adresse des Empfängers eingegeben wird.
