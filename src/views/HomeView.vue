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
  
  <DarkBackground v-if="currentWorkspace == null || isWorkspaceOverlayVisible" @close="closeOverlay">
    <WorkspaceInfo @close="closeOverlay"></WorkspaceInfo>
  </DarkBackground>
  <DarkBackground v-if="isProfilOverlayVisible" @close="closeOverlay">
    <Profil @close="closeOverlay"></Profil>
  </DarkBackground>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { currentView, isWorkspaceOverlayVisible, isProfilOverlayVisible, currentWorkspace } from "@/store/state";
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
  import Profil from "@/components/shared/Profil.vue";
  import useWorkspaces from "@/composables/useWorkspaces";
  import useContacts from "@/composables/useContacts";
  import { currentUser } from "@/store/state";
  const { loadWorkspaces } = useWorkspaces();
  const { loadContacts } = useContacts();

  onMounted(async () => {
    getUser();
    loadWorkspaces();
    loadContacts();
  });

  /**
   * Retrieves the current user from localStorage and updates the `currentUser` state.
   * This function reads the user data from `localStorage` and parses it into a JavaScript object.
   * The user data is then assigned to `currentUser.value`.
   *
   * @returns {void}
   */
  function getUser() { 
    currentUser.value = JSON.parse(localStorage.getItem("join_user"));
  }

  /**
   * Closes both the profile and workspace overlays by setting their visibility state to false.
   * This function hides the profile and workspace overlays in the UI by updating the `isProfilOverlayVisible` 
   * and `isWorkspaceOverlayVisible` reactive state variables.
   *
   * @returns {void}
   */
  function closeOverlay() {
    isProfilOverlayVisible.value = false;
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
  max-width: calc(100% - 25rem);
  height: 100%;
  max-height: 100svh;
  overflow: hidden;
}

main {
  flex: 1; /* Füllt den verbleibenden Raum */
  padding: 3.5rem;
  overflow-y: auto; /* Ermöglicht das Scrollen bei Überlauf */
}

@media screen and (max-width: 1000px) {
  .home {
    flex-direction: column-reverse;
  }
  .content {
    max-width: 100%;
  }
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 700px) {
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    align-items: center;
    position: relative;
  }
}

</style>
