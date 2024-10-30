<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <div class="wrapper">
    

    <RouterView />
  </div>
</template>

<style scoped>
header {
  background-color: yellow;
  line-height: 1.5;
  max-width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }



  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;

  }
}
</style>
