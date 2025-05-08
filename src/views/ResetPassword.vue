<template>
  <div class="wrapper">

<div class="logo-container" style="height: 0; width: 0; z-index: 0; background-color: unset;">
  <img class="logo-normal" style="top: 2rem;
      left: 2rem;
      transform: translate(0, 0);
      width: 80px;
      opacity: 1;" src="@/assets/img/logo.svg" alt="">
</div>
  
<FormLayout>
    <div class="form-header">
      <h1>Reset your password</h1>
    </div>
    <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
    <span class="subheader">Change your account password</span>
    <form class="form" @submit.prevent="tryReset" novalidate>
      <InputField
        v-model="resetPassword"
        type="password"
        placeholder="Password"
        :icon="passwordIcon"
        :error="passwordError || passwordLengthError"
        :errorMessages="{
          passwordError: passwordError ? 'Password is required' : '',
          passwordLengthError: passwordLengthError
            ? 'Password must be at least 6 characters'
            : '',
        }"
      />
      <InputField
        v-model="resetPasswordRepeat"
        type="password"
        placeholder="Confirm Password"
        icon="src/assets/img/loginPassword.svg"
        :error="passwordMatchError"
        :errorMessages="{
          passwordError: passwordError ? 'Confirmation is required' : '',
          passwordMatchError: passwordMatchError
            ? 'Passwords do not match'
            : '',
        }"
      />
      <div class="login-buttons">
        <button class="main-button-layout" type="submit">Confirm</button>
      </div>
    </form>
  </FormLayout>

<div class="not-a-user-container">
 
</div>
</div>
</template>


<script setup>
import FormLayout from "@/components/shared/FormLayout.vue";
import InputField from "@/components/shared/InputField.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API_BASE_URL } from "@/config";
import passwordIcon from '@/assets/img/loginPassword.svg'
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";

const { showConfirmation } = useConfirmationOverlay();
const { showOverlay, hideOverlay } = useLoadingOverlay();
const resetPassword = ref("");
const resetPasswordRepeat = ref("");
const router = useRouter();
const uid = router.currentRoute.value.params.uid;
const token = router.currentRoute.value.params.token;
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);

/**
 * Attempts to reset the password after validating the form inputs.
 * 
 * This function resets the error states and checks for validation errors. 
 * If no errors exist, it proceeds with the password reset process.
 */
const tryReset = () => {
  resetErrors();
  if (!checkForErrors()) {
    performResetPassword(resetPassword.value);
  }
};

/**
 * Resets the password by sending a POST request to the API with the provided password.
 * 
 * @async
 * @param {string} password - The new password to be set for the user.
 */
async function performResetPassword(password) {
  showOverlay();
  try {
    const response = await fetch(`${API_BASE_URL}/user/password-reset/${uid}/${token}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      showConfirmation("Password reset successful!");
      router.push({ name: "start" });
    }
  } catch (error) {
    console.error("Error resetting password", error);
  }
  hideOverlay();
}

/**
 * Resets all password-related error states to their initial values.
 */
const resetErrors = () => {
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordMatchError.value = false;
};

/**
 * Checks for any validation errors in the password and repeat password fields.
 * 
 * @returns {boolean} `true` if there are validation errors, otherwise `false`.
 */
const checkForErrors = () => {
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength();
  const isPasswordRepeatValid = checkIfPasswordRepeatEmpty();
  const arePasswordsMatching = isPasswordRepeatValid && checkIfPasswordsMatch();

  return (
    !isPasswordValid ||
    !isPasswordLengthValid ||
    !isPasswordRepeatValid ||
    !arePasswordsMatching
  );
};

/**
 * Checks if the password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the password field is not empty, otherwise `false`.
 */
const checkIfPasswordEmpty = () => {
  passwordError.value = !resetPassword.value;
  return !passwordError.value;
};

/**
 * Checks if the password meets the minimum length requirement (6 characters).
 * 
 * @returns {boolean} `true` if the password is valid in length, otherwise `false`.
 */
const checkPasswordLength = () => {
  passwordLengthError.value =
    resetPassword.value && resetPassword.value.length < 6;
  return !passwordLengthError.value;
};

/**
 * Checks if the repeated password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the repeated password field is not empty, otherwise `false`.
 */
const checkIfPasswordRepeatEmpty = () => {
  passwordMatchError.value = !resetPasswordRepeat.value;
  return !passwordError.value;
};

/**
 * Checks if the password and its repeated field match.
 * 
 * @returns {boolean} `true` if both passwords match, otherwise `false`.
 */
const checkIfPasswordsMatch = () => {
  passwordMatchError.value = resetPassword.value !== resetPasswordRepeat.value;
  return !passwordMatchError.value;
};
</script>

