<style></style>

<script setup lang="ts">
import { RouterView } from "vue-router";
import GlobalLoadingOverlay from "@/components/shared/GlobalLoadingOverlay.vue";
import GlobalConfirmationOverlay from "./components/shared/GlobalConfirmationOverlay.vue";
</script>

<template>
  <GlobalLoadingOverlay />
  <GlobalConfirmationOverlay/>
  <RouterView />
</template>
