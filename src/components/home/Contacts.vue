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
import { selectedContact, contactOverlayIsEditMode, contactOverlayIsVisible } from "@/store/state";

/**
 * @vue-data {boolean} isMobile - Tracks whether the current viewport is mobile (width < 700px).
 * 
 * This reactive property is updated whenever the window is resized.
 */
const isMobile = ref(window.innerWidth < 700);

/**
 * Updates the `isMobile` value whenever the window is resized.
 * 
 * @returns {void}
 */
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 700;
});

/**
 * @vue-computed {boolean} showMainContent - Determines whether the main content should be shown.
 * 
 * On mobile, the main content is shown only if a contact is selected.
 * 
 * @returns {boolean} - `true` if the main content should be shown, otherwise `false`.
 */
const showMainContent = computed(() => {
  return !isMobile.value || selectedContact.value;
});

/**
 * @vue-computed {boolean} showList - Determines whether the contact list should be shown.
 * 
 * On mobile, the contact list is hidden when a contact is selected.
 * 
 * @returns {boolean} - `true` if the contact list should be shown, otherwise `false`.
 */
const showList = computed(() => {
  return !isMobile.value || !selectedContact.value;
});

/**
 * @vue-method {Function} setActiveContact - Sets the currently selected contact.
 * 
 * This function updates the `selectedContact` reactive property with the provided contact.
 *
 * @param {Object} contact - The contact to set as active.
 * @returns {void}
 */
const setActiveContact = (contact) => {
  selectedContact.value = contact;
};

/**
 * @vue-method {Function} openOverlay - Opens the contact overlay in either edit or view mode.
 * 
 * This function updates the `contactOverlayIsEditMode` and `contactOverlayIsVisible` reactive properties.
 * 
 * @param {boolean} isEditMode - Whether the overlay should be in edit mode.
 * @returns {void}
 */
const openOverlay = (isEditMode) => {
  contactOverlayIsEditMode.value = isEditMode;
  contactOverlayIsVisible.value = true;
};

/**
 * @vue-method {Function} closeOverlay - Closes the contact overlay.
 * 
 * This function sets `contactOverlayIsVisible` to `false`, hiding the overlay.
 * 
 * @returns {void}
 */
const closeOverlay = () => {
  contactOverlayIsVisible.value = false;
};
</script>

