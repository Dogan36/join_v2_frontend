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
const description = ref("");
const errorMessage = ref("");

/**
 * Sets the description to the provided value.
 *
 * @param {string} value - The new description value.
 */
 const setDescription = (value) => {
  description.value = value;
};

/**
 * Clears the description and any error message.
 *
 * This function resets the description to an empty string and clears the error message,
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
