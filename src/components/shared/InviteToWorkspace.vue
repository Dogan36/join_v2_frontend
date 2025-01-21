<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info">
        <div class="workspace-info-header">
            <h2>Share Joining Code</h2>
            <img @click="close" src="@/assets/img/blackX.svg" alt="Close" />
        </div>
        <p>Share the Joining Code to others to the workspace</p>
        <div>
          <p>
            <span class="label">Code:</span>
            <span class="value">{{ currentWorkspace.join_code }}</span>
          </p>
        </div>
        <p>Or send the code per e-mail</p>
        <div class="inputContainer">
            <div class="inputField" :class="{ 'input-error': error }">
                <input id="shareCodeEmail" v-model="shareCodeEmail" type="text" placeholder="Invite per e-mail" />
            </div>
            <p v-if="error" class="error-message">{{ error }}</p>
        </div>
        <div class="buttonContainer">
          <button class="main-button-layout" @click="trySend">
            Send Code
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";
import { currentWorkspace, invitePerEmail } from "@/services/workspaceService";
const emit = defineEmits(["close"]);
const shareCodeEmail = ref("");
const error = ref("");

const trySend = async() => {
  resetErrors();
  if (checkForErrors()) {
    console.log("Form validation failed");
  } else {
    try {
    await invitePerEmail(shareCodeEmail.value, currentWorkspace.value.join_code);
    emit("close");
    } catch (e) {
      error.value = e.message;
    }
  }
};



const resetErrors = () => {
  error.value = "";
};

const checkForErrors = () => {
  if (!shareCodeEmail.value) {
    error.value = "Please enter an email address.";
    return true;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shareCodeEmail.value)) {
    error.value = "Please enter a valid email address.";
    return true;
  }
  return false;
};



const close = () => {
  emit("close");
};
</script>

<style scoped>
@import "@/assets/base.css";
@import "@/assets/main.css";
</style>