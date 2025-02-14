import { ref } from 'vue';

const isConfirmationVisible = ref(false);
const confirmationMessage = ref('');
let autoCloseTimer = null; // zum Merken des Timers
import { useLoadingOverlay } from './useLoadingOverlay';
const AUTO_CLOSE_DURATION = 1500;  

/**
 * Provides functionality to display and automatically hide a confirmation overlay.
 * 
 * Uses `useLoadingOverlay` to hide any loading overlays before showing the confirmation message.
 * The confirmation overlay will auto-close after a predefined duration.
 * 
 * @returns {{
*   isConfirmationVisible: import('vue').Ref<boolean>,
*   confirmationMessage: import('vue').Ref<string>,
*   showConfirmation: (message: string) => void,
*   hideConfirmation: () => void
* }}
*/
export function useConfirmationOverlay() {
 const { hideOverlay } = useLoadingOverlay();

 /**
  * Displays a confirmation message and automatically hides it after a set duration.
  * 
  * @param {string} message - The confirmation message to display.
  */
 function showConfirmation(message) {
   hideOverlay();
   if (autoCloseTimer) {
     clearTimeout(autoCloseTimer);
     autoCloseTimer = null;
   }
   confirmationMessage.value = message;
   isConfirmationVisible.value = true;

   autoCloseTimer = setTimeout(() => {
     hideConfirmation();
   }, AUTO_CLOSE_DURATION);
 }

 /**
  * Hides the confirmation overlay and clears the message.
  */
 function hideConfirmation() {
   isConfirmationVisible.value = false;
   confirmationMessage.value = "";
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
