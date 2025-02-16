<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      
        <h2>{{ contactOverlayIsEditMode ? "Edit Contact" : "Add Contact" }}</h2>
        
      <div class="workspace-header-content">
        <p>Tasks are better with a team!</p>
      </div>
     
    </div>
    <div class="workspace-info-main">
      <img class="card-contact-img" style="align-self: center;" v-if="!contactOverlayIsEditMode" src="@/assets/img/newContactIcon.svg" alt="Contact Icon" />
      <div v-else
          class="card-avatar"
          :style="{ backgroundColor: selectedContact.color?.hex_value || '#ffffff', color: getTextColor(selectedContact.color?.hex_value || '#ffffff') }"
        >
          {{ selectedContact.avatar }}
        </div>
      <form class="input-container" @submit.prevent="save" novalidate>
        <InputField
          v-model="contactName"
          type="text"
          placeholder="Name"
          icon="src/assets/img/userIcon.svg"
          :error="nameError"
          :errorMessages="{
            nameError: nameError ? 'Name is required' : '',
          }"
        />
        <InputField
          v-model="contactEmail"
          type="email"
          placeholder="Email"
          icon="src/assets/img/loginMail.svg"
          :error="emailError || emailFormatError || emailTakenError"
          :errorMessages="{
            emailError: emailError ? 'Email is required' : '',
            emailFormatError: emailFormatError ? 'Invalid email format' : '',
            emailTakenError: emailTakenError ? 'Email already in use' : '',
          }"
        />
        <InputField
          v-model="contactPhone"
          type="number"
          placeholder="Phone"
          icon="src/assets/img/phone.svg"
        />

        <div class="form-buttons">
          <div class="secondary-button-layout" @click="cancel">Cancel</div>
          <div class="main-button-layout" @click="save">
            {{ contactOverlayIsEditMode ? "Save Changes" : "Create Contact" }}
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import InputField from "@/components/shared/InputField.vue";
import useContacts from "@/composables/useContacts";
const { saveContact } = useContacts();
import { selectedContact, contactOverlayIsEditMode } from "@/store/state";
import useTextColor from '@/composables/useTextColor';
const { getTextColor } = useTextColor();
const emit = defineEmits(["close"]);

const contactName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const nameError = ref(false);
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);

onMounted(() => {
  initializeForm();
});

/**
 * @vue-method {Function} initializeForm - Initializes the contact form with the selected contact's information.
 *
 * If the form is in edit mode, the function populates the `contactName`, `contactEmail`, and `contactPhone` fields
 * with the selected contact's information.
 * 
 * @returns {void}
 */
const initializeForm = () => {
  if (contactOverlayIsEditMode.value) {
    contactName.value = selectedContact.value.name;
    contactEmail.value = selectedContact.value.email;
    contactPhone.value = selectedContact.value.phone || "";
  }
};

/**
 * @vue-method {Function} save - Saves the contact information if the form passes validation.
 *
 * This function performs the following steps:
 * 1. Resets any previous error messages.
 * 2. Checks for validation errors.
 * 3. If validation passes, it constructs a contact object and calls `saveContact` to persist the contact information.
 * 4. Resets the form fields after successful saving.
 * 
 * @returns {void}
 */
const save = () => {
  resetErrors();
  if (checkForErrors()) {
    const contact = {
      name: contactName.value,
      email: contactEmail.value,
      phone: contactPhone.value,
    };
    saveContact(contact, selectedContact.id);
    resetForm();
  } else {
    return;
  }
};

/**
 * @vue-method {Function} resetErrors - Resets all error flags for the contact form.
 *
 * This function clears error states related to the contact's name and email by setting:
 * - nameError
 * - emailError
 * - emailFormatError
 * - emailTakenError
 * 
 * @returns {void}
 */
const resetErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
};

/**
 * @vue-method {Function} resetForm - Resets the contact form fields to their initial state.
 *
 * This function clears the form fields by setting `contactName`, `contactEmail`, and `contactPhone` to empty strings.
 * 
 * @returns {void}
 */
const resetForm = () => {
  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
};

/**
 * @vue-method {Function} cancel - Cancels the contact form submission and closes the overlay.
 *
 * This function resets the form fields and emits a "close" event to the parent component.
 * 
 * @returns {void}
 */
const cancel = () => {
  resetForm();
  emit('close');
};

/**
 * @vue-method {Function} checkForErrors - Checks the contact form for validation errors.
 *
 * This function validates the contact form fields, setting error flags based on:
 * - `nameError`: Checks if `contactName` is empty.
 * - `emailError`: Checks if `contactEmail` is empty.
 * - `emailFormatError`: Checks if `contactEmail` matches a valid email pattern.
 * - `emailTakenError`: Checks if `contactEmail` is already in use.
 * 
 * The function returns true if no errors are detected, and false otherwise.
 * 
 * @returns {boolean} - True if the form is valid, otherwise false.
 */
const checkForErrors = () => {
  const isNameValid = checkIfNameEmpty();
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat(); // Only check format if email is not empty
  const isEmailUnique = isEmailFormatValid; // Only check if the format is correct

  return isNameValid && isEmailValid && isEmailFormatValid && isEmailUnique;
};

/**
 * @vue-method {Function} checkIfNameEmpty - Checks if the contact name field is empty.
 *
 * This function sets the `nameError` flag to true if the `contactName` field is empty.
 * 
 * @returns {boolean} - Returns true if the name field is not empty, otherwise false.
 */
const checkIfNameEmpty = () => {
  nameError.value = !contactName.value;
  return !nameError.value;
};

/**
 * @vue-method {Function} checkIfEmailEmpty - Checks if the contact email field is empty.
 *
 * This function sets the `emailError` flag to true if the `contactEmail` field is empty.
 * 
 * @returns {boolean} - Returns true if the email field is not empty, otherwise false.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !contactEmail.value;
  return !emailError.value;
};

/**
 * @vue-method {Function} checkEmailFormat - Checks the format of the contact email.
 *
 * This function uses a regular expression to validate the format of `contactEmail`.
 * It sets the `emailFormatError` flag to true if the email format is invalid.
 * 
 * @returns {boolean} - Returns true if the email format is valid, otherwise false.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = contactEmail.value && !emailPattern.test(contactEmail.value);
  return !emailFormatError.value;
};
</script>


<style scoped>
.contact-cverlay {
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 1000px;
  max-width: 100%;
  border-radius: 30px;
  overflow: hidden;
}
.overlay-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 40%;
  gap: 3rem;
  padding: 3rem;
  background: var(--main-color);
  color: white;
  img {
    height: 6.6rem;
    width: 5.5rem;
  }
  .overlay-headerText {
    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 700;
      font-size: 6.1rem;
      margin-bottom: 1rem;
      text-wrap: nowrap;
    }
    h2 {
      font-weight: 400;
      font-size: 2.7rem;
    }
    img {
      rotate: 90deg;
    }
  }
}

.overlay-content {
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
 
}

.card-contact-img{
  align-self: center;
  height: 6rem;
  width: 6rem;
  margin-bottom: 1rem;
}

.card-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-width: 6rem;
      min-height: 6rem;
      border: 1px solid #ffffff;
      border-radius: 100%;
      font-weight: 500;
      font-size: 3rem;
      align-self: center;
      line-height: 120%;
      margin-bottom: 1rem;
    }
</style>
