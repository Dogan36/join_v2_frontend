---
sidebar_position: 2
---

# Sign Up Form

## Beschreibung
Die `SignUp`-Komponente ermöglicht es Benutzern, ein Konto zu erstellen, indem sie ihre persönlichen Daten wie Name, E-Mail-Adresse und Passwort eingeben. Zusätzlich müssen sie der Datenschutzrichtlinie zustimmen, um den Registrierungsprozess abzuschließen. Das Formular führt eine Validierung durch und zeigt Fehler an, wenn Eingaben fehlen oder ungültig sind.

## Struktur
- **form-header**: Der Header des Formulars mit einem Titel und einer Rückwärtspfeil-Option.
  - **h1**: Zeigt den Titel "Sign Up".
  - **go-back**: Ein Pfeil, der den Benutzer zurückführt.

- **form**: Das Registrierungsformular, in dem Benutzer ihren Namen, ihre E-Mail-Adresse und ihr Passwort eingeben.
  - **InputField** für den Namen.
  - **InputField** für die E-Mail-Adresse.
  - **InputField** für das Passwort.
  - **InputField** für die Bestätigung des Passworts.

- **signup-options**: Eine Checkbox für die Zustimmung zur Datenschutzrichtlinie.
  - **error-message**: Zeigt eine Fehlermeldung, wenn die Datenschutzrichtlinie nicht akzeptiert wurde.

- **login-buttons**: Der Container für die "Sign Up"-Schaltfläche.

## Funktionen und Methoden
- **goBack**: Schließt das Modal und kehrt zur vorherigen Ansicht zurück.
  - **Rückgabewert**: `void`

- **showPrivacyPolicy**: Zeigt die Datenschutzrichtlinie an.
  - **Rückgabewert**: `void`

- **signUp**: Registriert einen neuen Benutzer mit dem angegebenen Namen, E-Mail und Passwort.
  - **Parameter**: `name` (`string`) - Der vollständige Name des Benutzers.
  - **Parameter**: `email` (`string`) - Die E-Mail-Adresse des Benutzers.
  - **Parameter**: `password` (`string`) - Das Passwort des Benutzers.
  - **Rückgabewert**: `void`

- **trySignup**: Überprüft, ob die Eingabefelder korrekt sind, und führt dann die Registrierung aus.
  - **Rückgabewert**: `void`

- **resetErrors**: Setzt alle Fehler-Statusfelder zurück.
  - **Rückgabewert**: `void`

- **checkForErrors**: Validiert die Eingabefelder und prüft auf Fehler.
  - **Rückgabewert**: `boolean` - `true`, wenn Fehler existieren, andernfalls `false`

- **checkIfNameEmpty**: Überprüft, ob das Namensfeld leer ist und setzt das Fehler-Flag.
  - **Rückgabewert**: `boolean` - `true`, wenn der Name nicht leer ist, andernfalls `false`

- **checkIfEmailEmpty**: Überprüft, ob das E-Mail-Feld leer ist und setzt das Fehler-Flag.
  - **Rückgabewert**: `boolean` - `true`, wenn die E-Mail nicht leer ist, andernfalls `false`

- **checkEmailFormat**: Validiert das Format der E-Mail.
  - **Rückgabewert**: `boolean` - `true`, wenn das E-Mail-Format korrekt ist, andernfalls `false`

- **checkEmailDatabase**: Überprüft, ob die E-Mail bereits in der Datenbank vorhanden ist.
  - **Rückgabewert**: `boolean` - `true`, wenn die E-Mail einzigartig ist, andernfalls `false`

- **checkIfPasswordEmpty**: Überprüft, ob das Passwort-Feld leer ist und setzt das Fehler-Flag.
  - **Rückgabewert**: `boolean` - `true`, wenn das Passwort nicht leer ist, andernfalls `false`

- **checkPasswordLength**: Überprüft, ob das Passwort die Mindestlänge von 6 Zeichen erfüllt.
  - **Rückgabewert**: `boolean` - `true`, wenn das Passwort lang genug ist, andernfalls `false`

- **checkIfPasswordRepeatEmpty**: Überprüft, ob das Passwort-Wiederholen-Feld leer ist und setzt das Fehler-Flag.
  - **Rückgabewert**: `boolean` - `true`, wenn das Wiederholen nicht leer ist, andernfalls `false`

- **checkIfPasswordsMatch**: Überprüft, ob die Passwörter übereinstimmen.
  - **Rückgabewert**: `boolean` - `true`, wenn die Passwörter übereinstimmen, andernfalls `false`

- **checkPrivacyAccepted**: Überprüft, ob die Datenschutzrichtlinie akzeptiert wurde.
  - **Rückgabewert**: `boolean` - `true`, wenn die Datenschutzrichtlinie akzeptiert wurde, andernfalls `false`

## Props
- Keine spezifischen Props.

## Computed Properties
- Keine speziellen Computed Properties.

## Events
- **toggle**: Wird ausgelöst, um das Modal für die Registrierung anzuzeigen oder zu schließen.
- **privacyPolicy**: Wird ausgelöst, um die Datenschutzrichtlinie anzuzeigen.

## Stil
- **form-header**: Der Header des Formulars mit einem Rückwärtspfeil.
- **form**: Das Formular zur Eingabe der persönlichen Daten.
- **signup-options**: Eine Checkbox für die Zustimmung zur Datenschutzrichtlinie.
- **login-buttons**: Der Container für den "Sign Up"-Button.

## Weitere Hinweise
- Es wird überprüft, ob die E-Mail-Adresse bereits in der Datenbank vorhanden ist. Wenn ja, wird eine Fehlermeldung angezeigt.
