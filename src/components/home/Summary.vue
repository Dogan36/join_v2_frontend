<template>
      <div class="headlineComponent">
        <h1>Join 360</h1>
        <img class="headlineSeperator" src="@/assets/img/headlineSeperator.svg" alt="">
        <h2>Key Metrics at a Glance</h2>
      </div>
      <div class="contentSummary">
        <div class="contentButtons">
          <div class="buttonContainerRow">
            <div @click="goToBoard()" class="buttonSummary buttonV1">
              <div class="buttonContent">
              <span id="summaryCountInBoard" class="buttonNumber">{{boardTasks.length}}</span>
              <span class="buttonText ">Tasks in Board</span>
              </div>
            </div>
            <div @click="goToBoard(inProgressTasks)" class="buttonSummary buttonV1">
              <div class="buttonContent">
              <div id="summaryCountProgress" class="buttonNumber">{{inProgressTasks.length}}</div>
              <div class="buttonText">Tasks in Progress</div>
              </div>
            </div>
            <div @click="goToBoard(awaitingFeedbackTasks)" class="buttonSummary buttonV1">
              <div class="buttonContent">
              <div id="summaryCountAwaiting" class="buttonNumber">{{awaitingFeedbackTasks.length}}</div>
              <div class="buttonText">Tasks in Feedback</div>
              </div>
            </div>
          </div>
          <div class="buttonContainerRow">
            <div @click="goToBoard(urgentTasks)" class="buttonSummary buttonV3">
                <img class="urgentIcon" src="@/assets/img/prioHighRound.svg" alt="Urgent Icon"
                />
              <div class="buttonContent">
                <span id="summaryCountUrgent"class="buttonNumber">{{urgentTasks.length}}</span>
                <span class="buttonText">Urgent</span>
              </div>
            </div>
            <div @click="goToBoard(upcomingDeadline)" class="buttonSummary buttonV2">
              <div class="buttonText">{{ upcomingDeadline.length > 0 ? upcomingDeadline[0].due_date : 'No' }}</div>
              <div class="buttonV2TextBold">{{ deadlineLabel }}</div>
            </div>
          </div>
        
          <div class="buttonContainerRow">
            <div @click="goToBoard(toDoTasks)" class="buttonSummary buttonV3">
              <div class="penIcon"></div>
              <div class="buttonContent">
                <div id="summaryCountToDo" class="buttonNumber">{{toDoTasks.length}}</div>
                <div class="buttonText">To-do</div>
              </div>
            </div>
            <div @click="goToBoard(doneTasks)" class="buttonSummary buttonV3">
              <div class="hookIcon"></div>
              <div class="buttonContent">
                  <div class="buttonNumber">{{doneTasks.length}}</div>
                  <div class="buttonText">Done</div>
              </div>
          </div>
          </div>
        </div>
        <div class="welcomeDesk">
          <span id="welcomeText">{{greetingByDaytime}}</span>
          <span id="welcomeName">{{ userName }}</span>
      </div>
      <div v-if="!greetingDone" class="welcomeDeskOverlay">
          <span id="welcomeText">{{greetingByDaytime}}</span>
          <span id="welcomeName">{{ userName }}</span>
      </div>
      </div>
    
  </template>
<script setup>
import { currentUser, tasks } from '@/store/state';
import { computed, onMounted } from 'vue';
import { currentView, selectedTasks } from '@/store/state';
import { greetingDone } from '@/store/state';

onMounted(() => {
  setTimeout(() => {
    greetingDone.value = true;
  }, 3000);
});

const goToBoard = (filter) => {
  currentView.value = 'board';
  if (filter) {
    selectedTasks.value = filter;

  }
};
const userName = computed(() => {
  return currentUser.value.name ? currentUser.value.name.split(' ')[0] : '';
});

