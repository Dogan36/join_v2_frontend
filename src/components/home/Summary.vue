<template>
      <div class="headline-component">
        <h1>Join 360</h1>
        <img class="headline-seperator" src="@/assets/img/headlineSeperator.svg" alt="">
        <h2>Key Metrics at a Glance</h2>
      </div>
      <div class="content-summary">
        <div class="content-buttons">
          <div class="button-container-row">
            <div @click="goToBoard()" class="button-summary button-v1">
              <div class="button-content">
              <span class="button-number">{{boardTasks.length}}</span>
              <span class="button-text ">Tasks in Board</span>
              </div>
            </div>
            <div @click="goToBoard(inProgressTasks)" class="button-summary button-v1">
              <div class="button-content">
              <div class="button-number">{{inProgressTasks.length}}</div>
              <div class="button-text">Tasks in Progress</div>
              </div>
            </div>
            <div @click="goToBoard(awaitingFeedbackTasks)" class="button-summary button-v1">
              <div class="button-content">
              <div class="button-number">{{awaitingFeedbackTasks.length}}</div>
              <div class="button-text">Tasks in Feedback</div>
              </div>
            </div>
          </div>
          <div class="button-container-row">
            <div @click="goToBoard(urgentTasks)" class="button-summary button-v3">
                <img class="urgent-icon" src="@/assets/img/prioHighRound.svg" alt="Urgent Icon"
                />
              <div class="button-content">
                <span class="button-number">{{urgentTasks.length}}</span>
                <span class="button-text">Urgent</span>
              </div>
            </div>
            <div @click="goToBoard(upcomingDeadline)" class="button-summary button-v2">
              <div class="button-text">{{ upcomingDeadline.length > 0 ? upcomingDeadline[0].due_date : 'No' }}</div>
              <div class="button-v2-text-bold">{{ deadlineLabel }}</div>
            </div>
          </div>
        
          <div class="button-container-row">
            <div @click="goToBoard(toDoTasks)" class="button-summary button-v3">
              <div class="pen-icon"></div>
              <div class="button-content">
                <div class="button-number">{{toDoTasks.length}}</div>
                <div class="button-text">To-do</div>
              </div>
            </div>
            <div @click="goToBoard(doneTasks)" class="button-summary button-v3">
              <div class="hook-icon"></div>
              <div class="button-content">
                  <div class="button-number">{{doneTasks.length}}</div>
                  <div class="button-text">Done</div>
              </div>
          </div>
          </div>
        </div>
        <div class="welcome-desk">
          <span id="welcome-text">{{greetingByDaytime + ','}}</span>
          <span id="welcome-name">{{ userName }}</span>
      </div>
      <div v-if="!greetingDone" class="welcome-desk-overlay">
          <span id="welcome-text">{{greetingByDaytime + ','}}</span>
          <span id="welcome-name">{{ userName }}</span>
      </div>
      </div>
    
</template>

<script setup>
import { currentUser, tasks } from '@/store/state';
import { computed, onMounted } from 'vue';
import { currentView, selectedTasks } from '@/store/state';
import { greetingDone } from '@/store/state';

/**
 * @vue-method {Function} onMounted - Sets greetingDone to true after a 3-second delay when the component is mounted.
 * 
 * This lifecycle hook will update the `greetingDone` reactive property to `true` after 3 seconds.
 * 
 * @returns {void}
 */
onMounted(() => {
  setTimeout(() => {
    greetingDone.value = true;
  }, 3000);
});

/**
 * @vue-method {Function} goToBoard - Navigates to the board view and optionally filters tasks.
 * 
 * This function updates the `currentView` to 'board' and applies a filter to the `selectedTasks` if provided.
 *
 * @param {Array} filter - The filter to apply to the tasks.
 * @returns {void}
 */
const goToBoard = (filter) => {
  currentView.value = 'board';
  if (filter) {
    selectedTasks.value = filter;
  }
};

/**
 * @vue-computed {string} userName - Computes the first name of the current user.
 * 
 * This computed property extracts the first name from the `currentUser`'s full name.
 * 
 * @returns {string} - The first name of the current user.
 */
