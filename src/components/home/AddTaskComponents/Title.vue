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

const setTitle = (value) => {
  title.value = value;
};

const clear = () => {
  title.value = "";
  error.value = "";
};


const validate = () => {
  if (!title.value.trim()) {
    error.value = 'The title is required';
    return false; // ungültig
  } else {
    error.value = "";
    return true; // gültig
  }
};

defineExpose({
  setTitle,
  validate,
  title,
  clear
});
</script>
