<template>

  <div v-on:click="closeConfirmation()" v-if="isConfirmationVisible" class="confirmation-overlay">
    <transition name="fade">
      <div class="confirmation-box">
        <p>{{ confirmationMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
const closeConfirmation = useConfirmationOverlay().hideConfirmation;
const { isConfirmationVisible, confirmationMessage } = useConfirmationOverlay();
</script>

<style scoped>
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6); /* halbtransparent, dunkler Hintergrund */
  display: flex;
  justify-content: flex-end; /* Schiebt den Box-Container an den rechten Rand */
  align-items: flex-end; /* Schiebt ihn an den unteren Rand */
  padding: 20px;
  z-index: 9999;
}

/* Die eigentliche Box, die rein- und rausfahren soll */
.confirmation-box {

  background: #fff;
  color: #333;
  padding: 16px;
  min-width: 200px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Animationen */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
