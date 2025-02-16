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

// Props definition
/**
 * @vue-prop {string} modelValue - The value bound to the input.
 * @vue-prop {string} id - The unique identifier for the input field.
 * @vue-prop {string} [type='text'] - The type of the input (e.g., 'password', 'text').
 * @vue-prop {string} placeholder - The placeholder text for the input field.
 * @vue-prop {string} maxlength - The maximum number of characters allowed in the input.
 * @vue-prop {string} [icon=''] - The icon for the input field (default is empty).
 * @vue-prop {string} iconAlt - The alt text for the input icon.
 * @vue-prop {boolean} error - Flag to indicate if there is an error.
 * @vue-prop {object} errorMessages - An object holding error messages.
 */
const props = defineProps({
  modelValue: String,
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  maxlength: String,
  autocomplete: String,
  icon: { type: String, default: '' }, // Default icon for non-password fields
  iconAlt: { type: String, default: '' },
  error: Boolean,
  errorMessages: {type: Object, default: () => ({})},
});

// Event emitters
/**
 * @vue-method {Function} emit - Emits the "update:modelValue" event and the "iconClick" event.
 * 
 * This function allows the input value to be updated and also triggers the icon click event.
 * 
 * @returns {void}
 */
const emit = defineEmits(['update:modelValue', 'iconClick']);

// Local variables
/**
 * @vue-data {boolean} isPasswordVisible - Flag to toggle password visibility.
 */
const isPasswordVisible = ref(false);

/**
 * @vue-computed {string} errorMessage - Computes the first available error message from the provided error messages object.
 * 
 * @returns {string} - The first error message or an empty string if no error exists.
 */
const errorMessage = computed(() => {
  return Object.values(props.errorMessages).find((msg) => msg) || "";
});

/**
 * @vue-computed {string} passwordIconSrc - Computes the appropriate password icon source based on the input state.
 * 
 * @returns {string} - The path to the correct icon (either a lock icon or a visibility toggle icon).
 */
const passwordIconSrc = computed(() => {
  if (!props.modelValue) {
    return loginPasswordSvg; // Lock icon
  }
  return isPasswordVisible.value ? notVisibleIconSvg : visibleIconSvg;
});

/**
 * @vue-computed {string} passwordIconAlt - Computes the alt text for the password icon.
 * 
 * @returns {string} - The alt text for the password icon.
 */
const passwordIconAlt = computed(() => {
  if (!props.modelValue) return "Lock icon";
  return isPasswordVisible.value ? "Hide password" : "Show password";
});

/**
 * @vue-computed {string} passwordIconClass - Computes the CSS class for the password icon based on its type.
 * 
 * @returns {string} - The CSS class for the password icon (either a default style or a clickable style).
 */
const passwordIconClass = computed(() => {
  return passwordIconSrc.value.includes("loginPassword") // Password field
    ? "input-icon" // Default style for lock icon
    : "input-icon cursor-pointer"; // Style for eye icons
});

/**
 * @vue-method {Function} onInput - Emits an event when the input value changes.
 * 
 * This function is triggered whenever the input value changes and updates the bound model value.
 * 
 * @param {Event} event - The input event that triggers the update.
 * @returns {void}
 */
const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

/**
 * @vue-method {Function} togglePasswordVisibility - Toggles the visibility of the password.
 * 
 * This function flips the value of `isPasswordVisible` to show or hide the password.
 * 
 * @returns {void}
 */
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

/**
 * @vue-method {Function} emitIconClick - Emits an event when the password icon is clicked.
 * 
 * This function emits an event to handle the icon click (e.g., for toggling visibility).
 * 
 * @returns {void}
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
