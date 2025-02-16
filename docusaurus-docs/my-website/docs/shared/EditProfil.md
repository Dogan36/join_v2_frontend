# Edit Profile Component

## Beschreibung
Die `EditProfile`-Komponente ermöglicht es Benutzern, ihre Profilinformationen zu bearbeiten, einschließlich ihres Namens, ihrer E-Mail-Adresse und ihrer Telefonnummer. Sie stellt ein Formular zur Verfügung, das validiert wird, bevor die Änderungen gespeichert werden. Der Benutzer wird bei erfolgreicher Aktualisierung benachrichtigt.

## Struktur
- **workspace-info-overlay**: Der Hintergrund, der das gesamte Modal umgibt und es überlagert.
  - **workspace-info-content**: Der Hauptcontainer für den Modal-Inhalt.
    - **workspace-info-header**: Der Kopfbereich des Modals, der den Titel und eine kurze Beschreibung enthält.
    - **workspace-info-main**: Der Hauptinhalt des Modals, der das Formular zur Bearbeitung des Profils enthält.
      - **input-container**: Ein Container für die Eingabefelder, in denen der Benutzer seine Informationen eingibt.
        - **InputField**: Mehrere `InputField`-Komponenten, die für die Eingabe des Namens, der E-Mail-Adresse und der Telefonnummer verwendet werden.
      - **button-container**: Ein Container mit zwei Schaltflächen:
        - **Save**: Speichert die Änderungen.
        - **Cancel**: Schließt das Modal ohne Änderungen.

## Methoden
- **updateProfile**: Aktualisiert das Benutzerprofil, wenn das Formular keine Fehler enthält. Sendet die geänderten Daten an die API und aktualisiert das Profil des Benutzers.
- **resetProfilErrors**: Setzt alle Fehlerzustände für das Profil zurück.
- **checkForProfilErrors**: Überprüft das Profilformular auf Fehler und gibt `true` zurück, wenn Fehler vorhanden sind.
- **checkIfNameEmpty**: Überprüft, ob das Namensfeld leer ist.
- **checkIfEmailEmpty**: Überprüft, ob das E-Mail-Feld leer ist.
- **checkEmailFormat**: Validiert das E-Mail-Format.
- **close**: Schließt das Modal, ohne Änderungen zu speichern.

## Events
- **setActiveModal**: Wird ausgelöst, wenn das Modal geschlossen wird. Das Event signalisiert der übergeordneten Komponente, dass der Modal geschlossen werden soll.

## Verwendung
Die `EditProfile`-Komponente wird verwendet, um das Profil des Benutzers zu bearbeiten. Sie zeigt ein Formular an, das den Namen, die E-Mail-Adresse und die Telefonnummer des Benutzers enthält. Fehler in der Eingabe werden validiert und dem Benutzer angezeigt.
