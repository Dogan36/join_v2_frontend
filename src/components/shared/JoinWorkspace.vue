<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
        <div class="workspace-info-header">
          <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
            <h3>Join Workspace</h3>
            
            <p>Please enter the code to join new workspace</p>
        </div>
        <div class="workspace-info-main">
        <div class="input-container" >
            <div class="inputfield inputfield-workspace-overlay" :class="{ 'input-error': error }">
            <input id="title" v-model="workspaceCode" type="text" placeholder="Enter workspace code"></input>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <div class="button-container">
        <button class="main-button-layout" @click="submitWorkspaceCode">
          Join Workspace
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
import { defineEmits, computed } from "vue";
import { ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";
const { joinWorkspace } = useWorkspaces();
const emit = defineEmits(["close"]);

const workspaceCode = ref("");
const error = ref("");

const submitWorkspaceCode = async () => {
  if (workspaceCode.value.trim()) {
    error.value = "";
    try {
      await joinWorkspace(workspaceCode.value);
      emit("close");
    } catch (e) {
     console
     if(e == "Error: 404"){
      error.value = "Workspace not foundaa";
     }
      else if (e == "Error: 400") {
        error.value = "Already member of this workspace";
      }
    }
  } else {
    error.value = 'The code is required';
  }
};

const close = () => {
  emit("close");
};

</script>
