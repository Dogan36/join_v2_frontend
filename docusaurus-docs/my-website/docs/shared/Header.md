# Header

## Beschreibung
Die `Header`-Komponente ist der Kopfbereich der Anwendung. Sie zeigt das Logo, den Titel der Anwendung und das Benutzermenü an. Das Benutzermenü enthält Optionen wie „Profil“, „Workspace“, „Logout“ und ist mit einer Funktion zum Schließen nach einer kurzen Verzögerung versehen.

## Struktur
- **header**: Der Hauptcontainer für den Header.
  - **logo-header-mobile**: Das Logo der Anwendung.
  - **header-headline**: Der Titel der Anwendung.
  - **header-user-profil**: Der Bereich, der das Benutzerprofil darstellt.
    - **header-user-profil-icon**: Ein Icon, das den Benutzer zu einer Hilfeseite weiterleitet.
    - **header-user-profil-initials**: Zeigt die Initialen des Benutzers an, wenn er im System angemeldet ist.

## Funktionen und Methoden
- **toggleUserMenu**: Wechselt die Sichtbarkeit des Benutzer-Menüs.
  - **Rückgabewert**: `void`
  
- **onUserMenuMouseEnter**: Verhindert das automatische Schließen des Benutzer-Menüs, wenn die Maus darüber fährt.
  - **Rückgabewert**: `void`
  
- **onUserMenuMouseLeave**: Startet einen Timer, um das Benutzer-Menü nach 2 Sekunden zu schließen, wenn die Maus das Menü verlässt.
  - **Rückgabewert**: `void`
  
- **closeUserMenu**: Schließt das Benutzer-Menü.
  - **Rückgabewert**: `void`
  
- **logout**: Meldet den Benutzer ab, entfernt die Token aus dem `localStorage` und leitet auf die Startseite weiter.
  - **Rückgabewert**: `void`
  
- **changeView**: Ändert die Ansicht der Anwendung, basierend auf dem übergebenen View-Namen.
  - **Rückgabewert**: `void`

## Props
- **currentUser**: Das aktuell angemeldete Benutzerobjekt.
  - **Typ**: `Object`
  - **Erforderlich**: `true`
  
## Computed Properties
- **showUserMenu**: Bestimmt, ob das Benutzer-Menü sichtbar ist.
  - **Rückgabewert**: `boolean`

## Events
- **select**: Wird ausgelöst, wenn das Benutzer-Menü geöffnet oder geschlossen wird.

## Stil
- **header**: Der Container für die gesamte Kopfzeile.
- **logo-header-mobile**: Das Logo der Anwendung im Header.
- **header-headline**: Der Titel der Anwendung im Header.
- **header-user-profil**: Der Bereich im Header, der die Benutzerinformationen und das Benutzer-Menü enthält.
- **header-user-profil-icon**: Das Icon, das beim Klicken den Benutzer zu einer Hilfeseite führt.
- **header-user-profil-initials**: Zeigt die Initialen des Benutzers an.

## Weitere Hinweise
- Das Benutzer-Menü wird nach einer kurzen Verzögerung automatisch geschlossen, wenn der Benutzer nicht interagiert. Das Menü kann jedoch auch manuell geschlossen werden.
