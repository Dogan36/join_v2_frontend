<template>
<div class="home">
    <div class="menu">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
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
    <div class="aside">
        <header>
            <h1>Kanban Projekt Management Tool</h1>
        </header>

        <main>
            <RouterView></RouterView>
        </main>
    </div>
</div>
</template>

  
<script>
export default {
    name: 'HomeView'
};
</script>

  
<style scoped>
.home {
    display: flex;
    height: 100vh;
}

header {

    line-height: 1.5;
    max-width: 100%;
}

.menu {
    width: 200px;
    
    padding: 1rem;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.header {
    background: #ddd;
    padding: 1rem;
}

main {
    flex: 1;
    padding: 1rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }
}
</style>
