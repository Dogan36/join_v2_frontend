# Menu Component

## Beschreibung
Die `Menu`-Komponente zeigt eine Menüleiste mit Navigationsoptionen für verschiedene Ansichten der Anwendung. Es werden Optionen wie "Summary", "Board", "Add Task", "Contacts", "Privacy Policy" und "Legal Notice" angeboten. Der Benutzer kann zwischen diesen Ansichten wechseln, wobei die aktive Ansicht hervorgehoben wird.

## Struktur
- **menu**: Der Hauptcontainer für das Menü.
  - **logo-template**: Das Logo der Anwendung.
  - **desktop-template-menu**: Ein Bereich für die Hauptmenüpunkte, einschließlich "Summary", "Board", "Add Task" und "Contacts".
    - **desktop-template-menu-elements**: Ein Menüelement für jede Ansicht, das das zugehörige Icon und den Text enthält.
    - **desktop-template-icon-container**: Ein Container für das Icon jedes Menüelements.
    - **desktop-template-font**: Der Textname des Menüelements.
  - **desktop-template-menu**: Ein weiterer Menübereich für "Privacy Policy" und "Legal Notice".

## Funktionen und Methoden
- **changeView**: Aktualisiert die `currentView`-Variable mit dem angegebenen Namen der Ansicht, wodurch die angezeigte Ansicht geändert wird.
  - **Parameter**: `view` (Typ: `string`) - Der Name der Ansicht, zu der gewechselt werden soll.
  - **Rückgabewert**: `void`

## Props
- Keine spezifischen Props in dieser Komponente.

## Computed Properties
- Keine Computed Properties in dieser Komponente.

## Events
- **click**: Wird ausgelöst, wenn ein Menüpunkt angeklickt wird, um zur entsprechenden Ansicht zu wechseln.

## Stil
- **menu**: Der Container für das gesamte Menü.
- **logo-template**: Das Logo der Anwendung im Menü.
- **desktop-template-menu**: Der Container für die Menüelemente.
  - **desktop-template-menu-elements**: Ein einzelnes Menüelement mit einem Icon und Text.
  - **desktop-template-icon-container**: Der Container für das Menü-Icon.
  - **desktop-template-font**: Der Textname des Menüelements.

## Weitere Hinweise
- Die aktive Ansicht wird visuell hervorgehoben, indem die Klasse `desktopTemplateIconActive` zum entsprechenden Menüelement hinzugefügt wird.
