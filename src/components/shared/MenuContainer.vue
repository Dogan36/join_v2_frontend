<template>
  <div class="menu">
    <img
      class="logoTemplate"
      @click="console.log(currentView)"
      src="@/assets/img/logoInvert.svg"
      alt=""
    />
    <div v-if="route.path === '/home'" class="desktopTemplateMenu">
      <div
        @click="changeView('summary')"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'summary' },
        ]"
      >
        <div class="desktopTemplateIconContainer">
          <img
            class="desktopTemplateIcon"
            src="@/assets/img/summaryIcon.svg"
            alt=""
          />
        </div>
        <p class="desktopTemplateFont">Summary</p>
      </div>
      <div
        @click="changeView('board')"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'board' },
        ]"
      >
        <div class="desktopTemplateIconContainer">
          <img
            class="desktopTemplateIcon"
            src="@/assets/img/boardIcon.svg"
            alt=""
          />
        </div>
        <p id="board" class="desktopTemplateFont">Board</p>
      </div>
      <div
        @click="changeView('addTask')"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'addTask' },
        ]"
      >
        <div class="desktopTemplateIconContainer">
          <img
            class="desktopTemplateIcon"
            src="@/assets/img/addTaskIcon.svg"
            alt=""
          />
        </div>
        <p class="desktopTemplateFont">Add Task</p>
      </div>
      <div
        @click="changeView('contacts')"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'contacts' },
        ]"
      >
        <div class="desktopTemplateIconContainer">
          <img
            class="desktopTemplateIcon"
            src="@\assets/img/contactsIcon.svg"
            alt=""
          />
        </div>
        <p class="desktopTemplateFont">Contacts</p>
      </div>
    </div>
    <div class="desktopTemplateMenu">
      <div
        @click="changeView('privacy');"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'privacy' },
        ]"
      >
        <p class="desktopTemplateFont">Privacy Policy</p>
      </div>
      <div
        @click="changeView('legalNotice')"
        :class="[
          'desktopTemplateMenuElements',
          { desktopTemplateIconActive: currentView === 'legalNotice' },
        ]"
      >
        <p class="desktopTemplateFont">Legal Notice</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currentView } from "@/store/state";
import { useRoute } from 'vue-router';

const route = useRoute();

function changeView(view) {
  currentView.value = view;
}


</script>

<style scoped>
@import "@/assets/base.css";

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


.logoContainer {
  width: 100.03px;
  height: 121.97px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.logoTemplate {
  width: 100.03px;
  height: 121.97px;
  cursor: pointer;
}

.desktopTemplateMenu {
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

.desktopTemplateMenuElements {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  cursor: pointer;
  padding: 10px 0px 10px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
}

.desktopTemplateIconContainer {
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

.desktopTemplateIcon {
  width: 22px;
  height: 26px;
  color: #cdcdcd;
  
}

.desktopTemplateFont {
  width: 53px;
  height: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  white-space: nowrap;
  color: #cdcdcd;
}

.desktopTemplateIconActive {
  background-color: #091931;
  transition: background-color 0.5s ease;
}

.desktopTemplateIconActive p {
  color: white !important;
}

.desktopTemplateLegalContainer {
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

.desktopTemplateLegal {
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

.desktopTemplateLegalIconContainer {
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

.colorAndDeleteIconContainer {
  display: flex;
  align-items: center;
}

.deleteIcon {
  width: 20px;
  height: 20px;
}
</style>
