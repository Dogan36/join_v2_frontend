<!-- src/views/LoginView.vue -->
<template>
   <FormLayout>
    <h2>LoginLayout</h2>
    <form @submit.prevent="login">
           
         
         
    </form>
     
      
      <!-- Password Input -->
      
  </FormLayout>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormLayout from '../FormLayout.vue';
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
  // Füge hier deine Validierungslogik und Login-Logik hinzu
  console.log('Login attempted with:', loginEmail.value, loginPassword.value);

  // Beispielhafte Navigation nach erfolgreichem Login
  router.push('/home');
};

const showForgotPassword = () => {
  // Logik zum Anzeigen der Passwort-vergessen-Seite
  console.log('Forgot password clicked');
};

const guestLogin = () => {
  // Beispielhafte Logik für den Gast-Login
  console.log('Logging in as Guest');
  router.push('/home');
};
</script>

<style>


</style>

