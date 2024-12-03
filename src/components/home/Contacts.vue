<template>
  <div class="contactsContent">
    <Contactslist
      
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
    />
   
  
    <ContactMainContent :selectedContact="selectedContact" />
  </div>
</template>

<style scoped>
.contactsContent {
  display: flex;
  gap: 50px;
  height: 100%;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import Contactslist from "./ContactsComponents/Contactslist.vue";
import ContactMainContent from "./ContactsComponents/ContactMainContent.vue";
import { useContacts } from "@/composables/useContacts";



const { contacts, fetchContacts } = useContacts();

onMounted(() => {
  fetchContacts();
  
 
});

const selectedContact = ref(null);

const setActiveContact = (contact) => {
    console.log(contact);
  selectedContact.value = contact;

  // Update den aktiven Kontakt
};



</script>
