<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
        <div class="workspace-info-header">
          <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
            <h3>Join Workspace</h3>
            
            <p>Please enter the code to join new workspace</p>
        </div>
        <div class="workspace-info-main">
        <div class="input-container" >
            <div class="inputfield inputfield-workspace-overlay" :class="{ 'input-error': error }">
            <input id="title" v-model="workspaceCode" type="text" placeholder="Enter workspace code"></input>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <div class="button-container">
        <button class="main-button-layout" @click="submitWorkspaceCode">
          Join Workspace
        </button>
        <button class="secondary-button-layout" @click="close">
          Close
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed } from "vue";
import { ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";

// Importing the function to join a workspace
/**
 * @vue-method {Function} joinWorkspace - A function to join a workspace using a provided code.
 * 
 * This function is imported from `useWorkspaces` and is used to send a request to join a workspace.
 */
const { joinWorkspace } = useWorkspaces();

// Event emitter to close the modal
/**
 * @vue-method {Function} emit - Emits the "close" event.
 * 
 * This function is used to close the modal where the workspace join process takes place.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close"]);

// Reactive properties
/**
 * @vue-data {string} workspaceCode - The code to join the workspace.
 * 
 * This reactive property holds the code inputted by the user for joining a workspace.
 */
const workspaceCode = ref("");

/**
 * @vue-data {string} error - The error message related to workspace joining.
 * 
 * This reactive property holds the error message when the workspace code is invalid or an error occurs during joining.
 */
const error = ref("");


/**
 * @vue-method {Function} submitWorkspaceCode - Attempts to join the workspace using the provided code.
 * 
 * This async function performs the following steps:
 * - Validates if the workspace code is non-empty.
 * - Sends a request to join the workspace.
 * - If the request is successful, it closes the modal.
 * - If there is an error, it displays an appropriate error message.
 * 
 * @async
 * @returns {Promise<void>} Resolves when the workspace join request is successful or rejected in case of error.
 */
const submitWorkspaceCode = async () => {
  if (workspaceCode.value.trim()) {
    error.value = "";
    try {
      await joinWorkspace(workspaceCode.value);
      emit("close");
    } catch (e) {
      console.log(e);
      if(e == "Error: 404") {
        error.value = "Workspace not found";
      } else if (e == "Error: 400") {
        error.value = "Already a member of this workspace";
      }
    }
  } else {
    error.value = 'The code is required';
  }
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
