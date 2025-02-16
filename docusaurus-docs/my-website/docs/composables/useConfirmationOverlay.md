# useConfirmationOverlay

## Beschreibung
Das `useConfirmationOverlay`-Composable stellt eine Bestätigungsanzeige zur Verfügung, die eine Nachricht anzeigt und diese nach einer festgelegten Dauer automatisch schließt. Es verwendet das `useLoadingOverlay`-Composable, um sicherzustellen, dass alle Ladeanzeigen vor der Bestätigungsanzeige ausgeblendet werden.

## Struktur
- **isConfirmationVisible**: Ein reaktiver Wert, der angibt, ob die Bestätigungsanzeige sichtbar ist.
  - **Typ**: `boolean`
  
- **confirmationMessage**: Der Text, der in der Bestätigungsanzeige angezeigt wird.
  - **Typ**: `string`

- **autoCloseTimer**: Ein Timer, um die automatische Schließung der Bestätigungsanzeige zu verwalten.
  - **Typ**: `number` (ID des Timers)

## Funktionen
- **showConfirmation**: Zeigt eine Bestätigungsnachricht an und schließt diese nach einer vordefinierten Dauer.
  - **Parameter**: 
    - `message` (string): Die Nachricht, die in der Bestätigungsanzeige angezeigt werden soll.
  - **Rückgabewert**: `void`

- **hideConfirmation**: Versteckt die Bestätigungsanzeige und setzt die Nachricht zurück.
  - **Rückgabewert**: `void`

## Abhängigkeiten
- **useLoadingOverlay**: Wird verwendet, um alle Ladeanzeigen zu verbergen, bevor die Bestätigungsanzeige gezeigt wird.

## Automatische Schließung
- Die Bestätigungsanzeige wird nach einer festgelegten Dauer (`AUTO_CLOSE_DURATION`), in diesem Fall 1500 Millisekunden, automatisch geschlossen.

## Beispiel für die Verwendung:
```javascript
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";

const { showConfirmation, hideConfirmation } = useConfirmationOverlay();

// Zeigt eine Bestätigungsmeldung an
showConfirmation("Aktion erfolgreich abgeschlossen!");

// Die Nachricht wird nach 1500ms automatisch ausgeblendet.