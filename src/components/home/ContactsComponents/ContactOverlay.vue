<template>
  <div class="contactOverlay">
    <div class="overlayHeader">
      <img src="@/assets/img/logoInvert.svg" alt="" />
      <div class="overlayHeaderText">
        <h1>{{ isEditMode ? "Edit Contact" : "Add Contact" }}</h1>
        <h2>Tasks are better with a team!</h2>
        <img src="@/assets/img/headlineSeperator.svg" alt="" />
      </div>
    </div>
    <div class="overLayContent">
      <img src="@/assets/img/newContactIcon.svg" alt="" />
      <form class="inputContainer" @submit.prevent="save" novalidate>
        <InputField
          v-model="contactName"
          type="text"
          placeholder="Name"
          icon="src/assets/img/userIcon.svg"
          :error="nameError"
          :errorMessages="{
            nameError: nameError ? 'Name is required' : '',
          }"
        />
        <InputField
          v-model="contactEmail"
          type="email"
          placeholder="Email"
          icon="src/assets/img/loginMail.svg"
          :error="emailError || emailFormatError || emailTakenError"
          :errorMessages="{
            emailError: emailError ? 'Email is required' : '',
            emailFormatError: emailFormatError ? 'Invalid email format' : '',
            emailTakenError: emailTakenError ? 'Email already in use' : '',
          }"
        />
        <InputField
          v-model="contactPhone"
          type="phone"
          placeholder="Phone"
          icon="src/assets/img/phone.svg"
        />

        <div class="formButtons">
          <div class="secondary-button-layout" @click="cancel">Cancel</div>
          <div class="main-button-layout" @click="save">
            {{ isEditMode ? "Save Changes" : "Create Contact" }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import InputField from "@/components/shared/InputField.vue";

const props = defineProps({
  contact: {
    type: Object,
    default: null, // Kein Kontakt übergeben -> Add-Modus
  },
    isEditMode: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);

const isEditMode = computed(() => props.isEditMode);

const contactName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const nameError = ref(false);
const emailError = ref(false);
const emailFormatError = ref(false);
const emailTakenError = ref(false);

onMounted(() => {
  initializeForm();
});

const initializeForm = () => {
    console.log(props.contact);
  if (props.contact) {
    contactName.value = props.contact.user.first_name + props.contact.user.last_name  || "";
    contactEmail.value = props.contact.user.email || "";
    contactPhone.value = props.contact.user.phone || "";
  }
};

const save = () => {
  resetErrors();

  if (checkForErrors()) {
    if (isEditMode.value) {
      console.log("Updating contact:", {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
      });
    } else {
      console.log("Creating new contact:", {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
      });
    }
  } else {
    console.log("Form validation failed");
  }
 

};

const resetErrors = () => {
  nameError.value = false;
  emailError.value = false;
  emailFormatError.value = false;
  emailTakenError.value = false;
};

const resetForm = () => {
  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
};

const cancel = () => {
  resetForm();
    emit('close');
  // Event oder Callback, um das Overlay zu schließen
};

const checkForErrors = () => {
  const isNameValid = checkIfNameEmpty();
  const isEmailValid = checkIfEmailEmpty();
  const isEmailFormatValid = isEmailValid && checkEmailFormat(); // Nur prüfen, wenn E-Mail nicht leer
  const isEmailUnique = isEmailFormatValid && checkEmailDatabase(); // Nur prüfen, wenn Format korrekt

  return isNameValid && isEmailValid && isEmailFormatValid && isEmailUnique;
};

const checkIfNameEmpty = () => {
  nameError.value = !contactName.value; // Setzt den Fehlerstatus
  return !nameError.value; // Gibt true zurück, wenn kein Fehler vorliegt
};

const checkIfEmailEmpty = () => {
  emailError.value = !contactEmail.value;
  return !emailError.value;
};

const checkEmailFormat = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFormatError.value =
    contactEmail.value && !emailPattern.test(contactEmail.value);
  return !emailFormatError.value;
};

const checkEmailDatabase = () => {
  const emailDatabase = ["user@example.com", "admin@example.com"];

  const isSameAsCurrentEmail =
    isEditMode.value && props.contact?.email === contactEmail.value;
  emailTakenError.value =
    !isSameAsCurrentEmail && emailDatabase.includes(contactEmail.value);
  return !emailTakenError.value;
};
</script>

<style scoped>
@import "@/assets/base.css";

.contactOverlay {
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 1000px;
  max-width: 100%;
  border-radius: 30px;
  overflow: hidden;
}
.overlayHeader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 40%;
  gap: 3rem;
  padding: 3rem;
  background: var(--main-color);

  color: white;
  img {
    height: 6.6rem;
    width: 5.5rem;
  }
  .overlayHeaderText {
    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 700;
      font-size: 6.1rem;
      margin-bottom: 1rem;
      text-wrap: nowrap;
    }
    h2 {
      font-weight: 400;
      font-size: 2.7rem;
    }
    img {
      rotate: 90deg;
    }
  }
}

.overLayContent {
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  img {
    height: 120px;
    width: 120px;
  }
}
</style>
