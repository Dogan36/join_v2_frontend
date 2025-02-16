
# Dark Background Component

## Beschreibung
Die `DarkBackground`-Komponente stellt einen dunklen Overlay-Hintergrund dar, der häufig verwendet wird, um modale Dialoge zu überdecken. Wenn der Benutzer außerhalb des Modals klickt, wird das Modal geschlossen. Der eigentliche Inhalt des Modals wird über den Slot eingefügt.

## Struktur
- **dark-background**: Ein halbtransparentes Overlay, das den Hintergrund abdunkelt und das Modal hervorhebt.
  - **modal-container**: Der Container für den eigentlichen Modal-Inhalt, in den der Benutzer Inhalt über den Slot einfügen kann. Der Klick auf dieses Element wird durch `@click.stop` gestoppt, sodass das Schließen des Modals nur durch den Klick auf den dunklen Hintergrund ausgelöst wird.

## Methoden
- **closeModal**: Diese Methode wird aufgerufen, wenn der Benutzer auf den dunklen Hintergrund klickt. Sie löst das `close`-Event aus, um das Modal zu schließen.

## Events
- **close**: Dieses Event wird ausgelöst, wenn der Benutzer auf den dunklen Hintergrund klickt, um das Modal zu schließen.

## Verwendung
Die `DarkBackground`-Komponente wird in der Regel zusammen mit einem Modal verwendet, um den Hintergrund zu verdunkeln und den Fokus auf den Modal-Inhalt zu lenken. Der Inhalt des Modals wird über den `slot` eingefügt.
