import { ref } from 'vue';

const isConfirmationVisible = ref(false);
const confirmationMessage = ref('');
let autoCloseTimer = null; // zum Merken des Timers
import { useLoadingOverlay } from './useLoadingOverlay';
const AUTO_CLOSE_DURATION = 1500;  

export function useConfirmationOverlay() {
  const { hideOverlay } = useLoadingOverlay();
  function showConfirmation(message) {
    hideOverlay();
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
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