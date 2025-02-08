<template>
  <div class="wrapper">

    <div class="logoContainer">
      <img class="logo" src="@/assets/img/logo.svg" alt="">
    </div>
      <div v-if="isLogin">
        <Login
          @toggleForgotPassword="toggleForgotPassword" />
      </div>
      <div  v-if="isSignup">
        <Signup
          @toggle="toggleSignup"
          @privacyPolicy="goToPrivacyPolicy"></Signup>
      </div>
      <div v-if="isForgotPassword">
        <ForgotPassword
        @toggle="toggleForgotPassword"/>
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
import Login from '@/components/start/Login.vue';
import Signup from '@/components/start/SignUp.vue';
import ForgotPassword from '@/components/start/ForgotPassword.vue';
import { onMounted } from 'vue';
import { currentUser } from '@/store/state';

onMounted(() => {
  checkIfUserIsLoggedIn();
});
// Reaktives Datenobjekt für den Login-Zustand
const isLogin = ref(true);
const isSignup = ref(false);
const isForgotPassword = ref(false);
// Funktion zum Umschalten des Formulars
const toggleSignup = () => {
  console.log('toggleSignup');
  isLogin.value = !isLogin.value;
  isSignup.value = !isSignup.value;
};

const toggleForgotPassword = () => {
  console.log('toggleForgotPassword');
  isLogin.value = !isLogin.value;
  isForgotPassword.value = !isForgotPassword.value
};

const checkIfUserIsLoggedIn = () => {
  if (localStorage.getItem('join_token')) {
    currentUser.value = JSON.parse(localStorage.getItem('join_user'));
    window.location.href = '/home';
  }
};

const goToPrivacyPolicy = () => {
  window.open('/privacy?type=privacyPolicy', '_blank');
};
</script>

<style scoped>

h2 {
  font-size: 60px;
  font-weight: 400;
  margin-top: 20px;
}
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
  gap: 2rem;
}

.privacyLinks a {
  font-size: 1.6rem;
  color: #A8A8A8;
  text-decoration: none;
  transition: all 0.0125s;
  &:hover {
    scale: 1.05;
    color: var(--main-color-hover);
  }
}
</style>
