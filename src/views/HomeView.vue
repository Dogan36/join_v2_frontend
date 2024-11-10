<template>
<div class="home">
   
    <MenuContainer/>
        
        <div class="content">
        <header>
            <h1>Kanban Projekt Management Tool</h1>
        </header>

        <main>
            <h2>Willkommen</h2>
            <p>Das Kanban Projekt Management Tool ist ein einfaches Tool zur Verwaltung von Projekten. Es ist für kleine Teams und Einzelpersonen gedacht, die ihre Projekte auf einfache Weise verwalten möchten.</p>
        </main>
    </div>
</div>
</template>

  
<script setup>
import { useRoute } from 'vue-router';
import MenuContainer from '@/components/shared/MenuContainer.vue';

</script>

  
<style scoped>
.home {
    display: flex;
    width: 100%;
    height: 100svh;
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
  padding: 16px;
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
