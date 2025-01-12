import { ref } from 'vue';

const isConfirmationVisible = ref(false);
const confirmationMessage = ref('');
let autoCloseTimer = null; // zum Merken des Timers

// Zeit in Millisekunden, nach der das Overlay automatisch schließt
const AUTO_CLOSE_DURATION = 1000;  

export function useConfirmationOverlay() {
  function showConfirmation(message) {
    // Falls schon ein Timer läuft, abbrechen
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    // Overlay anzeigen
    confirmationMessage.value = message;
    isConfirmationVisible.value = true;

    // Timer starten, damit es nach AUTO_CLOSE_DURATION schließt
    autoCloseTimer = setTimeout(() => {
      hideConfirmation();
    }, AUTO_CLOSE_DURATION);
  }

  function hideConfirmation() {
    isConfirmationVisible.value = false;
    confirmationMessage.value = '';
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
  }

  return {
    isConfirmationVisible,
    confirmationMessage,
    showConfirmation,
    hideConfirmation
  };
}