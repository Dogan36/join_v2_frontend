<template>
  <div class="wrapper">

    <div class="logoContainer">
      <img class="logo" src="@/assets/img/logo.svg" alt="">
    </div>

    
      <div v-if="isLogin">
        <Login />
      </div>
      <div v-if="issignup">
        <Signup />
      </div>
      <div v-if="isForgotPassword">
        <ForgotPassword />
      </div>
    

    <div class="notAUserContainer">
      <div v-if="isLogin" >
        <span>Not a user?</span>
        <button  class="main-button-layout font-size16" @click="toggleSignup"><span>Sign up</span></button>
      </div>
    </div>
  </div>
  <div class="privacyLinks">
    <a target="_blank" href="/privacy?type=privacyPolicy">Privacy Policy</a>
    <a target="_blank" href="/privacy?type=legalNotice">Legal Notice</a>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Login from '.././components/start/Login.vue';
import Signup from '.././components/start/SignUp.vue';
import ForgotPassword from '.././components/start/ForgotPassword.vue';
import { provide } from 'vue';

// Reaktives Datenobjekt für den Login-Zustand
const isLogin = ref(true);
const issignup = ref(false);
const isForgotPassword = ref(false);
// Funktion zum Umschalten des Formulars
const toggleSignup = () => {
  isLogin.value = false;
  issignup.value = true;
  isForgotPassword.value = false;
};

const toggleForgotPassword = () => {
  isLogin.value = false;
  issignup.value = false;
  isForgotPassword.value = true;
};

provide('toggleSignup', toggleSignup);
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.logoContainer {
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: yellow;
  width: 33%;
}

.logoContainer img {
  height: 150px;
  margin-top: 40px;
  width: 200px;
}

.notAUserContainer {
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: start;
  background-color: red;
  width: 33%;
}

.notAUserContainer div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 35px;
  margin-top: 40px;
  margin-right: 40px;
  height: 51px;

}

.notAUserContainer div span:first-child {
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  white-space: nowrap;
}

.notAUserContainer div span:last-child {
  font-size: 16px;
}

.privacyLinks {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 20px;
  
}

.privacyLinks a {
  font-size: 16px;
  color: var(--main-color-hover);
  text-decoration: none;
}
</style>
