<template>
  <div class="assigned-to">
    <div
      class="card-avatar"
      :key="contact.id"
      :style="{ background: contact.color.hex_value, color: getTextColor(contact.color.hex_value) }"
      v-for="contact in assignedToReduced"
    >
    
      {{ contact.avatar }}
    </div>
    <div
      class="card-avatar"
      v-if="remainingContacts > 0"
    >
    +{{ remainingContacts }}
    </div>

  </div>
</template>

<script setup>
import { members } from '@/store/state';
import { defineProps, computed, onMounted, watch } from 'vue';
import  useTextColor  from '@/composables/useTextColor';
const { getTextColor } = useTextColor();

const props = defineProps({
  assignedTo: {
    type: Array,
    required: true
  }
});

/**
 * Computes a list of members assigned to a specific task or item.
 *
 * @type {import('vue').ComputedRef<Array<Object>>}
 */
 const assignedTo = computed(() => {
  return members.value.filter(member => props.assignedTo.includes(member.id));
});

/**
 * Computes a reduced list of assigned members, limited to a maximum of 4.
 *
 * @type {import('vue').ComputedRef<Array<Object>>}
 */
const assignedToReduced = computed(() => {
  return assignedTo.value.slice(0, 4); // Takes only the first 4 contacts
});

/**
 * Computes the number of remaining assigned contacts that are not included in `assignedToReduced`.
 *
 * @type {import('vue').ComputedRef<number>}
 */
const remainingContacts = computed(() => {
  return assignedTo.value.length - 4; // Returns the count of remaining contacts
});
</script>

<style scoped>
.assigned-to {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .card-avatar {
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
