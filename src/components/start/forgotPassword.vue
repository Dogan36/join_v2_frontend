<template>
  <FormLayout>
    <div class="formHeader">
      <h1>Forgot Password</h1>
      <img class="seperator" src="../../assets/img/seperator.svg" alt="" />
    </div>
    <form class="form" @submit.prevent="tryRequest" novalidate>
      <InputField
        v-model="forgotEmail"
        type="email"
        placeholder="Enter your email"
        autocomplete="current-email"
        icon="src/assets/img/loginMail.svg"
        :error="emailError || emailFormatError || emailNotFoundError"
        :errorMessages="{
          emailError: emailError ? 'Email is required' : '',
          emailFormatError: emailFormatError ? 'Invalid email format' : '',
          emailNotFoundError: emailNotFoundError ? 'Email not found' : '',
        }"
      />
      
      <div class="loginButtons">
        <button class="main-button-layout" type="submit">Log in</button>
      </div>
    </form>
  </FormLayout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormLayout from "../shared/FormLayout.vue";
import InputField from "../shared/InputField.vue";

import { defineProps } from "vue";
import { API_BASE_URL } from "@/config";
const props = defineProps({
  toggle: {
    type: Function,
    required: true,
  },
 
});

const router = useRouter();
const forgotEmail = ref("");
const rememberMe = ref(false);

// Fehlerstatus
const emailError = ref(false);
const emailFormatError = ref(false);
const emailNotFoundError = ref(false);


async function requestPasswordReset(email) {
  console.log("Requesting password reset with email:", email);
  try {
    const response = await fetch(`${API_BASE_URL}/user/password-reset-request/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Das Backend erwartet i. d. R. ein Feld "email" (oder wie du es im Serializer definiert hast)
      body: JSON.stringify({ email }),
      
    });

    if (response.ok) {
      // Erfolgsfall: z.B. 200 OK
      const data = await response.json();
      console.log("Antwort vom Backend:", data);
      // z.B. "Password reset link has been sent to your email"
      alert("E-Mail zum Zurücksetzen wurde versendet. Bitte checke dein Postfach.");
      
      // Weiterleitung auf eine andere Seite oder Reset des Formulars
      // window.location.href = "/start";
    } else {
      // Falls das Backend einen Fehler (z.B. 400 oder 404) schickt:
      const errorData = await response.json();
      console.error("Fehler beim Anfordern des Reset-Links:", errorData);

      // Beispiel: wenn der Server bei einer ungültigen E-Mail "User with this email does not exist" zurückgibt
      if (errorData.error) {
        alert("Fehler: " + errorData.error);
      } else {
        alert("Unbekannter Fehler beim Zurücksetzen des Passworts.");
      }
    }
  } catch (error) {
    // Netzwerkfehler oder Server nicht erreichbar
    console.error("Netzwerkfehler beim Passwort-Reset:", error);
    alert("Netzwerkfehler. Bitte später erneut versuchen.");
  }
}

const tryRequest = () => {
  resetErrors();
  if (!checkForErrors()) {
    requestPasswordReset(forgotEmail.value);
  } else {
    console.log("Form validation failed");
  }
};

const resetErrors = () => {
  emailError.value = false;
  emailFormatError.value = false;
  emailNotFoundError.value = false;
};
const checkForErrors = () => {
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat(); // Nur prüfen, wenn E-Mail nicht leer

  return !isEmailValid || !isEmailFormatValid;
};

const checkIfEmailEmpty = () => {
  emailError.value = !forgotEmail.value;
  return !emailError.value; // Gibt true zurück, wenn kein Fehler vorliegt
};

const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value =
    forgotEmail.value && !emailPattern.test(forgotEmail.value);
  return !emailFormatError.value;
};
</script>

<style>
@import "./../../assets/base.css";

.form {
  width: 82%;
  min-width: fit-content;
}
.buttonIcon {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
  align-self: center;
}

.loginButtons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  flex-wrap: wrap;
}

.seperator {
  width: 150px;
  margin: 1rem 0;
}

.loginOptions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.loginOptions label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.loginOptions span {
  cursor: pointer;
  color: var(--main-color-hover);
}

.loginOptions span:hover {
  color: var(--main-color);
  scale: 1.05;
}
</style>
