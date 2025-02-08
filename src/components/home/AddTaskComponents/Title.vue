<template>
  <div class="inputContainer">
    <label class="title" for="title">Title</label>
    <div class="inputField"  :class="{ 'input-error': error }">
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

// Methode, um den Titel zu setzen (z.B. aus Props)
const setTitle = (value) => {
  title.value = value;
};

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
  setTitle,
  validate,
  title,
});

</script>
