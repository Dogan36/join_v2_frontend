<template>
    <div  class="workspace-info-overlay">
    <div class="workspace-info-content">
      <div class="workspace-info-header">
        <img class="logo" src="@/assets/img/logoInvert.svg" alt="Logo" />
        <h2>Change Password</h2>
        <div class="workspace-header-content">
          <p>Change your password here</p>
        </div>
      </div>
      <div class="workspace-info-main">
       <form @submit.prevent="changePassword">
        <InputField
        v-model="oldPassword"
        type="password"
        placeholder="Old Password"
        autocomplete="on"
        icon="src/assets/img/loginPassword.svg"
        :error="oldPasswordError || oldPasswordLengthError || oldPasswordIncorrectError"
        :errorMessages="{
          oldPasswordError: oldPasswordError ? 'Old password is required' : '',
          oldPasswordLengthError: oldPasswordLengthError ? 'Password must be at least 6 characters': '',
          oldPasswordIncorrectError: oldPasswordIncorrectError ? 'Old password is incorrect' : '',
        }"
      />
        <InputField
        v-model="newPassword"
        type="password"
        placeholder="Password"
        autocomplete="on"
        icon="src/assets/img/loginPassword.svg"
        :error="newPasswordError || newPasswordLengthError"
        :errorMessages="{
          newPasswordError: newPasswordError ? 'Password is required' : '',
          newPasswordLengthError: newPasswordLengthError
            ? 'Password must be at least 6 characters'
            : '',
        }"
      />
      <InputField
        v-model="newPasswordRepeat"
        type="password"
        placeholder="Confirm Password"
        autocomplete="on"
        icon="src/assets/img/loginPassword.svg"
        :error="passwordMatchError || newPasswordRepeatError"
        :errorMessages="{
          newPasswordRepeatError: newPasswordRepeatError ? 'Confirmation is required' : '',
          passwordMatchError: passwordMatchError
            ? 'Passwords do not match'
            : '',
        }"
      />
      
      <div class="button-container">
        <button class="main-button-layout" @click="submit">
          Save
        </button>
        <button class="secondary-button-layout" @click="close">
          Cancel
        </button>
      </div>
       </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { API_BASE_URL } from "@/config";
import InputField from "./InputField.vue";
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
const { showOverlay, hideOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();
import { getToken } from "@/store/state";
import { defineEmits, ref } from "vue";
const emit = defineEmits(['setActiveModal']);

const oldPassword = ref("");
const newPassword = ref("");
const newPasswordRepeat = ref("");

// Fehlerstatus
const oldPasswordError = ref(false);
const newPasswordError = ref(false);
const oldPasswordLengthError = ref(false);
const newPasswordLengthError = ref(false);
const newPasswordRepeatError = ref(false);
const passwordMatchError = ref(false);
const oldPasswordIncorrectError = ref(false);

/**
 * @vue-method {Function} changePassword - Asynchronously changes the user's password.
 *
 * This function first validates password input errors. If validation passes, it sends a request to 
 * update the user's password. In case of an error, an error flag is set.
 * A confirmation message is displayed on success.
 *
 * @async
 * @returns {Promise<void>} Resolves when the password change process is complete.
 */
 const changePassword = async () => {
  if (checkForPasswordErrors()) {
    return;
  }
  showOverlay();
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/change-password/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    });
    if (!response.ok) {
      oldPasswordIncorrectError.value = true;
      return;
    }
    const data = await response.json();
    showConfirmation("Password changed successfully!");
    emit("setActiveModal");
  } catch (error) {
    console.error("Error changing password", error);
  } finally {
    hideOverlay();
  }
};

/**
 * @vue-method {Function} resetPasswordErrors - Resets all password-related error states.
 *
 * This function clears all the error flags related to the password input fields, setting them to false.
 *
 * @returns {void}
 */
const resetPasswordErrors = () => {
  oldPasswordError.value = false;
  newPasswordError.value = false;
  newPasswordRepeatError.value = false;
  oldPasswordLengthError.value = false;
  newPasswordLengthError.value = false;
  passwordMatchError.value = false;
  oldPasswordIncorrectError.value = false;
};

/**
 * @vue-method {Function} checkForPasswordErrors - Checks for password input errors and resets previous error states.
 *
 * This function checks each password-related field for errors (empty fields, length issues, and matching passwords) 
 * and returns `true` if any errors are found.
 *
 * @returns {boolean} `true` if there are errors, `false` otherwise.
 */
const checkForPasswordErrors = () => {
  resetPasswordErrors();
  const isOldPasswordValid = checkIfOldPasswordEmpty();
  const isNewPasswordValid = checkIfNewPasswordEmpty();
  const isNewPasswordRepeatValid = checkIfNewPasswordRepeatEmpty();
  const isOldPasswordLengthValid = checkOldPasswordLength();
  const isNewPasswordLengthValid = checkNewPasswordLength();
  const isPasswordMatch = checkIfPasswordsMatch();
  return !(
    isOldPasswordValid &&
    isOldPasswordLengthValid &&
    isNewPasswordValid &&
    isNewPasswordLengthValid &&
    isNewPasswordRepeatValid &&
    isPasswordMatch
  );
};

/**
 * @vue-method {Function} checkIfOldPasswordEmpty - Checks if the old password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the old password is empty, otherwise `false`.
 */
const checkIfOldPasswordEmpty = () => {
  oldPasswordError.value = !oldPassword.value;
  return oldPasswordError.value;
};

/**
 * @vue-method {Function} checkIfNewPasswordEmpty - Checks if the new password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the new password is empty, otherwise `false`.
 */
const checkIfNewPasswordEmpty = () => {
  newPasswordError.value = !newPassword.value;
  return newPasswordError.value;
};

/**
 * @vue-method {Function} checkIfNewPasswordRepeatEmpty - Checks if the new password repeat field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the new password repeat is empty, otherwise `false`.
 */
const checkIfNewPasswordRepeatEmpty = () => {
  newPasswordRepeatError.value = !newPasswordRepeat.value;
  return newPasswordRepeatError.value;
};

/**
 * @vue-method {Function} checkOldPasswordLength - Checks if the old password meets the minimum length requirement.
 * 
 * @returns {boolean} `true` if the old password is too short, otherwise `false`.
 */
const checkOldPasswordLength = () => {
  oldPasswordLengthError.value = oldPassword.value.length < 6;
  return oldPasswordLengthError.value;
};

/**
 * @vue-method {Function} checkNewPasswordLength - Checks if the new password meets the minimum length requirement.
 * 
 * @returns {boolean} `true` if the new password is too short, otherwise `false`.
 */
const checkNewPasswordLength = () => {
  newPasswordLengthError.value = newPassword.value.length < 6;
  return newPasswordLengthError.value;
};

/**
 * @vue-method {Function} checkIfPasswordsMatch - Checks if the new password and the repeated password match.
 * 
 * @returns {boolean} `true` if the passwords do not match, otherwise `false`.
 */
const checkIfPasswordsMatch = () => {
  passwordMatchError.value = newPassword.value !== newPasswordRepeat.value;
  return passwordMatchError.value;
};

/**
 * @vue-method {Function} close - Closes the modal by emitting the "setActiveModal" event.
 * 
 * This function emits an event to close the modal where the password change process occurs.
 *
 * @returns {void}
 */
const close = () => {
  emit("setActiveModal");
};
</script>