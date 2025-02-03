<template>
  <div class="assignedTo">
    <div
      class="cardAvatar"
      :key="contact.id"
      :style="{ background: contact.color.hex_value, color: isDarkBackground(contact.color.hex_value) ? '#fff' : '#000' }"
      v-for="contact in assignedToReduced"
    >
    
      {{ contact.avatar }}
    </div>
    <div
      class="cardAvatar"
      v-if="remainingContacts > 0"
    >
    +{{ remainingContacts }}
    </div>

  </div>
</template>

<script setup>
import { members } from '@/store/state';
import { defineProps, computed, onMounted, watch } from 'vue';


const props = defineProps({
  assignedTo: {
    type: Array,
    required: true
  }
});
const assignedTo = computed(() => {
  return members.value.filter(member => props.assignedTo.includes(member.id));
});

const assignedToReduced = computed(() => {
  return assignedTo.value.slice(0, 4); // Nimmt nur die ersten 4 Kontakte
});

const remainingContacts = computed(() => {
  return assignedTo.value.length - 4; // Gibt die Anzahl der verbleibenden Kontakte zurück
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
    background:black;
    color: white;
    border: 1px solid #ffffff;
    border-radius: 58px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px -4px;
    font-size: 1.2rem;
  }
}
</style>
