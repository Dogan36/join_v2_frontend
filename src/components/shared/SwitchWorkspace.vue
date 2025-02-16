<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      <h3>Switch Workspace</h3>
      <div v-if="filteredWorkspaces.length === 0">
        <p>You are not a member of any other workspaces.</p>
        <p>Join a workspace or create a new one.</p>
      </div>
      <div v-else>
        <p>Choose a workspace to switch to</p>
      </div>
    </div>
      <div class="workspace-info-main">
        <select v-if="filteredWorkspaces.length > 0" class="inputfield inputfield-workspace-overlay dropdown-workspace" v-model="selectedWorkspace">
          <option  value="" selected>Bitte Workspace auswählen</option>
          <option
            v-for="workspace in filteredWorkspaces"
            :key="workspace.id"
            :value="workspace"
          >
            {{ workspace.name }}
          </option>
        </select>
        <div class="button-container">
        <button v-if="filteredWorkspaces.length === 0"  class="secondary-button-layout" @click="setActiveModal('createWorkspace')">
          Create New Workspace
        </button>
        <button v-if="filteredWorkspaces.length === 0" class="main-button-layout" @click="setActiveModal('joinWorkspace')">
          Join Workspace
        </button>
        <button v-else class="main-button-layout" @click="confirmSwitch">
          Switch Workspace
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
import { defineEmits, computed, ref, onMounted } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";

// Importing function to change workspace
/**
 * @vue-method {Function} changeWorkspace - A function to switch to a different workspace.
 * 
 * This function is imported from `useWorkspaces` and is used to switch to the selected workspace.
 */
const { changeWorkspace } = useWorkspaces();

import { currentWorkspace, workspaces } from '@/store/state';

// Event emitter to close the modal or set the active modal
/**
 * @vue-method {Function} emit - Emits events like "close" and "setActiveModal".
 * 
 * This function allows for closing the modal and setting an active modal.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close", "setActiveModal"]);

// Reactive property for selected workspace
/**
 * @vue-data {string} selectedWorkspace - The ID of the selected workspace.
 * 
 * This reactive property holds the ID of the workspace that the user selects to switch to.
 */
const selectedWorkspace = ref('');

/**
 * @vue-computed {Array} filteredWorkspaces - Computes a filtered list of workspaces, excluding the currently active workspace.
 * 
 * This computed property filters out the current workspace from the list of workspaces, providing only other available workspaces.
 * 
 * @returns {Array} - A filtered list of workspaces.
 */
const filteredWorkspaces = computed(() => {
  return workspaces.value.filter(
    (workspace) => workspace.id !== currentWorkspace.value.id
  );
});

/**
 * @vue-method {Function} confirmSwitch - Confirms and executes the switch to the selected workspace.
 * 
 * This function switches to the selected workspace and then closes the modal.
 * 
 * @returns {void}
 */
const confirmSwitch = () => {
  changeWorkspace(selectedWorkspace.value);
  emit("close");
};

/**
 * @vue-method {Function} setActiveModal - Sets the currently active modal by emitting an event.
 * 
 * This function activates the modal by emitting the name of the modal to be displayed.
 * 
 * @param {string} modalName - The name of the modal to activate.
 * @returns {void}
 */
const setActiveModal = (modalName) => {
  emit("setActiveModal", modalName);
};

/**
 * @vue-method {Function} close - Closes the modal by emitting the "close" event.
 * 
 * This function closes the modal by emitting the "close" event.
 * 
 * @returns {void}
 */
const close = () => {
  emit("close");
};
</script>

<style scoped>
.dropdown-workspace{
    align-self: center;
    cursor: pointer;
    width: 20rem;
    height: 4rem;
    padding: 0.5rem;
    font-size: 1.6rem;
    box-shadow: 0px 0px 4px 0px #00000040;
    border-radius: 5px;
}

@media screen and (max-width: 700px) {
    .workspace-info-main {
        .dropdown-workspace {
            margin-bottom: 1rem;
        }
    }
}
</style>

