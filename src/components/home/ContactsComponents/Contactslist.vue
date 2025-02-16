<template>
 
  <div class="contacts-list">
    <select class="dropdown-contacts" v-model="selectedFilter">
      <option class="option" value="all"> All Contacts</option>
      <option value="own"> Own Contacts</option>
      <option value="members"> Workspace Members</option>
    </select>
    <div @click="$emit('openOverlay', false)" class="main-button-layout contact-list-add-new-contact">New Contact
        <img src="@/assets/img/addContactIcon.svg" alt="">
      </div>
    <div v-if="isEmpty">
      <p>{{ emptyMessage }}</p>
    </div>
    <div class="letter-section" v-else v-for="(group, letter) in groupedContacts" :key="letter">
      <h2 class="letter-separator">{{ letter }}</h2>
      <img src="@/assets/img/contactSeperator.svg" />
      <div v-for="contact in group" :key="contact.id">
        <!-- Nur im Parent den Klick handhaben -->
        <ContactslistCard
          :contact="contact"
          :isActive="contact.email === selectedContact?.email"
          @select="emitSelectedContact(contact)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ContactslistCard from "./ContactslistCard.vue";
import { defineEmits } from "vue";
import { contacts } from "@/store/state";
import { members } from "@/store/state";
import { currentUser, selectedContact } from "@/store/state";

// Ref to track selected filter
/**
 * @vue-data {string} selectedFilter - The selected filter for displaying contacts ('all', 'own', 'members').
 */
const selectedFilter = ref('all');

// Event to update selected contact in the parent component
/**
 * @vue-method {Function} emitSelectedContact - Emits an event to update the selected contact in the parent component.
 *
 * @param {Object} contact - The selected contact to be passed to the parent.
 * @returns {void}
 */
const emit = defineEmits(["updateContact"]);
const emitSelectedContact = (contact) => {
  emit("updateContact", contact); // Pass the selected contact to the parent
};

/**
 * @vue-computed {Array} combinedContacts - Combines and filters contacts and members based on the selected filter.
 * 
 * This computed property returns:
 * - 'all' filter: all contacts and members.
 * - 'own' filter: only contacts.
 * - 'members' filter: only members.
 * 
 * @returns {Array} The combined list of contacts and members based on the selected filter.
 */
const combinedContacts = computed(() => {
  const allContacts = contacts.value.map(contact => ({
    ...contact,
    isMember: false  // Mark as a contact
  }));
  
  const allMembers = members.value
    .filter(member => member.id !== currentUser.value.id)
    .map(member => ({
      ...member,
      isMember: true  // Mark as a member
    }));
  
  return selectedFilter.value === 'own' ? allContacts :
         selectedFilter.value === 'members' ? allMembers :
         [...allContacts, ...allMembers];
});

/**
 * @vue-computed {Object} groupedContacts - Groups contacts by the first letter of their name.
 * 
 * This computed property organizes the contacts into groups based on the first letter of their name,
 * and sorts the groups alphabetically.
 * 
 * @returns {Object} A grouped and sorted object of contacts.
 */
const groupedContacts = computed(() => {
  const groups = combinedContacts.value.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedGroups = {};
  Object.keys(groups)
    .sort() // Sort groups alphabetically
    .forEach(letter => {
      sortedGroups[letter] = groups[letter];
    });

  return sortedGroups;
});

/**
 * @vue-computed {boolean} isEmpty - Checks if there are no contacts in the groupedContacts list.
 * 
 * @returns {boolean} Returns true if there are no contacts, otherwise false.
 */
const isEmpty = computed(() => {
  return groupedContacts.value && Object.keys(groupedContacts.value).length === 0;
});

/**
 * @vue-computed {string} emptyMessage - Returns a message to be displayed when no contacts are available based on the selected filter.
 * 
 * @returns {string} The message to display when no contacts are available.
 */
const emptyMessage = computed(() => {
  if (selectedFilter.value === 'own') {
    return 'No own contacts available.';
  } else if (selectedFilter.value === 'members') {
    return 'No workspace members available.';
  }
  return 'No contacts available.';
});
</script>


<style scoped>
.contacts-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px;
  width: 320px;
  max-width: 100%;
  gap: 10px;
  padding: 10px;
  background-color: white;
  overflow-y: scroll;
  margin: -3.5rem 0 -3.5rem -3.5rem;
  
  img {
    width: 100%;
  }
}

.contacts-list::-webkit-scrollbar {
    width: 10px; /* Breite des Scrollbars */
    border-radius: 100px;
}
.contacts-list::-webkit-scrollbar-thumb {
    background-color: var(--main-color); /* Farbe des Scrollbar-Daumen */
    border-radius: 5px; /* Rundung des Scrollbar-Daumen */
}

.letter-separator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5rem;
  height: 6rem;
  padding: 1rem;
  font-size: 2.1rem;
}

.dropdown-contacts {
  align-self: center;
    cursor: pointer;
    width: 20rem;
    height: 4rem;
    padding: 0.5rem;
    font-size: 1.6rem;
    box-shadow: 0px 0px 4px 0px #00000040;
    border-radius: 5px;
}
.contact-list-add-new-contact{
  display: none;
}

@media screen and (max-width: 1000px) {
  .contacts-list {
    margin: -2rem 0 -2rem -2rem;
    width: 320px;
  }
  
}

@media screen and (max-width: 700px) {
  .contacts-list {
    position: absolute;
    height: 100%;
    margin: -1rem -1rem -1rem -1rem;
    width: 100%;
  }
  .contact-list-add-new-contact{
    display: flex;
  }
}

</style>
