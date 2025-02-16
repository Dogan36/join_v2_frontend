<template>
    <div class="input-container">
      <label class="title">Due date</label>
      <div class="inputfield"  :class="{ 'input-error': error }">
        <input 
          v-model="dueDate"
          type="date"
          :min="today"
        />
      </div>
    </div>
      <p class="error-message">{{ error }}</p>
</template>

<script setup>
import { ref } from "vue";

// Reactive state for due date and error message
/**
 * @vue-data {string} dueDate - The due date value.
 */
const dueDate = ref("");

// Reactive state for error message related to the due date
/**
 * @vue-data {string} error - The error message related to the due date field.
 */
const error = ref("");

// Default value for today's date in ISO format (YYYY-MM-DD)
const today = new Date().toISOString().split("T")[0];

/**
 * @vue-method {Function} setDueDate - Sets the due date to the provided value.
 * 
 * This function assigns the given value to the `dueDate` reactive property.
 * 
 * @param {string} date - The new due date value.
 */
const setDueDate = (date) => {
  dueDate.value = date;
};

/**
 * @vue-method {Function} clear - Clears the due date and resets the error message.
 * 
 * This function resets the `dueDate` to an empty string and clears the `error` message,
 * providing a clean state.
 */
const clear = () => {
  dueDate.value = "";
  error.value = "";
};

/**
 * @vue-method {Function} validate - Validates the due date field.
 * 
 * This function checks if the due date value is non-empty after trimming whitespace. If the due date is empty,
 * it sets an error message and returns false, indicating the field is invalid. Otherwise, it clears
 * any error message and returns true.
 * 
 * @returns {boolean} Returns true if the due date is valid; otherwise, false.
 */
const validate = () => {
  if (!dueDate.value.trim()) {
    error.value = 'Due date is required';
    return false; // invalid
  } else {
    error.value = "";
    return true; // valid
  }
};

defineExpose({
  validate,
  dueDate,
  setDueDate,
  clear
});
</script>
