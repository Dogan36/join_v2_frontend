# useLoadingOverlay

## Beschreibung
Das `useLoadingOverlay`-Composable stellt eine einfache Möglichkeit zur Verfügung, eine Ladeanzeige (Overlay) anzuzeigen und zu verstecken. Es enthält Funktionen zum Steuern des Ladezustands, der in der Anwendung genutzt werden kann, um Benutzer zu informieren, dass eine asynchrone Aufgabe ausgeführt wird.

## Struktur
- **isLoading**: Ein reaktiver Wert, der den Ladezustand steuert.
  - **Typ**: `import('vue').Ref<boolean>`

## Funktionen

- **showOverlay**: Zeigt die Ladeanzeige an, indem der `isLoading`-Wert auf `true` gesetzt wird.
  - **Rückgabewert**: `void`

- **hideOverlay**: Versteckt die Ladeanzeige, indem der `isLoading`-Wert auf `false` gesetzt wird.
  - **Rückgabewert**: `void`

## Beispiel für die Verwendung:
```javascript
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";

const { isLoading, showOverlay, hideOverlay } = useLoadingOverlay();

// Ladeanzeige anzeigen
showOverlay();

// Ladeanzeige ausblenden
hideOverlay();

```

## Weitere Hinweise:
  - Der isLoading-Wert kann verwendet werden, um visuell zu steuern, ob die Ladeanzeige in der Benutzeroberfläche angezeigt werden soll.
  - Das Composable kann in jeder Komponente genutzt werden, die eine Ladeanzeige benötigt.