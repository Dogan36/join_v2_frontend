---
sidebar_position: 2
---

# Home View

## Beschreibung
Die `HomeView`-Komponente ist die Hauptansicht des Dashboards, in der verschiedene Unteransichten angezeigt werden, abhängig vom Wert des `currentView`-States. Es bietet Zugriff auf verschiedene Bereiche wie das **Summary**, das **Board**, das Hinzufügen von **Tasks**, **Kontakte**, die **Datenschutzrichtlinie**, das **Impressum** und **Hilfe**.

## Struktur
- **MenuContainer**: Das Menü, das immer sichtbar ist und zur Navigation zwischen den verschiedenen Ansichten dient.
- **Header**: Der Header der Seite, der immer sichtbar ist und zusätzliche Informationen bietet.
- **main**: Der Hauptbereich der Seite, der abhängig vom aktuellen View (`currentView`) verschiedene Komponenten anzeigt:
  - **Summary**: Wird angezeigt, wenn `currentView === 'summary'`.
  - **Board**: Wird angezeigt, wenn `currentView === 'board'`.
  - **AddTask**: Wird angezeigt, wenn `currentView === 'addTask'`.
  - **Contacts**: Wird angezeigt, wenn `currentView === 'contacts'`.
  - **PrivacyPolicy**: Wird angezeigt, wenn `currentView === 'privacy'`.
  - **LegalNotice**: Wird angezeigt, wenn `currentView === 'legalNotice'`.
  - **Help**: Wird angezeigt, wenn `currentView === 'help'`.

## Overlay-Komponenten
- **WorkspaceInfo**: Zeigt die Details des aktuellen Workspaces an, wenn `currentWorkspace == null` oder `isWorkspaceOverlayVisible === true`.
- **Profil**: Zeigt das Profil des Benutzers an, wenn `isProfilOverlayVisible === true`.
- **DarkBackground**: Wird für beide Overlay-Komponenten verwendet, um den Hintergrund abzudunkeln und den Fokus auf die modalen Ansichten zu lenken.

## Funktionalität
- **currentView**: Der `currentView`-State steuert, welche der verschiedenen Ansichten im Hauptbereich angezeigt wird. Er kann auf eine der folgenden Werte gesetzt werden:
  - `summary`: Zeigt das **Summary** an.
  - `board`: Zeigt das **Board** an.
  - `addTask`: Zeigt das **AddTask** an.
  - `contacts`: Zeigt die **Contacts** an.
  - `privacy`: Zeigt die **PrivacyPolicy** an.
  - `legalNotice`: Zeigt das **LegalNotice** an.
  - `help`: Zeigt die **Help**-Komponente an.

- **getUser**: Liest die Benutzerdaten aus `localStorage`, um den aktuellen Benutzer zu erhalten und den `currentUser`-State zu setzen.
- **closeOverlay**: Schließt sowohl das **Profil-Overlay** als auch das **Workspace-Overlay**, indem die Zustände `isProfilOverlayVisible` und `isWorkspaceOverlayVisible` auf `false` gesetzt werden.

## Events und Methoden
- **closeOverlay**: Wird ausgelöst, um alle Overlays zu schließen.
- **getUser**: Wird beim Mounten der Komponente aufgerufen, um die Benutzerdaten aus dem `localStorage` zu laden.
- **onMounted**: Lädt beim ersten Laden der Seite die Workspaces und Kontakte sowie den aktuellen Benutzer.

## Weitere Hinweise
- Wenn der Benutzer nicht eingeloggt ist, werden die Workspaces und Kontakte nicht geladen.
- Das `currentUser` wird aus dem `localStorage` geladen, was bedeutet, dass die Daten über verschiedene Sitzungen hinweg persistiert bleiben.
