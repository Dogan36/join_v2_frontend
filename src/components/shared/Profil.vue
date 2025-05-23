<template>
  <div v-if="activeModal === 'profilInfo'" class="workspace-info-overlay">
    <div class="workspace-info-content">
      <div class="workspace-info-header">
        <img class="logo" src="@/assets/img/logoInvert.svg" alt="Logo" />
        <h2>Profil</h2>
        <div class="workspace-header-content">
          <p>View and edit your profil information for others to see</p>
          <p>Or change your password</p>
        </div>
      </div>
      <div class="workspace-info-main">
        <p>
          <span class="label">Name:</span>
          <span class="value">{{ currentUser.name }}</span>
        </p>
        <p>
          <span class="label">E-mail:</span>
          <span class="value">{{ currentUser.email }}</span>
        </p>
        <p>
          <span class="label">Phone:</span>
          <span class="value">{{ currentUser.phone }}</span>
        </p>
        <div class="button-container">
          <button class="main-button-layout" @click="setActiveModal('editProfil')">
            Edit Profil
          </button>
          <button class="main-button-layout" @click="setActiveModal('changePassword')">
            Change Password
          </button>
          <button class="secondary-button-layout" @click="close">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <EditProfil v-if="activeModal === 'editProfil'" @setActiveModal="setActiveModal('profilInfo')" />
  <ChangePassword v-if="activeModal === 'changePassword'" @setActiveModal="setActiveModal('profilInfo')" />
</template>

<script setup>
import { currentUser } from "@/store/state";
import { defineEmits, ref } from "vue";
import EditProfil from "./EditProfil.vue";
import ChangePassword from "./ChangePassword.vue";

// Reactive property to track the active modal
/**
 * @vue-data {string} activeModal - The currently active modal.
 * 
 * This reactive property holds the name of the currently active modal (e.g., 'profilInfo').
 */
const activeModal = ref('profilInfo');

// Event emitter to close the modal
/**
 * @vue-method {Function} emit - Emits the "close" event.
 * 
 * This function is used to close the modal by emitting the "close" event.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close"]);

/**
 * @vue-method {Function} close - Closes the modal by emitting the "close" event.
 * 
 * This function emits the "close" event to close the modal.
 * 
 * @returns {void}
 */
const close = () => {
  emit("close");
};

/**
 * @vue-method {Function} setActiveModal - Sets the currently active modal.
 * 
 * This function sets the `activeModal` to the provided modal name, which switches the currently active modal.
 * 
 * @param {string} modalName - The name of the modal to activate.
 * @returns {void}
 */
const setActiveModal = (modalName) => {
  activeModal.value = modalName;
};
</script>
