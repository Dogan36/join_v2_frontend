<template>
 
  <div class="wrapper">
    <div class="logoContainer" :class="{ animate: startAnimation }">
      <img class="logo-invert" src="@/assets/img/logoInvert.svg" alt="Logo Invert">
      <img class="logo-normal" src="@/assets/img/logo.svg" alt="Logo">
    </div>
    
      <div v-if="isLogin && animationFinished">
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
    

    <div v-if="animationFinished" class="notAUserContainer">
        <span v-if="isLogin">Not a user?</span>
        <button v-if="isLogin"  class="main-button-layout font-size16" @click="toggleSignup"><span>Sign up</span></button>
    </div>
  </div>
  <div class="privacyLinks">
    <a target="_blank" href="/privacy?type=privacyPolicy">Privacy Policy</a>
    <a target="_blank" href="/privacy?type=legalNotice">Legal Notice</a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Login from '@/components/start/Login.vue';
import Signup from '@/components/start/SignUp.vue';
import ForgotPassword from '@/components/start/ForgotPassword.vue';
import { currentUser } from '@/store/state';
const startAnimation = ref(false);
const animationFinished = ref(false);
  onMounted(() => {
  setTimeout(() => {
    startAnimation.value = true;
  }, 1000);
  setTimeout(() => {
    checkIfUserIsLoggedIn();
  }, 2000);

  
});
// Reaktives Datenobjekt für den Login-Zustand
const isLogin = ref(true);
const isSignup = ref(false);
const isForgotPassword = ref(false);
// Funktion zum Umschalten des Formulars
const toggleSignup = () => {
  isLogin.value = !isLogin.value;
  isSignup.value = !isSignup.value;
};

const toggleForgotPassword = () => {
  isLogin.value = !isLogin.value;
  isForgotPassword.value = !isForgotPassword.value
};

const checkIfUserIsLoggedIn = () => {
  if (localStorage.getItem('join_token')) {
    currentUser.value = JSON.parse(localStorage.getItem('join_user'));
    window.location.href = '/home';
  }
  else {
    animationFinished.value = true;
  }
};

const goToPrivacyPolicy = () => {
  window.open('/privacy?type=privacyPolicy', '_blank');
};
</script>

<style scoped>
:root {
  --final-logo-top: 5rem;
  --final-logo-left: 5rem;
  --final-logo-width: 100px;
  --initial-logo-width: 150px;
}
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;         /* Volle Breite */
  height: 100vh;        /* Volle Höhe */
  background-color: var(--main-color); /* Hintergrundfarbe */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;          /* Zunächst im Vordergrund */
    transition: background-color 1s ease, width 0s linear 1s, height 0s linear 1s;
}

.logoContainer.animate {
  background-color: unset; /* Hintergrundfarbe wird entfernt */
  z-index: -0;
  height: 0;
  width: 0;
}

@keyframes logoNormalTransition {
  0% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    opacity: 0;
  }
  100% {
    top: 5rem;      /* Finale Position (oben) */
    left: 5rem;     /* Finale Position (links) */
    transform: translate(0, 0); /* Keine Verschiebung */
    width: 100px;    /* Finale Breite */
    opacity: 1;      /* Sichtbar */
  }
}

@keyframes logoInvertTransition {
  0% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    opacity: 1;
  }
  100% {
    top: 5rem;
    left: 5rem;
    transform: translate(0, 0);
    width: 100px;
    opacity: 0;      /* Wird ausgeblendet */
  }
}

.logo-normal,
.logo-invert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 1s ease;
  height: 200px;
}

.logo-normal {
  opacity: 0;
  
}

.logo-invert {
  opacity: 1;
}

.logoContainer.animate .logo-normal {
  animation: logoNormalTransition 1s forwards;
}

.logoContainer.animate .logo-invert {
  animation: logoInvertTransition 1s forwards;
}

.logoContainer.animate .logo-invert {
  opacity: 0;
}

.logoContainer.animate .logo-normal {
  opacity: 1;
}

.notAUserContainer {
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: start;
  width: 33%;
  gap: 35px;
  padding: 5rem;
}



.notAUserContainer span:first-child {
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  white-space: nowrap;
}

.notAUserContainer  span:last-child {
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

.seperator {
  width: 150px;
  margin: 1rem 0;
}

.subHeader {
  font-size: 2.1rem;
  text-align: center;
}


@media screen and (max-width: 700px) {
  @keyframes logoNormalTransition {
    0% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      opacity: 0;
    }
    100% {
      top: 2rem;       /* Angepasste finale Position für mobile */
      left: 2rem;
      transform: translate(0, 0);
      width: 80px;     /* Angepasste finale Breite */
      opacity: 1;
    }
  }

  @keyframes logoInvertTransition {
    0% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      opacity: 1;
    }
    100% {
      top: 2rem;
      left: 2rem;
      transform: translate(0, 0);
      width: 80px;
      opacity: 0;
    }
  }

  .wrapper {
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .logoContainer.animate {
    height: 0;
    width: 0;
    justify-content: flex-start;
  }

  .logo-normal{
    height: 80px;
  }
  .logo-invert{
    height: 80px;
  }
  .notAUserContainer{
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 4rem;
    padding: 0;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width : 500px) {
  .logoContainer{
    padding: 1rem
  }
  .logo-normal {
    width: 100px;
  }

  .logo-invert {
    width: 100px;
  }

  .notAUserContainer{

    gap: 0;
    justify-content: space-around;
  }
  
}
</style>
