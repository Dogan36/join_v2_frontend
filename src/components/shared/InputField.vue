<template>
  <div class="inputField" :class="{ 'input-error': error, 'textarea': isTextarea, }">
    <component
    :is="isTextarea ? 'textarea' : 'input'"
    :type="isPasswordVisible && type === 'password' ? 'text' : type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :class="{ 'input-error': error,}"
      :autocomplete="autocomplete"
    />
    <img 
      v-if="shouldShowToggleIcon" 
      :src="currentIcon" 
      alt="toggle password visibility" 
      class="input-icon cursorPointer" 
      @click="togglePasswordVisibility" 
    />
    
    <img 
       v-else-if="icon"
      :src="icon"
      alt="input icon"
      class="input-icon"
    />
    </div>
      <p class="error-message">{{ errorMessage }}</p>
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
  autocomplete: String,
  placeholder: String,
  icon: {
      type: String,
      default: null, // Standardmäßig kein Icon
    },
  error: Boolean,
  errorMessages: { // Akzeptiere mehrere Fehlernachrichten als Array oder Objekt
    type: Object,
    default: () => ({})
  },
  isTextarea: {
      type: Boolean,
      default: false, // Standardmäßig ein Input
    },
});

const emit = defineEmits(['update:modelValue']);

// Lokale Statusvariablen
const isPasswordVisible = ref(false);
const currentIcon = computed(() => {
  return isPasswordVisible.value ? 'src/assets/img/notVisibleIcon.svg' : 'src/assets/img/visibleIcon.svg';
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
@import '@/assets/base.css';

.inputField {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  height: 45px;
  border-radius: 4px;
  background-color: white;
}

.inputField.input-error {
  border-color: #f28b82;
}

.inputField input,
.inputField textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  height: 100%;
  font-size: 2.1rem;
}

.inputField input[type="checkbox"] {
 flex: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
 
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-left: 0.5em;
}

.cursorPointer {
  cursor: pointer;
}

.error-message {
  color: #f28b82;
  font-size: 0.9em;
  margin-bottom: 0.4em;
  height: 18px;
}

.inputField.textarea {
  align-items: flex-start;
  resize: vertical; /* Parent-Element ist resizeable */
  height: auto; /* Ermöglicht flexibles Wachstum */
  min-height: 120px;
  width: auto;
  min-width: 200px;
  overflow: hidden; 
  font-family: inherit;
}

/* Stile für Textarea */
.inputField.textarea textarea {
  height: 100%;
  resize: none;
  font-family: inherit; /* Keine direkte Kontrolle über die Textarea-Größe */
  
}
.inputField input::placeholder,
.inputField textarea::placeholder {
  padding: 0;
  font-size: 2.1rem; /* Schriftgröße des Platzhalters */
  
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; /* Übernimmt die Schriftart */
  opacity: 1; /* Sichtbarkeit des Platzhalters */
}
</style>
