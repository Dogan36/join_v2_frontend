# Change Password Component

## Beschreibung
Die `ChangePassword`-Komponente ermöglicht es einem Benutzer, sein Passwort zu ändern. Sie bietet Felder zur Eingabe des alten Passworts, eines neuen Passworts und einer Bestätigung des neuen Passworts. Die Komponente enthält Validierungen für die Eingabefelder und zeigt Fehlernachrichten an, wenn die Eingaben ungültig sind.

## Struktur
- **workspace-info-overlay**: Der Hauptcontainer für die Passwortänderungskomponente.
  - **workspace-info-header**: Der Header-Bereich, der das Logo und die Überschrift „Change Password“ anzeigt.
  - **workspace-info-main**: Der Bereich, in dem das Formular zur Passwortänderung enthalten ist, mit Feldern für das alte und neue Passwort sowie die Bestätigung des neuen Passworts.
    - **InputField**: Ein benutzerdefiniertes Eingabefeld-Komponent zur Erfassung der Benutzereingaben (altes Passwort, neues Passwort, Bestätigung des neuen Passworts).
    - **form-buttons**: Die Schaltflächen zum Absenden des Formulars oder zum Abbrechen der Aktion.

## Fehlerstatus
- **oldPasswordError**: Fehlerstatus, wenn das alte Passwort fehlt.
- **newPasswordError**: Fehlerstatus, wenn das neue Passwort fehlt.
- **newPasswordRepeatError**: Fehlerstatus, wenn das neue Passwort zur Bestätigung nicht angegeben ist.
- **passwordMatchError**: Fehlerstatus, wenn das neue Passwort und das Bestätigungspasswort nicht übereinstimmen.
- **oldPasswordLengthError**: Fehlerstatus, wenn das alte Passwort weniger als 6 Zeichen hat.
- **newPasswordLengthError**: Fehlerstatus, wenn das neue Passwort weniger als 6 Zeichen hat.
- **oldPasswordIncorrectError**: Fehlerstatus, wenn das eingegebene alte Passwort falsch ist.

## Methoden
- **changePassword**: Diese Methode führt die Validierung der Passwortfelder durch und sendet eine Anfrage an den Server, um das Passwort zu ändern.
- **resetPasswordErrors**: Setzt alle Fehlerflags für die Passwortfelder zurück.
- **checkForPasswordErrors**: Überprüft alle Passwortfelder auf Fehler und gibt `true` zurück, wenn Fehler vorhanden sind.
- **checkIfOldPasswordEmpty**: Überprüft, ob das alte Passwortfeld leer ist.
- **checkIfNewPasswordEmpty**: Überprüft, ob das neue Passwortfeld leer ist.
- **checkIfNewPasswordRepeatEmpty**: Überprüft, ob das Bestätigungspasswort leer ist.
- **checkOldPasswordLength**: Überprüft, ob das alte Passwort mindestens 6 Zeichen lang ist.
- **checkNewPasswordLength**: Überprüft, ob das neue Passwort mindestens 6 Zeichen lang ist.
- **checkIfPasswordsMatch**: Überprüft, ob das neue Passwort und das Bestätigungspasswort übereinstimmen.
- **close**: Schließt das Modal zur Passwortänderung.

## Events
- **setActiveModal**: Wird verwendet, um das Modal zu schließen und den Zustand zu aktualisieren.

## API-Aufruf
- Die Methode `changePassword` sendet eine `POST`-Anfrage an die API, um das Passwort des Benutzers zu ändern:
  - Endpoint: `/user/change-password/`
  - Methode: `POST`
  - Body: `{ oldPassword: "old-password", newPassword: "new-password" }`

## Validierung
- Alle Felder (altes Passwort, neues Passwort, Bestätigung des neuen Passworts) werden auf Vorhandensein und Mindestlänge überprüft.
- Das neue Passwort und das Bestätigungspasswort müssen übereinstimmen.
- Es gibt spezifische Fehlernachrichten für jedes Fehlerfeld (z. B. „Das alte Passwort ist erforderlich“, „Passwort muss mindestens 6 Zeichen lang sein“).

## Stil
- **workspace-info-overlay**: Der Hauptcontainer, der das Modal für die Passwortänderung enthält.
- **input-container**: Container für die Eingabefelder.
- **form-buttons**: Container für die Schaltflächen zum Absenden und Abbrechen der Aktion.
