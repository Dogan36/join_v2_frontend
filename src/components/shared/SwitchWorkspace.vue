<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info">
    <div class="workspace-info-header">
      <h2>Switch Workspace</h2>
      <img @click="close" src="@/assets/img/blackX.svg" alt="">
    </div>
      <div v-if="filteredWorkspaces.length === 0">
        <p>You are not a member of any other workspaces.</p>
        <p>Join a workspace or create a new one.</p>
      </div>
      <div v-else>
        <p>Choose Workspace</p>
      
        <select id="workspaceSelect" class="inputField " v-model="selectedWorkspace">
          <option  value="" selected>Bitte Workspace auswählen</option>
          <option
            v-for="workspace in filteredWorkspaces"
            :key="workspace.id"
            :value="workspace"
          >
            {{ workspace.name }}
          </option>
        </select>
      </div>
      <div class="buttonContainer">
        <button v-if="filteredWorkspaces.length === 0"  class="secondary-button-layout" @click="setActiveModal('createWorkspace')">
          Create New Workspace
        </button>
        <button v-if="filteredWorkspaces.length === 0" class="main-button-layout" @click="setActiveModal('joinWorkspace')">
          Join Workspace
        </button>
        <button v-else class="main-button-layout" @click="confirmSwitch">
          Switch Workspace
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, ref, onMounted } from "vue";
import { currentWorkspace, workspaces, changeWorkspace, loadWorkspaces } from "@/services/workspaceService";


onMounted(async () => {
  try {
    loadWorkspaces();
  } catch (error) {
    console.error("Error loading workspaces:", error);
    // Handle error appropriately, possibly setting an error state or showing a notification
  }
});

const emit = defineEmits(["close", "setActiveModal"]);
const selectedWorkspace = ref('');
const filteredWorkspaces = computed(() => {
  return workspaces.value.filter(
    (workspace) => workspace.id !== currentWorkspace.value.id
  );
});
const confirmSwitch = () => {
  changeWorkspace(selectedWorkspace.value);
  emit("close");
};

const setActiveModal = (modalName) => {
  console.log("Emitting modalName:", modalName);
  emit("setActiveModal", modalName);
};


const close = () => {
  emit("close");
};
</script>


