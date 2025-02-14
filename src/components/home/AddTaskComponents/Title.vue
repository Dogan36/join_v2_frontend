<template>
  <div class="input-container">
    <label class="title" for="title">Title</label>
    <div class="inputfield"  :class="{ 'input-error': error }">
      <input id="title" v-model="title" type="text" placeholder="Enter task title" maxlength="30"></input>
    </div>
  </div>
  <p class="error-message">{{ error }}</p>
</template>

<script setup>
import { ref } from "vue";

// Eingabewerte und Fehler-Flags
const title = ref("");
const error = ref("");

/**
 * Sets the title to the provided value.
 *
 * @param {string} value - The new title value.
 */
 const setTitle = (value) => {
  title.value = value;
};

/**
 * Clears the title and resets the error message.
 *
 * This function sets the title to an empty string and clears any error message,
 * ensuring that the input field and error state are reset.
 */
 const clear = () => {
  title.value = "";
  error.value = "";
};

/**
 * Validates the title field.
 *
 * Checks if the title value is non-empty after trimming whitespace.
 * If the title is empty, it sets an error message and returns false, indicating an invalid state.
 * Otherwise, it clears any error message and returns true.
 *
 * @returns {boolean} Returns true if the title is valid, otherwise false.
 */
 const validate = () => {
  if (!title.value.trim()) {
    error.value = 'The title is required';
    return false; // invalid
  } else {
    error.value = "";
    return true; // valid
  }
};

defineExpose({
  setTitle,
  validate,
  title,
  clear
});
</script>
