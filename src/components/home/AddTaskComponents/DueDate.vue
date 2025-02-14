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

const dueDate = ref("");
const error = ref("");

const today = new Date().toISOString().split("T")[0];

/**
 * Sets the due date to the provided value.
 *
 * @param {string} date - The new due date value.
 */
 const setDueDate = (date) => {
  dueDate.value = date;
};

/**
 * Clears the due date and resets the error message.
 *
 * This function resets the due date value to an empty string and clears any associated error message.
 */
 const clear = () => {
  dueDate.value = "";
  error.value = "";
};

/**
 * Validates the due date field.
 *
 * Checks if the due date value is non-empty after trimming whitespace. If the due date is empty,
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