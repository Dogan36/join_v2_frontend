<template>
  <div class="contactsContent">
    <Contactslist
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
    />

    <ContactMainContent
      @openOverlay="openOverlay"
    />
    <DarkBackground v-if="contactOverlayIsVisible" @close="closeOverlay">
      <ContactOverlay
        v-if="contactOverlayIsVisible"
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
import {selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";





const setActiveContact = (contact) => {
  selectedContact.value = contact
};

const openOverlay = (isEditMode) => {
  contactOverlayIsEditMode.value = isEditMode;
  contactOverlayIsVisible.value = true;
};

const closeOverlay = () => {
  contactOverlayIsVisible.value = false;
};


</script>
