---
sidebar_position: 1
---

# Login Form

## Beschreibung
Die `Login`-Komponente ermöglicht Benutzern, sich mit ihrer E-Mail-Adresse und ihrem Passwort anzumelden. Bei erfolgreichem Login werden die Benutzerdaten gespeichert, und der Benutzer wird zur Startseite weitergeleitet. Fehler wie ungültige E-Mail oder falsches Passwort werden behandelt und dem Benutzer angezeigt.

## Struktur
- **form-header**: Der Header des Formulars mit einem Titel und einer Rückwärtspfeil-Option.
  - **h1**: Zeigt den Titel "Login".
  - **go-back**: Ein Pfeil, der den Benutzer zurückführt.

- **form**: Das Login-Formular, in dem Benutzer ihre E-Mail-Adresse und ihr Passwort eingeben.
  - **InputField** für die E-Mail-Adresse.
  - **InputField** für das Passwort.
  - **login-options**: Optionen zum Speichern der Login-Daten (Checkbox für "Remember me") und für das Zurücksetzen des Passworts.

- **login-buttons**: Die Container für die Login- und Gast-Login-Schaltflächen.

## Funktionen und Methoden
- **goBack**: Schließt das Modal und kehrt zur vorherigen Ansicht zurück.
  - **Rückgabewert**: `void`

- **forgotPassword**: Zeigt das Modal für die Passwort-Wiederherstellung an.
  - **Rückgabewert**: `void`

- **login**: Versucht, sich mit der angegebenen E-Mail und dem Passwort anzumelden.
  - **Parameter**: `email` (`string`) - Die E-Mail-Adresse des Benutzers.
  - **Parameter**: `password` (`string`) - Das Passwort des Benutzers.
  - **Rückgabewert**: `void`

- **tryLogin**: Überprüft, ob die Eingabefelder korrekt sind, und führt die Anmeldung aus.
  - **Rückgabewert**: `void`

- **resetErrors**: Setzt alle Fehler-Statusfelder zurück.
  - **Rückgabewert**: `void`

- **checkForErrors**: Validiert die E-Mail und das Passwort und prüft, ob Fehler vorliegen.
  - **Rückgabewert**: `boolean` - `true`, wenn Fehler existieren, andernfalls `false`

- **checkIfEmailEmpty**: Überprüft, ob das E-Mail-Feld leer ist.
  - **Rückgabewert**: `boolean` - `true`, wenn das E-Mail-Feld leer ist, andernfalls `false`

- **checkEmailFormat**: Validiert das E-Mail-Format.
  - **Rückgabewert**: `boolean` - `true`, wenn das E-Mail-Format korrekt ist, andernfalls `false`

- **checkIfPasswordEmpty**: Überprüft, ob das Passwort-Feld leer ist.
  - **Rückgabewert**: `boolean` - `true`, wenn das Passwort-Feld leer ist, andernfalls `false`

- **checkPasswordLength**: Validiert die Mindestlänge des Passworts (6 Zeichen).
  - **Rückgabewert**: `boolean` - `true`, wenn das Passwort die Mindestlänge erfüllt, andernfalls `false`

- **guestLogin**: Loggt einen Gastbenutzer mit vordefinierten Anmeldedaten ein.
  - **Rückgabewert**: `void`

## Props
- Keine spezifischen Props.

## Computed Properties
- Keine speziellen Computed Properties.

## Events
- **toggleForgotPassword**: Wird ausgelöst, um das Modal für die Passwort-Wiederherstellung anzuzeigen.

## Stil
- **form-header**: Der Header des Formulars mit einem Rückwärtspfeil.
- **form**: Das Formular zur Eingabe der E-Mail-Adresse und des Passworts.
- **login-options**: Optionen für das Speichern von Anmeldedaten und das Zurücksetzen des Passworts.
- **login-buttons**: Der Container für die Anmeldebuttons.

## Weitere Hinweise
- Fehlerbehandlung erfolgt für leere Felder, falsches Passwort oder ungültige E-Mail-Adresse.
