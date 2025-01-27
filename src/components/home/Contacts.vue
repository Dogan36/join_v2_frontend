<template>
  <div class="contactsContent">
    <Contactslist
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
    />

    <ContactMainContent
      @openOverlay="openOverlay"
      :selectedContact="selectedContact"
    />
    <DarkBackground v-if="isOverlayVisible" @close="closeOverlay">
      <ContactOverlay
        v-if="isOverlayVisible"
        :contact="selectedContact"
        :isEditMode="overlayIsEditMode"
        @close="closeOverlay"
      />
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
import DarkBackground from "../shared/DarkBackground.vue";
import ContactOverlay from "./ContactsComponents/ContactOverlay.vue";



const selectedContact = ref(null);
const isOverlayVisible = ref(false);
const overlayIsEditMode = ref(false);


const setActiveContact = (contact) => {
  console.log(contact);
  selectedContact.value = contact;
};

const openOverlay = (isEditMode) => {
  overlayIsEditMode.value = isEditMode; // Bearbeitungsmodus oder Neuanlage
  isOverlayVisible.value = true;
};

const closeOverlay = () => {
  isOverlayVisible.value = false;
};

const saveNewContact = () => {
  console.log("Contact saved!");
  closeOverlay();
};
</script>
