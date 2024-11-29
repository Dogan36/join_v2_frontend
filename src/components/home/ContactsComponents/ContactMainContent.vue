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
    <div class="contactCard">
      <div class="cardHeader">
        <div
          class="cardAvatar"
          :style="{ backgroundColor: selectedContact.color }"
        >
          {{ selectedContact.avatar }}
        </div>
        <div class="cardHeaderContent">
          <span>{{
            selectedContact.firstName + " " + selectedContact.lastName
          }}</span>

          <div class="cardHeaderEdits">
            <div class="edit">
              <img src="@/assets/img/editIcon.svg" alt="" />
              <span>Edit</span>
            </div>
            <div class="edit">
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
      <div class="main-button-layout">New Contact
        <img src="@/assets/img/addContactIcon.svg" alt="">
      </div>
    </div>
    
  </div>
</template>

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
      width: 12rem;
      height: 12rem;
      border: 1px solid #ffffff;
      border-radius: 100%;
      font-weight: 500;
      font-size: 47px;
      align-self: center;
      color: #ffffff;
      line-height: 12rem;
    }

    .cardHeaderContent {
      span {
        font-weight: 500;
        font-size: 4.7rem;
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

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  contact: Object,
});
const selectedContact = {
  firstName: "Anna",
  lastName: "Meier",
  email: "anna.meier@example.com",
  phone: "123-456-7890",
  avatar: "MM",
  color: "#FF5733",
};
</script>
