<template>
  <FormLayout>
    <div class="formHeader">
      <h2>Sign Up</h2>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
    </div>
    <form class="form" @submit.prevent="signup" novalidate>
      <InputField
        v-model="signupName"
        type="string"
        placeholder="Enter your name"
        icon="src/assets/img/userIcon.svg"
        :error="nameError"
        :errorMessages="{
          nameError: nameError ? 'Name is required' : '',
        }"
      />
      <InputField
        v-model="signupEmail"
        type="email"
        placeholder="Enter your email"
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
        placeholder="Enter your password"
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
        placeholder="Repeat your password"
        icon="src/assets/img/loginPassword.svg"
        :error="passwordMatchError"
        :errorMessages="{
          passwordError: passwordError ? 'Password is required' : '',
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

const signup = () => {
  resetErrors();
  checkForErrors();

  if (hasErrors()) {
    console.log("Errors detected. Sign up aborted.");
    return;
  }

  // Name aufteilen
  const [firstName, ...rest] = signupName.value.split(" ");
  const lastName = rest.join(" "); // Alle weiteren Namen als Nachname

  const signupData = {
    first_name: firstName,
    last_name: lastName || "", // Falls kein Nachname vorhanden
    email: signupEmail.value,
    password: signupPassword.value,
  };

  console.log("Signup data prepared:", signupData);

  // Hier schickst du die Daten an dein Backend
  // Beispiel: axios.post('/api/signup', signupData)
  // .then(() => router.push('/welcome'))
  // .catch((error) => console.error("Signup failed:", error));
};

const resetErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordMatchError.value = false;
};

const checkForErrors = () => {
  checkIfNameEmpty();
  checkIfEmailEmpty();
  if (!emailError.value) {
    checkEmailFormat();
    if (!emailFormatError.value) {
      checkEmailDatabase();
    }
  }
  checkIfPasswordEmpty();
  if (!passwordError.value) {
    checkPasswordLength();
  }
  checkIfPasswordsMatch();
  checkEmailDatabase();
  checkPrivacyAccepted();
};

const checkIfPasswordsMatch = () => {
  if (signupPassword.value !== signupPasswordRepeat.value) {
    passwordMatchError.value = true;
  } else {
    passwordMatchError.value = false;
  }
};
const showForgotPassword = () => {
  // Logik zum Anzeigen der Passwort-vergessen-Seite
  console.log("Forgot password clicked");
};

const checkIfNameEmpty = () => {
  if (!signupName.value) {
    console.log(signupName.value);
    nameError.value = true;
  }
};

const checkIfEmailEmpty = () => {
  if (!signupEmail.value) {
    emailError.value = true;
  }
};

const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (signupEmail.value && !emailPattern.test(signupEmail.value)) {
    console.log(signupEmail.value);
    emailFormatError.value = true;
    console.log(emailFormatError.value);
  } else {
    emailFormatError.value = false;
    console.log(emailFormatError.value);
  }
};

const checkEmailDatabase = () => {
  // Beispielhafte Logik zur Überprüfung der E-Mail-Adresse in der Datenbank
  const emailDatabase = ["user@example.com", "admin@example.com"]; // Beispiel
  if (emailDatabase.includes(signupEmail.value)) {
    emailTakenError.value = true;
  }
};

const checkIfPasswordEmpty = () => {
  if (!signupPassword.value) {
    passwordError.value = true;
  }
};

const checkPasswordLength = () => {
  if (signupPassword.value && signupPassword.value.length < 6) {
    passwordLengthError.value = true;
    passwordError.value = false;
  }
};

const checkPrivacyAccepted = () => {
  if (!readPrivacy.value) {
    privacyError.value = true;
  } else {
    privacyError.value = false;
  }
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

.formHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>
