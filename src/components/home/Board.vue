<template>
  <div class="boardContent" @click="removeHighlight" ref="boardContentRef">
   
    <div class="headlineComponent">
      <h1>Board</h1>
      <div class="boardHeadlineRight">
        <div class="findTask">
          <input placeholder="Find Task" type="text" v-model="searchQuery" />
          <div class="graySeperator"></div>
          <img src="@/assets/img/searchIcon.svg" alt="" />
        </div>
        <button @click="openAddTaskOverlay('todo')" class="main-button-layout">
          Add Task <img src="@/assets/img/plusIcon.svg" alt="" />
        </button>
      </div>
    </div>

  <div @touchmove="onTouchMove" class="boardMainContent" ref="boardMainContentRef">
    <div v-if="longPressFlag" class="long-press-overlay top"
    ><img src="@/assets/img/scrollArrow.svg" alt=""></div>
    <div v-if="longPressFlag"  class="long-press-overlay bottom"
    ><img src="@/assets/img/scrollArrow.svg" alt=""></div>
    <div v-for="column in columns" :key="column.status" :data-status="column.status" class="boardElement">
      <div v-if="draggedTask && longPressFlag" 
       class="drag-preview" 
       :style="{ top: dragPreviewPosition.y + 'px', left: dragPreviewPosition.x + 'px' }">
    <BoardCard :task="draggedTask" class="ghost" />
  </div>
      <div class="boardElementHeader">
        <span>{{ column.label }}</span>
        <img
          @click="openAddTaskOverlay(column.status)"
          src="@/assets/img/boardPlusIcon.svg"
          alt="Add Task"
        />
      </div>
      <div
        class="boardElementContent"
        :class="{ hovered: hoveredColumn === column.status }"
        @dragover.prevent="onDragOver(column.status)"
        @dragenter.prevent="onDragEnter(column.status)"
        @drop.prevent="onDrop(column.status)"
      >
        <BoardCard
          v-for="task in tasksByStatus[column.status]"
          :class="{ highlight: isHighlighted(task) }"
          :key="task.id"
          :task="task"
          draggable="true"
          @dragstart="onDragStart(task)"
          @dragend="onDragEnd"
          
          @touchstart.prevent="onTouchStart(task, $event)"
          @touchend.prevent="onTouchEnd"
          @touchcancel.prevent="onTouchEnd"
        />
        <!-- Zeigt einen Drop-Indikator an, wenn über dieser Spalte gezogen wird -->
        <div
    v-if="draggedTask && draggedTask.status !== column.status && hoveredColumn === column.status"
    class="empty-board-card"
  >
    Move here
  </div>
        <!-- Falls in der Spalte keine Tasks vorhanden sind -->
        <div
          v-if="tasksByStatus[column.status].length === 0 && hoveredColumn !== column.status"
          class="boardElementEmpty"
        >
          No Task {{ column.label }}
        </div>
      </div>
    </div>
 

    <DarkBackground v-if="isAddTaskOverlayVisible" @close="closeOverlay">
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
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { API_BASE_URL } from "@/config";
import BoardCard from "./BoardComponents/BoardCard.vue";
import AddTaskMain from "./AddTaskComponents/AddTaskMain.vue";
import DarkBackground from "../shared/DarkBackground.vue";
import { tasks, currentTask, currentWorkspace, getToken, categories, selectedTasks, isAddTaskOverlayVisible } from "@/store/state";
import BoardTaskDetail from "./BoardComponents/BoardTaskDetail.vue";
const isDetailViewVisible = ref(false);
const searchQuery = ref("");

let choosenStatus = '';
const draggedTask = ref(null);
const hoveredColumn = ref(null);
const columns = [
  { status: 'todo', label: 'To do' },
  { status: 'inProgress', label: 'In Progress' },
  { status: 'awaitingFeedback', label: 'Awaiting Feedback' },
  { status: 'done', label: 'Done' }
];

