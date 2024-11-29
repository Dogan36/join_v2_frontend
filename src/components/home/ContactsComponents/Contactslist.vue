<template>
  <div class="contactsList">
    <div v-for="(group, letter) in groupedContacts" :key="letter">
      <h2 class="letterSeparator">{{ letter }}</h2>
      <img src="@/assets/img/contactSeperator.svg" />
      <div v-for="contact in group" :key="contact.email">
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
import { ref, computed } from "vue";
import ContactslistCard from "./ContactslistCard.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  contacts: Array,
  selectedContact: Object,
});
const contacts = props.contacts;

const emit = defineEmits(["updateContact"]); // Definiere ein Event für das Parent
const emitSelectedContact = (contact) => {
  emit("updateContact", contact); // Sende den Kontakt nach oben
};

const groupedContacts = computed(() => {
  return contacts.reduce((groups, contact) => {
    const letter = contact.firstName[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(contact);
    return groups;
  }, {});
});
</script>

<style>
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
</style>
