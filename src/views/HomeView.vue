<template>
    <div class="home">
      <li><RouterLink to="/home/summary">Summary</RouterLink></li>
            <li><RouterLink to="/home/board">Board</RouterLink></li>
            <li><RouterLink to="/home/addTask">Add Task</RouterLink></li>
            <li><RouterLink to="/home/contacts">Contacts</RouterLink></li>
      <div class="content">
        
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
  
  .menu {
    width: 200px;
    background: #f4f4f4;
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
  </style>
  