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
        <div class="buttonContainer">
        <select v-if="filteredWorkspaces.length > 0"  id="workspaceSelect" class="inputField inputFieldWorkspaceOverlay" v-model="selectedWorkspace">
          <option  value="" selected>Bitte Workspace auswählen</option>
          <option
            v-for="workspace in filteredWorkspaces"
            :key="workspace.id"
            :value="workspace"
          >
            {{ workspace.name }}
          </option>
        </select>
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

const { changeWorkspace } = useWorkspaces();
import {currentWorkspace, workspaces } from '@/store/state';

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
  emit("setActiveModal", modalName);
};

const close = () => {
  emit("close");
};
</script>

