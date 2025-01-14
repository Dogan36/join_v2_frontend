<template>
  <div class="home">
    <MenuContainer />
    <div class="content">
      <Header />
      <main>
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
import { loadWorkspaces, setCurrentWorkspace } from "@/services/workspaceService";

const workspaces = ref([]);

onMounted(async () => {
  await loadWorkspaces();
  determineInitialWorkspace();
});

function determineInitialWorkspace() {
  const lastWorkspaceId = localStorage.getItem('lastWorkspaceId');
  if (lastWorkspaceId) {
    setCurrentWorkspace(lastWorkspaceId);
  } else if (workspaces.value.length > 0) {
    setCurrentWorkspace(workspaces.value[0].id);
  }
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
