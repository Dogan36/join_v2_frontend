## ConfirmationOverlay Component

Die `ConfirmationOverlay`-Komponente zeigt ein Overlay mit einer Bestätigungsmeldung an. Wenn der Benutzer auf das Overlay klickt, wird es geschlossen.

### Struktur:

1. **`confirmation-overlay`**:
   - Der Container des Overlays, der nur angezeigt wird, wenn der Zustand `isConfirmationVisible` wahr ist.
   - Der Klick auf das Overlay ruft die Methode `closeConfirmation()` auf, um das Overlay zu schließen.

2. **`confirmation-box`**:
   - Enthält die Bestätigungsmeldung, die dynamisch gesetzt wird.
   - Wird mit einer sanften `fade`-Übergangsanimation eingeblendet.

3. **Transition (`fade`)**:
   - Die `fade`-Transition sorgt für eine sanfte Einblendung und Ausblendung der Bestätigungsmeldung.

### Beispielcode:

```vue
<template>
  <div v-on:click="closeConfirmation()" v-if="isConfirmationVisible" class="confirmation-overlay">
    <transition name="fade">
      <div class="confirmation-box">
        <h4>{{ confirmationMessage }}</h4>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
const closeConfirmation = useConfirmationOverlay().hideConfirmation;
const { isConfirmationVisible, confirmationMessage } = useConfirmationOverlay();
</script>
