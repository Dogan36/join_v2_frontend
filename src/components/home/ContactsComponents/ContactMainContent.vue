<template>
  <div class="contactMainContent">
    <div class="headlineComponent">
      <h1>Contacts</h1>
      <img
        class="headlineSeperator"
        src="@/assets/img/headlineSeperator.svg"
        alt=""
      />
      <h2>Better with a Team</h2>
    </div>
    <div v-if="selectedContact" class="contactCard">
      <div class="cardHeader">
        <div
          class="cardAvatar"
          :style="{ backgroundColor: selectedContact.color.hex_value, color: textColor }"
        >
          {{ selectedContact.avatar }}
        </div>
        <div class="cardHeaderContent">
          <span>{{
            selectedContact.name
          }}</span>

          <div v-if="!selectedContact.isMember" class="cardHeaderEdits">
            <div @click="$emit('openOverlay', true)" class="edit">
              <img src="@/assets/img/editIcon.svg" alt="" />
              <span>Edit</span>
            </div>
            <div @click="deleteContact" class="edit">
              <img src="@/assets/img/delete.svg" alt="" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cardInfoHeader">Contact Information</div>
      <div class="cardInfo">
        <div class="cardEmailContainer">
          <span>Email</span>
          <a href="mailto:">{{ selectedContact.email }}</a>
        </div>
        <div class="cardPhoneContainer">
          <span>Phone</span>
          <a href="tel:">{{ selectedContact.phone }}</a>
        </div>
      </div>
    </div>
    <div class="buttonContainer">
      <div @click="$emit('openOverlay', false)" class="main-button-layout">New Contact
        <img src="@/assets/img/addContactIcon.svg" alt="">
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { computed } from "vue";
import { selectedContact } from "@/store/state";
import { defineEmits } from "vue";
import  useContacts  from "@/composables/useContacts";
const { deleteContact } = useContacts();
const emit = defineEmits(["openOverlay"]); // Definiere ein Event für das Parent

const textColor = computed(() => {
  return isDarkBackground.value ? '#fff' : '#000';
});

// Berechnung, ob der Hintergrund dunkel oder hell ist
const isDarkBackground = computed(() => {
  if(selectedContact === null) return false;
  console.log(selectedContact.value);
  const hex = selectedContact.value.color.hex_value;
  const rgb = hexToRgb(hex);
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq < 128; // Dunkel: Textfarbe weiß, hell: Textfarbe schwarz
});

// Funktion zum Umwandeln von Hex in RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
</script>

<style scoped>
.contactMainContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .contactCard {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .cardHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      gap: 54px;
      width: 461px;
      height: 120px;
    }

    .cardAvatar {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-width: 12rem;
      min-height: 12rem;
      border: 1px solid #ffffff;
      border-radius: 100%;
      font-weight: 500;
      font-size: 47px;
      align-self: center;
      line-height: 12rem;
    }

    .cardHeaderContent {
      span {
        font-weight: 500;
        font-size: 4.7rem;
        text-wrap: nowrap;
      }
      .cardHeaderEdits {
        display: flex;
        gap: 2.5rem;
        .edit {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 6px;
          cursor: pointer;

          span {
            font-weight: unset;
            font-size: 16px;

            display: flex;
            align-items: center;
            color: #2a3647;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .cardInfoHeader {
      font-size: 2.1rem;
    }

    .cardInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      gap: 20px;

      .cardEmailContainer,
      .cardPhoneContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        span {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
      .cardEmailContainer a {
        text-decoration: none;
        font-size: 1.6rem;
        cursor: pointer;
        color: #007cee;
      }

      .cardPhoneContainer a {
        text-decoration: none;
        font-size: 1.6rem;
        cursor: pointer;
        color: black;
      }
    }
  }
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  .main-button-layout {
    padding: 1rem 1.5rem;
  }
}
</style>


