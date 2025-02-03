<template>
  <div class="inputContainer">
            <label class="title">Assigned to</label>
            
       
    <div class="inputField dropDown">
      <!-- Toggle Dropdown -->
      <div @click="toggleSelectContacts" class="dropDownOption">
        <div class="dropDownOptionContent">Select Contacts to Assign</div>
        <img class="arrowIcon" src="@/assets/img/arrowIcon.svg" :style="{ transform: selectingContacts ? 'rotate(180deg)' : 'rotate(0deg)' }" alt="Delete" />
      </div>
  
      <!-- Dropdown Options -->
      <label  class="dropDownOption"
        v-for="contact in contacts" 
        :key="contact.id" 
        v-if="selectingContacts"
        >

        <div class="dropDownOptionContent">
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
const selectingContacts = ref(false);

// Sample contact list
const contacts = ref(members.value.map(member => ({
  ...member,
  selected: false,
})));

const selectedContacts = computed(() => {
  return contacts.value.filter(contact => contact.selected);
});
// Toggle dropdown visibility
const toggleSelectContacts = () => {
  selectingContacts.value = !selectingContacts.value;
};

defineExpose({
 selectedContacts,
});

</script>