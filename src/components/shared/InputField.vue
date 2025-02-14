<template>
  <div class="inputfield" :class="{ 'input-error': error }">
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
import loginPasswordSvg from '@/assets/img/loginPassword.svg';
import visibleIconSvg from '@/assets/img/visibleIcon.svg';
import notVisibleIconSvg from '@/assets/img/notVisibleIcon.svg';
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

/**
 * Computes the first available error message from the provided error messages object.
 * 
 * @constant
 */
 const errorMessage = computed(() => {
  return Object.values(props.errorMessages).find((msg) => msg) || "";
});

/**
 * Computes the appropriate password icon source based on the input state.
 * 
 * @constant
 */
const passwordIconSrc = computed(() => {
  if (!props.modelValue) {
    return loginPasswordSvg; // Lock icon
  }
  return isPasswordVisible.value ? notVisibleIconSvg : visibleIconSvg;
});

/**
 * Computes the alt text for the password icon.
 * 
 * @constant
 */
const passwordIconAlt = computed(() => {
  if (!props.modelValue) return "Lock icon";
  return isPasswordVisible.value ? "Hide password" : "Show password";
});

/**
 * Computes the CSS class for the password icon based on its type.
 * 
 * @constant
 */
const passwordIconClass = computed(() => {
  return passwordIconSrc.value.includes("loginPassword") // Password field
    ? "input-icon" // Default style for lock icon
    : "input-icon cursor-pointer"; // Style for eye icons
});

/**
 * Emits an event when the input value changes.
 * 
 * @param {Event} event - The input event.
 */
const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

/**
 * Toggles the visibility of the password.
 */
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

/**
 * Emits an event when the password icon is clicked.
 */
const emitIconClick = () => {
  emit("iconClick");
};
</script>

<style>
.inputfield {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding:1rem 1rem;
  gap: 1rem;
  border-radius: 4px;
  background-color: white;
  justify-content: center;
  max-width: 100%;
  width: 40rem;
}

.input-error {
  border: 2px solid red;
}

.inputfield input,
.inputfield textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.6rem;
  font-family: inherit;
  max-width: 100%;
}

.inputfield input[type="checkbox"] {
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

.cursor-pointer {
  cursor: pointer;
}

.inputfield.textarea {
  align-items: flex-start;
  resize: vertical; /* Parent-Element ist resizeable */
  height: auto; /* Ermöglicht flexibles Wachstum */
  min-height: 120px;
  width: auto;
  overflow: hidden; 
  font-family: inherit;
}

/* Stile für Textarea */
.inputfield.textarea textarea {
  height: 100%;
  resize: none;
  font-family: inherit; /* Keine direkte Kontrolle über die Textarea-Größe */
  
}
.inputfield input::placeholder,
.inputfield textarea::placeholder {
  padding: 0;
  font-size: 1.6rem; /* Schriftgröße des Platzhalters */
  opacity: 1; /* Sichtbarkeit des Platzhalters */
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Spinner in Firefox ausblenden */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
