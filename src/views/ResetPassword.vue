<template>
  <div class="wrapper">

<div class="logo-container">
  <img class="logo" src="@/assets/img/logo.svg" alt="">
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
const uid = router.currentRoute.value.params.uid
const token = router.currentRoute.value.params.token
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);

/**
 * Initiates the password reset process by validating input fields.
 * If no errors are found, the reset password request is performed.
 */
 const tryReset = () => {
  resetErrors();
  if (!checkForErrors()) {
    performResetPassword(resetPassword.value);
  }
};

/**
 * Sends a request to reset the password.
 * 
 * @async
 * @param {string} password - The new password to be set.
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
 * Resets all password-related error states.
 */
const resetErrors = () => {
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordMatchError.value = false;
};

/**
 * Checks for password input errors.
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
 * @returns {boolean} `true` if the password is not empty, otherwise `false`.
 */
const checkIfPasswordEmpty = () => {
  passwordError.value = !resetPassword.value;
  return !passwordError.value;
};

/**
 * Checks if the password meets the minimum length requirement (6 characters).
 * 
 * @returns {boolean} `true` if the password length is valid, otherwise `false`.
 */
const checkPasswordLength = () => {
  passwordLengthError.value = resetPassword.value && resetPassword.value.length < 6;
  return !passwordLengthError.value;
};

/**
 * Checks if the repeated password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the repeated password is not empty, otherwise `false`.
 */
const checkIfPasswordRepeatEmpty = () => {
  passwordMatchError.value = !resetPasswordRepeat.value;
  return !passwordMatchError.value;
};

/**
 * Checks if the passwords match and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the passwords match, otherwise `false`.
 */
const checkIfPasswordsMatch = () => {
  passwordMatchError.value = resetPassword.value !== resetPasswordRepeat.value;
  return !passwordMatchError.value;
};