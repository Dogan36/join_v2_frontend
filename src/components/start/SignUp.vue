<template>
  <FormLayout>
    <div class="formHeader">
      <h1>Sign Up</h1>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
    </div>
    <form class="form" @submit.prevent="trySignup" novalidate>
      <InputField
        v-model="signupName"
        type="string"
        placeholder="Name"
        icon="src/assets/img/userIcon.svg"
        :error="nameError"
        :errorMessages="{
          nameError: nameError ? 'Name is required' : '',
        }"
      />
      <InputField
        v-model="signupEmail"
        type="email"
        placeholder="E-Mail"
        icon="src/assets/img/loginMail.svg"
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
        icon="src/assets/img/loginPassword.svg"
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
        icon="src/assets/img/loginPassword.svg"
        :error="passwordMatchError"
        :errorMessages="{
          passwordError: passwordError ? 'Confirmation is required' : '',
          passwordMatchError: passwordMatchError
            ? 'Passwords do not match'
            : '',
        }"
      />
      <div class="signupOptions">
        <label>
          <input type="checkbox" v-model="readPrivacy" />I accept the Privacy
          Policy</label
        >
        <p v-if="privacyError" class="error-message">Please read and accept the Privacy Policy.</p>
      </div>
      <div class="loginButtons">
        <button class="main-button-layout" type="submit">Sign Up</button>
      </div>
    </form>
  </FormLayout>
</template>

<script setup>
import { ref } from "vue";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";


const readPrivacy = ref(false);
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const signupPasswordRepeat = ref("");

// Fehlerstatus
const nameError = ref(false);
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);
const privacyError = ref(false);

async function signUp(name, email, password) {
  
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
      console.log('Registrierung erfolgreich:', data);
      // Weiterleitung oder Anzeige einer Erfolgsnachricht
    } else {
      const errorData = await response.json();
      console.error('Fehler bei der Registrierung:', errorData);
      if (errorData.email) {
        emailTakenError.value = true;
      }
    }
  } catch (error) {
    console.error('Netzwerkfehler:', error);
  }
}

const trySignup = () => {
  resetErrors();
  if (!checkForErrors()) {
    signUp(signupName.value, signupEmail.value, signupPassword.value);
  } else {
    console.log("Errors detected. Sign up aborted.");
  }
};

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

const checkForErrors = () => {
  const isNameValid = checkIfNameEmpty();
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat();
  const isEmailUnique = isEmailFormatValid && checkEmailDatabase();
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength();
  const isPasswordRepeatValid = checkIfPasswordRepeatEmpty();
  const arePasswordsMatching =isPasswordRepeatValid &&  checkIfPasswordsMatch();
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

const checkIfNameEmpty = () => {
  nameError.value = !signupName.value;
  return !nameError.value;
};

const checkIfEmailEmpty = () => {
  emailError.value = !signupEmail.value;
  return !emailError.value;
};

const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value =
    signupEmail.value && !emailPattern.test(signupEmail.value);
  return !emailFormatError.value;
};

const checkEmailDatabase = () => {
  const emailDatabase = ["user@example.com", "admin@example.com"]; // Beispielhafte Datenbank
  emailTakenError.value = emailDatabase.includes(signupEmail.value);
  return !emailTakenError.value;
};

const checkIfPasswordEmpty = () => {
  passwordError.value = !signupPassword.value;
  return !passwordError.value;
};

const checkPasswordLength = () => {
  passwordLengthError.value =
    signupPassword.value && signupPassword.value.length < 6;
  return !passwordLengthError.value;
};

const checkIfPasswordRepeatEmpty = () => {
  passwordMatchError.value = !signupPasswordRepeat.value;
  return !passwordError.value;
};

const checkIfPasswordsMatch = () => {
  passwordMatchError.value = signupPassword.value !== signupPasswordRepeat.value;
  console.log("Passwords match:", !passwordMatchError.value);
  return !passwordMatchError.value;
};

const checkPrivacyAccepted = () => {
  privacyError.value = !readPrivacy.value;
  return !privacyError.value;
};

const showForgotPassword = () => {
  console.log("Forgot password clicked");
};
</script>

<style>
@import "../../assets/base.css";

.signupOptions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
}

</style>
