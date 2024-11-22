<template>
  <div class="assignedTo">
    <div class="cardAvatar" v-for="avatar in assignedTo" :key="name">
      {{ avatar.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    assignedTo: Array,
    });
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
    background: #0190e0;
    border: 1px solid #ffffff;
    border-radius: 58px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px -4px;
  }
}
</style>
