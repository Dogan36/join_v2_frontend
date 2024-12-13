<template>
  <div class="inputContainer" :class="{ 'input-error': error }">
    <label class="title" for="title">Title</label>
    <div class="inputField">
      <input id="title" v-model="title" type="text" placeholder="Enter task title"></input>
    </div>
  </div>
  <p class="error-message">{{ error }}</p>
</template>

<script setup>
import { ref } from "vue";

// Eingabewerte und Fehler-Flags
const title = ref("");
const error = ref("");


// Validierungslogik
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
  validate,
  title,
});

</script>
