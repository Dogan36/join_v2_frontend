<template>
  <GlobalLoadingOverlay />
  <GlobalConfirmationOverlay/>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import GlobalLoadingOverlay from "@/components/shared/GlobalLoadingOverlay.vue";
import GlobalConfirmationOverlay from "./components/shared/GlobalConfirmationOverlay.vue";
</script>

<style>
@import "@/assets/base.css";
@import "@/assets/main.css";

</style>


