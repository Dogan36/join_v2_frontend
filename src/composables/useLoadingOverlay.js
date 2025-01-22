import { ref } from 'vue';

const isLoading = ref(false);

export function useLoadingOverlay() {
  function showOverlay() {
    isLoading.value = true;
    console.log("showOverlay");
  }
  function hideOverlay() {
    isLoading.value = false;
    console.log("hideOverlay");
  }

  return {
    isLoading,
    showOverlay,
    hideOverlay,
  };
}