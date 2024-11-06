<template>
  
    <div v-if="isLogin">
      <Login />
    </div>
    <div v-if="isSignIn">
      <Signup />
    </div>
    <button @click="toggleForm">
      {{ isLogin ? 'Go to Signup' : 'Go to Login' }}
    </button>
  
</template>

<script setup>
import { ref } from 'vue';
import Login from '.././components/start/Login.vue';
import Signup from '.././components/start/SignUp.vue';

// Reaktives Datenobjekt für den Login-Zustand
const isLogin = ref(true);
const isSignIn = ref(false);
const isForgotPassword = ref(false);
// Funktion zum Umschalten des Formulars
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
</script>
<style scoped>

</style>
