<template>
  <div class="input-container" :class="{ 'input-error': error }">
    <input
    :type="isPasswordVisible && type === 'password' ? 'text' : type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :class="{'input-error': error}"
    />
    <img 
      v-if="shouldShowToggleIcon" 
      :src="currentIcon" 
      alt="toggle password visibility" 
      class="input-icon" 
      @click="togglePasswordVisibility" 
    />
    <img 
      v-else
      :src="icon"
      alt="input icon"
      class="input-icon"
    />
    </div>
      <p v-if="error" class="error-message">{{ errorMessage }}</p>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { ref } from 'vue';
const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  icon: String,
  error: Boolean,
  errorMessages: { // Akzeptiere mehrere Fehlernachrichten als Array oder Objekt
    type: Object,
    default: () => []
  },
});

const emit = defineEmits(['update:modelValue']);

// Lokale Statusvariablen
const isPasswordVisible = ref(false);
const currentIcon = computed(() => {
  return isPasswordVisible.value ? 'src/assets/img/icons/notVisibleIcon.svg' : 'src/assets/img/icons/visibleIcon.svg';
});

// Eingabeveränderung
const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};

// Sichtbarkeit umschalten
const togglePasswordVisibility = () => {
  if (props.type === 'password') {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
};

// Anzeige des Augensymbols nur bei Passworttyp
const shouldShowToggleIcon = computed(() => {
  return props.type === 'password' && props.modelValue;
});

// Berechnete Eigenschaft zur Auswahl der ersten verfügbaren Fehlermeldung
const errorMessage = computed(() => {
  return Object.values(props.errorMessages).find(msg => msg) || '';
});
</script>

<style>
@import './../../assets/base.css';

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0.5em;
  border-radius: 4px;
  margin-bottom: 0.5em;
  background-color: #f6f7f8;
  margin: 5px;
}

.input-container.input-error {
  border-color: #f28b82;
}

.input-container input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-left: 0.5em;
}

.error-message {
  color: #f28b82;
  font-size: 0.9em;
  margin-top: 0.25em;
}
</style>
