<template>
  <div class="menu">
    <img
      class="logo-template"
      src="@/assets/img/logoInvert.svg"
      alt=""
    />
    <div v-if="route.path === '/home'" class="desktop-template-menu">
      <div
        @click="changeView('summary')"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'summary' },
        ]"
      >
        <div class="desktop-template-icon-container">
          <img
            class="desktop-template-icon"
            src="@/assets/img/summaryIcon.svg"
            alt=""
          />
        </div>
        <p class="desktop-template-font">Summary</p>
      </div>
      <div
        @click="changeView('board')"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'board' },
        ]"
      >
        <div class="desktop-template-icon-container">
          <img
            class="desktop-template-icon"
            src="@/assets/img/boardIcon.svg"
            alt=""
          />
        </div>
        <p class="desktop-template-font">Board</p>
      </div>
      <div
        @click="changeView('addTask')"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'addTask' },
        ]"
      >
        <div class="desktop-template-icon-container">
          <img
            class="desktop-template-icon"
            src="@/assets/img/addTaskIcon.svg"
            alt=""
          />
        </div>
        <p class="desktop-template-font">Add Task</p>
      </div>
      <div
        @click="changeView('contacts')"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'contacts' },
        ]"
      >
        <div class="desktop-template-icon-container">
          <img
            class="desktop-template-icon"
            src="@\assets/img/contactsIcon.svg"
            alt=""
          />
        </div>
        <p class="desktop-template-font">Contacts</p>
      </div>
    </div>
    <div class="desktop-template-menu">
      <div
        @click="changeView('privacy');"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'privacy' },
        ]"
      >
        <p class="desktop-template-font">Privacy Policy</p>
      </div>
      <div
        @click="changeView('legalNotice')"
        :class="[
          'desktop-template-menu-elements',
          { desktopTemplateIconActive: currentView === 'legalNotice' },
        ]"
      >
        <p class="desktop-template-font">Legal Notice</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currentView } from "@/store/state";
import { useRoute } from 'vue-router';
const route = useRoute();

/**
 * Changes the current view to the specified one.
 * 
 * @param {string} view - The name of the view to switch to.
 */
 function changeView(view) {
  currentView.value = view;
}

</script>

<style scoped>
.menu {
  min-width: 250px;
  background-color: var(--main-color);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 30px;
  overflow: auto;
  position: sticky;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); 
}


.logo-container {
  width: 70px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.logo-template {
  width: 70px;
  cursor: pointer;
}

.desktop-template-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 100%;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.desktop-template-menu-elements {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  cursor: pointer;
  padding: 10px 0px 10px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
  &:hover{
    background-color: rgba(0, 0, 0, 0.2);;
  }
}

.desktop-template-icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 30px;
  height: 30px;
  flex: none;
  order: 0;
  flex-grow: 0;
  
}

.desktop-template-tcon {
  width: 22px;
  height: 26px;
  color: #cdcdcd;
  
}

.desktop-template-font {
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
  color: #cdcdcd;
}

.desktop-template-iconActive {
  background-color: #091931;
  transition: background-color 0.5s ease;
  &:hover{
    background-color: #091931;
  }
}

.desktop-template-icon-active p {
  color: white !important;
}

.desktop-template-legal-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 142px 0px 0px;
  gap: 15px;
  width: 160px;
  flex: none;
  order: 2;
  flex-grow: 0;
}

.desktop-template-legal {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 20px;
  width: 160px;
  height: 46px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.desktop-template-legal-icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 30px;
  height: 30px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.color-and-delete-icon-container {
  display: flex;
  align-items: center;
}

.delete-icon {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 1000px) {
  .menu {
    height: fit-content;
    gap: 10px;
    padding:0px;
  }
  .logo-template{
    display: none;
  }

  .desktop-template-menu {
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    padding: 0px;
  }

  .desktop-template-menu:last-of-type{
    display: none;
  } 

}

@media screen and (max-width: 700px) {
  .menu {
    height: fit-content;
    padding:0px;
    gap: 0;
  }
  .desktop-template-menu {
    flex-direction: row;
    justify-content: space-around;
    padding: 0px;
    gap: 0;
  }
  .desktop-template-menu-elements{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    gap: 0;
    padding: 5px;
  }
  
}
</style>
