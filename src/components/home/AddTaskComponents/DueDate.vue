<template>
    <div class="inputContainer">
      <label class="title">Due date</label>
      <div class="inputField"  :class="{ 'input-error': error }">
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

const setDueDate = (date) => {
  dueDate.value = date;
};

const clear = () => {
  dueDate.value = "";
  error.value = "";
};
const validate = () => {
  if (!dueDate.value.trim()) {
    error.value = 'Due date is required';
    return false; // ungültig
  } else {
    error.value = "";
    return true; // gültig
  }
};

defineExpose({
  validate,
  dueDate,
  setDueDate,
  clear
});
</script>