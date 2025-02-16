---
sidebar_position: 3
---

# About View

## Beschreibung
Die `AboutView`-Komponente zeigt eine abgespeckte Version der `HomeView` an, wenn der Benutzer nicht eingeloggt ist. Dies ermöglicht den Zugriff auf grundlegende Informationen wie das **Impressum**, die **Datenschutzrichtlinie** und **Hilfe**, auch wenn der Benutzer nicht angemeldet ist.

## Struktur
- **MenuContainer**: Das Menü, das immer sichtbar ist und in der `AboutView` angezeigt wird.
- **Header**: Der Header der Seite, der ebenfalls immer sichtbar ist.
- **main**: Der Hauptbereich, der je nach `currentView` eine der folgenden Komponenten anzeigt:
  - **PrivacyPolicy**: Wird angezeigt, wenn `currentView === 'privacy'` ist.
  - **LegalNotice**: Wird angezeigt, wenn `currentView === 'legalNotice'` ist.
  - **Help**: Wird angezeigt, wenn `currentView === 'help'` ist.

## Funktionalität
- **currentView**: Der `currentView`-State wird verwendet, um zwischen den verschiedenen Ansichten (PrivacyPolicy, LegalNotice, Help) zu wechseln. Der Wert von `currentView` wird durch die URL-Parameter (`type`) bestimmt. 
- **setCurrentViewFromURL**: Diese Funktion überprüft den URL-Parameter `type`. Wenn der Wert "privacyPolicy" oder "legalNotice" ist, wird der `currentView` auf "privacy" oder "legalNotice" gesetzt. So wird dem Benutzer automatisch die entsprechende Ansicht angezeigt.

## Beschreibung der URL-Parameter
- **type=privacyPolicy**: Setzt `currentView` auf "privacy", wodurch die Datenschutzrichtlinie angezeigt wird.
- **type=legalNotice**: Setzt `currentView` auf "legalNotice", wodurch das Impressum angezeigt wird.

## Weitere Hinweise
- Diese Ansicht ist für nicht eingeloggte Benutzer gedacht, um grundlegende rechtliche Informationen und Hilfe zugänglich zu machen.
- Wenn der Benutzer eingeloggt ist, wird die vollständige `HomeView` angezeigt.

