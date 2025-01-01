<!-- src/views/LoginView.vue -->
<template>
  <FormLayout>
    <div class="formHeader">
      <h1>Login</h1>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
    </div>
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
          <input type="checkbox" v-model="rememberMe" />Remember me</label
        >
        <span type="button" @click="toggleForgotPassword"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";

import { defineProps } from "vue";
import { API_BASE_URL } from "@/config";
const props = defineProps({
  toggle: {
    type: Function,
    required: true,
  },
  toggleForgotPassword: {
    type: Function,
    required: true,
  },
});

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

async function login(email, password) {
  let username = email;
  console.log("Logging in with email:", email, "and password:", password);
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
      localStorage.setItem("join_token", data.token); // Speichert das Token
      alert("Login erfolgreich!");
      window.location.href = "/home"; // Beispiel: Weiterleitung
    } else {
      const errorData = await response.json();
      console.error("Fehler bei der Registrierung:", errorData);
      if (errorData.email) {
        emailNotFoundError.value = true;
      } else if (errorData.non_field_errors) {
        passwordIncorrectError.value = true;
        }
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
    }
}

const tryLogin = () => {
  resetErrors();
  if (!checkForErrors()) {
    login(loginEmail.value, loginPassword.value);
  } else {
    console.log("Form validation failed");
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
  const isEmailFound = isEmailFormatValid && checkEmailDatabase(); // Nur prüfen, wenn Format korrekt
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength(); // Nur prüfen, wenn Passwort nicht leer

  return (
    !isEmailValid ||
    !isEmailFormatValid ||
    !isEmailFound ||
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

const checkEmailDatabase = () => {
  const emailDatabase = [
    "user@example.com",
    "admin@example.com",
    "dogancelik86@gmail.com",
  ]; // Beispielhafte Datenbank
  emailNotFoundError.value = !emailDatabase.includes(loginEmail.value);
  return !emailNotFoundError.value;
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

const showForgotPassword = () => {
  console.log("Forgot password clicked");
};

const guestLogin = () => {
  // Beispielhafte Logik für den Gast-Login
  console.log("Logging in as Guest");
  router.push("/home");
};
</script>

<style>
@import "./../../assets/base.css";

.form {
  width: 82%;
  min-width: fit-content;
}
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
  margin: 1rem 0;
}
.loginOptions label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.loginOptions span {
  cursor: pointer;
  color: var(--main-color-hover);
}

.loginOptions span:hover {
  color: var(--main-color);
  scale: 1.05;
}
</style>
