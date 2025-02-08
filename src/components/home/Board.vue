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
        <button @click="openAddTaskOverlay('todo')" class="main-button-layout">
          Add Task <img src="@/assets/img/plusIcon.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="boardMainContent">
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>To do</span>
          <img @click="openAddTaskOverlay('todo')" src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard @click="openTaskDetail(task)" v-for="task in todoTasks" :key="task.id" :task="task" />
         
          <div v-if="todoTasks.length === 0" class="boardElementEmpty">No Task To Do</div> 
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>In Progress</span>
          <img @click="openAddTaskOverlay('inProgress')" src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard @click="openTaskDetail(task)" v-for="task in inProgressTasks" :key="task.id" :task="task" />
          <div v-if="inProgressTasks.length === 0" class="boardElementEmpty">No Task In Progress</div>     
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>Awaiting Feedback</span>
          <img @click="openAddTaskOverlay('awaitingFeedback')" src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard @click="openTaskDetail(task)" v-for="task in awaitingFeedbackTasks" :key="task.id" :task="task" />
          <div v-if="awaitingFeedbackTasks.length === 0" class="boardElementEmpty">No Task Awaiting Feedback</div>
        </div>
      </div>
      <div class="boardElement">
        <div class="boardElementHeader">
          <span>Done</span>
          <img @click="openAddTaskOverlay('done')" src="@/assets/img/boardPlusIcon.svg" alt="" />
        </div>
        <div class="boardElementContent">
          <BoardCard @click="openTaskDetail(task)" v-for="task in doneTasks" :key="task.id" :task="task" />
          <div v-if="doneTasks.length === 0" class="boardElementEmpty">No Task Done</div>
        </div>
      </div>
    </div>

    <DarkBackground v-if="isOverlayVisible" @close="closeOverlay">
      <AddTaskMain
      :status="choosenStatus"
      @close="closeOverlay"></AddTaskMain>
    </DarkBackground>
    <DarkBackground v-if="isDetailViewVisible" @close="closeOverlay">
      <BoardTaskDetail
      :task="currentTask"
      @close="closeOverlay"
      @edit="openAddTaskOverlay()"></BoardTaskDetail>
    </DarkBackground>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import BoardCard from "./BoardComponents/BoardCard.vue";
import AddTaskMain from "./AddTaskComponents/AddTaskMain.vue";
import DarkBackground from "../shared/DarkBackground.vue";
import { tasks, currentTask } from "@/store/state";
import BoardTaskDetail from "./BoardComponents/BoardTaskDetail.vue";
const isOverlayVisible = ref(false);
const isDetailViewVisible = ref(false);
let choosenStatus = '';
const todoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'));
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'inProgress'));
const awaitingFeedbackTasks = computed(() => tasks.value.filter(task => task.status === 'awaitingFeedback'));
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'));

const openAddTaskOverlay = (status) => {
  console.log(status)
  if (status) {
    choosenStatus = status
    currentTask.value = null;}
  isOverlayVisible.value = true;
};

const openTaskDetail = (task) => {
  currentTask.value = task; // Setzt den Status, der an das Overlay übergeben wird
  isDetailViewVisible.value = true;
};
const closeOverlay = () => {
  isOverlayVisible.value = false;
  isDetailViewVisible.value = false;
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
  max-height: 85%;
  width: 85%;
  transform: translate(0%, -50%);
  top: 50%;
  padding: 5rem;
  max-width: 1000px;
  overflow-y: auto;
 
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
    img {
      cursor: pointer;
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
