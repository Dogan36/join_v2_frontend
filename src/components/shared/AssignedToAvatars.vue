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
import useTextColor from '@/composables/useTextColor';

// Get the text color function
/**
 * @vue-method {Function} getTextColor - A function that returns the text color.
 * 
 * This function is used to determine the appropriate text color for the assigned members.
 */
const { getTextColor } = useTextColor();

// Define component props
/**
 * @vue-prop {Array} assignedTo - A list of member IDs assigned to a task or item.
 * 
 * This prop holds the list of assigned member IDs, which will be used to filter and display the assigned members.
 */
const props = defineProps({
  assignedTo: {
    type: Array,
    required: true
  }
});

/**
 * @vue-computed {Array} assignedTo - Computes a list of members assigned to a specific task or item.
 * 
 * This computed property filters the `members` array and returns the members whose `id` is present in the `assignedTo` prop.
 * 
 * @returns {Array<Object>} - The filtered list of assigned members.
 */
const assignedTo = computed(() => {
  return members.value.filter(member => props.assignedTo.includes(member.id));
});

/**
 * @vue-computed {Array} assignedToReduced - Computes a reduced list of assigned members, limited to a maximum of 4.
 * 
 * This computed property takes only the first 4 members from the `assignedTo` list.
 * 
 * @returns {Array<Object>} - The reduced list of assigned members.
 */
const assignedToReduced = computed(() => {
  return assignedTo.value.slice(0, 4); // Takes only the first 4 contacts
});

/**
 * @vue-computed {number} remainingContacts - Computes the number of remaining assigned contacts that are not included in `assignedToReduced`.
 * 
 * This computed property calculates how many assigned members are remaining beyond the first 4.
 * 
 * @returns {number} - The count of remaining assigned members.
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
