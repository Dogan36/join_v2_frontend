<template>
  <div class="assignedTo">
    <div
      class="cardAvatar"
      :key="contact.avatar"
      :style="{ background: contact.color.hex_value, color: isDarkBackground(contact.color.hex_value) ? '#fff' : '#000' }"
      v-for="contact in assignedTo" 
    >
      {{ contact.avatar }}
      
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';


// Deine 'assignedTo' Daten, die du von der übergeordneten Komponente erhältst
const props = defineProps({
  assignedTo: {
    type: Array,
    required: true
  }
});

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  // Berechnung, ob der Hintergrund dunkel oder hell ist
  const isDarkBackground = (hex) => {
    const rgb = hexToRgb(hex);
    const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return yiq < 128; // Dunkel: Textfarbe weiß, hell: Textfarbe schwarz
  };

 
</script>

<style scoped>
.assignedTo {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .cardAvatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 8px;
    gap: 10px;
    width: 35px;
    height: 35px;
    background:rgb(88, 160, 201);
    border: 1px solid #ffffff;
    border-radius: 58px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px -4px;
  }
}
</style>
