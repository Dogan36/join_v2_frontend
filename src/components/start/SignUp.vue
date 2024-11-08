<template>
  <FormLayout>
   <h2>Sign Up</h2>
   <form @submit.prevent="signup" novalidate>
 <InputField
   v-model="signupName"
   type="string"
   placeholder="Enter your name"
   icon="../"
   :error="nameError"
   :errorMessages="{
     nameError: emailError ? 'Name is required' : '',
        }"
 />
 <InputField
    v-model="signupEmail"
    type="email"
    placeholder="Enter your email"
    icon="src/assets/img/loginMail.svg"
    :error="emailError || emailFormatError || emailNotFoundError"
    :errorMessages="{
      emailError: emailError ? 'Email is required' : '',
      emailFormatError: emailFormatError ? 'Invalid email format' : '',
      emailNotFoundError: emailNotFoundError ? 'Email not found' : ''
    }"
  />
 <InputField
   v-model="signupPassword"
   type="password"
   placeholder="Enter your password"
   icon="src/assets/img/loginPassword.svg"
   :error="passwordError || passwordLengthError || passwordIncorrectError"
   :errorMessages="{
     passwordError: passwordError ? 'Password is required' : '',
     passwordLengthError: passwordLengthError ? 'Password must be at least 6 characters' : '',
     
   }"
 />
 <InputField
   v-model="signupPasswordRepeat"
   type="password"
   placeholder="Enter your password"
   icon="src/assets/img/loginPassword.svg"
   :error="passwordMatchError"
   :errorMessages="{
     passwordMatchError: passwordError ? 'Passwords do not match' : '',
     
   }"
 />
 <button class="main-button-layout" type="submit">Sign Up</button>
 
 
</form>

 </FormLayout>
 
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormLayout from '../shared/FormLayout.vue';
import InputField from '../shared/InputField.vue';

const router = useRouter();
const signupName = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const signupPasswordRepeat = ref('');


// Fehlerstatus
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);
const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);

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
 passwordError.value = true;
 passwordLengthError.value = true;
 passwordIncorrectError.value = true;
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

<style></style>

