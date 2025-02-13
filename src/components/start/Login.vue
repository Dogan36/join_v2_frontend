<!-- src/views/LoginView.vue -->
<template>
  <FormLayout>
    <div class="formHeader">
      <div></div>
      <h1>Login</h1>
      <div></div>
    </div>
    <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
    <form class="form" @submit.prevent="tryLogin" novalidate>
      <InputField
        v-model="loginEmail"
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
      <div class="loginOptions">
        <label>
          <input type="checkbox" v-model="rememberMe" /><span class="rememberMe">Remember me</span></label
        >
        <span class="forgotPassword" type="button" @click="forgotPassword"
          >Forgot password?</span
        >
      </div>
      <div class="loginButtons">
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

// Fehlerstatus
const emailError = ref(false);
const emailFormatError = ref(false);
const emailNotFoundError = ref(false);
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordIncorrectError = ref(false);
const emit = defineEmits();

const forgotPassword = () => {
  emit('toggleForgotPassword');
};

onMounted(() => {
  if (localStorage.getItem("join_remember")) {
    loginEmail.value = localStorage.getItem("join_remember");
    rememberMe.value = true;
  }
});

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
      localStorage.setItem("join_user", JSON.stringify(data.user))
      if (rememberMe.value) {
        localStorage.setItem("join_remember", email);
      } else {
        localStorage.removeItem("join_remember");
      }
      showConfirmation('Login successful!');
      window.location.href = "/home"; // Beispiel: Weiterleitung
    } else {
      const errorData = await response.json();
      if (errorData.error === "User does not exist") {
        emailNotFoundError.value = true;
      } else if (errorData.error === "Incorrect password") {
        passwordIncorrectError.value = true;
        }
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
    } finally {
      hideOverlay();
    }
}

const tryLogin = () => {
  resetErrors();
  if (!checkForErrors()) {
    login(loginEmail.value, loginPassword.value);
  }
};

const resetErrors = () => {
  emailError.value = false;
  emailFormatError.value = false;
  emailNotFoundError.value = false;
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordIncorrectError.value = false;
};

const checkForErrors = () => {
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat(); // Nur prüfen, wenn E-Mail nicht leer
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength(); // Nur prüfen, wenn Passwort nicht leer

  return (
    !isEmailValid ||
    !isEmailFormatValid ||
    !isPasswordValid ||
    !isPasswordLengthValid
  );
};

const checkIfEmailEmpty = () => {
  emailError.value = !loginEmail.value;
  return !emailError.value; // Gibt true zurück, wenn kein Fehler vorliegt
};

const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value =
    loginEmail.value && !emailPattern.test(loginEmail.value);
  return !emailFormatError.value;
};


const checkIfPasswordEmpty = () => {
  passwordError.value = !loginPassword.value;
  return !passwordError.value;
};

const checkPasswordLength = () => {
  passwordLengthError.value =
    loginPassword.value && loginPassword.value.length < 6;
  return !passwordLengthError.value;
};

const guestLogin = () => {
  login("guest@join.dogan-celik.de", "Guest1234")
};
</script>

<style>
.buttonIcon {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
  align-self: center;
}

.loginButtons {
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

.loginOptions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin: 2rem 0;
  width: 100%;
}

  
.loginOptions label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  input{
    cursor: pointer;
  }
 }

.loginOptions span {
  font-size: 1.6rem;
  cursor: pointer !important;
  pointer-events: auto;
  transition: scale 0.125s;
}

.loginOptions span:hover {
  scale: 1.05;
}

.forgotPassword{
  color: var(--main-color-hover) !important;
}

</style>
