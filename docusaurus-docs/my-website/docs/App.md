---
sidebar_position: 2
---

# MainApp Component

## Beschreibung
Die Hauptkomponente der "Join"-Anwendung, die als Container für verschiedene über den Router eingebundene Views dient. Sie enthält auch globale Überlagerungen für Lade- und Bestätigungsdialoge.

## Struktur
- **GlobalLoadingOverlay**: Zeigt ein Ladeoverlay an, während die Anwendung oder bestimmte Inhalte geladen werden.
- **GlobalConfirmationOverlay**: Zeigt ein Bestätigungsoverlay an, um den Benutzer um eine Bestätigung zu bitten.
- **RouterView**: Lädt und zeigt die View-Komponente basierend auf dem aktuellen Routenpfad an.

## Beispiel

```vue
<template>
  <GlobalLoadingOverlay />
  <GlobalConfirmationOverlay />
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import GlobalLoadingOverlay from "@/components/shared/GlobalLoadingOverlay.vue";
import GlobalConfirmationOverlay from "./components/shared/GlobalConfirmationOverlay.vue";
</script>

<style>
@import "@/assets/base.css";
@import "@/assets/main.css";
</style>
