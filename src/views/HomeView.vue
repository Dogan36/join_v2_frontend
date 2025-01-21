<template>
  <div class="home">
    <MenuContainer />
    <div class="content">
      <Header />
      
      <main>
        <div>{{currentWorkspace}}</div>
        <Summary v-if="currentView === 'summary'" />
        <Board v-if="currentView === 'board'" />
        <AddTask v-if="currentView === 'addTask'" />
        <Contacts v-if="currentView === 'contacts'" />
        <PrivacyPolicy v-if="currentView === 'privacy'" />
        <LegalNotice v-if="currentView === 'legalNotice'" />
        <Help v-if="currentView === 'help'" />
      </main>
    </div>
  </div>
  <DarkBackground v-if="isWorkspaceOverlayVisible" @close="closeOverlay">
    <WorkspaceInfo @close="closeOverlay"></WorkspaceInfo>
  </DarkBackground>
  <DarkBackground v-if="currentWorkspace === null" @close="closeOverlay">
    <WorkspaceInfo @close="closeOverlay"></WorkspaceInfo>
  </DarkBackground>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { currentView, isWorkspaceOverlayVisible } from "@/store/state";
import MenuContainer from "@/components/shared/MenuContainer.vue";
import Header from "@/components/shared/Header.vue";
import Summary from "@/components/home/Summary.vue";
import Board from "@/components/home/Board.vue";
import AddTask from "@/components/home/AddTask.vue";
import Contacts from "@/components/home/Contacts.vue";
import PrivacyPolicy from "@/components/shared/PrivacyPolicy.vue";
import LegalNotice from "@/components/shared/LegalNotice.vue";
import Help from "@/components/home/Help.vue";
import WorkspaceInfo from "@/components/shared/WorkspaceInfo.vue";
import DarkBackground from "@/components/shared/DarkBackground.vue";
import { currentWorkspace, loadWorkspaces } from "@/services/workspaceService";
import { currentUser } from "@/store/state";

onMounted(async () => {
  getUser();
  try {
    loadWorkspaces();
   
  } catch (error) {
    console.error("Error loading initial workspace:", error);
    // Handle error appropriately, possibly setting an error state or showing a notification
  }
});

function getUser() { 
    currentUser.value = JSON.parse(localStorage.getItem("join_user"));
    console.log("Current User:", currentUser.value);
}

function closeOverlay() {
  isWorkspaceOverlayVisible.value = false;
}


</script>

<style>
.home {
  display: flex;
  width: 100%;
  height: 100%;
}

.content {
  flex: 1; /* Nimmt die restliche Breite ein */
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 25rem); /* Abzug der Breite des Menüs */
}

main {
  flex: 1; /* Füllt den verbleibenden Raum */
  padding: 5rem;
  overflow-y: auto; /* Ermöglicht das Scrollen bei Überlauf */
}
</style>
