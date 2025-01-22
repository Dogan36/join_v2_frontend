<template>
  <div v-if="activeModal === 'workspaceInfo'" class="workspace-info-overlay">
    <div v-if="currentWorkspace">
    <div class="workspace-info-header">
      <h2>Workspace Details</h2>
      <img @click="close" src="@/assets/img/blackX.svg" alt="" />
    </div>
    <div class="workspace-info">
      <h3>{{ currentWorkspace.name }}</h3>
      <p>
        <span class="label">Owner:</span>
        <span class="value">{{ currentWorkspace.owner.name }}</span>
      </p>
      <p>
        <span class="label">Members:</span>
        <span class="value">{{ currentWorkspace.members.length }}</span>
      </p>
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
      </div>
    </div>
  </div>
  <div v-else>

    <div class="workspace-info-header">
      <h2>Welcome</h2>
    </div>
    <p>Create or join workspace to get started</p>
    <div class="workspace-info">
      
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
import  useWorkspaces from "@/composables/useWorkspaces";
import { onMounted, ref,  } from "vue";

import CreateNewWorkspace from "./CreateNewWorkspace.vue";
import SwitchWorkspace from "./SwitchWorkspace.vue";
import InviteToWorkspace from "./InviteToWorkspace.vue";
import LeaveWorkspaceConfirmation from "./LeaveWorkspaceConfirmation.vue";
import JoinWorkspace from "./JoinWorkspace.vue";

const { currentWorkspace } = useWorkspaces()

onMounted(() => {
  console.log("Current Workspace:", currentWorkspace.value);
});
const activeModal = ref('workspaceInfo');

const setActiveModal = (modalName) => {
  console.log("Received modal name:", modalName);
  activeModal.value = modalName;
};
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};


</script>

<style>
@import "@/assets/base.css";
@import "@/assets/main.css";
.workspace-info-overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  z-index: 2;
  transform: translate(-50%, -50%);
  top: 50%;
  padding: 2rem;
  max-width: 330px;
  overflow-y: auto;
  p {
    font-size: 2rem;
    color: #333;
    margin: 0.5rem 0;
    padding: 0.25rem;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    &:last-child {
      border-bottom: none;
    }
    p:last-child {
      border-bottom: none;
  }
}
  p span.label {
    font-weight: bold; /* Fett gedruckt für Labels */
    margin-right: 0.5rem; /* Rechter Abstand zum Doppelpunkt */
  }

  p span.value {
    font-weight: normal; /* Normale Schrift für Werte */
    color: #555; /* Etwas heller als der Text der Labels für visuelle Trennung */
  }
}

.workspace-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .buttonContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
  }
}

.workspace-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  img {
    cursor: pointer;
  }
}

h3 {
  font-size: 2rem; /* Größere Schrift für Überschriften */
  color: #2a3647; /* Dunkelblau für bessere Sichtbarkeit und Designkonsistenz */
  margin-bottom: 2rem; /* Größerer Abstand zur nächsten Sektion */
  font-weight: bold; /* Fett gedruckt für zusätzliche Betonung */
}


</style>
