<template>
 
  <div class="contactsList">
    <select class="dropdown" v-model="selectedFilter">
      <option class="option" value="all"> All Contacts</option>
      <option value="own"> Own Contacts</option>
      <option value="members"> Workspace Members</option>
    </select>
    <div @click="$emit('openOverlay', false)" class="main-button-layout contactListAddNewContact">New Contact
        <img src="@/assets/img/addContactIcon.svg" alt="">
      </div>
    <div v-if="isEmpty">
      <p>{{ emptyMessage }}</p>
    </div>
    <div class="letterSection" v-else v-for="(group, letter) in groupedContacts" :key="letter">
      <h2 class="letterSeparator">{{ letter }}</h2>
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
import {computed, ref } from "vue";
import ContactslistCard from "./ContactslistCard.vue";
import { defineEmits } from "vue";
import { contacts } from "@/store/state";
import { members } from "@/store/state";
import { currentUser, selectedContact } from "@/store/state";

const selectedFilter = ref('all');

const emit = defineEmits(["updateContact"]); // Definiere ein Event für das Parent
const emitSelectedContact = (contact) => {
  emit("updateContact", contact); // Sende den Kontakt nach oben
};

const combinedContacts = computed(() => {
  const allContacts = contacts.value.map(contact => ({
    ...contact,
    isMember: false  // Markiere, dass es sich um einen Kontakt handelt
  }));
  console.log(allContacts)
  const allMembers = members.value
  .filter(member => member.id !== currentUser.value.id)
  .map(member => ({
    ...member,
    isMember: true  // Markiere, dass es sich um ein Mitglied handelt
  }));
  return selectedFilter.value === 'own' ? allContacts :
         selectedFilter.value === 'members' ? allMembers :
         [...allContacts, ...allMembers];
});

const groupedContacts = computed(() => {
  // Kontakte nach erstem Buchstaben gruppieren
  const groups = combinedContacts.value.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  // Neues Objekt mit sortierten Schlüsseln erzeugen
  const sortedGroups = {};
  Object.keys(groups)
    .sort() // sortiert alphabetisch
    .forEach(letter => {
      sortedGroups[letter] = groups[letter];
    });

  return sortedGroups;
});

const isEmpty = computed(() => {
  return groupedContacts.value && Object.keys(groupedContacts.value).length === 0;
});

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
.contactsList {
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

.contactsList::-webkit-scrollbar {
    width: 10px; /* Breite des Scrollbars */
    border-radius: 100px;
}
.contactsList::-webkit-scrollbar-thumb {
    background-color: var(--main-color); /* Farbe des Scrollbar-Daumen */
    border-radius: 5px; /* Rundung des Scrollbar-Daumen */
}

.letterSeparator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5rem;
  height: 6rem;
  padding: 1rem;
  font-size: 2.1rem;
}

.dropdown {
    cursor: pointer;
    width: 20rem;
    height: 4rem;
    padding: 0.5rem;
    font-size: 1.6rem;
    box-shadow: 0px 0px 4px 0px #00000040;
    border-radius: 5px;
}
.contactListAddNewContact{
  display: none;
}

@media screen and (max-width: 1000px) {
  .contactsList {
    margin: -2rem 0 -2rem -2rem;
    width: 320px;
  }
  
}

@media screen and (max-width: 700px) {
  .contactsList {
    position: absolute;
    height: 100%;
    margin: -1rem -1rem -1rem -1rem;
    width: 100%;
  }
  .contactListAddNewContact{
    display: block;
  }
}

</style>
