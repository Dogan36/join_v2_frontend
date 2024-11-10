<template>
     <div class="menu">
        <img alt="Vue logo" class="logo" src="@/assets/img/logoInvert.svg" width="125" height="125" />
        <div class="menuMain">
            <li>
                <RouterLink to="/home/summary">Summary</RouterLink>
            </li>
            <li>
                <RouterLink to="/home/board">Board</RouterLink>
            </li>
            <li>
                <RouterLink to="/home/addTask">Add Task</RouterLink>
            </li>
            <li>
                <RouterLink to="/home/contacts">Contacts</RouterLink>
            </li>
        </div>
    </div>
</template>




<style scoped>
@import '@/assets/base.css';
.menu {
    width: 250px; /* Feste Breite des Menüs */
  background-color: var(--main-color); /* Menüfarbe */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>