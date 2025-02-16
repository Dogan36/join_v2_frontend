<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
        <div class="workspace-info-header">
          <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
          <h3>Share Joining Code</h3>
          <p>Invite others to the workingspace by sharing the code</p>
        </div>
        <div class="workspace-info-main">
        
            <p>
              <span>  Copy Code:</span></p>
            <div @click="copyToClipboard" class="copy-code">
              <div class="tooltip">
                <img  class="clipboard" src="@/assets/img/clipboard.svg" alt="Clipboard Icon">
                <span class="tooltiptext">{{ copyToClipboardText }}</span>
              </div>
              <span id="join_code"> {{ currentWorkspace.join_code }}</span></div>
            
       
        <p>Or send the code per e-mail</p>
        <div class="input-container">
            <div class="inputfield inputfield-workspace-overlay" :class="{ 'input-error': error }">
                <input v-model="shareCodeEmail" type="text" placeholder="Invite per e-mail" /><img src="@/assets/img/loginMail.svg" alt="Mail Icon" />
            </div>
            <p v-if="error" class="error-message">{{ error }}</p>
        </div>
        <div class="button-container">
          <button class="main-button-layout" @click="trySend">
            Send Code
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
import { defineEmits, ref } from "vue";
import useWorkspaces from "@/composables/useWorkspaces";
const { invitePerEmail } = useWorkspaces();
import { currentWorkspace } from "@/store/state";

// Event emitter for closing the modal
/**
 * @vue-method {Function} emit - Emits the "close" event.
 * 
 * This function is used to close the modal where the invite process is taking place.
 * 
 * @returns {void}
 */
const emit = defineEmits(["close"]);

// Reactive properties
/**
 * @vue-data {string} shareCodeEmail - The email address to send the invitation to.
 * 
 * This reactive property holds the email address inputted by the user for sending an invitation.
 */
const shareCodeEmail = ref("");

/**
 * @vue-data {string} error - The error message related to email validation or invitation failure.
 * 
 * This reactive property holds the error message when validation fails or if there's an issue sending the invitation.
 */
const error = ref("");

/**
 * @vue-data {string} copyToClipboardText - The text displayed on the "Copy to Clipboard" button.
 * 
 * This reactive property holds the text shown on the button, which changes once the workspace join code is copied.
 */
const copyToClipboardText = ref("Copy to Clipboard");

/**
 * @vue-method {Function} trySend - Attempts to send an invitation via email.
 * 
 * This async function performs the following steps:
 * - Validates the email input and checks for errors.
 * - If validation fails, it exits early.
 * - If validation passes, it sends the invitation and closes the modal upon success.
 * - If there's an error during the invitation process, it displays an error message.
 * 
 * @async
 * @returns {Promise<void>} Resolves when the invitation is sent successfully or rejected in case of error.
 */
const trySend = async () => {
  resetErrors();
  if (checkForErrors()) {
    return;
  }
  try {
    await invitePerEmail(shareCodeEmail.value, currentWorkspace.value.join_code);
    emit("close");
  } catch (e) {
    error.value = e.message;
  }
};

/**
 * @vue-method {Function} resetErrors - Resets the error message.
 * 
 * This function clears any previously set error messages.
 * 
 * @returns {void}
 */
const resetErrors = () => {
  error.value = "";
};

/**
 * @vue-method {Function} checkForErrors - Validates the email input and sets an error message if necessary.
 * 
 * This function checks if the email input is empty or invalid and sets an appropriate error message.
 * 
 * @returns {boolean} `true` if there are validation errors, otherwise `false`.
 */
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

/**
 * @vue-method {Function} close - Closes the modal by emitting the "close" event.
 * 
 * This function emits the "close" event to close the modal.
 * 
 * @returns {void}
 */
const close = () => {
  emit("close");
};

/**
 * @vue-method {Function} copyToClipboard - Copies the workspace join code to the clipboard.
 * 
 * This function copies the text content of the workspace join code to the clipboard.
 * It also updates the UI to indicate that the text has been successfully copied.
 * 
 * @returns {void}
 */
const copyToClipboard = () => {
  const textToCopy = document.getElementById("join_code").innerText;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      copyToClipboardText.value = "Copied!";
    })
    .catch(err => {
      console.error("Error copying text:", err);
    });
};

</script>


<style scoped>

.copy-code{
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  .clipboard{
    height: 4rem;
    width: 4rem;
  }
  span{
    font-size: 2.5rem;
    font-weight: bold;
  }
}
.tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 130px;
    background-color: var(--main-color);
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .copy-code:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

</style>