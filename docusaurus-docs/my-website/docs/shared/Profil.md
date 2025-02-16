# Profil Information

## Beschreibung
Die `Profil Information Modal`-Komponente zeigt die Profilinformationen des aktuellen Benutzers an und bietet die Möglichkeit, diese zu bearbeiten oder das Passwort zu ändern. Es können zwei weitere Modal-Dialoge aufgerufen werden: eines zum Bearbeiten des Profils und eines zum Ändern des Passworts.

## Struktur
- **workspace-info-overlay**: Der Container, der das gesamte Modal enthält.
  - **workspace-info-header**: Zeigt den Header mit dem Titel und einer kurzen Beschreibung.
  - **workspace-info-main**: Der Bereich, der die Profilinformationen (Name, E-Mail, Telefonnummer) anzeigt.
  - **button-container**: Beinhaltet die Schaltflächen für "Profil bearbeiten", "Passwort ändern" und "Schließen".
  
## Funktionen und Methoden
- **close**: Schließt das aktuelle Modal.
  - **Rückgabewert**: `void`
  
- **setActiveModal**: Setzt das aktuelle aktive Modal.
  - **Rückgabewert**: `void`
  - **Parameter**: `modalName` (`string`) - Der Name des Modals, das aktiviert werden soll (z.B. 'editProfil' oder 'changePassword').

## Props
- Keine spezifischen Props in dieser Komponente.

## Computed Properties
- **activeModal**: Verfolgt das aktuell aktive Modal.
  - **Rückgabewert**: `string` - Der Name des aktuellen Modals (z.B. 'profilInfo', 'editProfil', 'changePassword').

## Events
- **setActiveModal**: Wird verwendet, um das aktuell angezeigte Modal zu wechseln. Wird an die `EditProfil`- und `ChangePassword`-Komponenten weitergegeben.
- **close**: Wird ausgelöst, wenn das Modal geschlossen werden soll.

## Stil
- **workspace-info-overlay**: Der Hauptcontainer für das Modal.
- **workspace-info-header**: Der Header des Modals, der den Titel und die Beschreibung enthält.
- **workspace-info-main**: Der Abschnitt, der die Profilinformationen anzeigt.
- **button-container**: Der Bereich mit den Schaltflächen zum Bearbeiten des Profils, Ändern des Passworts und Schließen.

## Weitere Hinweise
- Das Modal enthält Schaltflächen zum Wechseln zwischen dem Profilbearbeitungsmodus und der Passwortänderung.