const longPressFlag = ref(false);
let touchTimer = null;
const touchedTask = ref(null);
const dragPreviewPosition = ref({ x: 0, y: 0 });
const boardMainContentRef = ref(null);
const boardContentRef = ref({ x: 0, y: 0 });
let maxScroll = 0;
let scrollInterval = null;
function getMainElement() {
  return document.querySelector('main');
}

function startScrolling(direction, e) {
  stopScrolling();
  scrollInterval = setInterval(() => {
    const mainElement = getMainElement();
    if (mainElement) {
      mainElement.scrollBy({
        top: direction === 'up' ? -220 : 200, // Geschwindigkeit anpassen
        behavior: 'smooth'
      });
    }
    
    // Aktualisiere die Drag-Preview-Position relativ zum boardMainContent
    const rect = boardMainContentRef.value.getBoundingClientRect();
    dragPreviewPosition.value = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }, 50); // Intervall anpassen
}

function stopScrolling() {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}

function onTouchStart(task, e) {
  console.log("ontouchstart")
  const mainElement = getMainElement();
  maxScroll = mainElement.scrollHeight - mainElement.clientHeight;
  console.log(maxScroll)
  touchedTask.value = task;
  const rect = boardMainContentRef.value.getBoundingClientRect();
  dragPreviewPosition.value = {
    x: e.touches[0].clientX - rect.left,
    y: e.touches[0].clientY - rect.top
  };
  touchTimer = setTimeout(() => {
    longPressFlag.value = true;
    onDragStart(task);
  }, 500);
}

function onTouchMove(e) {
  const mainElement = getMainElement();
  
  if (longPressFlag.value && boardMainContentRef.value) {
    const rect = boardMainContentRef.value.getBoundingClientRect();
    dragPreviewPosition.value = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };

    // Aktualisiere hoveredColumn anhand der Touch-Position
    updateHoveredColumn(e);

    if (e.touches[0].clientY < 100) {
      startScrolling('up', e);
    } else if (e.touches[0].clientY > window.innerHeight - 100 && mainElement.scrollTop <= maxScroll) {
      startScrolling('down', e);
    } else {
      stopScrolling();
    }
  }
}

function onTouchEnd(e) {
  stopScrolling();
  clearTimeout(touchTimer);
  
  if (longPressFlag.value) {
    if (hoveredColumn.value) {
      onDrop(hoveredColumn.value);
    } else {
      onDragEnd();
    }
    longPressFlag.value = false;
  } else if (touchedTask.value) {
    // Bei kurzem Tippen: Öffne die Task-Detailansicht
    openTaskDetail(touchedTask.value);
  }
  
  touchedTask.value = null;
}

function updateHoveredColumn(e) {
  const elem = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );
  if (elem) {
    const boardElement = elem.closest('.boardElement');
    if (boardElement) {
      hoveredColumn.value = boardElement.getAttribute('data-status');
    } else {
      hoveredColumn.value = null;
    }
  }
}

onBeforeUnmount(() => {
  removeHighlight();
});

const isHighlighted = (task) => {
  if(!selectedTasks.value) {
    return false;
  }
  return selectedTasks.value.some(selectedTask => selectedTask.id === task.id);
};

const removeHighlight = () => {
  selectedTasks.value = [];
};


