<template>
<div class="workspace-info-overlay">
    <div class="workspace-info-content">
      <div class="workspace-info-header">
        <img class="logo" src="@/assets/img/logoInvert.svg" alt="Logo" />
        <h2>Edit Profil</h2>
        <div class="workspace-header-content">
          <p>Edit your profil information</p>
        </div>
      </div>
      <div class="workspace-info-main">
        <div class="input-container">
          <InputField
            v-model="newName"
            type="text"
            placeholder="Enter your name"
            icon="src/assets/img/userIcon.svg"
            :error="nameError"
            :errorMessages="{ nameError: nameError ? 'Name is required' : '' }"
          />
          <InputField
            v-model="newEmail"
            type="email"
            placeholder="Enter your email"
            icon="src/assets/img/loginMail.svg"
            :error="emailError || emailFormatError || emailTakenError"
            :errorMessages="{ emailError: emailError ? 'Email is required' : '', 
                              emailFormatError: emailFormatError ? 'Email format is invalid' : '',
                              emailTakenError: emailTakenError ? 'Email is already taken' : ''
            }"
          />
          <InputField
            v-model="newPhone"
            type="number"
            placeholder="Enter your number"
            icon="src/assets/img/phone.svg"
          />
        </div>
        <div class="button-container">
          <button class="main-button-layout" @click="updateProfile">
            Save
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
import { API_BASE_URL } from "@/config";
import InputField from "./InputField.vue";
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";
const { showOverlay, hideOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();

import { currentUser, getToken } from "@/store/state";
import { defineEmits, onMounted, ref } from "vue";
const emit = defineEmits(["setActiveModal"]);
const newName = ref("");
const newEmail = ref("");
const newPhone = ref("");

// Fehlerstatus
const nameError = ref(false);
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);

/**
 * Initializes the profile form fields with the current user's data when the component is mounted.
 */
onMounted(() => {
  newName.value = currentUser.value.name;
  newEmail.value = currentUser.value.email;
  newPhone.value = currentUser.value.phone;
});

/**
 * Asynchronously updates the user's profile.
 * 
 * If validation fails, the function exits early. Otherwise, it sends an API request to update the profile.
 * If the request is successful, the local user data is updated, and a confirmation message is shown.
 * If the email is already taken, an error flag is set.
 * 
 * @async
 */
const updateProfile = async () => {
  if (!checkForProfilErrors()) {
    return;
  }
  showOverlay();
  try {
    const response = await fetch(`${API_BASE_URL}/user/update-profile/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName.value,
        email: newEmail.value,
        phone: newPhone.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Profile update failed:", errorData.error);
      if (errorData.error === "email_taken") {
        emailTakenError.value = true;
      }
      return;
    }

    const data = await response.json();
    showConfirmation("Profile updated successfully!");
    localStorage.setItem("join_user", JSON.stringify(data.user));
    emit("setActiveModal");
    currentUser.value = data.user;
  } catch (error) {
    console.error("Error updating profile", error);
  } finally {
    hideOverlay();
  }
};

/**
 * Resets all profile-related error states.
 */
const resetProfilErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
};

/**
 * Checks for profile input errors and resets previous error states.
 * 
 * @returns {boolean} `true` if there are errors, otherwise `false`.
 */
const checkForProfilErrors = () => {
  resetProfilErrors();
  const isNameValid = checkIfNameEmpty();
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = checkEmailFormat();
  return !isNameValid || !isEmailValid || !isEmailFormatValid;
};

/**
 * Checks if the name field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the name is empty, otherwise `false`.
 */
const checkIfNameEmpty = () => {
  nameError.value = !newName.value;
  return nameError.value;
};

/**
 * Checks if the email field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email is empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !newEmail.value;
  return emailError.value;
};

/**
 * Validates the email format and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email format is invalid, otherwise `false`.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = !emailPattern.test(newEmail.value);
  return emailFormatError.value;
};

/**
 * Closes the modal by emitting the "setActiveModal" event.
 */
const close = () => {
  emit("setActiveModal");
};
</script>