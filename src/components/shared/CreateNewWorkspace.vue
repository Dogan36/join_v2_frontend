<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
        <div class="workspace-info-header">
          <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
            <h3>Create New Workspace</h3>
            <div class="workspace-header-content">
            <p>Please enter a name for your new workspace</p>
          </div>
        </div>
        <div class="workspace-info-main">
        <div class="input-content">
        <div class="input-container" >
          <div class="inputfield inputfield-workspace-overlay" :class="{ 'input-error': error }">
            <input id="title" v-model="newWorkspaceName" type="text" placeholder="Enter workspace name"></input>
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>  
        </div>
  
    <div class="button-container">
      <button class="main-button-layout" @click="submitNewWorkspace">
        Create Workspace
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
import { defineEmits,} from "vue";
import { ref } from "vue";
import useWorkspaces from '@/composables/useWorkspaces';
const { createWorkspace } = useWorkspaces();
const emit = defineEmits(["close"]);

const newWorkspaceName = ref("");
const error = ref("");

/**
 * Submits a new workspace if the name is valid.
 * 
 * If the workspace name is empty, an error message is set.
 * Otherwise, it attempts to create the workspace and emits a "close" event upon success.
 * 
 * @async
 */
 const submitNewWorkspace = async () => {
  if (newWorkspaceName.value.trim()) {
    error.value = "";
    try {
      await createWorkspace(newWorkspaceName.value);
      emit("close");
    } catch (e) {
      error.value = e.message;
    }
  } else {
    error.value = "The workspace name is required";
  }
};

/**
 * Closes the modal by emitting the "close" event.
 */
const close = () => {
  emit("close");
};
</script>

