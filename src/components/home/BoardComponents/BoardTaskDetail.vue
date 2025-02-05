<template>
    <div class="boardTaskDetail" @click="consoleFKN()">
        <div class="activeTaskHeader">
            <div class="activeTaskCategory" :style="{ background: category.color.hex_value }"><span :style="{color: getTextColor(category.color.hex_value)}">{{category.name}}</span></div>
            <img @click="closeOverlay()" class="activeTaskCloseButton" src="@/assets/img/blackX.svg" alt="">
        </div>
    <div class="activeTaskTitle">{{title}}</div>
    <div class="activeTaskDescription">{{description}}</div>
    <div class="activeTaskDueDate">
        <span class="acticeTaskSubHeader">Due date:</span><span>{{dueDate}}</span>
    </div>
    <div class="activeTaskPriority">
        <span class="acticeTaskSubHeader">Priority:</span>
        <div class="activeTaskPriorityButton" :style="{ background: buttonColor }"><span>{{prio}}</span><img :src="buttonImg" alt=""></div>
    </div>
    <span class="acticeTaskSubHeader">Assigned To:</span>
    <div class="activeTaskAssignedToContainer">
        <div v-for="contact in assignedTo" class="activeTaskAssignedTo">
            <div class="activeTaskAvatar" :style="{ background: contact.color.hex_value }"><span :style="{color: getTextColor(contact.color.hex_value)}">{{contact.avatar}}</span></div>
            <span>{{contact.name}}</span>
        </div>
    </div>
    <span class="acticeTaskSubHeader">Subtasks:</span>
    <div class="activeTaskSubtasksContainer">
        <div v-if="subtasks.length === 0" class="subtasksEmpty">No Task To Do</div>
        <div v-for="subtask in subtasks" class="activeTaskAssignedTo">
            <span>{{subtask.name}}</span>
            <input type="checkbox" :checked="subtask.is_completed">
        </div>
    </div>
    <div class="activeTaskChangeContainer">
        <div class="activeTaskButtons">
        <div class="activeTaskDelete">
            <img src="@/assets/img/delete.svg" alt="">
        </div>
        <div class="activeTaskEdit">
            <img src="@/assets/img/editTaskPen.svg" alt="">
        </div>
        </div>
    </div>
   
    
    </div>
</template>
<script setup>
import { defineProps, computed, onMounted } from 'vue';
import { categories } from '@/store/state';
import {Prioicons} from '@/utils/prioIcons';
import { members } from '@/store/state';
import  useTextColor  from '@/composables/useTextColor';

const { getTextColor } = useTextColor();
const emit =  defineEmits(["close"]);


const consoleFKN = () => {
    console.log("Current Task:", props.task);
};

const closeOverlay = () => {
    emit("close");
};
const props = defineProps({
    task: {
        type: Object
    }
});
const title = computed(() => props.task.name);
const description = computed(() => props.task.description);
const category = computed(() => {
    return categories.value.find(category => category.id === props.task.category) || null;
});

const assignedTo = computed(() => {
    return members.value.filter(member => props.task.selected_contacts.includes(member.id));
});
const dueDate = computed(() => props.task.due_date);
const subtasks = computed(() => props.task.subtasks);
const prio = computed(() => props.task.prio);
const buttonImg = computed(() => {
  if (prio.value === 'urgent') {
    return Prioicons.urgentWhite;
  } else if (prio.value === 'medium') {
    return Prioicons.mediumWhite; // Adjust the key if it's 'mediumWite'
  } else if (prio.value === 'low') {
    return Prioicons.lowWhite;
  }
  return ''; // Return a default or empty string if no match
});

const buttonColor = computed(() => {
  if (prio.value === 'urgent') {
    return 'rgb(255, 60, 0)';
  } else if (prio.value === 'medium') {
    return 'rgb(255, 168, 0)';
  } else if (prio.value === 'low') {
    return 'rgb(122, 226, 41)';
  }
  return ''; // Return a default or empty string if no match
});

</script>
<style scoped>

.boardTaskDetail {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    z-index: 2;
    padding: 2rem;
    overflow-x: auto;
    gap: 1rem;
    width: 600px;
    max-width: 100%;
    height: 824px;
    max-height: 100%;
    justify-content: space-between;
}

.activeTaskSubtasksContainer::-webkit-scrollbar-track,
.activeTaskAssignedToContainer::-webkit-scrollbar-track{
  margin-block: 0px;
}

.activeTaskHeader{
    display: flex;
    justify-content: space-between;
}
.activeTaskCategory {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 12px;
    height: 40px;
    background: #FC71FF;
    border-radius: 8px;
    span{
        font-weight: 700;
        font-size: 27px;
        color: #FFFFFF;
        height: 32px;
    }

}
.activeTaskTitle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 1px;
    max-width: 100%;
    background: yellow;
    font-weight: 700;
    font-size: 61px;
    color: var(--defaultDark);
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
}
.activeTaskDescription {
    max-width: 100%;
    font-size: 21px;
    color: #000000;
    overflow-wrap: anywhere;
    white-space: normal;
}
.activeTaskDueDate {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 25px;
    max-width: 100%;
    height: 25px;
    span {
        font-size: 21px;
        color: #000000;
        white-space: nowrap;
        &:first-child{
            font-weight: 700;
            font-size: 21px;
        }
    }
    
}

.acticeTaskSubHeader{
    font-weight: 700;
    font-size: 21px;
}

.activeTaskPriority {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 25px;
    max-width: 100%;
    height: 33px;
}

.activeTaskPriorityButton {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    width: 131px;
    height: 33px;
    background: #FF3D00;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    span {
       
        font-size: 21px;
        color: #FFFFFF;
        font-weight: 400;
    }
    img {
        height: 12px;
        width: 17px;
    }
}

.activeTaskAssignedToContainer {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-width: 100%;
    min-height: 80px;
    max-height: 130px;
    padding-top: 5px;
   
}

.activeTaskAssignedTo {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 543px;
    max-width: 99%;
    justify-content: space-between;
    height: 35px;
    input{
        cursor: pointer;
    }
}
.activeTaskAvatar {
    display: flex;
    justify-content: center;
    align-items: center;
  
  
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;

    span {
        font-size: 2rem;
        color: #FFFFFF;
    }
}


.activeTaskAssignedTo span {
     
    font-size: 21px;
    color: #000000;
}


.activeTaskSubtasksContainer {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-width: 100%;
    min-height: 80px;
    max-height: 130px;
}

.activeTaskButtons {
    cursor: pointer !important;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    justify-content: flex-end;
    justify-self: flex-end;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}



.activeTaskDelete {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -1px;
    width: 50px;
    height: 50px;
    background: #FFFFFF;
    border: 1px solid var(--main-color);
    border-radius: 10px 0px 0px 10px;
    &:hover {
        border: 1px solid var(--main-color-hover);
        img {
            content: url(@/assets/img/deleteHover.svg);
        }
    }
}

.activeTaskEdit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1px;
    width: 50px;
    height: 50px;
    background: var(--main-color);
    border-radius: 0px 10px 10px 0px;
    &:hover {
        background: var(--main-color-hover);
    }
}

.activeTaskCloseButton {
    position: absolute;
    right: 35px;
    top: 35px;
    cursor: pointer;
}

.subtasksEmpty{
  width:130px;
  height: 4.8rem;
  border-radius: 10px;
  border: 1px;
  background-color: #e7e7e7;
  color: #a8a8a8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.6rem;
}
</style>

