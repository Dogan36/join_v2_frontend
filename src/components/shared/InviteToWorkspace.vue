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
            <div class="copyCode">
              <div class="tooltip">
                <img @click="copyToClipboard" class="clipboard" src="@/assets/img/clipboard.svg" alt="Clipboard Icon">
                <span class="tooltiptext">{{ copyToClipboardText }}</span>
              </div>
              <span id="join_code" class="value"> {{ currentWorkspace.join_code }}</span></div>
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
const copyToClipboardText = ref("Copy to Clipboard");
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

const  copyToClipboard = () => {

  const textToCopy = document.getElementById("join_code").innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
  copyToClipboardText.value = "Copied!";
  }).catch(err => {
    console.error('Fehler beim Kopieren des Textes: ', err);
  });
}
</script>

<style scoped>
@import "@/assets/base.css";
@import "@/assets/main.css";

.copyCode{
  display: flex;
  align-items: center;
  gap: 1rem;
  .clipboard{
    height: 3rem;
    width: 3rem;
    cursor: pointer;
  }
}
.tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: var(--main-color);
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

</style>