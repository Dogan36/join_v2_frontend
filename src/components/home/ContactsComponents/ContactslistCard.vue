<template>
  <div class="contactslistCard" 
  :class="{ active: isActive }"
  @click="$emit('select', contact)">
    <div class="avatar" :style="{ backgroundColor: contact.color.code, color: textColor }">
      {{ contact.avatar }}
    </div>
    <div class="info">
      <h3>{{ contact.user.first_name }} {{ contact.user.last_name }}</h3>
      <p>{{ contact.user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  contact: Object,
  isActive: Boolean,
});

// Berechnung der Textfarbe abhängig von der Hintergrundfarbe
const textColor = computed(() => {
  return isDarkBackground.value ? '#fff' : '#000'; // Weiß bei dunklem Hintergrund, Schwarz bei hellem
});

// Berechnung, ob der Hintergrund dunkel oder hell ist
const isDarkBackground = computed(() => {
  const hex = props.contact.color.code;
  const rgb = hexToRgb(hex);
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq < 128; // Dunkel: Textfarbe weiß, hell: Textfarbe schwarz
});

// Funktion zum Umwandeln von Hex in RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

</script>

<style scoped>
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 35px;
  height: 35px;
  border: 1px solid #ffffff;
  border-radius: 100%;
  font-size: 16px;
}
.contactslistCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 8%;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(180deg, #c9c9c9 0%, #d9d6d6 100%);
  }
  &:hover .avatar {
    border: 2px solid #ffffff;
  }
}

.contactslistCard.active {
  background-color: var(--main-color);
  &:hover {
    background: var(--main-color);
  }
  .info h3 {
    color: #ffffff;
  }
  .avatar {
    border: 2px solid #ffffff;
  }
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  h3 {
    font-size: 2.1rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: #000000;
  }
  p { 
    font-size: 1.6rem;
    color: #007cee;
  }
}
</style>
