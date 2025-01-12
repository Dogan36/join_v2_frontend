import { ref } from 'vue';

const isLoading = ref(false);

export function useLoadingOverlay() {
  function showOverlay() {
    isLoading.value = true;
  }
  function hideOverlay() {
    isLoading.value = false;
  }

  return {
    isLoading,
    showOverlay,
    hideOverlay,
  };
}