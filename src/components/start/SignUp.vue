<template>
  <FormLayout>
    <div class="form-header">
      <img class="go-back" src="@/assets/img/arrowLeft.svg" alt="Back Arrow" @click="goBack" />
      <h1>Sign Up</h1>
      <div style="width: 37px;"></div>
    </div>
      <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
    <form class="form" @submit.prevent="trySignup" novalidate>
      <InputField
        v-model="signupName"
        type="string"
        placeholder="Name"
        icon="@/assets/img/userIcon.svg"
        :error="nameError"
        :errorMessages="{
          nameError: nameError ? 'Name is required' : '',
        }"
      />
      <InputField
        v-model="signupEmail"
        type="email"
        placeholder="E-Mail"
        icon="@/assets/img/loginMail.svg"
        :error="emailError || emailFormatError || emailTakenError"
        :errorMessages="{
          emailError: emailError ? 'Email is required' : '',
          emailFormatError: emailFormatError ? 'Invalid email format' : '',
          emailTakenError: emailTakenError ? 'Email already taken' : '',
        }"
      />
      <InputField
        v-model="signupPassword"
        type="password"
        placeholder="Password"
        icon="@/assets/img/loginPassword.svg"
        :error="passwordError || passwordLengthError"
        :errorMessages="{
          passwordError: passwordError ? 'Password is required' : '',
          passwordLengthError: passwordLengthError
            ? 'Password must be at least 6 characters'
            : '',
        }"
      />
      <InputField
        v-model="signupPasswordRepeat"
        type="password"
        placeholder="Confirm Password"
        icon="@/assets/img/loginPassword.svg"
        :error="passwordMatchError"
        :errorMessages="{
          passwordError: passwordError ? 'Confirmation is required' : '',
          passwordMatchError: passwordMatchError
            ? 'Passwords do not match'
            : '',
        }"
      />
      <div class="signup-options">
        <input type="checkbox" v-model="readPrivacy" />
        I accept the <span @click="showPrivacyPolicy">Privacy Policy</span>
      </div>
      <p v-if="privacyError" class="error-message">Please read and accept the Privacy Policy.</p>
      <div class="login-buttons">
        <button class="main-button-layout" type="submit">Sign Up</button>
      </div>
    </form>
  </FormLayout>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
import router from "@/router";

