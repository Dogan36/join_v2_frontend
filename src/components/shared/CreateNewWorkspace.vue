<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
        <div class="workspace-info-header">
          <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
            <h3>Create New Workspace</h3>
            <div class="workspace-header-content">
            <p>Please enter a name for your new workspace</p>
          </div>
        </div>
        <div class="workspace-info-main">
        <div class="input-content">
        <div class="input-container" >
          <div class="inputfield inputfield-workspace-overlay" :class="{ 'input-error': error }">
            <input id="title" v-model="newWorkspaceName" type="text" placeholder="Enter workspace name"></input>
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>  
        </div>
  
    <div class="button-container">
      <button class="main-button-layout" @click="submitNewWorkspace">
        Create Workspace
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
import { defineEmits, } from "vue";
import { ref } from "vue";
import useWorkspaces from '@/composables/useWorkspaces';

// Get the createWorkspace function from the composable
/**
 * @vue-method {Function} createWorkspace - A function to create a new workspace.
 * 
 * This function is imported from `useWorkspaces` and is used to send a request to create a new workspace.
 */
const { createWorkspace } = useWorkspaces();

// Define the "close" event to emit
/**
 * @vue-method {Function} close - Closes the modal by emitting the "close" event.
 * 
 * This function emits an event to close the modal where the workspace creation process takes place.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close"]);

// Reactive properties
/**
 * @vue-data {string} newWorkspaceName - The name of the new workspace.
 * 
 * This reactive property holds the name inputted by the user for the new workspace.
 */
const newWorkspaceName = ref("");

/**
 * @vue-data {string} error - The error message related to workspace creation.
 * 
 * This reactive property holds the error message that is displayed when the workspace name is invalid or an error occurs during creation.
 */
const error = ref("");


/**
 * @vue-method {Function} submitNewWorkspace - Submits a new workspace if the name is valid.
 * 
 * This function checks if the workspace name is non-empty, then calls `createWorkspace` to create the new workspace.
 * If successful, it emits a "close" event to close the modal. If there is an error, the error message is set.
 * 
 * @async
 * @returns {void}
 */
const submitNewWorkspace = async () => {
  if (newWorkspaceName.value.trim()) {
    error.value = "";
    try {
      await createWorkspace(newWorkspaceName.value);
      emit("close");
    } catch (e) {
      error.value = e.message;
    }
  } else {
    error.value = "The workspace name is required";
  }
};

/**
 * @vue-method {Function} close - Closes the modal by emitting the "close" event.
 * 
 * This function emits an event to close the modal where the workspace creation process occurs.
 * 
 * @returns {void}
 */
const close = () => {
  emit("close");
};
</script>


