<template>
  <div class="header">
    <img class="logo-header-mobile" src="@/assets/img/logo.svg" alt="" />
    <p class="header-headline">Kanban Projekt Management Tool</p>
    <div class="header-user-profil">
      <img
        class="header-user-profil-icon"
        src="@/assets/img/questionmark.svg"
        alt=""
        @click="changeView('help')"
      />
      <div v-if="route.path === '/home'" class="header-user-profil-initials" @click="toggleUserMenu()">{{ currentUser.avatar }}</div>
    </div>

    <div class="user-menu-content" v-if="showUserMenu" @mouseenter="onUserMenuMouseEnter" 
    @mouseleave="onUserMenuMouseLeave">
      <p class="privacy-link-mobile" @click="changeView('privacy')">Privacy Policy</p>
      <p class="privacy-link-mobile" @click="changeView('legalNotice')">Legal Notice</p>
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

// Router and route objects
const router = useRouter();
const route = useRoute();

// Reactive property for the user menu visibility
/**
 * @vue-data {boolean} showUserMenu - Controls the visibility of the user menu.
 * 
 * This reactive property is used to toggle whether the user menu is displayed or not.
 */
const showUserMenu = ref(false);
let closeUserMenuTimeout = null;

/**
 * @vue-method {Function} openWorkspaceInfo - Opens the workspace information overlay and closes the user menu.
 * 
 * This function closes the user menu (if open) and opens the workspace overlay.
 * 
 * @returns {void}
 */
function openWorkspaceInfo() {
  closeUserMenu();
  isWorkspaceOverlayVisible.value = true;
}

/**
 * @vue-method {Function} goToProfile - Navigates to the profile overlay and closes the user menu.
 * 
 * This function opens the profile overlay and closes the user menu.
 * 
 * @returns {void}
 */
function goToProfile() {
  isProfilOverlayVisible.value = true;
  closeUserMenu();
}

/**
 * @vue-method {Function} toggleUserMenu - Toggles the visibility of the user menu.
 * 
 * This function toggles the visibility of the user menu. If the menu is opened, 
 * it automatically closes after 2 seconds.
 * 
 * @returns {void}
 */
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  clearTimeout(closeUserMenuTimeout);
  closeUserMenuTimeout = setTimeout(() => {
    closeUserMenu();
  }, 2000);
}

/**
 * @vue-method {Function} onUserMenuMouseEnter - Cancels the automatic closing of the user menu when the mouse enters.
 * 
 * This function clears the timeout that would automatically close the user menu when the mouse enters.
 * 
 * @returns {void}
 */
function onUserMenuMouseEnter() {
  clearTimeout(closeUserMenuTimeout);
}

/**
 * @vue-method {Function} onUserMenuMouseLeave - Starts a timeout to close the user menu when the mouse leaves.
 * 
 * This function starts a timeout to close the user menu after 2 seconds when the mouse leaves the menu area.
 * 
 * @returns {void}
 */
function onUserMenuMouseLeave() {
  closeUserMenuTimeout = setTimeout(() => {
    closeUserMenu();
  }, 2000);
}

/**
 * @vue-method {Function} closeUserMenu - Closes the user menu.
 * 
 * This function sets the `showUserMenu` property to `false`, closing the user menu.
 * 
 * @returns {void}
 */
function closeUserMenu() {
  showUserMenu.value = false;
}

/**
 * @vue-method {Function} logout - Logs the user out by removing authentication tokens and redirecting to the start page.
 * 
 * This function clears the authentication tokens from `localStorage`, closes the user menu, 
 * and redirects the user to the start page.
 * 
 * @returns {void}
 */
function logout() {
  closeUserMenu();
  localStorage.removeItem("join_token");
  localStorage.removeItem("join_user");
  router.push("/start");
}

/**
 * @vue-method {Function} changeView - Changes the current view to the specified one.
 * 
 * This function updates the `currentView` to the provided view name, changing the displayed view in the app.
 * 
 * @param {string} view - The name of the view to switch to.
 * @returns {void}
 */
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

.header-headline {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
}

.header-user-profil {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 26px;
}

.header-user-profil-icon {
  cursor: pointer;
  &:hover {
    filter: invert(1);
  }
}


.header-user-profil-initials {
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

.logo-header-mobile {
  height: 60%;
  display: none;
}

.user-menu-content {
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

.privacy-link-mobile {
 display: none;
}

@media screen and (max-width: 1000px) {
  .privacy-link-mobile {
    display: block;
  }
  .header {
    padding: 0px 15px;
    gap: 10px;
  }
  
  .header-user-profil {
    gap: 10px;
  }
  
  .header-headline {
    font-size: 18px;
  }

  .logo-header-mobile {
    display: block;
  }
  .user-menu-content {
    right: 20px;
  }

}
</style>
