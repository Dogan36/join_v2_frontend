<template>
  <FormLayout>
    <div class="formHeader">
      <img class="goBack" src="@/assets/img/arrowLeft.svg" alt="Back Arrow" @click="goBack" />
      <h1>Sign Up</h1>
      <div style="width: 37px;"></div>
    </div>
      <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
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
        <input type="checkbox" v-model="readPrivacy" />
        I accept the <span @click="showPrivacyPolicy">Privacy Policy</span>
      </div>
      <p v-if="privacyError" class="error-message">Please read and accept the Privacy Policy.</p>
      <div class="loginButtons">
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

// Fehlerstatus
const nameError = ref(false);
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);
const privacyError = ref(false);

const emit = defineEmits();
const goBack = () => {
  emit("toggle");
};

const showPrivacyPolicy = () => {
  emit("privacyPolicy");
};

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
      localStorage.setItem("join_user", JSON.stringify(data.user))
      showConfirmation('Sign up successful!');
      router.push('/home');
    } else {
      const errorData = await response.json();
      if (errorData.email) {
        emailTakenError.value = true;
      }
    }
  } catch (error) {
    console.error('Netzwerkfehler:', error);
  }
  finally {
    hideOverlay();
  }
}

const trySignup = () => {
  resetErrors();
  if (!checkForErrors()) {
    signUp(signupName.value, signupEmail.value, signupPassword.value);
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
  return !passwordMatchError.value;
};

const checkPrivacyAccepted = () => {
  privacyError.value = !readPrivacy.value;
  return !privacyError.value;
};


</script>

<style>


.signupOptions {
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
