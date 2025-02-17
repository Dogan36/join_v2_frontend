<template>
  <FormLayout>
    <div class="form-header">
      <img class="go-back" src="@/assets/img/arrowLeft.svg" alt="Back Arrow" @click="goBack" />
      <h1>I forgot my password</h1>
      <div style="width: 37px;"></div>
    </div>
      <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
      <span class="subheader">Don't worry! Enter your email address and we will send you a link to reset your password.</span>
    <form class="form" @submit.prevent="tryRequest" novalidate>
      <InputField
        v-model="forgotEmail"
        type="email"
        placeholder="Enter your email"
        autocomplete="current-email"
        icon="@/assets/img/loginMail.svg"
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
const { showConfirmation } = useConfirmationOverlay();
import { API_BASE_URL } from "@/config";

// Event emitter
/**
 * @vue-method {Function} emit - Emits events such as "toggle" to manage the modal state.
 * 
 * @returns {void}
 */
const emit = defineEmits();

/**
 * @vue-data {string} forgotEmail - The email entered by the user for password reset.
 * 
 * This reactive property stores the email address entered by the user when requesting a password reset.
 */
const forgotEmail = ref("");

// Event handler for going back
/**
 * @vue-method {Function} goBack - Closes the current modal by emitting the "toggle" event.
 * 
 * This function emits the "toggle" event to close the current modal.
 * 
 * @returns {void}
 */
const goBack = () => {
  emit("toggle");
};

// Error states
/**
 * @vue-data {boolean} emailError - Indicates whether there is an error in the email input field.
 * 
 * This reactive property holds the error state for the email input field when it is empty.
 */
const emailError = ref(false);

/**
 * @vue-data {boolean} emailFormatError - Indicates whether the email format is incorrect.
 * 
 * This reactive property holds the error state when the email format is invalid.
 */
const emailFormatError = ref(false);

/**
 * @vue-data {boolean} emailNotFoundError - Indicates if the email entered does not exist in the system.
 * 
 * This reactive property holds the error state when the email provided by the user is not found.
 */
const emailNotFoundError = ref(false);


/**
 * @vue-method {Function} requestPasswordReset - Sends a password reset request for the given email.
 * 
 * This async function performs the following:
 * - Displays an overlay during the request.
 * - Sends a request to reset the password.
 * - If successful, displays a confirmation message.
 * - If the email is not found or another error occurs, it sets an appropriate error message.
 * 
 * @async
 * @param {string} email - The email address for which to request a password reset.
 * @returns {Promise<void>} Resolves when the request is completed or failed.
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
 * @vue-method {Function} tryRequest - Attempts to send a password reset request if no validation errors exist.
 * 
 * This function first resets any error states, checks for validation errors in the email input, 
 * and if no errors are found, it proceeds to send the password reset request.
 * 
 * @returns {void}
 */
const tryRequest = () => {
  resetErrors();
  if (!checkForErrors()) {
    requestPasswordReset(forgotEmail.value);
  }
};

/**
 * @vue-method {Function} resetErrors - Resets all password reset-related error states.
 * 
 * This function clears all error flags related to the email input and validation.
 * 
 * @returns {void}
 */
const resetErrors = () => {
  emailError.value = false;
  emailFormatError.value = false;
  emailNotFoundError.value = false;
};

/**
 * @vue-method {Function} checkForErrors - Checks for errors in the email input field.
 * 
 * This function validates if the email input is empty or if the format is incorrect.
 * It returns `true` if there are validation errors and `false` otherwise.
 * 
 * @returns {boolean} `true` if there are validation errors, otherwise `false`.
 */
const checkForErrors = () => {
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat();
  return !isEmailValid || !isEmailFormatValid;
};

/**
 * @vue-method {Function} checkIfEmailEmpty - Checks if the email field is empty and updates the corresponding error state.
 * 
 * This function validates whether the email input is empty and sets the `emailError` flag if it is.
 * 
 * @returns {boolean} `true` if the email is not empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !forgotEmail.value;
  return !emailError.value;
};

/**
 * @vue-method {Function} checkEmailFormat - Validates the email format and updates the corresponding error state.
 * 
 * This function checks if the email format is valid using a regular expression and updates the `emailFormatError` flag if it is invalid.
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
