<template>
  <div class="header">
    <img class="logoHeaderMobile" src="@/assets/img/logo.svg" alt="" />
    <p class="headerHeadline">Kanban Projekt Management Tool</p>
    <div class="headerUserProfil">
      <img
        class="headerUserProfilIcon"
        src="@/assets/img/questionmark.svg"
        alt=""
        @click="changeView('help')"
      />
      <div v-if="route.path === '/home'" class="headerUserProfilInitials" @click="toggleUserMenu()">{{ currentUser.avatar }}</div>
    </div>

    <div class="userMenuContent" v-if="showUserMenu" @mouseenter="onUserMenuMouseEnter" 
    @mouseleave="onUserMenuMouseLeave">
      <p class="privacyLinkMobile" @click="changeView('privacy')">Privacy Policy</p>
      <p class="privacyLinkMobile" @click="changeView('legalNotice')">Legal Notice</p>
      <p @click="openWorkspaceInfo">Workspace</p>
      <p @click="goToProfile">Profil</p>
      <p @click="logout">Logout</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { currentUser, currentView, isWorkspaceOverlayVisible, isProfilOverlayVisible } from "@/store/state";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const showUserMenu = ref(false);



function openWorkspaceInfo() {
  closeUserMenu();
  isWorkspaceOverlayVisible.value = true;
}

function goToProfile() {
  isProfilOverlayVisible.value = true;
  closeUserMenu();
}

let closeUserMenuTimeout = null;

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  clearTimeout(closeUserMenuTimeout);
  closeUserMenuTimeout = setTimeout(() => {
    closeUserMenu();
  }, 2000);
}

function onUserMenuMouseEnter() {
  clearTimeout(closeUserMenuTimeout);
}

function onUserMenuMouseLeave() {
  closeUserMenuTimeout = setTimeout(() => {
    closeUserMenu();
  }, 2000);
}

function closeUserMenu() {
  showUserMenu.value = false;
}


function logout() {
  closeUserMenu();
  localStorage.removeItem("join_token");
  localStorage.removeItem("join_user");
  router.push("/start");
}

function changeView(view) {
  currentView.value = view;
}
</script>
<style>

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  height: 60px;
  position: sticky;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #f6f7f8;
  z-index: 2;
}

.headerHeadline {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
}

.headerUserProfil {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 26px;
}

.headerUserProfilIcon {
  cursor: pointer;
  &:hover {
    filter: invert(1);
  }
}


.headerUserProfilInitials {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  gap: 16px;
  width: 49px;
  height: 49px;
  border-radius: 100%;
  border: solid black 2px;
  background-color: #cdcdcd;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #a0a0a0;
  }
}

.logoHeaderMobile {
  height: 60%;
  display: none;
}

.userMenuContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  position: absolute;
  top: 73px;
  right: 61px;
  min-width: 140px;
  padding: 16px 21px;
  z-index: 99999;
  font-weight: lighter;
  color: white;
  background-color: var(--main-color);
  border-radius: 20px;
  border-top-right-radius: 0;
  cursor: pointer;
  p{
    font-size: 1.6rem;
    cursor: pointer;
  }
}

.privacyLinkMobile {
 display: none;
}

@media screen and (max-width: 1000px) {
  .privacyLinkMobile {
    display: block;
  }
  .header {
    padding: 0px 15px;
    gap: 10px;
  }
  
  .headerUserProfil {
    gap: 10px;
  }
  
  .headerHeadline {
    font-size: 18px;
  }

  .logoHeaderMobile {
    display: block;
  }
  .userMenuContent {
    right: 20px;
  }

}
</style>
