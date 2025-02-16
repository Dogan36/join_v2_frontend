# Switch Workspace 

## Beschreibung
Die `Switch Workspace Modal`-Komponente ermöglicht es Benutzern, zwischen verschiedenen Arbeitsbereichen zu wechseln. Wenn der Benutzer Mitglied mehrerer Arbeitsbereiche ist, kann er einen neuen Arbeitsbereich auswählen. Wenn keine weiteren Arbeitsbereiche vorhanden sind, hat der Benutzer die Möglichkeit, einen neuen Arbeitsbereich zu erstellen oder einem bestehenden beizutreten.

## Struktur
- **workspace-info-overlay**: Der Container für das Modal.
  - **workspace-info-header**: Zeigt den Titel und eine kurze Beschreibung des Modals.
  - **workspace-info-main**: Der Bereich, der eine Auswahl der verfügbaren Arbeitsbereiche (oder die Optionen zum Erstellen/Beitreten) anzeigt.
    - **inputfield**: Ein Dropdown-Menü, das die Arbeitsbereiche zur Auswahl anzeigt.
    - **button-container**: Beinhaltet Schaltflächen zum Wechseln des Arbeitsbereichs, Erstellen eines neuen Arbeitsbereichs oder Beitreten zu einem Arbeitsbereich.

## Funktionen und Methoden
- **close**: Schließt das Modal.
  - **Rückgabewert**: `void`
  
- **setActiveModal**: Setzt das aktuell aktive Modal.
  - **Rückgabewert**: `void`
  - **Parameter**: `modalName` (`string`) - Der Name des Modals, das aktiviert werden soll (z.B. 'createWorkspace', 'joinWorkspace').

- **confirmSwitch**: Bestätigt und wechselt zu dem ausgewählten Arbeitsbereich.
  - **Rückgabewert**: `void`

## Props
- Keine spezifischen Props in dieser Komponente.

## Computed Properties
- **filteredWorkspaces**: Gibt eine gefilterte Liste der Arbeitsbereiche zurück, ausgenommen der aktuell aktive Arbeitsbereich.
  - **Rückgabewert**: `Array<Object>` - Eine Liste der verfügbaren Arbeitsbereiche.

## Events
- **setActiveModal**: Wird verwendet, um das aktuell angezeigte Modal zu wechseln.
- **close**: Wird ausgelöst, um das Modal zu schließen.

## Stil
- **workspace-info-overlay**: Der Hauptcontainer für das Modal.
- **workspace-info-header**: Der Header des Modals, der den Titel und die Beschreibung enthält.
- **workspace-info-main**: Der Abschnitt, der die Auswahl und die Schaltflächen für die Interaktion enthält.
- **inputfield**: Das Dropdown-Menü, in dem Arbeitsbereiche ausgewählt werden.
- **button-container**: Der Bereich mit den Schaltflächen zum Bestätigen des Wechsels oder zum Erstellen/Beitreten eines Arbeitsbereichs.

## Weitere Hinweise
- Wenn keine weiteren Arbeitsbereiche zur Auswahl stehen, wird der Benutzer aufgefordert, einen neuen Arbeitsbereich zu erstellen oder einem bestehenden beizutreten.
