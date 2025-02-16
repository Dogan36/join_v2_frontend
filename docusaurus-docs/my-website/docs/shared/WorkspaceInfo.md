# Workspace Info

## Beschreibung
Die `Workspace Info Modal`-Komponente zeigt detaillierte Informationen über den aktuellen Arbeitsbereich an und ermöglicht es Benutzern, zwischen verschiedenen Arbeitsbereichen zu wechseln, einen neuen Arbeitsbereich zu erstellen, einem Arbeitsbereich beizutreten, Einladungen zu teilen und den Arbeitsbereich zu verlassen.

## Struktur
- **workspace-info-overlay**: Der Container für das Modal.
  - **workspace-info-header**: Der Header des Modals, der den Titel und eine kurze Beschreibung enthält.
  - **workspace-info-content**: Der Hauptinhalt des Modals, der die Details des aktuellen Arbeitsbereichs anzeigt.
    - **workspace-info-main**: Der Bereich mit den Schaltflächen zum Wechseln des Arbeitsbereichs, Erstellen eines neuen Arbeitsbereichs oder Beitreten zu einem bestehenden Arbeitsbereich.
    - **button-container**: Beinhaltet Schaltflächen für Interaktionen (z.B., Wechseln des Arbeitsbereichs, Erstellen eines neuen Arbeitsbereichs).

## Funktionen und Methoden
- **setActiveModal**: Setzt das aktuell aktive Modal.
  - **Rückgabewert**: `void`
  - **Parameter**: `modalName` (`string`) - Der Name des Modals, das aktiviert werden soll (z.B. 'createWorkspace', 'switchWorkspace').

- **close**: Schließt das Modal.
  - **Rückgabewert**: `void`

## Props
- Keine spezifischen Props in dieser Komponente.

## Computed Properties
- Keine speziellen Computed Properties.

## Events
- **close**: Wird verwendet, um das Modal zu schließen.
- **setActiveModal**: Wird verwendet, um das aktuell angezeigte Modal zu wechseln.

## Stil
- **workspace-info-overlay**: Der Hauptcontainer für das Modal.
- **workspace-info-header**: Der Header des Modals, der den Titel und die Beschreibung enthält.
- **workspace-info-main**: Der Abschnitt, der die Auswahl und die Schaltflächen für die Interaktion enthält.
- **button-container**: Der Bereich mit den Schaltflächen zum Bestätigen des Wechsels oder zum Erstellen/Beitreten eines Arbeitsbereichs.

## Weitere Hinweise
- Wenn der Benutzer Mitglied des aktuellen Arbeitsbereichs ist, wird der Button zum Wechseln des Arbeitsbereichs angezeigt.
- Wenn der Benutzer noch keinem Arbeitsbereich beigetreten ist, wird die Option zum Erstellen oder Beitreten eines neuen Arbeitsbereichs angezeigt.
