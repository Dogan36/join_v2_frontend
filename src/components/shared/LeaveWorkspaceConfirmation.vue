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
        <p>You are about to leave the workspace</p>
        <p>Are you sure?</p>
      </div>
      <div class="buttonContainer">
        <button class="secondary-button-layout" @click="close">
          Cancel
        </button>
        <button v-if="currentWorkspace.owner.id === currentUser.id" class="main-button-layout button-red" @click="confirmDelete">
          Delete Workspace
        </button>
        <button v-else class="main-button-layout button-red" @click="confirmLeave">
          Leave Workspace
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";
import { currentUser } from "@/store/state";
const { currentWorkspace, deleteWorkspace, leaveWorkspace } = useWorkspaces();



const emit = defineEmits(["close", "setActiveModal"]);

const confirmDelete = () => {
  deleteWorkspace(currentWorkspace.id);
  emit("close");
};

const confirmLeave = () => {
  leaveWorkspace(currentWorkspace.id);
  emit("close");
};

const close = () => {
  emit("close");
};
</script>

<style scoped>
@import "@/assets/base.css";
@import "@/assets/main.css";

</style>