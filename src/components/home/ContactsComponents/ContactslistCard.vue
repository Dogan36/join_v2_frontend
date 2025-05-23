<template>
  <div class="contacts-list-card" 
  :class="{ active: isActive }"
  @click="$emit('select', contact)">
    <div class="avatar" :style="{ backgroundColor: contact.color.hex_value, color: getTextColor(contact.color.hex_value) }">
      {{ contact.avatar }}
    </div>
    <div class="info">
      <h3>{{ contact.name }}</h3>
      <p>{{ contact.email }}</p>
    </div>
    <div v-if="contact.isMember" class="contact-image">
      <img src="@/assets/img/logo.svg" alt="Join Logo" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import useTextColor from '@/composables/useTextColor';

// Get the text color function
/**
 * @vue-method {Function} getTextColor - A function that returns the text color.
 * 
 * This function is used to determine the appropriate text color for the contact.
 */
const { getTextColor } = useTextColor();

// Define component props
/**
 * @vue-prop {Object} contact - The contact object containing details such as name, email, etc.
 * 
 * This prop holds the information for a single contact, which can be used to display the contact's details.
 */
const props = defineProps({
  contact: Object,
  
  /**
   * @vue-prop {boolean} isActive - A boolean that indicates whether the contact is active or not.
   * 
   * This prop is used to track if the contact is in an active state.
   */
  isActive: Boolean,
});
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
.contacts-list-card {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 2%;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  width: 290px;
  max-width: 100%;
  .contact-image{
    position: absolute;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 2rem;
    }
  }
  &:hover {
    background: linear-gradient(180deg, #c9c9c9 0%, #d9d6d6 100%);
  }
  &:hover .avatar {
    border: 2px solid #ffffff;
  }
}

.contacts-list-card.active {
  background-color: var(--main-color);
  &:hover {
    background: var(--main-color);
  }
  .info h3 {
    color: #ffffff;
    margin-bottom: 1rem;
  }
  .avatar {
    background-color: unset;
  }
  .contact-image img {
    content: url('@/assets/img/logoInvert.svg');
  }
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  h3 {
    font-size: 2rem;
    white-space: wrap;
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