const userName = computed(() => {
  return currentUser.value.name ? currentUser.value.name.split(' ')[0] : '';
});

/**
 * @vue-computed {Array} boardTasks - Returns all tasks for the board view.
 * 
 * This computed property returns the entire list of tasks from the `tasks` store.
 * 
 * @returns {Array} - An array of tasks.
 */
const boardTasks = computed(() => tasks.value);

/**
 * @vue-computed {Array} inProgressTasks - Filters tasks with the status 'inProgress'.
 * 
 * This computed property filters the tasks that have a status of 'inProgress'.
 * 
 * @returns {Array} - An array of tasks with the status 'inProgress'.
 */
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'inProgress'));

/**
 * @vue-computed {Array} awaitingFeedbackTasks - Filters tasks with the status 'awaitingFeedback'.
 * 
 * This computed property filters the tasks that have a status of 'awaitingFeedback'.
 * 
 * @returns {Array} - An array of tasks with the status 'awaitingFeedback'.
 */
const awaitingFeedbackTasks = computed(() => tasks.value.filter(task => task.status === 'awaitingFeedback'));

/**
 * @vue-computed {Array} urgentTasks - Filters tasks with high priority.
 * 
 * This computed property filters the tasks that have a high priority.
 * 
 * @returns {Array} - An array of tasks with high priority.
 */
const urgentTasks = computed(() => tasks.value.filter(task => task.prio === 'high'));

/**
 * @vue-computed {Array} upcomingDeadline - Computes tasks with the earliest upcoming deadline, excluding done tasks.
 * 
 * This computed property filters tasks that have a deadline and are not marked as 'done', then sorts them by the earliest deadline.
 * 
 * @returns {Array} - An array of tasks with the earliest upcoming deadline.
 */
const upcomingDeadline = computed(() => {
  const tasksWithDeadline = tasks.value.filter(task => task.due_date && task.status !== 'done');
  if (tasksWithDeadline.length === 0) {
    return [];
  }
  tasksWithDeadline.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  const earliestDeadline = tasksWithDeadline[0].due_date;
  return tasksWithDeadline.filter(task => task.due_date === earliestDeadline);
});

/**
 * @vue-computed {string} deadlineLabel - Computes the label for the upcoming or missed deadline.
 * 
 * This computed property checks if the earliest deadline has passed or is upcoming and returns the appropriate label.
 * 
 * @returns {string} - The label for the upcoming or missed deadline.
 */
const deadlineLabel = computed(() => {
  if (upcomingDeadline.value.length === 0) {
    return "Upcoming Deadline";
  }
  const earliestDeadline = upcomingDeadline.value[0].due_date;
  if (new Date(earliestDeadline) < new Date()) {
    return "Missed Deadline";
  } else {
    return "Upcoming Deadline";
  }
});

/**
 * @vue-computed {Array} toDoTasks - Filters tasks with the status 'todo'.
 * 
 * This computed property filters the tasks that have a status of 'todo'.
 * 
 * @returns {Array} - An array of tasks with the status 'todo'.
 */
const toDoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'));

/**
 * @vue-computed {Array} doneTasks - Filters tasks with the status 'done'.
 * 
 * This computed property filters the tasks that have a status of 'done'.
 * 
 * @returns {Array} - An array of tasks with the status 'done'.
 */
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'));

/**
 * @vue-computed {string} greetingByDaytime - Computes a greeting based on the current time of day.
 * 
 * This computed property returns a greeting message based on the time of day:
 * - 'Good Morning' for 5 AM - 12 PM
 * - 'Good Afternoon' for 12 PM - 6 PM
 * - 'Good Evening' for 6 PM - 5 AM
 * 
 * @returns {string} - A greeting message based on the current time.
 */
const greetingByDaytime = computed(() => {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 5 && hours < 12) {
    return 'Good Morning';
  } else if (hours >= 12 && hours < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
});
</script>

