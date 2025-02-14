<template>
  <FormLayout>
    <div class="form-header">
      <img class="go-back" src="@/assets/img/arrowLeft.svg" alt="Back Arrow" @click="goBack" />
      <h1>I forgot my password</h1>
      <div style="width: 37px;"></div>
    </div>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
      <span class="subheader">Don't worry! Enter your email address and we will send you a link to reset your password.</span>
    <form class="form" @submit.prevent="tryRequest" novalidate>
      <InputField
        v-model="forgotEmail"
        type="email"
        placeholder="Enter your email"
        autocomplete="current-email"
        icon="src/assets/img/loginMail.svg"
        :error="emailError || emailFormatError || emailNotFoundError"
        :errorMessages="{
          emailError: emailError ? 'Email is required' : '',
          emailFormatError: emailFormatError ? 'Invalid email format' : '',
          emailNotFoundError: emailNotFoundError ? 'Email not found' : '',
        }"
      />
      <div class="login-buttons">
        <button class="main-button-layout" type="submit">Submit</button>
      </div>
    </form>
  </FormLayout>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";
const { showOverlay, hideOverlay } = useLoadingOverlay();
const  {showConfirmation} = useConfirmationOverlay();
import { API_BASE_URL } from "@/config";
const emit = defineEmits();
const forgotEmail = ref("");

const goBack = () => {
  emit("toggle");
};
// Fehlerstatus
const emailError = ref(false);
const emailFormatError = ref(false);
const emailNotFoundError = ref(false);


/**
 * Sends a password reset request for the given email.
 * 
 * Displays an overlay during the request and handles potential errors such as 
 * invalid emails or network issues. If successful, a confirmation message is shown.
 * 
 * @async
 * @param {string} email - The email address for which to request a password reset.
 */
 async function requestPasswordReset(email) {
  showOverlay();
  try {
    const response = await fetch(`${API_BASE_URL}/user/password-reset-request/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      const data = await response.json();
      showConfirmation(data.message);
      emit("toggle");
    } else {
      const errorData = await response.json();
      console.error("Error requesting password reset:", errorData);
      if (errorData.error === "User with this email does not exist") {
        emailNotFoundError.value = true;
      } else {
        alert("Unknown error while resetting password.");
      }
    }
  } catch (error) {
    alert("Network error. Please try again later.");
  }
  hideOverlay();
}

/**
 * Attempts to send a password reset request if no validation errors exist.
 */
const tryRequest = () => {
  resetErrors();
  if (!checkForErrors()) {
    requestPasswordReset(forgotEmail.value);
  }
};

/**
 * Resets all password reset-related error states.
 */
const resetErrors = () => {
  emailError.value = false;
  emailFormatError.value = false;
  emailNotFoundError.value = false;
};

/**
 * Checks for errors in the email input field.
 * 
 * @returns {boolean} `true` if there are validation errors, otherwise `false`.
 */
const checkForErrors = () => {
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat();
  return !isEmailValid || !isEmailFormatValid;
};

/**
 * Checks if the email field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email is not empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !forgotEmail.value;
  return !emailError.value;
};

/**
 * Validates the email format and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email format is valid, otherwise `false`.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = forgotEmail.value && !emailPattern.test(forgotEmail.value);
  return !emailFormatError.value;
};

</script>

<style>

.button-icon {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
  align-self: center;
}

.login-buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  flex-wrap: wrap;
}



</style>
