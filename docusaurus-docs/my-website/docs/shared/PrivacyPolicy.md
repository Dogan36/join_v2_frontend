# Privacy Policy

## Beschreibung
Die `Privacy Policy`-Komponente zeigt die Datenschutzrichtlinie für die Anwendung. Sie enthält wichtige rechtliche Informationen über den Umgang mit persönlichen Daten, Rechte der Nutzer und Informationen zu verschiedenen Datenschutzpraktiken.

## Struktur
- **legal-container**: Der Hauptcontainer für die Datenschutzrichtlinie.
  - **legal-header**: Der Kopfbereich der Seite mit dem Titel und einer Zurück-Schaltfläche (wenn der Nutzer nicht auf der Startseite ist).
  - **legal-header-content**: Der Bereich, der Informationen zum aktuellen Abschnitt anzeigt.
  - **legal-information**: Enthält die Hauptinformationen zu Datenschutzpraktiken, einschließlich der datenschutzrechtlichen Hinweise und Kontakte.

## Funktionen und Methoden
- **goToStart**: Eine Funktion, die den Nutzer zurück zur Startseite bringt, wenn die Zurück-Schaltfläche angeklickt wird.
  - **Rückgabewert**: `void`

## Props
- Keine spezifischen Props in dieser Komponente.

## Computed Properties
- **route**: Wird verwendet, um den aktuellen Pfad der Route zu überwachen und zu überprüfen, ob der Benutzer auf der Startseite ist, um das Zurück-Symbol anzuzeigen.

## Events
- **click**: Wird ausgelöst, wenn die Zurück-Schaltfläche angeklickt wird, um zur Startseite zu navigieren.

## Stil
- **legal-container**: Der Container für die gesamte Datenschutzrichtlinie.
- **legal-header**: Enthält den Titel und die Zurück-Schaltfläche.
- **legal-header-content**: Zeigt den Inhalt der Datenschutzrichtlinie.

## Weitere Hinweise
- Enthält detaillierte Abschnitte zur Datenverarbeitung, den Rechten der Nutzer und der Datenaufbewahrung.
- Das Design sorgt für eine benutzerfreundliche Ansicht der rechtlichen Informationen.
