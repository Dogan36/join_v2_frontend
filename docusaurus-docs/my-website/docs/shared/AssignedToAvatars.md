# Avatars Component

## Beschreibung
Die `AssignedToAvatars`-Komponente zeigt Avatare der Mitglieder an, die einer Aufgabe oder einem Element zugewiesen sind. Es werden nur die ersten vier zugewiesenen Mitglieder angezeigt, und für weitere Mitglieder wird eine Anzeige mit der Anzahl der verbleibenden zugewiesenen Mitglieder angezeigt.

## Struktur
- **assigned-to**: Der Container für die Avatare der zugewiesenen Mitglieder.
  - **card-avatar**: Zeigt den Avatar jedes zugewiesenen Mitglieds. Der Hintergrund wird basierend auf der Farbe des Mitglieds angepasst.
  - **remainingContacts**: Zeigt die Anzahl der verbleibenden zugewiesenen Mitglieder an, wenn mehr als vier Mitglieder zugewiesen sind.

## Funktionen und Methoden
- **getTextColor**: Bestimmt die Textfarbe für die Avatare der zugewiesenen Mitglieder, basierend auf der Hintergrundfarbe des Mitglieds.
  - **Rückgabewert**: `string` - Der Textfarbwert basierend auf der Hintergrundfarbe des Mitglieds.

## Props
- **assignedTo**: Eine Liste von Mitglieds-IDs, die der Aufgabe oder dem Element zugewiesen sind.
  - **Typ**: `Array`
  - **Erforderlich**: `true`

## Computed Properties
- **assignedTo**: Gibt eine Liste von Mitgliedern zurück, die der Aufgabe zugewiesen sind, basierend auf den IDs in der `assignedTo`-Prop.
  - **Rückgabewert**: `Array<Object>`
  
- **assignedToReduced**: Gibt eine reduzierte Liste der zugewiesenen Mitglieder zurück, die auf maximal vier Mitglieder begrenzt ist.
  - **Rückgabewert**: `Array<Object>`
  
- **remainingContacts**: Berechnet die Anzahl der verbleibenden zugewiesenen Mitglieder, die nicht in der `assignedToReduced`-Liste enthalten sind.
  - **Rückgabewert**: `number`

## Events
- **select**: Wird ausgelöst, wenn ein Mitglied ausgewählt wird. Es gibt den ausgewählten Kontakt weiter.

## Stil
- **assigned-to**: Der Container für alle Avatare.
- **card-avatar**: Ein Avatar eines zugewiesenen Mitglieds mit einer Hintergrundfarbe basierend auf der Farbe des Mitglieds.
- **remainingContacts**: Eine Anzeige für die Anzahl der verbleibenden Mitglieder, die nicht in den ersten vier angezeigt werden.

## Weitere Hinweise
- Es werden nur die ersten vier Mitglieder angezeigt, und für zusätzliche Mitglieder wird die Anzahl der verbleibenden Mitglieder angezeigt.
