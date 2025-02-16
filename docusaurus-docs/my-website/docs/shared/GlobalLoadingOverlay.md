## LoadingOverlay Component

Die `LoadingOverlay`-Komponente zeigt ein Overlay mit einem Lade-Symbol an, wenn der Zustand `isLoading` wahr ist.

### Struktur:

1. **`loading-overlay`**:
   - Der Container des Lade-Overlays, der nur angezeigt wird, wenn `isLoading` wahr ist.
   - Enthält einen Spinner, der während des Ladens angezeigt wird.

2. **`spinner`**:
   - Ein Lade-Symbol (Spinner), das anzeigt, dass ein Ladeprozess stattfindet.


### Verwendbare Composable-Funktion:
Die Funktion useLoadingOverlay liefert den Zustand isLoading, der kontrolliert, ob das Lade-Overlay angezeigt werden soll oder nicht.

// useLoadingOverlay.js
export function useLoadingOverlay() {
  const isLoading = ref(false);

  function showOverlay() {
    isLoading.value = true;
  }

  function hideOverlay() {
    isLoading.value = false;
  }

  return { showOverlay, hideOverlay, isLoading };
}
