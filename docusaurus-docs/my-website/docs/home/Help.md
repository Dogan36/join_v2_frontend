# Help Component

## Beschreibung
Diese Komponente zeigt eine Hilfe- und Support-Seite für die "Join"-Anwendung. Sie enthält eine Übersicht über die Funktionen von Join, eine Schritt-für-Schritt-Anleitung zur Nutzung der Anwendung und Kontaktdaten für weitere Unterstützung.

## Struktur
- **Headline**: Zeigt den Titel "Help & Support" an und ermöglicht die Navigation zurück zur Startseite, wenn der Benutzer nicht auf der Homepage ist.
- **Help Text**: Eine kurze Einführung, die die Anwendung "Join" vorstellt.
- **What is Join?**: Eine Erklärung, was Join ist und wie es als Kanban-Projektmanagement-Tool funktioniert.
- **How to use Join**: Eine Schritt-für-Schritt-Anleitung zur Nutzung von Join, einschließlich der Verwaltung von Workspaces, Aufgaben, Kontakten und Mitgliedern.

## Funktionen und Methoden
- **goToStart()**: Leitet den Benutzer zurück zur Startseite, wenn der Zurück-Pfeil geklickt wird.
  - **Rückgabewert**: `void`

## Events
Keine Events werden von dieser Komponente emittiert.

## Stil
- **help-content**: Container für den gesamten Hilfetext und die Schritte.
- **headline-component**: Stil für die Kopfzeile mit dem Titel "Help & Support".
- **steps**: Container für die Schritt-für-Schritt-Anleitung zur Verwendung von Join.
- **step**: Stil für jede der fünf Anweisungen zur Nutzung von Join (Workspace erkunden, Kontakte und Mitglieder verwalten, Karten erstellen, Karten per Drag & Drop verschieben, abgeschlossene Aufgaben entfernen).

## Weitere Hinweise
- **Schritt-für-Schritt-Anleitung**: Die Komponente bietet detaillierte Anweisungen in fünf Schritten, wie man mit Join arbeitet:
  1. Workspace und Board erkunden
  2. Kontakte und Mitglieder verwalten
  3. Aufgaben-Karten erstellen
  4. Karten per Drag & Drop verschieben
  5. Abgeschlossene Aufgaben entfernen
- Am Ende der Anleitung gibt es einen Kontakt-Link für weitere Unterstützung oder Feedback.
