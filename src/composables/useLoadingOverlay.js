import { ref } from 'vue';

const isLoading = ref(false);

/**
 * Provides functionality to control a loading overlay.
 * 
 * @returns {{
*   isLoading: import('vue').Ref<boolean>,
*   showOverlay: () => void,
*   hideOverlay: () => void
* }}
*/
export function useLoadingOverlay() {
 /**
  * Indicates whether the loading overlay is currently visible.
  * @type {import('vue').Ref<boolean>}
  */
 const isLoading = ref(false);

 /**
  * Shows the loading overlay.
  */
 function showOverlay() {
   isLoading.value = true;
 }

 /**
  * Hides the loading overlay.
  */
 function hideOverlay() {
   isLoading.value = false;
 }

 return {
   isLoading,
   showOverlay,
   hideOverlay,
 };
}
