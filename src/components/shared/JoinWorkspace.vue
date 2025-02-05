<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info">
        <div class="workspace-info-header">
            <h2>Join Workspace</h2>
            <img @click="close" src="@/assets/img/blackX.svg" alt="" />
        </div>
        <p>Please enter the code to join new workspace</p>
        <div>
        <div class="inputContainer" >
            <div class="inputField" :class="{ 'input-error': error }">
            <input id="title" v-model="workspaceCode" type="text" placeholder="Enter workspace code"></input>
        </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
    <div class="buttonContainer">
      <button class="main-button-layout" @click="submitWorkspaceCode">
        Join Workspace
      </button>
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

<style scoped>

</style>