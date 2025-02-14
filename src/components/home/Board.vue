<template>
  <div class="board-content" @click="removeHighlight" ref="boardContentRef">
   
    <div class="headline-component">
      <h1>Board</h1>
      <div class="board-headline-right">
        <div class="find-task">
          <input placeholder="Find Task" type="text" v-model="searchQuery" />
          <div class="gray-seperator"></div>
          <img src="@/assets/img/searchIcon.svg" alt="" />
        </div>
        <button @click="openAddTaskOverlay('todo')" class="main-button-layout">
          Add Task <img src="@/assets/img/plusIcon.svg" alt="" />
        </button>
      </div>
    </div>

  <div @touchmove="onTouchMove" class="board-main-content" ref="boardMainContentRef">
    <div v-if="longPressFlag" class="long-press-overlay top"
    ><img src="@/assets/img/scrollArrow.svg" alt=""></div>
    <div v-if="longPressFlag"  class="long-press-overlay bottom"
    ><img src="@/assets/img/scrollArrow.svg" alt=""></div>
    <div v-for="column in columns" :key="column.status" :data-status="column.status" class="board-element">
      <div v-if="draggedTask && longPressFlag" 
       class="drag-preview" 
       :style="{ top: dragPreviewPosition.y + 'px', left: dragPreviewPosition.x + 'px' }">
    <BoardCard :task="draggedTask" class="ghost" />
  </div>
      <div class="board-element-header">
        <span>{{ column.label }}</span>
        <img
          @click="openAddTaskOverlay(column.status)"
          src="@/assets/img/boardPlusIcon.svg"
          alt="Add Task"
        />
      </div>
      <div
        class="board-element-content"
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
        <div
    v-if="draggedTask && draggedTask.status !== column.status && hoveredColumn === column.status"
    class="empty-board-card"
  >
    Move here
  </div>
        <div
          v-if="tasksByStatus[column.status].length === 0 && hoveredColumn !== column.status"
          class="board-element-empty"
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

/**
 * Starts scrolling the main element in a specified direction while updating the drag preview position.
 *
 * This function:
 * - Stops any current scrolling by calling `stopScrolling()`.
 * - Sets up an interval (`scrollInterval`) that:
 *   - Retrieves the main element using `getMainElement()` and scrolls it by a fixed offset:
 *     - Scrolls up by 220 pixels if the direction is 'up'.
 *     - Scrolls down by 200 pixels otherwise.
 *   - Uses smooth scrolling behavior.
 * - Updates the drag preview position based on the first touch point relative to the `boardMainContentRef` element's position.
 *
 * @param {string} direction - The direction to scroll ('up' for upward scrolling; any other value for downward scrolling).
 * @param {TouchEvent} e - The touch event that provides the current touch position for updating the drag preview.
 */
 function startScrolling(direction, e) {
  stopScrolling();
  scrollInterval = setInterval(() => {
    const mainElement = getMainElement();
    if (mainElement) {
      mainElement.scrollBy({
        top: direction === 'up' ? -220 : 200, // Adjust speed accordingly
        behavior: 'smooth'
      });
    }
    
    // Update the drag preview position relative to boardMainContent
    const rect = boardMainContentRef.value.getBoundingClientRect();
    dragPreviewPosition.value = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }, 50); // Adjust interval accordingly
}


/**
 * Stops the scrolling interval if it is active.
 *
 * If a scrolling interval is currently set (via `scrollInterval`), this function clears it and resets `scrollInterval` to null.
 */
 function stopScrolling() {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}


