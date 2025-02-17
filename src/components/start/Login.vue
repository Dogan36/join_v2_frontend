<!-- src/views/LoginView.vue -->
<template>
  <FormLayout>
    <div class="form-header">
      <div></div>
      <h1>Login</h1>
      <div></div>
    </div>
    <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
    <form class="form" @submit.prevent="tryLogin" novalidate>
      <InputField
        v-model="loginEmail"
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
      <InputField
        v-model="loginPassword"
        type="password"
        autocomplete="current-password"
        placeholder="Enter your password"
        icon="src/assets/img/loginPassword.svg"
        :error="passwordError || passwordLengthError || passwordIncorrectError"
        :errorMessages="{
          passwordError: passwordError ? 'Password is required' : '',
          passwordLengthError: passwordLengthError
            ? 'Password must be at least 6 characters'
            : '',
          passwordIncorrectError: passwordIncorrectError
            ? 'Password is incorrect'
            : '',
        }"
      />
      <div class="login-options">
        <label>
          <input type="checkbox" v-model="rememberMe" /><span class="remember-me">Remember me</span></label
        >
        <span class="forgot-password" type="button" @click="forgotPassword"
          >Forgot password?</span
        >
      </div>
      <div class="login-buttons">
        <button class="main-button-layout" type="submit">Log in</button>
        <button class="secondary-button-layout" @click="guestLogin">
          Guest Login
        </button>
      </div>
    </form>
  </FormLayout>
</template>
<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";
import { currentUser } from "@/store/state";
import { API_BASE_URL } from "@/config";
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";

