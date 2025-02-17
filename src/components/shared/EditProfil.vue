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
            icon="user"
            :error="nameError"
            :errorMessages="{ nameError: nameError ? 'Name is required' : '' }"
          />
          <InputField
            v-model="newEmail"
            type="email"
            placeholder="Enter your email"
            icon="email"
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
            icon="phone"
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

// Define the "setActiveModal" event
/**
 * @vue-method {Function} emit - Emits the "setActiveModal" event.
 * 
 * This function emits an event to close the modal where the profile update process occurs.
 * 
 * @returns {void}
 */
const emit = defineEmits(["setActiveModal"]);

// Reactive properties for profile form
/**
 * @vue-data {string} newName - The new name entered by the user for the profile.
 * 
 * This reactive property holds the name inputted by the user for updating their profile.
 */
const newName = ref("");

/**
 * @vue-data {string} newEmail - The new email entered by the user for the profile.
 * 
 * This reactive property holds the email inputted by the user for updating their profile.
 */
const newEmail = ref("");

/**
 * @vue-data {string} newPhone - The new phone number entered by the user for the profile.
 * 
 * This reactive property holds the phone number inputted by the user for updating their profile.
 */
const newPhone = ref("");

// Error states for the profile form
/**
 * @vue-data {boolean} nameError - Error state for the name field.
 * 
 * This reactive property tracks whether the name field has an error (e.g., if it's empty).
 */
const nameError = ref(false);

/**
 * @vue-data {boolean} emailError - Error state for the email field.
 * 
 * This reactive property tracks whether the email field has an error (e.g., if it's empty).
 */
const emailError = ref(false);

/**
 * @vue-data {boolean} emailFormatError - Error state for invalid email format.
 * 
 * This reactive property tracks whether the email format is invalid.
 */
const emailFormatError = ref(false);

/**
 * @vue-data {boolean} emailTakenError - Error state for email already taken.
 * 
 * This reactive property tracks whether the email provided is already taken.
 */
const emailTakenError = ref(false);


/**
 * @vue-method {Function} onMounted - Initializes the profile form fields with the current user's data when the component is mounted.
 * 
 * This lifecycle hook sets the `newName`, `newEmail`, and `newPhone` properties to the current user's details.
 * 
 * @returns {void}
 */
onMounted(() => {
  newName.value = currentUser.value.name;
  newEmail.value = currentUser.value.email;
  newPhone.value = currentUser.value.phone;
});

/**
 * @vue-method {Function} updateProfile - Asynchronously updates the user's profile.
 * 
 * This function checks for input errors, then sends a POST request to update the user's profile. 
 * If successful, the user's data is updated locally, and a confirmation message is shown. 
 * If the email is already taken, an error flag is set.
 * 
 * @async
 * @returns {Promise<void>} Resolves when the profile update process is complete.
 */
const updateProfile = async () => {
  if (currentUser.value.id === 3) {
    alert("Guest profile cannot be updated");
    return;
  }
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
 * @vue-method {Function} resetProfilErrors - Resets all profile-related error states.
 * 
 * This function clears all the error flags related to the profile input fields, setting them to false.
 * 
 * @returns {void}
 */
const resetProfilErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
};

/**
 * @vue-method {Function} checkForProfilErrors - Checks for profile input errors and resets previous error states.
 * 
 * This function checks for errors in the name, email, and email format fields, returning `true` if any errors are found.
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
 * @vue-method {Function} checkIfNameEmpty - Checks if the name field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the name is empty, otherwise `false`.
 */
const checkIfNameEmpty = () => {
  nameError.value = !newName.value;
  return nameError.value;
};

/**
 * @vue-method {Function} checkIfEmailEmpty - Checks if the email field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email is empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !newEmail.value;
  return emailError.value;
};

/**
 * @vue-method {Function} checkEmailFormat - Validates the email format and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email format is invalid, otherwise `false`.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = !emailPattern.test(newEmail.value);
  return emailFormatError.value;
};

/**
 * @vue-method {Function} close - Closes the modal by emitting the "setActiveModal" event.
 * 
 * This function emits an event to close the modal where the profile update process occurs.
 * 
 * @returns {void}
 */
const close = () => {
  emit("setActiveModal");
};
</script>
