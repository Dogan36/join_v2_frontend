<template>
  <div class="logoContainer">
    <img class="logo" src="@/assets/img/logo.svg" alt="" />
  </div>

  <FormLayout>
    <div class="formHeader">
      <h1>Reset your password</h1>
      <img class="seperator" src="@/assets/img/seperator.svg" alt="" />
      <span class="subtitle">Change your account password</span>
    </div>
    <form class="form" @submit.prevent="tryReset" novalidate>
      <InputField
        v-model="resetPassword"
        type="password"
        placeholder="Password"
        :icon="passwordIcon"
        :error="passwordError || passwordLengthError"
        :errorMessages="{
          passwordError: passwordError ? 'Password is required' : '',
          passwordLengthError: passwordLengthError
            ? 'Password must be at least 6 characters'
            : '',
        }"
      />
      <InputField
        v-model="resetPasswordRepeat"
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
      <div class="loginButtons">
        <button class="main-button-layout" type="submit">Confirm</button>
      </div>
    </form>
  </FormLayout>
</template>
<script setup>
import FormLayout from "@/components/shared/FormLayout.vue";
import InputField from "@/components/shared/InputField.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API_BASE_URL } from "@/config";
import passwordIcon from '@/assets/img/loginPassword.svg'
const resetPassword = ref("");
const resetPasswordRepeat = ref("");
const router = useRouter();
const uid = router.currentRoute.value.params.uid
const token = router.currentRoute.value.params.token
// Fehlerstatus

const passwordError = ref(false);
const passwordLengthError = ref(false);
const passwordMatchError = ref(false);


const tryReset = () => {
  resetErrors();
  if (!checkForErrors()) {
    performResetPassword(resetPassword.value);
  } else {
    console.log("Errors detected..");
  }
};

// Reset password
async function performResetPassword(password) {
    console.log(`${API_BASE_URL}/user/password-reset/${uid}/${token}/`)
  try {
    const response = await fetch(`${API_BASE_URL}/user/password-reset/${uid}/${token}/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password }),
});
    
    if (response.ok) {
        console.log("Password reset successful");
      router.push({ name: "start" });
    } else {
      console.log("Error resetting password", error);
    }
  } catch (error) {
    console.error("Error resetting password", error);
  }
}

const resetErrors = () => {
  passwordError.value = false;
  passwordLengthError.value = false;
  passwordMatchError.value = false;
};

const checkForErrors = () => {
  
  const isPasswordValid = checkIfPasswordEmpty();
  const isPasswordLengthValid = isPasswordValid && checkPasswordLength();
  const isPasswordRepeatValid = checkIfPasswordRepeatEmpty();
  const arePasswordsMatching =isPasswordRepeatValid &&  checkIfPasswordsMatch();
 

  return (

    !isPasswordValid ||
    !isPasswordLengthValid ||
    !isPasswordRepeatValid ||
    !arePasswordsMatching
  );
};

const checkIfPasswordEmpty = () => {
  passwordError.value = !resetPassword.value;
  return !passwordError.value;
};

const checkPasswordLength = () => {
  passwordLengthError.value =
    resetPassword.value && resetPassword.value.length < 6;
  return !passwordLengthError.value;
};

const checkIfPasswordRepeatEmpty = () => {
  passwordMatchError.value = !resetPasswordRepeat.value;
  return !passwordError.value;
};

const checkIfPasswordsMatch = () => {
  passwordMatchError.value = resetPassword.value !== resetPasswordRepeat.value;
  console.log("Passwords match:", !passwordMatchError.value);
  return !passwordMatchError.value;
};
</script>

<style>


.logoContainer {
  height: 150px;
  margin-top: 40px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.subtitle {
  font-size: 2.5rem;
}
</style>
