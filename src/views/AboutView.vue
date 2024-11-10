<template>
  <div v-if="privacy" class="<Privacy/>"><PrivacyPolicy/></div>
  <div v-if="legalNotice" class="termsOfService"><LegalNotice/></div>
  
  </template>
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import LegalNotice from '@/components/shared/LegalNotice.vue';
  import PrivacyPolicy from '@/components/shared/PrivacyPolicy.vue';

  const route = useRoute();
  
  const privacy = computed(() => route.query.type === 'privacyPolicy');
  const legalNotice = computed(() => route.query.type === 'legalNotice');
  console.log(route.query.type);
  </script>
  <style scoped></style>