const boardTasks = computed(() => tasks.value);
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'inProgress'))
const awaitingFeedbackTasks = computed(() => tasks.value.filter(task => task.status === 'awaitingFeedback'))
const urgentTasks = computed(() => tasks.value.filter(task => task.prio === 'high'))
const upcomingDeadline = computed(() => {
  // Filtere Tasks mit due_date, die nicht den Status 'done' haben
  const tasksWithDeadline = tasks.value.filter(task => task.due_date && task.status !== 'done');
  if (tasksWithDeadline.length === 0) {
    return [];
  }
  // Sortiere die Tasks anhand des Fälligkeitsdatums
  tasksWithDeadline.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  // Ermittle das früheste Fälligkeitsdatum
  const earliestDeadline = tasksWithDeadline[0].due_date;
  // Gib alle Tasks zurück, die genau dieses Datum haben
  return tasksWithDeadline.filter(task => task.due_date === earliestDeadline);
});
const deadlineLabel = computed(() => {
  if (upcomingDeadline.value.length === 0) {
    return "Upcoming Deadline"; // oder alternativ einen anderen Standardtext
  }
  const earliestDeadline = upcomingDeadline.value[0].due_date;
  // Vergleiche das Datum: Liegt das früheste Datum in der Vergangenheit?
  if (new Date(earliestDeadline) < new Date()) {
    return "Missed Deadline";
  } else {
    return "Upcoming Deadline";
  }
});
const toDoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'))
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'))
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
.contentSummary {
  display: flex;
  align-items: center;
  gap: 5rem
}

.contentButtons {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.buttonContainerRow {
  display: flex;
  gap: 2rem;
}

.buttonSummary {
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

.buttonContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.buttonSummary:hover {
  transform: scale(1.05);
  background-color: #2A3647;
  transition: all 0.175s ease-in-out;
  color: white;
}

.buttonNumber {
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
}

.buttonText {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  text-align: center;
}



.buttonV2 {
  width: calc((100% - 2rem) / 2);
  justify-content: space-around;
  flex-direction: column;
  .buttonText {
    font-size: 2.1rem;
    white-space: nowrap;
  }
  .buttonV2TextBold {
    font-size: 2rem;
    font-weight: 600;
  }
}

.buttonV3 {
  width: calc((100% - 2rem) / 2);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.penIcon,
.hookIcon,
.urgentIcon
 {
  width: 6rem;
  height: 6rem;
  background-size: cover;
  background-repeat: no-repeat;

}

.penIcon::before,
.hookIcon::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.175s ease-in-out;
}

.penIcon::before {
  background-image: url('@/assets/img/penIcon.svg');
}

.hookIcon::before {
  background-image: url('@/assets/img/hook.svg');
}

.buttonV3:first-of-type:hover .penIcon:first-of-type::before {
  background-image: url('@/assets/img/penWhite.svg');
}

.buttonV3:hover .hookIcon::before {
  background-image: url('@/assets/img/hookWhite.svg');
}

.welcomeDesk {
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

.welcomeDeskOverlay{
  display: none;
}

@media screen and (max-width: 1000px) {
  .contentSummary {
    gap: 2rem;
  }
  .contentButtons {
    gap: 1rem;
  }
  .buttonContainerRow {
    gap: 1rem;
  }

  .buttonV2 {
  width: calc((100% - 1rem) / 2);
  }
  .buttonV3 {
    width: calc((100% - 1rem) / 2);
  }
  .penIcon,
  .hookIcon,
  .urgentIcon {
    width: 4rem;
    height: 4rem;
  }
}

@media screen and (max-width: 700px) {
  .contentSummary {
    gap: 2rem;
    max-width: 100%;
  }
  .contentButtons {
    gap: 1rem;
    width: 100%;
  }
  .buttonContainerRow {
    width: 100%;
    gap: 1rem;
  }

  .buttonV1{
    width: calc((100% - 2rem)/3);
    aspect-ratio: 1/1;
  }

  .penIcon,
  .hookIcon,
  .urgentIcon {
    width: 3rem;
    height: 3rem;
  }

  .welcomeDesk{
    display: none;
  }

  .welcomeDeskOverlay {
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
 
  .buttonNumber {
    font-size: 2.5rem;
  }
  .buttonText {
    font-size: 1.5rem;
  }

  .buttonV2{
    .buttonText {
      font-size: 1.5rem;
    }
  }
  .buttonV1{
    width: calc((100% - 2rem)/3);
  }
 
  .penIcon,
  .hookIcon,
  .urgentIcon {
    width: 3rem;
    height: 3rem;
  }
}
</style>