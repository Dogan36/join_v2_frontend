<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      <h2>Leave Workspace</h2>
   <div class="workspace-header-content">
    <div v-if="currentWorkspace.owner.id === currentUser.id">
        <p>You are the owner of this workspace!</p>
      </div>
      <div v-else>
        <p>You are about to leave the workspace</p>
      </div>
    </div>
  </div>
  <div class="workspace-info-main">
    <div></div>
    <div class="button-container">
      <p v-if="currentWorkspace.owner.id === currentUser.id" style="color: var(--color-warn);">Leaving it will delete it permanently!</p>
        <p>Are you sure?</p>
       
        <button v-if="currentWorkspace.owner.id === currentUser.id" class="main-button-layout button-red" @click="confirmDelete">
          Delete Workspace
        </button>
        <button v-else class="main-button-layout button-red" @click="confirmLeave">
          Leave Workspace
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
import { defineEmits, computed, ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";
import { currentUser, currentWorkspace } from "@/store/state";
const { deleteWorkspace, leaveWorkspace } = useWorkspaces();



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
