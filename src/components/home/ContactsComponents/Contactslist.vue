<template>
 
  <div class="contactsList">
    <select class="inputField dropDown" v-model="selectedFilter">
      <option class="option" value="all"> All Contacts</option>
      <option value="own"> Own Contacts</option>
      <option value="members"> Workspace Members</option>
    </select>
    <div v-if="isEmpty">
      <p>{{ emptyMessage }}</p>
    </div>
    <div v-else v-for="(group, letter) in groupedContacts" :key="letter">
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
import { defineProps, defineEmits } from "vue";
import { contacts } from "@/store/state";
import { members } from "@/store/state";
import { currentUser } from "@/store/state";
const props = defineProps({
  selectedContact: Object || null,
});
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
  console.log(contacts.value);
  // Hier wird eine Gruppierung der Kontakte nach dem ersten Buchstaben des Vornamens erstellt
  return combinedContacts.value.reduce((groups, contact) => {
    // Den ersten Buchstaben des Vornamens extrahieren und in Großbuchstaben umwandeln
    const firstLetter = contact.name[0].toUpperCase();

    // Überprüfen, ob es bereits eine Gruppe für diesen Buchstaben gibt
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }

    // Den Kontakt der entsprechenden Gruppe hinzufügen
    groups[firstLetter].push(contact);
    return groups;
  }, {});
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
  width: 420px;
  max-width: 100%;
  gap: 10px;
  padding: 10px;
  background-color: white;
  overflow-y: scroll;
  margin: -50px 0 -50px -50px;
  
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

.dropDown {
    cursor: pointer;
}

</style>
