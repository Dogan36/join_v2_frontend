<template>
  <div class="workspace-info-overlay">
    <div class="workspace-info-content">
    <div class="workspace-info-header">
      <img class="logo" src="@/assets/img/logoInvert.svg" alt="" />
      
        <h2>{{ contactOverlayIsEditMode ? "Edit Contact" : "Add Contact" }}</h2>
        
      <div class="workspace-header-content">
        <p>Tasks are better with a team!</p>
      </div>
     
    </div>
    <div class="workspace-info-main">
      <img class="card-contact-img" style="align-self: center;" v-if="!contactOverlayIsEditMode" src="@/assets/img/newContactIcon.svg" alt="Contact Icon" />
      <div v-else
          class="card-avatar"
          :style="{ backgroundColor: selectedContact.color?.hex_value || '#ffffff', color: getTextColor(selectedContact.color?.hex_value || '#ffffff') }"
        >
          {{ selectedContact.avatar }}
        </div>
      <form class="input-container" @submit.prevent="save" novalidate>
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
          type="number"
          placeholder="Phone"
          icon="src/assets/img/phone.svg"
        />

        <div class="form-buttons">
          <div class="secondary-button-layout" @click="cancel">Cancel</div>
          <div class="main-button-layout" @click="save">
            {{ contactOverlayIsEditMode ? "Save Changes" : "Create Contact" }}
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import InputField from "@/components/shared/InputField.vue";
import useContacts from "@/composables/useContacts";
const { saveContact } = useContacts();
import { selectedContact, contactOverlayIsEditMode } from "@/store/state";
import  useTextColor  from '@/composables/useTextColor';
const { getTextColor } = useTextColor();

const emit = defineEmits(["close"]);



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
  if (contactOverlayIsEditMode.value) {
    contactName.value = selectedContact.value.name;
    contactEmail.value = selectedContact.value.email;
    contactPhone.value = selectedContact.value.phone || "";
  }
};

const save = () => {
  resetErrors();
  if (checkForErrors()) {
    const contact = {
      name: contactName.value,
      email: contactEmail.value,
      phone: contactPhone.value,
    };
    saveContact(contact, selectedContact.id);
    resetForm();
  } else {
    return;
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
  return true; // Hier müsste die Überprüfung in der Datenbank erfolgen
};


// Funktion zum Umwandeln von Hex in RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
</script>

<style scoped>


.contact-cverlay {
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 1000px;
  max-width: 100%;
  border-radius: 30px;
  overflow: hidden;
}
.overlay-header {
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
  .overlay-headerText {
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

.overlay-content {
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
 
}

.card-contact-img{
  align-self: center;
  height: 6rem;
  width: 6rem;
  margin-bottom: 1rem;
}

.card-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-width: 6rem;
      min-height: 6rem;
      border: 1px solid #ffffff;
      border-radius: 100%;
      font-weight: 500;
      font-size: 3rem;
      align-self: center;
      line-height: 120%;
      margin-bottom: 1rem;
    }
</style>
