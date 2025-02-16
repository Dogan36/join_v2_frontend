<template>
  <div class="input-container">
            <label class="title">Assigned to</label>
    <div class="inputfield dropdown">
      <!-- Toggle Dropdown -->
      <div @click="toggleSelectContacts" class="dropdown-option">
        <div class="dropdown-option-content">Select Contacts to Assign</div>
        <img class="arrow-icon-dropdown" src="@/assets/img/arrowIcon.svg" :style="{ transform: selectingContacts ? 'rotate(180deg)' : 'rotate(0deg)' }" alt="Delete" />
      </div>
  
      <!-- Dropdown Options -->
      <label  class="dropdown-option"
        v-for="contact in contacts" 
        :key="contact.id" 
        v-if="selectingContacts"
        >

        <div class="dropdown-option-content">
          {{ contact.name }}
        </div>
        <input 
          type="checkbox" 
          v-model="contact.selected"
        />
      </label>
    </div>
    <AssignedToAvatars :assignedTo="selectedContacts"></AssignedToAvatars>
  </div>
  </template>

<script setup>
import { ref, computed } from 'vue';
import AssignedToAvatars from '@/components/shared/AssignedToAvatars.vue';
import { members } from "@/store/state";

// State that indicates whether the user is selecting contacts
/**
 * @vue-data {boolean} selectingContacts - Indicates whether the user is in contact selection mode.
 */
const selectingContacts = ref(false);

// Initialize contacts with selected state
/**
 * @vue-data {Array} contacts - A list of contacts, each containing a `selected` state.
 */
const contacts = ref(members.value.map(member => ({
  ...member,
  selected: false,
})));

// Computed property for selected contacts
/**
 * @vue-computed {Array} selectedContacts - A list of IDs of the selected contacts.
 */
const selectedContacts = computed(() => {
  return contacts.value.filter(contact => contact.selected).map(contact => contact.id);
});

/**
 * Clears the selected state of all contacts and resets the contact selection mode.
 *
 * This function maps over the current list of contacts, setting the `selected` property of each contact to `false`.
 * It also sets `selectingContacts` to false to indicate that the user is no longer in the process of selecting contacts.
 */
const clear = () => {
  contacts.value = contacts.value.map(contact => ({
    ...contact,
    selected: false,
  }));
  selectingContacts.value = false;
};

/**
 * Sets the selected state of contacts based on the provided list of contact IDs.
 *
 * This function maps over the current list of contacts, setting the `selected` property of each contact to `true` if the contact's ID is included in the provided list of contact IDs.
 *
 * @param {number[]} selectedContactsIds - The list of contact IDs to set as selected.
 */
const setContacts = (selectedContactsIds) => {
  contacts.value = contacts.value.map(contact => ({
    ...contact,
    selected: selectedContactsIds.includes(contact.id),
  }));
};

/**
 * Toggles the contact selection mode.
 *
 * This function toggles the value of `selectingContacts`, indicating whether the user is currently in the process of selecting contacts.
 */
const toggleSelectContacts = () => {
  selectingContacts.value = !selectingContacts.value;
};

defineExpose({
  selectedContacts,
  setContacts,
  clear,
});
</script>
