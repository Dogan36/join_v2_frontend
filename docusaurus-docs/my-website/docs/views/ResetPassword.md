# Password Reset

## Beschreibung
Die `PasswordReset`-Komponente ermöglicht es Benutzern, ihr Passwort zurückzusetzen, indem sie die erforderlichen Felder ausfüllen. Diese Komponente ist für den Fall gedacht, dass ein Benutzer den "Passwort vergessen"-Prozess durchläuft.

## Struktur
- **Wrapper**: Der Container, der alle Inhalte umschließt.
- **Logo**: Ein Bereich, der das Logo der Anwendung anzeigt.
- **FormLayout**: Das Layout, das das Formular für die Passwortzurücksetzung enthält.
  - **Form Header**: Enthält den Titel "Reset your password".
  - **InputField für Passwort**: Ein Eingabefeld für das neue Passwort.
  - **InputField für Passwort Bestätigung**: Ein Eingabefeld zur Bestätigung des neuen Passworts.
  - **Buttons**: Ein Button zum Absenden des Formulars (Bestätigen).

## Funktionalität
- **resetPassword**: Das neue Passwort, das der Benutzer eingibt.
- **resetPasswordRepeat**: Das bestätigte Passwort, das der Benutzer eingibt.
- **Validation**: Vor der Rücksetzung des Passworts wird überprüft, ob die eingegebenen Werte den Anforderungen entsprechen (Passwortlänge, Übereinstimmung der Passwörter).
- **Error States**: Es gibt verschiedene Fehlermeldungen:
  - `passwordError`: Zeigt einen Fehler an, wenn das Passwort leer ist.
  - `passwordLengthError`: Zeigt einen Fehler an, wenn das Passwort weniger als 6 Zeichen enthält.
  - `passwordMatchError`: Zeigt einen Fehler an, wenn das Passwort und die Bestätigung nicht übereinstimmen.

## Methoden
- **tryReset**: Diese Methode wird aufgerufen, wenn das Formular abgeschickt wird. Sie prüft, ob alle Fehlerzustände zurückgesetzt sind und ob die Validierung erfolgreich war. Wenn alle Validierungen bestehen, wird die `performResetPassword`-Methode aufgerufen.
- **performResetPassword**: Diese Methode sendet eine Anfrage an den Server, um das Passwort zurückzusetzen, und zeigt eine Bestätigung an, wenn der Vorgang erfolgreich war.
- **resetErrors**: Setzt alle Fehlerzustände zurück.
- **checkForErrors**: Überprüft, ob Fehler im Passwort und der Passwortwiederholung vorliegen.
- **checkIfPasswordEmpty**: Überprüft, ob das Passwortfeld leer ist.
- **checkPasswordLength**: Überprüft, ob das Passwort mindestens 6 Zeichen lang ist.
- **checkIfPasswordRepeatEmpty**: Überprüft, ob das Bestätigungs-Passwortfeld leer ist.
- **checkIfPasswordsMatch**: Überprüft, ob das eingegebene Passwort und das Bestätigungspasswort übereinstimmen.

## Props und Bindungen
- **v-model für resetPassword und resetPasswordRepeat**: Bindet die Eingabewerte der Felder an die entsprechenden Variablen.
- **icon für die Passworteingabefelder**: Zeigt ein Passwort-Symbol an.
- **Error Messages**: Zeigt Fehlernachrichten basierend auf den Fehlerzuständen an.

## Weitere Hinweise
- **Routing**: Die `uid` und der `token` werden aus der URL geholt, um die Anfrage zur Passwortzurücksetzung zu personalisieren.
- **Loading und Bestätigung**: Ein Loading-Overlay wird angezeigt, während die Passwortzurücksetzung verarbeitet wird, und eine Bestätigungsmeldung wird angezeigt, wenn der Vorgang abgeschlossen ist.

