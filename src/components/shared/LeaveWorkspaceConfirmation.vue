<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info">
    <div class="workspace-info-header">
      <h2>Leave Workspace</h2>
      <img @click="close" src="@/assets/img/blackX.svg" alt="">
    </div>
      <div v-if="currentWorkspace.owner.id === currentUser.id">
        <p>You are the owner of this workspaces!</p>
        <p>Leaving it will delete it permanently!</p>
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
import { currentWorkspace, workspaces, changeWorkspace } from "@/services/workspaceService";
import { currentUser } from "@/store/state";



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