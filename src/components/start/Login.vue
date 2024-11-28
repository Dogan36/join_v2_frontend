<!-- src/views/LoginView.vue -->
<template>
   <FormLayout>
    <div class="formHeader">
      <h2>Login</h2>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="">
    </div>
    <form class="form" @submit.prevent="login" novalidate>
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
        emailNotFoundError: emailNotFoundError ? 'Email not found' : ''
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
        passwordLengthError: passwordLengthError ? 'Password must be at least 6 characters' : '',
        passwordIncorrectError: passwordIncorrectError ? 'Password is incorrect' : ''
        }"
      />
      <div class="loginOptions">
        <label>
        <input type="checkbox" v-model="rememberMe" />Remember me</label>
        <span type="button" @click="toggleForgotPassword">Forgot password?</span>
        </div>
      <div class="loginButtons">
        <button class="main-button-layout"  type="submit">Log in </button>
        <button class="secondary-button-layout" @click="guestLogin">Guest Login</button>  
      </div>
    </form>
  </FormLayout>

  
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormLayout from '../shared/FormLayout.vue';
import InputField from '../shared/InputField.vue';

import { defineProps } from 'vue';

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
const loginEmail = ref('');
const loginPassword = ref('');
const rememberMe = ref(false);

// Fehlerstatus
const emailError = ref(false);
const emailFormatError = ref(false);
const emailNotFoundError = ref(false);
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordIncorrectError = ref(false);

const login = () => {
  resetErrors();
  checkForErrors();

  console.log('Login attempted with:', loginEmail.value, loginPassword.value);

  // Beispielhafte Navigation nach erfolgreichem Login
  //router.push('/home');
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
  checkIfEmailEmpty(); // Zuerst auf leere E-Mail prüfen
  if (!emailError.value) { // Nur weiter prüfen, wenn kein Fehler bei leerer E-Mail
    checkEmailFormat();
    if (!emailFormatError.value) { // Nur weitermachen, wenn kein Formatfehler
      checkEmailDatabase();
    }
  }
  checkIfPasswordEmpty();
  if (!passwordError.value) { // Nur weiter prüfen, wenn kein Fehler bei leerem Passwort
    checkPasswordLength();
  }
};

const showForgotPassword = () => {
  // Logik zum Anzeigen der Passwort-vergessen-Seite
  console.log('Forgot password clicked');
};


const checkIfEmailEmpty = () => {
  if (!loginEmail.value) {
    emailError.value = true;

  }
};

const checkEmailFormat = () => {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (loginEmail.value && !emailPattern.test(loginEmail.value)) {
    console.log(loginEmail.value);
    emailFormatError.value = true;
    console.log(emailFormatError.value);

  }
  else {
    emailFormatError.value = false;
    console.log(emailFormatError.value);
  }
};

const checkEmailDatabase = () => {
  // Beispielhafte Logik zur Überprüfung der E-Mail-Adresse in der Datenbank
  const emailDatabase = ['user@example.com', 'admin@example.com']; // Beispiel
  if (!emailDatabase.includes(loginEmail.value)) {
    emailNotFoundError.value = true;
    return;
  }
}

const checkIfPasswordEmpty = () => {

  if (!loginPassword.value) {
    passwordError.value = true;

  }
};

const checkPasswordLength = () => {
  if (loginPassword.value && loginPassword.value.length < 6) {
    passwordLengthError.value = true;
    passwordError.value = false;
  }
};

const guestLogin = () => {
  // Beispielhafte Logik für den Gast-Login
  console.log('Logging in as Guest');
  router.push('/home');
};
</script>

<style>
@import './../../assets/base.css';

.form{
  width: 82%;
  min-width: fit-content;
}
.buttonIcon {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
  align-self: center;
}

.loginButtons{
  display: flex;
  justify-content: space-around;
  gap: 10px;
  flex-wrap: wrap;
}

.seperator{
  width: 150px;
  margin: 1rem 0;
}

.loginOptions{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.loginOptions label{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.loginOptions span{
  cursor: pointer;
  color: var(--main-color-hover);
}

.loginOptions span:hover{
  color: var(--main-color);
  scale: 1.05;
}
</style>

