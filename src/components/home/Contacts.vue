<template>
  <div class="contactsContent">
    <Contactslist
      :selectedContact="selectedContact"
      @updateContact="setActiveContact"
      @openOverlay="openOverlay"
      v-if="showList"
    />

    <ContactMainContent v-if="showMainContent"
      @openOverlay="openOverlay"
      @close="setActiveContact(null)"
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
  gap: 2rem;
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 700px) {
 
}
</style>

<script setup>
import { onMounted, ref, computed } from "vue";
import Contactslist from "./ContactsComponents/Contactslist.vue";
import ContactMainContent from "./ContactsComponents/ContactMainContent.vue";
import DarkBackground from "../shared/DarkBackground.vue";
import ContactOverlay from "./ContactsComponents/ContactOverlay.vue";
import {selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";


const isMobile = ref(window.innerWidth < 700);
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 700;
});

const showMainContent = computed(() => {
  console.log(selectedContact.value);
  return !isMobile.value || selectedContact.value;
});

const showList = computed(() => {
  return !isMobile.value || !selectedContact.value;
});


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
