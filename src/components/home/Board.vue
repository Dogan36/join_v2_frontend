<template>
  <div class="boardContent">
    <div class="headlineComponent">
      <h1>Board</h1>
      <div class="boardHeadlineRight">
        <div class="findTask">
          <input placeholder="Find Task" type="text" />
          <div class="graySeperator"></div>
          <img src="@/assets/img/searchIcon.svg" alt="" />
        </div>
        <button @click="openAddTaskOverlay" class="main-button-layout">
          Add Task <img src="@/assets/img/plusIcon.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="boardMainContent">
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>To do</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <div class="boardElementEmpty">No Task To Do</div>
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>In Progress</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>Awaiting Feedback</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard />
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>Done</span>
          <img src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <div class="boardElementEmpty">No Task To Do</div>
        </div>
      </div>
    </div>

    <DarkBackground v-if="isOverlayVisible" @close="closeOverlay">
      <AddTaskMain
      :task="exampleTask" 
      @close="closeOverlay"></AddTaskMain>
    </DarkBackground>
  </div>
</template>

<script setup>
import { ref } from "vue";

import BoardCard from "./BoardComponents/BoardCard.vue";
import AddTaskMain from "./AddTaskComponents/AddTaskMain.vue";
import DarkBackground from "../shared/DarkBackground.vue";
const isOverlayVisible = ref(false);

const openAddTaskOverlay = () => {
  isOverlayVisible.value = true;
};

const exampleTask = {
  title: "Implement Scrollbar Fix",
  description: "Adjust the scrollbar position to prevent overflow issues.",
  category: "Bugfix",
  selectedContacts: ["John Doe", "Jane Smith"], // Array von Kontakten
  dueDate: "2024-06-20", // Beispiel-Datum im Format 'yyyy-mm-dd'
  prio: "High", // Beispiel-Priorität: 'High', 'Medium', 'Low'
  subtasksId: [101, 102, 103], // Beispiel-IDs für Subtasks
};

const choosenTask = exampleTask;

const closeOverlay = () => {
  isOverlayVisible.value = false;
};
</script>
<style scoped>
.headlineComponent {
  justify-content: space-between;
}

.addTaskOverlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  z-index: 2;
  height: 85%;
  width: 85%;
  transform: translate(-50%, -50%);
  top: 50%;
  padding: 5rem;
  max-width: 1000px;
  overflow-y: auto;
 
}


.addTaskOverlay::-webkit-scrollbar {
    width: 10px; /* Breite des Scrollbars */
    max-height: 10px !important; /* Höhe des Scrollbars */
    margin-left: -10px !important;
}
.addTaskOverlay::-webkit-scrollbar-track{
  margin-block: 35px;
}
.addTaskOverlay::-webkit-scrollbar-thumb {
    background-color: var(--main-color); /* Farbe des Scrollbar-Daumen */
    border-radius: 5px; /* Rundung des Scrollbar-Daumen */
   
}
.boardHeadlineRight {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.5rem;
}

.findTask {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.3rem 2.1rem;
  gap: 5px;
  background: #ffffff;
  border: 1px solid #a8a8a8;
  border-radius: 10px;

  input {
    border: none;
    background: none;
    outline: none;
    font-size: 1.6rem;
  }

  .graySeperator {
    width: 2px;
    height: 20px;
    background: #d1d1d1;
  }
}

.boardMainContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  gap: 2.6rem;
  flex-wrap: wrap;
}

.boardElement {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 25.5rem;

  .boardElementHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: 700;
      font-size: 2.1rem;
      color: var(--main-color);
    }
  }

  .boardBottomDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

.boardElementEmpty {
  width: 100%;
  height: 4.8rem;
  border-radius: 10px;
  border: 1px;
  background-color: #e7e7e7;
  color: #a8a8a8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.6rem;
}
</style>
