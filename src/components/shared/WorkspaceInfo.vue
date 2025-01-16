<template>
  <div v-if="isWorkspaceDetailVisible" class="workspace-info-overlay">
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
  <CreateNewWorkspace
    v-if="activeModal === 'createWorkspace'"
    @close="setActiveModal(null)"
  />
  <SwitchWorkspace
    v-if="activeModal === 'switchWorkspace'"
    @close="setActiveModal(null)"
    @setActiveModal="setActiveModal"
  />
  <JoinWorkspace
    v-if="activeModal === 'joinWorkspace'"
    @close="setActiveModal(null)"
  />
  <InviteToWorkspace
    v-if="activeModal === 'sendInvitation'"
    @close="setActiveModal(null)"
  />
  <LeaveWorkspaceConfirmation
    v-if="activeModal === 'leaveWorkspace'"
    @close="setActiveModal(null)"
  />
</template>

<script setup>
import { currentWorkspace } from "@/services/workspaceService";
import { ref, onMounted } from "vue";

import CreateNewWorkspace from "./CreateNewWorkspace.vue";
import SwitchWorkspace from "./SwitchWorkspace.vue";
import InviteToWorkspace from "./InviteToWorkspace.vue";
import LeaveWorkspaceConfirmation from "./LeaveWorkspaceConfirmation.vue";
import JoinWorkspace from "./JoinWorkspace.vue";

onMounted(() => {
  console.log(currentWorkspace.value);
});
const isWorkspaceDetailVisible = ref(true);
const activeModal = ref(null);

const setActiveModal = (modalName) => {
  console.log("Received modal name:", modalName);
  activeModal.value = modalName;
  isWorkspaceDetailVisible.value = !modalName; // Versteckt das Hauptoverlay, wenn ein Modal aktiv ist.
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
  max-width: 1000px;
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

.button-red {
  background-color: var(--color-warn);
  color: white;

  &:hover {
    background-color: var(--color-warn-hover);
  }
}

h3 {
  font-size: 2rem; /* Größere Schrift für Überschriften */
  color: #2a3647; /* Dunkelblau für bessere Sichtbarkeit und Designkonsistenz */
  margin-bottom: 2rem; /* Größerer Abstand zur nächsten Sektion */
  font-weight: bold; /* Fett gedruckt für zusätzliche Betonung */
}


</style>
