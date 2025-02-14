<template>
  <div class="contacts-content">
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
.contacts-content {
  display: flex;
  gap: 2rem;
  height: 100%;
  width: 100%;
}

</style>

<script setup>
import { onMounted, ref, computed } from "vue";
import Contactslist from "./ContactsComponents/Contactslist.vue";
import ContactMainContent from "./ContactsComponents/ContactMainContent.vue";
import DarkBackground from "../shared/DarkBackground.vue";
import ContactOverlay from "./ContactsComponents/ContactOverlay.vue";
import {selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";

/**
 * Tracks whether the current viewport is mobile (width < 700px).
 */
 const isMobile = ref(window.innerWidth < 700);
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 700;
});

/**
 * Determines whether the main content should be shown.
 * On mobile, it is shown only if a contact is selected.
 */
const showMainContent = computed(() => {
  return !isMobile.value || selectedContact.value;
});

/**
 * Determines whether the contact list should be shown.
 * On mobile, it is hidden when a contact is selected.
 */
const showList = computed(() => {
  return !isMobile.value || !selectedContact.value;
});

/**
 * Sets the currently selected contact.
 *
 * @param {Object} contact - The contact to set as active.
 */
const setActiveContact = (contact) => {
  selectedContact.value = contact;
};

/**
 * Opens the contact overlay in either edit or view mode.
 *
 * @param {boolean} isEditMode - Whether the overlay should be in edit mode.
 */
const openOverlay = (isEditMode) => {
  contactOverlayIsEditMode.value = isEditMode;
  contactOverlayIsVisible.value = true;
};

/**
 * Closes the contact overlay.
 */
const closeOverlay = () => {
  contactOverlayIsVisible.value = false;
};
</script>
