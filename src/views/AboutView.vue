

<template>
  <div class="home">
    <MenuContainer />
    <div class="content">
      <Header />
      <main>
        <PrivacyPolicy v-if="currentView === 'privacy'" />
        <LegalNotice v-if="currentView === 'legalNotice'" />
        <Help v-if="currentView === 'help'" />
      </main>
    </div>
  </div>
</template>
  <script setup>
  
  import LegalNotice from '@/components/shared/LegalNotice.vue';
  import PrivacyPolicy from '@/components/shared/PrivacyPolicy.vue';
  import MenuContainer from '@/components/shared/MenuContainer.vue';
  import Help from '@/components/home/Help.vue';
  import Header from '@/components/shared/Header.vue';
  import { currentView } from '@/store/state';
  
  import { onMounted } from 'vue';
  onMounted(() => {
  setCurrentViewFromURL(); // Setze `currentView`, wenn die Komponente geladen wird
});
function setCurrentViewFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');

  if (type === 'privacyPolicy') {
    currentView.value = 'privacy';
  } else if (type === 'legalNotice') {
    currentView.value = 'legalNotice';
  }
}
  </script>
  <style scoped></style>
