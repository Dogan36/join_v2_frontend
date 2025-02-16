# Legal Notice

## Beschreibung
Die `LegalNotice`-Komponente zeigt die rechtlichen Informationen eines Unternehmens an, darunter die Betreiberangaben, Haftungsausschluss, Datenschutzinformationen, Streitbeilegung, Urheberrecht und Quellenangaben für verwendete Bilder und Grafiken. Es enthält auch eine Schaltfläche, um zum Startbildschirm zurückzukehren.

## Struktur
- **legal-container**: Der Hauptcontainer, der alle rechtlichen Informationen enthält.
  - **legal-header**: Der Header, der den Titel und die Zurück-Schaltfläche enthält.
    - **img**: Ein Bild für das Zurück-Symbol, das die Ansicht zur Startseite zurückführt.
  - **h2** und **p**: Überschriften und Textabschnitte, die die rechtlichen Informationen darstellen.
  - **a**: Ein Link zur Plattform für die Online-Streitbeilegung (ODR).

## Funktionen und Methoden
- **goToStart**: Leitet den Benutzer zur Startseite weiter.
  - **Rückgabewert**: `void`

## Computed Properties
- Keine spezifischen Computed Properties in dieser Komponente.

## Events
- **click**: Wird ausgelöst, wenn das Zurück-Symbol geklickt wird, um den Benutzer zur Startseite zu führen.

## Stil
- **legal-container**: Der Hauptcontainer für alle rechtlichen Informationen.
- **legal-header**: Der Header mit dem Titel und der Zurück-Schaltfläche.
  - **img**: Das Bild für das Zurück-Symbol.
  
## Weitere Hinweise
- Diese Komponente bietet eine detaillierte Darstellung der rechtlichen Hinweise gemäß der deutschen Telemediengesetzgebung (TMG).
