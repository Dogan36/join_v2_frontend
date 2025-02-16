<template>
  <GlobalLoadingOverlay />
  <GlobalConfirmationOverlay/>
  <RouterView />
</template>

<script>
/**
 * Main app component for the Join application.
 * 
 * @component
 */
import { RouterView } from "vue-router";
import GlobalLoadingOverlay from "@/components/shared/GlobalLoadingOverlay.vue";
import GlobalConfirmationOverlay from "./components/shared/GlobalConfirmationOverlay.vue";
</script>

<style>
@import "@/assets/base.css";
@import "@/assets/main.css";
</style>