/**
 * Handles the touch start event for a task.
 * Initializes the drag preview position and starts a timer for long press detection.
 * If the touch lasts longer than 500ms, it triggers the drag start.
 *
 * @param {Object} task - The task object associated with the touch event.
 * @param {TouchEvent} e - The touch event object.
 */
 function onTouchStart(task, e) {
  const mainElement = getMainElement();
  maxScroll = mainElement.scrollHeight - mainElement.clientHeight;
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

/**
 * Handles the touch move event.
 * Updates the drag preview position and hovered column based on touch position.
 * Initiates scrolling if the touch is near the top or bottom of the screen.
 *
 * @param {TouchEvent} e - The touch event object.
 */
 function onTouchMove(e) {
  const mainElement = getMainElement();

  if (longPressFlag.value && boardMainContentRef.value) {
    const rect = boardMainContentRef.value.getBoundingClientRect();
    dragPreviewPosition.value = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
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
/**
 * Handles the touch end event.
 * Stops scrolling, clears the touch timer, and handles task drop or task detail opening.
 *
 * @param {TouchEvent} e - The touch event object.
 */
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
    openTaskDetail(touchedTask.value);
  }
  touchedTask.value = null;
}

/**
 * Updates the hovered column based on the touch position.
 *
 * @param {TouchEvent} e - The touch event object.
 */
 function updateHoveredColumn(e) {
  const elem = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
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

/**
 * Checks if a task is highlighted by comparing its ID with selected tasks.
 *
 * @param {Object} task - The task to check.
 * @returns {boolean} - True if the task is highlighted, otherwise false.
 */
 const isHighlighted = (task) => {
  if (!selectedTasks.value) {
    return false;
  }
  return selectedTasks.value.some(selectedTask => selectedTask.id === task.id);
};

/**
 * Removes the highlight by clearing the selected tasks array.
 */
 const removeHighlight = () => {
  selectedTasks.value = [];
};


/**
 * Filters tasks based on the search query.
 * Matches task name, description, or category name.
 *
 * @returns {Array} - The filtered list of tasks.
 */
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

/**
 * Groups filtered tasks by their status into predefined categories.
 *
 * @returns {Object} - An object containing tasks grouped by status.
 */
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

/**
 * Handles the drag start event for a task.
 * Sets the dragged task to the provided task object.
 *
 * @param {Object} task - The task being dragged.
 */
 function onDragStart(task) {
  draggedTask.value = task;
}

/**
 * Handles the drag end event.
 * Resets the dragged task and hovered column.
 */
 function onDragEnd() {
  draggedTask.value = null;
  hoveredColumn.value = null;
}

/**
 * Handles the drag over event.
 * Updates the hovered column if a task is being dragged.
 *
 * @param {string} status - The status of the column being hovered over.
 */
function onDragOver(status) {
  if (draggedTask.value) {
    hoveredColumn.value = status;
  }
}

/**
 * Handles the drag enter event.
 * Updates the hovered column if a task is being dragged.
 *
 * @param {string} status - The status of the column being entered.
 */
function onDragEnter(status) {
  if (draggedTask.value) {
    hoveredColumn.value = status;
  }
}


/**
 * Handles the drop event for a task.
 * Updates the task's status via a PATCH request and updates the local task list.
 *
 * @param {string} status - The new status of the task.
 */
 async function onDrop(status) {
  if (draggedTask.value) {
    try {
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
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }
  hoveredColumn.value = null;
  draggedTask.value = null;
}

/**
 * Opens the add task overlay and sets the chosen status.
 *
 * @param {string} status - The status to pre-select in the add task overlay.
 */
 const openAddTaskOverlay = (status) => {
  if (status) {
    choosenStatus = status;
    currentTask.value = null;
  }
  isAddTaskOverlayVisible.value = true;
};

/**
 * Opens the task detail view for the specified task.
 *
 * @param {Object} task - The task to display in the detail view.
 */
const openTaskDetail = (task) => {
  currentTask.value = task;
  isDetailViewVisible.value = true;
};

/**
 * Closes all overlays (add task and detail view).
 */
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
.headline-component {
  justify-content: space-between;
  align-items: flex-start;
}
.board-content {
  width: 100%;
}

.addtask-overlay {
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

.board-headline-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.find-task {
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

  .gray-seperator {
    width: 2px;
    height: 20px;
    background: #d1d1d1;
  }
}

.board-main-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  gap: 2.6rem;
  flex-wrap: wrap;
  position: relative;
}

.board-element {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 25.5rem;

  .board-element-header {
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

  .board-bottom-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

.board-element-content {
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s;
  min-height: 250px; /* Damit auch bei wenigen Tasks der Bereich sichtbar bleibt */
  position: relative;
  border-radius: 30px;
  gap: 1.5rem;
}

.board-element-content.hovered {
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

.board-element-empty {
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
  .board-headline-right{
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .board-main-content{
    justify-content: center;
    
  }
}

@media screen and (max-width: 450px) {
  .headline-component{
    flex-wrap: wrap;
  }
  .board-headline-right{
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
