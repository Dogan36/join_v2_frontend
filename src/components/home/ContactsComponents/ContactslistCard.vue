<template>
  <div class="contactslistCard" 
  :class="{ active: isActive }"
  @click="$emit('select', contact)">
    <div class="avatar" :style="{ backgroundColor: contact.color }">
      {{ contact.avatar }}
    </div>
    <div class="info">
      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <p>{{ contact.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  contact: Object,
  isActive: Boolean,
});
</script>

<style scoped>
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 8px;
  gap: 10px;
  width: 35px;
  height: 35px;
  background: #0190e0;
  border: 1px solid #ffffff;
  border-radius: 58px;
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
  width: 300px;
  height: 49px;
  overflow: hidden;

  h3 {
    font-weight: 400;
    font-size: 2.1rem;
    line-height: 120%;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: #000000;
  }

  p {
    height: 19px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    color: #007cee;
  }
}
</style>