const filteredTasks = computed(() => {
  if (!searchQuery.value.trim()) {
    return tasks.value;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return tasks.value.filter(task => {
    const categoryObj = categories.value.find(cat => cat.id === task.category);
    return (
      (task.name && task.name.toLowerCase().includes(query)) ||
      (task.description && task.description.toLowerCase().includes(query)) ||
      (categoryObj && categoryObj.name.toLowerCase().includes(query))
    );
  });
});

const tasksByStatus = computed(() => {
  const groups = {
    todo: [],
    inProgress: [],
    awaitingFeedback: [],
    done: []
  };  
  filteredTasks.value.forEach(task => {
    if (groups[task.status]) {
      groups[task.status].push(task);
    }
  });
  return groups;
});

function onDragStart(task) {
  draggedTask.value = task;
  console.log(draggedTask.value.status);
}

function onDragEnd() {
  draggedTask.value = null;
  hoveredColumn.value = null;
}

function onDragOver(status) {
  if (draggedTask.value) {
    hoveredColumn.value = status;
  }
}

function onDragEnter(status) {
  if (draggedTask.value) {
    hoveredColumn.value = status;
  }
}


async function onDrop(status) {
  console.log(`Task ${draggedTask.value.id} dropped in column: ${status} currentWorkspace.value.id ${currentWorkspace.value.id}`);
  if (draggedTask.value) {
    try {
      // Beispiel-PATCH-Anfrage an deine API (passe URL und Authentifizierung ggf. an)
      const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspace.value.id}/tasks/${draggedTask.value.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${getToken()}`
        },
        body: JSON.stringify({ status: status })
      });
      if (!response.ok) {
        throw new Error('Task update failed');
      }
      const updatedTask = await response.json();
      tasks.value = tasks.value.map(task => {
        if (task.id === updatedTask.id) {
          return { ...task, status: status };
        }
        return task;
      });
      // Optional: Aktualisiere hier deine lokale Taskliste oder hole neue Daten
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }
  hoveredColumn.value = null;
  draggedTask.value = null;
}

const openAddTaskOverlay = (status) => {
  if (status) {
    choosenStatus = status
    currentTask.value = null;}
  isAddTaskOverlayVisible.value = true;
};

const openTaskDetail = (task) => {
  currentTask.value = task; // Setzt den Status, der an das Overlay übergeben wird
  isDetailViewVisible.value = true;
};
const closeOverlay = () => {
  isAddTaskOverlayVisible.value = false;
  isDetailViewVisible.value = false;
};
</script>
<style scoped>
.long-press-overlay {
  position: fixed;
  left: 0;
  width: 100%;
  height: 50px; /* Bei Bedarf anpassen */
  background: var(--main-color-hover);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 24px;
    height: 24px;
  }
}

.long-press-overlay.top {
  top: 6rem;
  img{
    transform: rotate(90deg);
  }
}

.long-press-overlay.bottom {
  bottom: 6rem;
  img{
    transform: rotate(270deg);
  }
}
.drag-preview {
  position: absolute;
  pointer-events: none; /* Damit das Element keine Touch-/Mouse-Events blockiert */
  opacity: 0.8;
  z-index: 200;
  transform: translate(-50%, -50%);
}
.scroll-arrow {
  width: 24px; /* Größe nach Bedarf anpassen */
  height: 24px;
}
.headlineComponent {
  justify-content: space-between;
  align-items: flex-start;
}
.boardContent {
  width: 100%;
}

.addTaskOverlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  z-index: 2;
  max-height: 100%;
  max-width: 100%;
  transform: translate(0%, -50%);
  top: 50%;
  padding: 3rem;
  overflow-y: auto;
 
}

.boardHeadlineRight {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.findTask {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4rem;
  padding: 0rem 2.1rem;
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
  position: relative;
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

.boardElementContent {
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s;
  min-height: 250px; /* Damit auch bei wenigen Tasks der Bereich sichtbar bleibt */
  position: relative;
  border-radius: 30px;
  gap: 1.5rem;
}

.boardElementContent.hovered {
  background-color: #e0e0e0;
}

.ghost {
  opacity: 0.3;
}

.empty-board-card {
  border: 2px dashed #aaa;
  text-align: center;
  color: #aaa;
  width: 100%;
  height: 250px;
  border-radius: 30px;
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

.highlight {
  /* Beispiel für einen pulsierenden Border */
  border: 2px solid #ff0000;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

@media screen and (max-width: 700px) {
  .boardHeadlineRight{
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .boardMainContent{
    justify-content: center;
    
  }
}

@media screen and (max-width: 450px) {
  .headlineComponent{
    flex-wrap: wrap;
  }
  .boardHeadlineRight{
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
