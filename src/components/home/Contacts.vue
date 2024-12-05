<template>
  <div class="contactsContent">
    <Contactslist
      
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
    />
   
  
    <ContactMainContent  @openOverlay="openNewContactOverlay" :selectedContact="selectedContact" />
    <DarkBackground v-if="isNewContactOverlayVisible" @close="closeNewContactOverlay">
      <ContactOverlay></ContactOverlay>
    </DarkBackground>
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
import DarkBackground from "../shared/DarkBackground.vue";
import ContactOverlay from "./ContactsComponents/ContactOverlay.vue";

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

const isNewContactOverlayVisible = ref(false);

const openNewContactOverlay = () => {
  isNewContactOverlayVisible.value = true;
};

const closeNewContactOverlay = () => {
  isNewContactOverlayVisible.value = false;
};

const saveNewContact = () => {
  console.log("Contact saved!");
  closeNewContactOverlay();
};

</script>
