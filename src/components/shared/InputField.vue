<template>
  <div class="inputField" :class="{ 'input-error': error }">
    <!-- Input Feld -->
    <input
      :type="isPasswordVisible ? 'text' : type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
    />

    <!-- Dynamische Icons -->
    <img
      v-if="type === 'password'"
      :src="passwordIconSrc"
      :alt="passwordIconAlt"
      :class="passwordIconClass"
      @click="togglePasswordVisibility"
    />

    <img
      v-else-if="icon"
      :src="icon"
      :alt="iconAlt || 'Icon'"
      class="input-icon"
      @click="emitIconClick"
    />
  </div>

  <!-- Fehlermeldung -->
  <p class="error-message">{{ errorMessage }}</p>
</template>

<script setup>

import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Props definieren
const props = defineProps({
  modelValue: String,
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  maxlength: String,
  autocomplete: String,
  icon: { type: String, default: '' }, // Standardicon für Nicht-Passwortfelder
  iconAlt: { type: String, default: '' },
  error: Boolean,
  errorMessages: {type: Object, default: () => ({})},
});

const emit = defineEmits(['update:modelValue', 'iconClick']);

// Lokale Variablen
const isPasswordVisible = ref(false);

const errorMessage = computed(() => {
  return Object.values(props.errorMessages).find((msg) => msg) || "";
});

const passwordIconSrc = computed(() => {
  if (!props.modelValue) {
    return 'src/assets/img/loginPassword.svg'; // Schloss-Icon
  }
  return isPasswordVisible.value
    ? 'src/assets/img/notVisibleIcon.svg' // Durchgestrichenes Auge
    : 'src/assets/img/visibleIcon.svg'; // Auge
});

const passwordIconAlt = computed(() => {
  if (!props.modelValue) return 'Lock icon';
  return isPasswordVisible.value
    ? 'Hide password'
    : 'Show password';
});

const passwordIconClass = computed(() => {
  return passwordIconSrc.value.includes('loginPassword') // Passwortfeld
    ? 'input-icon' // Standard-Stil für das Schloss-Icon
    : 'input-icon cursorPointer'; // Stil für Auge-Icons
});

// Eingabe-Event
const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};

// Passwort-Sichtbarkeit umschalten
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Anderes Icon-Klick-Event
const emitIconClick = () => {
  emit('iconClick');
};
</script>

<style>
@import '@/assets/base.css';

.inputField {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  height: 45px;
  border-radius: 4px;
  background-color: white;
}

.inputField.input-error {
  border-color: #f28b82;
}

.inputField input,
.inputField textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  height: 100%;
  font-size: 2.1rem;
}

.inputField input[type="checkbox"] {
 flex: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
 
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-left: 0.5em;
}

.cursorPointer {
  cursor: pointer;
}

.inputField.textarea {
  align-items: flex-start;
  resize: vertical; /* Parent-Element ist resizeable */
  height: auto; /* Ermöglicht flexibles Wachstum */
  min-height: 120px;
  width: auto;
  min-width: 200px;
  overflow: hidden; 
  font-family: inherit;
}

/* Stile für Textarea */
.inputField.textarea textarea {
  height: 100%;
  resize: none;
  font-family: inherit; /* Keine direkte Kontrolle über die Textarea-Größe */
  
}
.inputField input::placeholder,
.inputField textarea::placeholder {
  padding: 0;
  font-size: 2.1rem; /* Schriftgröße des Platzhalters */
  
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; /* Übernimmt die Schriftart */
  opacity: 1; /* Sichtbarkeit des Platzhalters */
}
</style>
