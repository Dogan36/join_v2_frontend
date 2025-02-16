# Forgot Password Form

## Beschreibung
Die `Forgot Password`-Komponente ermöglicht es Benutzern, ihre E-Mail-Adresse einzugeben, um einen Link zum Zurücksetzen ihres Passworts anzufordern. Bei erfolgreicher Anforderung wird eine Bestätigung angezeigt, andernfalls werden Fehler wie ungültige E-Mail oder nicht vorhandene E-Mail im System angezeigt.

## Struktur
- **form-header**: Der Header des Formulars mit einem "Zurück"-Pfeil und der Überschrift "I forgot my password".
  - **go-back**: Ein Pfeilsymbol, das den Benutzer zurückführt.
  - **h1**: Zeigt die Überschrift "I forgot my password".
  - **subheader**: Zeigt eine kurze Beschreibung, dass der Benutzer seine E-Mail-Adresse eingeben soll, um einen Passwort-Reset-Link zu erhalten.

- **form**: Das Formular, in dem der Benutzer seine E-Mail-Adresse eingeben kann.
  - **InputField**: Ein Eingabefeld für die E-Mail-Adresse mit einer validierungsabhängigen Fehleranzeige.
  - **login-buttons**: Der Container für den Submit-Button des Formulars.

## Funktionen und Methoden
- **goBack**: Schließt das Modal und kehrt zur vorherigen Ansicht zurück.
  - **Rückgabewert**: `void`

- **requestPasswordReset**: Sendet eine Anfrage zur Zurücksetzung des Passworts mit der eingegebenen E-Mail-Adresse.
  - **Parameter**: `email` (`string`) - Die E-Mail-Adresse, die für den Passwort-Reset verwendet wird.
  - **Rückgabewert**: `void`

- **tryRequest**: Überprüft die Validierung der E-Mail-Adresse und sendet die Passwort-Reset-Anfrage, wenn keine Fehler auftreten.
  - **Rückgabewert**: `void`

- **resetErrors**: Setzt alle Fehlerstatus zurück.
  - **Rückgabewert**: `void`

- **checkForErrors**: Überprüft, ob Fehler in der E-Mail-Adresse vorliegen (z.B., leeres Feld oder falsches Format).
  - **Rückgabewert**: `boolean` - `true` bei Fehlern, `false` bei keinem Fehler.

- **checkIfEmailEmpty**: Überprüft, ob das E-Mail-Feld leer ist.
  - **Rückgabewert**: `boolean` - `true` wenn das E-Mail-Feld leer ist, andernfalls `false`.

- **checkEmailFormat**: Validiert das Format der eingegebenen E-Mail-Adresse.
  - **Rückgabewert**: `boolean` - `true` wenn das Format korrekt ist, andernfalls `false`.

## Props
- Keine spezifischen Props.

## Computed Properties
- Keine speziellen Computed Properties.

## Events
- **close**: Wird verwendet, um das Modal zu schließen.

## Stil
- **form-header**: Der Header des Formulars.
- **go-back**: Ein Pfeil, der den Benutzer zurückführt.
- **form**: Das Formular zur Eingabe der E-Mail-Adresse.
- **login-buttons**: Der Container für den Absende-Button.

## Weitere Hinweise
- Fehlerbehandlung wird für leere E-Mail-Felder, ungültige E-Mail-Formate und nicht vorhandene E-Mails durchgeführt.
