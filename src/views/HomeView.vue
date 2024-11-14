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
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { currentView } from '@/store/state';
import MenuContainer from '@/components/shared/MenuContainer.vue';
import Header from '@/components/shared/Header.vue';
import Summary from '@/components/home/Summary.vue';
import Board from '@/components/home/Board.vue';
import AddTask from '@/components/home/AddTask.vue';
import Contacts from '@/components/home/Contacts.vue';
import PrivacyPolicy from '@/components/shared/PrivacyPolicy.vue';
import LegalNotice from '@/components/shared/LegalNotice.vue';



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
}

.header {
    height: 60px; /* Feste Höhe für den Header */
  background-color: #f6f7f8;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); /* Optionaler Schatten für den Header */
}


main {
    flex: 1; /* Füllt den verbleibenden Raum */
  
  overflow-y: auto; /* Ermöglicht das Scrollen bei Überlauf */
  background-color: #ffffff;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }
}
</style>