const { showOverlay, hideOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();

const router = useRouter();
const loginEmail = ref("");
const loginPassword = ref("");
const rememberMe = ref(false);

// Error states
/**
 * @vue-data {boolean} emailError - Indicates whether the email input field is empty.
 */
const emailError = ref(false);

/**
 * @vue-data {boolean} emailFormatError - Indicates whether the email format is incorrect.
 */
const emailFormatError = ref(false);

/**
 * @vue-data {boolean} emailNotFoundError - Indicates if the email provided is not found in the system.
 */
const emailNotFoundError = ref(false);

/**
 * @vue-data {boolean} passwordError - Indicates whether the password field is empty.
 */
const passwordError = ref(false);

/**
 * @vue-data {boolean} passwordLengthError - Indicates whether the password length is less than 6 characters.
 */
const passwordLengthError = ref(false);

/**
 * @vue-data {boolean} passwordIncorrectError - Indicates if the password is incorrect.
 */
const passwordIncorrectError = ref(false);

// Event emitter
/**
 * @vue-method {Function} emit - Emits events to manage modal states.
 * 
 * This function is used to emit events like `toggleForgotPassword` to control the visibility of modals.
 * 
 * @returns {void}
 */
const emit = defineEmits();

/**
 * @vue-method {Function} forgotPassword - Emits an event to toggle the forgot password view.
 * 
 * This function emits the event "toggleForgotPassword" to display the forgot password modal.
 * 
 * @returns {void}
 */
const forgotPassword = () => {
  emit("toggleForgotPassword");
};

/**
 * @vue-method {Function} onMounted - Loads remembered email from localStorage if the "remember me" option was previously selected.
 * 
 * This function checks if there is a remembered email in localStorage and populates the email field accordingly.
 * 
 * @returns {void}
 */
onMounted(() => {
  if (localStorage.getItem("join_remember")) {
    loginEmail.value = localStorage.getItem("join_remember");
    rememberMe.value = true;
  }
});

/**
 * @vue-method {Function} login - Attempts to log in a user with the provided email and password.
 * 
 * This async function sends a login request to the API with the provided email and password. 
 * If successful, it stores the authentication details in localStorage and redirects the user to the home page.
 * It handles errors such as incorrect credentials or non-existent users.
 * 
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} Resolves when the login attempt is complete.
 */
async function login(email, password) {
  console.log("Login with", email, password);
  showOverlay();
  let username = email;
  try {
    const response = await fetch(`${API_BASE_URL}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("join_token", data.token);
      localStorage.setItem("join_user", JSON.stringify(data.user));
      if (rememberMe.value) {
        localStorage.setItem("join_remember", email);
      } else {
        localStorage.removeItem("join_remember");
      }
      showConfirmation("Login successful!");
      window.location.href = "/home";
    } else {
      const errorData = await response.json();
      if (errorData.error === "User does not exist") {
        emailNotFoundError.value = true;
      } else if (errorData.error === "Incorrect password") {
        passwordIncorrectError.value = true;
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
  } finally {
    hideOverlay();
  }
}

/**
 * @vue-method {Function} tryLogin - Attempts to log in the user after validating input fields.
 * 
 * This function first resets any error states, checks for validation errors in the email and password input fields, 
 * and if no errors are found, it proceeds to call the `login` function.
 * 
 * @returns {void}
 */
const tryLogin = () => {
  resetErrors();
  if (!checkForErrors()) {
    login(loginEmail.value, loginPassword.value);
  }
};

/**
 * @vue-method {Function} resetErrors - Resets all login-related error states.
 * 
 * This function clears all error flags related to the email and password input and validation.
 * 
 * @returns {void}
 */
const resetErrors = () => {
  emailError.value = false;
  emailFormatError.value = false;
  emailNotFoundError.value = false;
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordIncorrectError.value = false;
};

/**
 * @vue-method {Function} checkForErrors - Validates login input fields.
 * 
 * This function checks for validation errors in the email and password fields (empty fields, incorrect format, etc.).
 * 
 * @returns {boolean} `true` if validation errors exist, otherwise `false`.
 */
const checkForErrors = () => {
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat();
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength();

  return (
    !isEmailValid ||
    !isEmailFormatValid ||
    !isPasswordValid ||
    !isPasswordLengthValid
  );
};

/**
 * @vue-method {Function} checkIfEmailEmpty - Checks if the email field is empty and updates the corresponding error state.
 * 
 * This function sets the `emailError` flag if the email field is empty.
 * 
 * @returns {boolean} `true` if the email is not empty, otherwise `false`.
 */
const checkIfEmailEmpty = () => {
  emailError.value = !loginEmail.value;
  return !emailError.value;
};

/**
 * @vue-method {Function} checkEmailFormat - Validates the email format and updates the corresponding error state.
 * 
 * This function checks if the email format is valid using a regular expression and sets the `emailFormatError` flag if invalid.
 * 
 * @returns {boolean} `true` if the email format is valid, otherwise `false`.
 */
const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value = loginEmail.value && !emailPattern.test(loginEmail.value);
  return !emailFormatError.value;
};

/**
 * @vue-method {Function} checkIfPasswordEmpty - Checks if the password field is empty and updates the corresponding error state.
 * 
 * This function sets the `passwordError` flag if the password field is empty.
 * 
 * @returns {boolean} `true` if the password is not empty, otherwise `false`.
 */
const checkIfPasswordEmpty = () => {
  passwordError.value = !loginPassword.value;
  return !passwordError.value;
};

/**
 * @vue-method {Function} checkPasswordLength - Checks if the password meets the minimum length requirement (6 characters).
 * 
 * This function checks if the password length is less than 6 characters and sets the `passwordLengthError` flag accordingly.
 * 
 * @returns {boolean} `true` if the password length is valid, otherwise `false`.
 */
const checkPasswordLength = () => {
  passwordLengthError.value = loginPassword.value && loginPassword.value.length < 6;
  return !passwordLengthError.value;
};

/**
 * @vue-method {Function} guestLogin - Logs in a guest user with predefined credentials.
 * 
 * This function automatically logs in a guest user using predefined credentials for testing or demo purposes.
 * 
 * @returns {void}
 */
const guestLogin = () => {
  login("guest@join.dogan-celik.de", "Guest1234");
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
  margin-top: 1rem;
  width: 100%;
}

.seperator {
  width: 150px;
  margin: 1rem 0;
}

.login-options {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin: 2rem 0;
  width: 100%;
}

  
.login-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  input{
    cursor: pointer;
  }
 }

.login-options span {
  font-size: 1.6rem;
  cursor: pointer !important;
  pointer-events: auto;
  transition: scale 0.125s;
}

.login-options span:hover {
  scale: 1.05;
}

.forgot-password{
  color: var(--main-color-hover) !important;
}

</style>