const { showOverlay, hideOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();

const readPrivacy = ref(false);
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const signupPasswordRepeat = ref("");

// Error states
/**
 * @vue-data {boolean} nameError - Indicates whether the name field is empty.
 */
const nameError = ref(false);

/**
 * @vue-data {boolean} emailError - Indicates whether the email field is empty.
 */
const emailError = ref(false);

/**
 * @vue-data {boolean} emailFormatError - Indicates whether the email format is incorrect.
 */
const emailFormatError = ref(false);

/**
 * @vue-data {boolean} emailTakenError - Indicates whether the email is already taken.
 */
const emailTakenError = ref(false);

/**
 * @vue-data {boolean} passwordError - Indicates whether the password field is empty.
 */
const passwordError = ref(false);

/**
 * @vue-data {boolean} passwordLengthError - Indicates whether the password length is less than 6 characters.
 */
const passwordLengthError = ref(false);

/**
 * @vue-data {boolean} passwordMatchError - Indicates whether the passwords match.
 */
const passwordMatchError = ref(false);

/**
 * @vue-data {boolean} privacyError - Indicates whether the privacy policy has been accepted.
 */
const privacyError = ref(false);

const emit = defineEmits();

/**
 * @vue-method {Function} goBack - Emits an event to toggle the current view (e.g., back to login).
 * 
 * @returns {void}
 */
const goBack = () => {
  emit("toggle");
};

/**
 * @vue-method {Function} showPrivacyPolicy - Emits an event to display the privacy policy.
 * 
 * @returns {void}
 */
const showPrivacyPolicy = () => {
  emit("privacyPolicy");
};

/**
 * @vue-method {Function} signUp - Registers a new user with the provided name, email, and password.
 * 
 * This async function sends a POST request to register a user. If successful, it stores the authentication details
 * and redirects the user to the home page. If the email is already taken, it updates the `emailTakenError` flag.
 * 
 * @async
 * @param {string} name - The user's full name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} Resolves when the sign-up process is complete.
 */
async function signUp(name, email, password) {
  showOverlay();
  try {
    const response = await fetch('http://localhost:8000/api/v1/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("join_token", data.token);
      localStorage.setItem("join_user", JSON.stringify(data.user));
      showConfirmation('Sign up successful!');
      router.push('/home');
    } else {
      const errorData = await response.json();
      if (errorData.email) {
        emailTakenError.value = true;
      }
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    hideOverlay();
  }
}

/**
 * @vue-method {Function} trySignup - Attempts to sign up the user after validating input fields.
 * 
 * This function checks if there are any validation errors, and if none are found, it calls `signUp`.
 * 
 * @returns {void}
 */
const trySignup = () => {
  resetErrors();
  if (!checkForErrors()) {
    signUp(signupName.value, signupEmail.value, signupPassword.value);
  }
};

/**
 * @vue-method {Function} resetErrors - Resets all sign-up-related error states.
 * 
 * @returns {void}
 */
const resetErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordMatchError.value = false;
  privacyError.value = false;
};

/**
 * @vue-method {Function} checkForErrors - Validates sign-up input fields.
 * 
 * This function checks each input field for errors such as empty fields, invalid email format, password mismatch, etc.
 * 
 * @returns {boolean} `true` if validation errors exist, otherwise `false`.
 */
const checkForErrors = () => {
  const isNameValid = checkIfNameEmpty();
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat();
  const isEmailUnique = isEmailFormatValid && checkEmailDatabase();
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength();
  const isPasswordRepeatValid = checkIfPasswordRepeatEmpty();
  const arePasswordsMatching = isPasswordRepeatValid && checkIfPasswordsMatch();
  const isPrivacyAccepted = checkPrivacyAccepted();

  return (
    !isNameValid ||
    !isEmailValid ||
    !isEmailFormatValid ||
    !isEmailUnique ||
    !isPasswordValid ||
    !isPasswordLengthValid ||
    !arePasswordsMatching ||
    !isPrivacyAccepted
  );
};

/**
 * @vue-method {Function} checkIfNameEmpty - Checks if the name field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the name is not empty, otherwise `false`.
 */
const checkIfNameEmpty = () => {
  nameError.value = !signupName.value;
  return !nameError.value;
};

/**
 * @vue-method {Function} checkIfEmailEmpty - Checks if the email field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email is not empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !signupEmail.value;
  return !emailError.value;
};

/**
 * @vue-method {Function} checkEmailFormat - Validates the email format and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the email format is valid, otherwise `false`.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = signupEmail.value && !emailPattern.test(signupEmail.value);
  return !emailFormatError.value;
};

/**
 * @vue-method {Function} checkEmailDatabase - Checks if the email is already taken based on a predefined email database.
 * 
 * @returns {boolean} `true` if the email is unique, otherwise `false`.
 */
const checkEmailDatabase = () => {
  const emailDatabase = ["user@example.com", "admin@example.com"]; // Example database
  emailTakenError.value = emailDatabase.includes(signupEmail.value);
  return !emailTakenError.value;
};

/**
 * @vue-method {Function} checkIfPasswordEmpty - Checks if the password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the password is not empty, otherwise `false`.
 */
const checkIfPasswordEmpty = () => {
  passwordError.value = !signupPassword.value;
  return !passwordError.value;
};

/**
 * @vue-method {Function} checkPasswordLength - Checks if the password meets the minimum length requirement (6 characters).
 * 
 * @returns {boolean} `true` if the password length is valid, otherwise `false`.
 */
const checkPasswordLength = () => {
  passwordLengthError.value = signupPassword.value && signupPassword.value.length < 6;
  return !passwordLengthError.value;
};

/**
 * @vue-method {Function} checkIfPasswordRepeatEmpty - Checks if the repeated password field is empty and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the repeated password is not empty, otherwise `false`.
 */
const checkIfPasswordRepeatEmpty = () => {
  passwordMatchError.value = !signupPasswordRepeat.value;
  return !passwordMatchError.value;
};

/**
 * @vue-method {Function} checkIfPasswordsMatch - Checks if the passwords match and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the passwords match, otherwise `false`.
 */
const checkIfPasswordsMatch = () => {
  passwordMatchError.value = signupPassword.value !== signupPasswordRepeat.value;
  return !passwordMatchError.value;
};

/**
 * @vue-method {Function} checkPrivacyAccepted - Checks if the privacy policy has been accepted and updates the corresponding error state.
 * 
 * @returns {boolean} `true` if the privacy policy is accepted, otherwise `false`.
 */
const checkPrivacyAccepted = () => {
  privacyError.value = !readPrivacy.value;
  return !privacyError.value;
};
</script>

<style>
.signup-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  width: 100%;
  input {
    cursor: pointer;
  }
  span{
    color: var(--main-color-hover);
    cursor: pointer !important;
    pointer-events: auto;
    transition: all 0.125s;
    &:hover{
      scale:1.05;
    }
  }
}
</style>
