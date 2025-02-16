<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      <h2>Leave Workspace</h2>
   <div class="workspace-header-content">
    <div v-if="currentWorkspace.owner.id === currentUser.id">
        <p>You are the owner of this workspace!</p>
      </div>
      <div v-else>
        <p>You are about to leave the workspace</p>
      </div>
    </div>
  </div>
  <div class="workspace-info-main">
    <div></div>
    <div class="button-container">
      <p v-if="currentWorkspace.owner.id === currentUser.id" style="color: var(--color-warn);">Leaving it will delete it permanently!</p>
        <p>Are you sure?</p>
       
        <button v-if="currentWorkspace.owner.id === currentUser.id" class="main-button-layout button-red" @click="confirmDelete">
          Delete Workspace
        </button>
        <button v-else class="main-button-layout button-red" @click="confirmLeave">
          Leave Workspace
        </button>
        <button class="secondary-button-layout" @click="close">
          Cancel
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";
import { currentUser, currentWorkspace } from "@/store/state";

// Importing the functions to delete or leave a workspace
/**
 * @vue-method {Function} deleteWorkspace - A function to delete a workspace.
 * 
 * This function is imported from `useWorkspaces` and is used to send a request to delete the current workspace.
 */
const { deleteWorkspace, leaveWorkspace } = useWorkspaces();

// Event emitter to close the modal or set the active modal
/**
 * @vue-method {Function} emit - Emits events like "close" and "setActiveModal".
 * 
 * This function allows for closing the modal and setting an active modal.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close", "setActiveModal"]);

/**
 * @vue-method {Function} confirmDelete - Confirms and executes the deletion of the current workspace.
 * 
 * This function calls `deleteWorkspace` to delete the current workspace and closes the modal.
 * 
 * @returns {void}
 */
const confirmDelete = () => {
  deleteWorkspace(currentWorkspace.id);
  emit("close");
};

/**
 * @vue-method {Function} confirmLeave - Confirms and executes leaving the current workspace.
 * 
 * This function calls `leaveWorkspace` to leave the current workspace and closes the modal.
 * 
 * @returns {void}
 */
const confirmLeave = () => {
  leaveWorkspace(currentWorkspace.id);
  emit("close");
};

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
</script>

