<template>
  <div class="input-container">
    <label class="title">Description</label>
    <div class="inputfield">
      <textarea
        v-model="description"
        type="text"
        placeholder="Enter description"
      ></textarea>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive state for description and error message
/**
 * @vue-data {string} description - The description text.
 */
const description = ref("");

/**
 * @vue-data {string} errorMessage - The error message related to the description.
 */
const errorMessage = ref("");

/**
 * @vue-method {Function} setDescription - Sets the description to the provided value.
 * 
 * This function assigns the given value to the `description` reactive property.
 * 
 * @param {string} value - The new description value.
 */
const setDescription = (value) => {
  description.value = value;
};

/**
 * @vue-method {Function} clear - Clears the description and any error message.
 * 
 * This function resets the `description` to an empty string and clears the `errorMessage`,
 * providing a clean state.
 */
const clear = () => {
  description.value = "";
  errorMessage.value = "";
};

defineExpose({
  setDescription,
  description,
  clear,
});
</script>


<style scoped>
  .inputfield {
  height: unset;
  overflow-y: auto;
  max-width: 100%;
  }
</style>