<style scoped>
.content-summary {
  display: flex;
  align-items: center;
  gap: 5rem
}

.content-buttons {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.button-container-row {
  display: flex;
  gap: 2rem;
}

.button-summary {
display: flex;
align-items: center;
justify-content: center;
  height: 13rem;
  width: 13rem;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 10%);
  border-radius: 20px;
  flex: none;
  cursor: pointer;
  transition: all 0.175s ease-in-out;
  padding: 1.5rem;
  text-align: center;
}

.button-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button-summary:hover {
  transform: scale(1.05);
  background-color: #2A3647;
  transition: all 0.175s ease-in-out;
  color: white;
}

.button-number {
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
}

.button-text {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  text-align: center;
}



.button-v2 {
  width: calc((100% - 2rem) / 2);
  justify-content: space-around;
  flex-direction: column;
  .button-text {
    font-size: 2.1rem;
    white-space: nowrap;
  }
  .button-v2-text-bold {
    font-size: 2rem;
    font-weight: 600;
  }
}

.button-v3 {
  width: calc((100% - 2rem) / 2);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.pen-icon,
.hook-icon,
.urgent-icon
 {
  width: 6rem;
  height: 6rem;
  background-size: cover;
  background-repeat: no-repeat;

}

.pen-icon::before,
.hook-icon::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.175s ease-in-out;
}

.pen-icon::before {
  background-image: url('@/assets/img/penIcon.svg');
}

.hook-icon::before {
  background-image: url('@/assets/img/hook.svg');
}

.button-v3:first-of-type:hover .pen-icon:first-of-type::before {
  background-image: url('@/assets/img/penWhite.svg');
}

.button-v3:hover .hook-icon::before {
  background-image: url('@/assets/img/hookWhite.svg');
}

.welcome-desk {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  span:first-child {
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
  }
  span:last-child {
    font-size: 6rem;
    font-weight: 700;
    color: var(--main-color-hover);
    text-align: center;
  }
}

.welcome-desk-overlay{
  display: none;
}

@media screen and (max-width: 1000px) {
  .content-summary {
    gap: 2rem;
  }
  .content-buttons {
    gap: 1rem;
  }
  .button-container-row {
    gap: 1rem;
  }

  .button-v2 {
  width: calc((100% - 1rem) / 2);
  }
  .button-v3 {
    width: calc((100% - 1rem) / 2);
  }
  .pen-icon,
  .hook-icon,
  .urgent-icon {
    width: 4rem;
    height: 4rem;
  }
}

@media screen and (max-width: 700px) {
  .content-summary {
    gap: 2rem;
    max-width: 100%;
  }
  .content-buttons {
    gap: 1rem;
    width: 100%;
  }
  .button-container-row {
    width: 100%;
    gap: 1rem;
  }

  .button-v1{
    width: calc((100% - 2rem)/3);
    aspect-ratio: 1/1;
  }

  .pen-icon,
  .hook-icon,
  .urgent-icon {
    width: 3rem;
    height: 3rem;
  }

  .welcome-desk{
    display: none;
  }

  .welcome-desk-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100; /* Über allen anderen Inhalten */
  margin: 0;
  background-color: var(--color-background);
  opacity: 1;
  animation: fadeOutWelcome 1s ease-out forwards;
  animation-delay: 2s;
  span:first-child {
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
  }
  span:last-child {
    font-size: 6rem;
    font-weight: 700;
    color: var(--main-color-hover);
    text-align: center;
  } /* Nach 2 Sekunden beginnt das Ausblenden */
}

@keyframes fadeOutWelcome {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    z-index: -1;
  }
}
}

@media screen and (max-width: 400px) {
 
  .button-number {
    font-size: 2.5rem;
  }
  .button-text {
    font-size: 1.5rem;
  }

  .button-v2{
    .buttonText {
      font-size: 1.5rem;
    }
  }
  .button-v1{
    width: calc((100% - 2rem)/3);
  }
 
  .penI-icon,
  .hook-icon,
  .urgent-icon {
    width: 3rem;
    height: 3rem;
  }
}
</style>