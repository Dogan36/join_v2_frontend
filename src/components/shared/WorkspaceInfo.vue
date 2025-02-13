<template>
  <div v-if="activeModal === 'workspaceInfo'" class="workspace-info-overlay">
    <div v-if="currentWorkspace" class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      <h3>Workspace Details</h3>
      <div class="workspace-header-content">
        <p>
        <span class="label">Workspace:</span>
        <span class="value">{{ currentWorkspace.name }}</span>
      </p>
      <p>
        <span class="label">Owner:</span>
        <span class="value">{{ currentWorkspace.owner.name }}</span>
      </p>
      <p>
        <span class="label">Members:</span>
        <span class="value">{{ currentWorkspace.members.length }}</span>
      </p>
    </div>
    </div>
    <div class="workspace-info-main">
      <div class="buttonContainer">
        <button
          class="main-button-layout"
          @click="setActiveModal('createWorkspace')"
        >
          Create New Workspace
        </button>
        <button
          class="main-button-layout"
          @click="setActiveModal('switchWorkspace')"
        >
          Switch Workspace
        </button>
        <button
          class="main-button-layout"
          @click="setActiveModal('joinWorkspace')"
          @setActiveModal="setActiveModal"
        >
          Join Workspace
        </button>
        <button
          class="main-button-layout"
          @click="setActiveModal('sendInvitation')"
        >
          Share Joining Code
        </button>
        
        <button
          class="main-button-layout button-red"
          @click="setActiveModal('leaveWorkspace')"
        >
          Leave Workspace
        </button>
        <button
          class="secondary-button-layout"
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <div v-else class="workspace-info-content">
    <div class="workspace-info-header">
      <h2>Welcome</h2>
      <p>Create or join workspace to get started</p>
    </div>
    <div class="workspace-info-main">
      <div class="buttonContainer">
        <button
          class="main-button-layout"
          @click="setActiveModal('createWorkspace')"
        >
          Create New Workspace
        </button>
       
        <button
          class="main-button-layout"
          @click="setActiveModal('joinWorkspace')"
          @setActiveModal="setActiveModal"
        >
          Join Workspace
        </button>
        
      
      </div>
    </div>
  </div>
</div>
  <CreateNewWorkspace
    v-if="activeModal === 'createWorkspace'"
    @close="setActiveModal('workspaceInfo')"
  />
  <SwitchWorkspace
    v-if="activeModal === 'switchWorkspace'"
    @close="setActiveModal('workspaceInfo')"
    @setActiveModal="setActiveModal"
  />
  <JoinWorkspace
    v-if="activeModal === 'joinWorkspace'"
    @close="setActiveModal('workspaceInfo')"
  />
  <InviteToWorkspace
    v-if="activeModal === 'sendInvitation'"
    @close="setActiveModal('workspaceInfo')"
  />
  <LeaveWorkspaceConfirmation
    v-if="activeModal === 'leaveWorkspace'"
    @close="setActiveModal('workspaceInfo')"
  />
</template>

<script setup>
import { ref} from "vue";

import CreateNewWorkspace from "./CreateNewWorkspace.vue";
import SwitchWorkspace from "./SwitchWorkspace.vue";
import InviteToWorkspace from "./InviteToWorkspace.vue";
import LeaveWorkspaceConfirmation from "./LeaveWorkspaceConfirmation.vue";
import JoinWorkspace from "./JoinWorkspace.vue";

import {currentWorkspace } from '@/store/state';

const activeModal = ref('workspaceInfo');
const setActiveModal = (modalName) => {
  activeModal.value = modalName;
};
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

</script>

<style>
.logo{
  height: 6.6rem;
  width: 5.5rem;
}

.workspace-info-overlay {
  display: flex;
  position: absolute;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  z-index: 2;
  transform: translate(0%, -50%);
  top: 50%;
  overflow-y: auto;
  max-width: 100vw;
}

.workspace-info-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  p {
    font-size: 2rem;
    margin: 0.5rem 0;
    padding: 0.25rem;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;

   
}
  p span.label {
    font-weight: bold; /* Fett gedruckt für Labels */
    margin-right: 0.5rem; /* Rechter Abstand zum Doppelpunkt */
  }

  p span.value {
    font-weight: normal; /* Normale Schrift für Werte */
    text-align: right;
  }
}

.workspace-info-main {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 2rem;
  width: 40rem;
  .buttonContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
  }
}

.workspace-info-header {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  background-color: var(--main-color);
  color: white;
  max-width: 300px;
}

h3 {
  font-size: 3rem; /* Größere Schrift für Überschriften */
  margin-bottom: 2rem; /* Größerer Abstand zur nächsten Sektion */
  font-weight: bold; /* Fett gedruckt für zusätzliche Betonung */
}

.inputFieldWorkspaceOverlay {
  width: 30rem !important;
}

@media screen and (max-width: 700px) {
  .workspace-info-overlay {
    max-width: 100%;
    
  }

  .workspace-info-header {
    width: 100%;
    max-width: unset;
  }
  .workspace-info-content {
    flex-direction: column;
    width: 100%;
  }
  .workspace-info-header {
    width: 100%;
  }
  .workspace-info-main {
    width: 100%;
    p{
    flex-wrap: wrap;
  }
  .inputContainer{
    margin-bottom : 1rem;
  }
  }
  
}
</style>
