# useTextColor

## Beschreibung
Das `useTextColor`-Composable stellt Funktionen bereit, um die passende Textfarbe basierend auf einer Hintergrundfarbe zu bestimmen. Es nutzt den YIQ-Kontrast-Algorithmus, um zu beurteilen, ob der Hintergrund dunkel oder hell ist, und gibt die entsprechende Textfarbe zurück (schwarz oder weiß).

## Funktionen

- **isDarkBackground**: Bestimmt, ob eine gegebene Hintergrundfarbe dunkel ist.
  - **Parameter**:
    - `hex` (string): Der Hex-Farbcode des Hintergrunds (z. B. "#FFFFFF").
  - **Rückgabewert**: `boolean` - `true` wenn der Hintergrund dunkel ist, andernfalls `false`.

- **getTextColor**: Bestimmt die geeignete Textfarbe basierend auf der Hintergrundfarbe.
  - **Parameter**:
    - `hex` (string): Der Hex-Farbcode des Hintergrunds.
  - **Rückgabewert**: `string` - Die empfohlene Textfarbe ("#FFFFFF" für dunkle Hintergründe, "#000000" für helle Hintergründe).

## Beispiel für die Verwendung:
```javascript
import useTextColor from "@/composables/useTextColor";

const { isDarkBackground, getTextColor } = useTextColor();

const backgroundColor = "#2A3647";
const textColor = getTextColor(backgroundColor); // Gibt "#FFFFFF" zurück, wenn der Hintergrund dunkel ist

console.log(`Für die Hintergrundfarbe ${backgroundColor} ist die Textfarbe ${textColor}.`);

```
## Weitere Hinweise:
  - Die Funktion getTextColor verwendet isDarkBackground, um festzustellen, ob der Hintergrund hell oder dunkel ist und gibt dann die passende Textfarbe zurück.
  - Diese Funktionen sind nützlich, um automatisch eine gut lesbare Textfarbe basierend auf der Hintergrundfarbe zu wählen.