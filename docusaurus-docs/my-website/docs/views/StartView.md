---
sidebar_position: 1
---
# Start View

## Beschreibung
Die `StartView`-Komponente zeigt beim Starten der Anwendung den Login-, Signup- und Passwortzurücksetzungsprozess an. Je nachdem, ob der Benutzer eingeloggt ist oder nicht, werden die entsprechenden Ansichten angezeigt. Sie unterstützt die Animation des Logos beim Start und den Übergang zwischen den verschiedenen Ansichten.

## Struktur
- **Wrapper**: Der Container, der alle Komponenten und Elemente umfasst.
  - **Logo-Container**: Zeigt das animierte Logo beim Laden der Seite an.
  - **Login-Komponente**: Wird angezeigt, wenn der Benutzer sich einloggen möchte.
  - **Signup-Komponente**: Wird angezeigt, wenn der Benutzer ein Konto erstellen möchte.
  - **ForgotPassword-Komponente**: Wird angezeigt, wenn der Benutzer das Passwort zurücksetzen möchte.
  - **Not-a-user-Bereich**: Zeigt die Option an, sich zu registrieren, wenn der Benutzer sich im Login-Modus befindet.
- **Privacy-Links**: Zeigt Links zu den Datenschutzrichtlinien und dem Impressum an.

## Funktionen und Methoden
- **startAnimation**: Kontrolliert, wann die Animation des Logos beginnt.
- **animationFinished**: Markiert, wann die Animation abgeschlossen ist.
  
### Methoden
- **toggleSignup**: Wechsel zwischen der Login- und Signup-Ansicht.
  - **Rückgabewert**: `void` – Keine Rückgabe. Ändert den Zustand von `isLogin` und `isSignup`.
  
- **toggleForgotPassword**: Wechsel zwischen der Login- und Passwortzurücksetzungsansicht.
  - **Rückgabewert**: `void` – Keine Rückgabe. Ändert den Zustand von `isLogin` und `isForgotPassword`.

- **checkIfUserIsLoggedIn**: Überprüft, ob der Benutzer bereits eingeloggt ist.
  - **Rückgabewert**: `void` – Keine Rückgabe. Wenn der Benutzer eingeloggt ist, wird der Benutzer zur Home-Seite weitergeleitet.

- **goToPrivacyPolicy**: Öffnet die Datenschutzrichtlinie in einem neuen Tab.
  - **Rückgabewert**: `void` – Keine Rückgabe. Öffnet die Datenschutzseite in einem neuen Browser-Tab.

## Props
- **Keine Props** – Diese Komponente verwendet keine externen Props, sondern steuert die internen Zustände durch lokale Variablen und Methoden.

## Computed Properties
- **isLogin**: Gibt an, ob die Login-Ansicht angezeigt wird.
  - **Typ**: `boolean`
  
- **isSignup**: Gibt an, ob die Signup-Ansicht angezeigt wird.
  - **Typ**: `boolean`

- **isForgotPassword**: Gibt an, ob die Passwortzurücksetzungs-Ansicht angezeigt wird.
  - **Typ**: `boolean`

## Fehlerbehandlung
- **Keine Fehlerbehandlung auf View-Ebene** – Fehler wie ungültige Eingaben werden in den jeweiligen Form-Komponenten (z. B. Login, Signup) behandelt.

## Weiteres
- **Animation**: Die Logo-Animation läuft beim Start der Seite und endet, wenn die Benutzeranmeldung überprüft wurde.
- **Weiterleitung**: Wenn der Benutzer bereits eingeloggt ist, wird er automatisch zur `home`-Seite weitergeleitet.

