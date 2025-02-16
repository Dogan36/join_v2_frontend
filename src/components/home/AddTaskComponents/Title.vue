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

// Reactive state for the title and error message
/**
 * @vue-data {string} title - The value of the title input field.
 */
const title = ref("");

/**
 * @vue-data {string} error - The error message related to the title input field.
 */
const error = ref("");

/**
 * @vue-method {Function} setTitle - Sets the title to the provided value.
 * 
 * This function assigns the given value to the `title` reactive property.
 * 
 * @param {string} value - The new title value.
 * @returns {void}
 */
const setTitle = (value) => {
  title.value = value;
};

/**
 * @vue-method {Function} clear - Clears the title and resets the error message.
 * 
 * This function resets the `title` to an empty string and clears the `error` message,
 * ensuring that the input field and error state are reset.
 * 
 * @returns {void}
 */
const clear = () => {
  title.value = "";
  error.value = "";
};

/**
 * @vue-method {Function} validate - Validates the title field.
 * 
 * This function checks if the title value is non-empty after trimming whitespace.
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

// Expose methods and reactive data for use in the parent component
defineExpose({
  setTitle,
  validate,
  title,
  clear
});
</script>

