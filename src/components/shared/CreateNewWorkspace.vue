<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info">
        <div class="workspace-info-header">
            <h2>Create New Workspace</h2>
            <img @click="close" src="@/assets/img/blackX.svg" alt="" />
        </div>
        <div>
        <div class="inputContainer" >
            <div class="inputField" :class="{ 'input-error': error }">
            <input id="title" v-model="newWorkspaceName" type="text" placeholder="Enter workspace name"></input>
        </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
    <div class="buttonContainer">
      <button class="main-button-layout" @click="validate">
        Create Workspace
      </button>
    </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed } from "vue";
import { ref } from "vue";
import { createWorkspace } from "@/services/workspaceService";
const emit = defineEmits(["close", "setActiveModal"]);
import { API_BASE_URL } from "@/config";

const newWorkspaceName = ref("");
const error = ref("");

const setActiveModal = (modalName) => {
  console.log("Emitting modalName:", modalName);
  emit("setActiveModal", modalName);
};


const validate = () => {
  console.log(newWorkspaceName.value);
  if (!newWorkspaceName.value.trim()) {
    error.value = 'The workspace name is required';
    return false; // ungültig
  } else {
    error.value = "";
    createWorkspace(newWorkspaceName.value);
  }
};
const close = () => {
  emit("close");
};
</script>

<style scoped>
@import "@/assets/base.css";
@import "@/assets/main.css";
</style>
