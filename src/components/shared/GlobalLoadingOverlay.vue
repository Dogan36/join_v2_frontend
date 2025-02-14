<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';

const { isLoading } = useLoadingOverlay();
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6); /* dunkler Hintergrund */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: #9747FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>