<template>
    <div class="boardTaskDetail">
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
    <div class ="activeTaskElement">
    <span class="acticeTaskSubHeader">Assigned To:</span>
    <div class="activeTaskAssignedToContainer">
        <div v-for="contact in assignedTo" class="activeTaskAssignedTo">
            <div class="activeTaskAvatar" :style="{ background: contact.color.hex_value }"><span :style="{color: getTextColor(contact.color.hex_value)}">{{contact.avatar}}</span></div>
            <span>{{contact.name}}</span>
        </div>
    </div>
    </div>
    <div class ="activeTaskElement">
    <span class="acticeTaskSubHeader">Subtasks:</span>
    <div class="activeTaskSubtasksContainer">
        <div v-for="subtask in subtasks" class="activeTaskSubtasks">
            <span>{{subtask.name}}</span>
            <input @click="updateSubtask(subtask)" type="checkbox" :checked="subtask.is_completed">
        </div>
        <div v-if="subtasks.length === 0" class="subtasksEmpty">No Subtasks assigned</div>
    </div>
    </div>
    <div class="activeTaskChangeContainer">
        <div class="activeTaskButtons">
        <div @click="deleteTask" class="activeTaskDelete">
            <img src="@/assets/img/delete.svg" alt="Delete">
        </div>
        <div @click="editTask" class="activeTaskEdit">
            <img src="@/assets/img/editTaskPen.svg" alt="Edit">
        </div>
        </div>
    </div>
   
    
    </div>
</template>
<script setup>
import { defineProps, computed} from 'vue';
import { categories } from '@/store/state';
import { Prioicons } from '@/utils/prioIcons';
import { members, tasks } from '@/store/state';
import  useTextColor  from '@/composables/useTextColor';
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from '@/composables/useConfirmationOverlay';
import { API_BASE_URL } from '@/config';
import { getToken, currentWorkspace } from '@/store/state';
const {  showOverlay} = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();
const { getTextColor } = useTextColor();
const emit =  defineEmits(["close", "edit"]);

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
    const cat = categories.value.find(category => category.id === props.task.category);
    if (!cat) {
        return { name: 'Category Deleted', color: { hex_value: '#FFFF00'} }; // fallback value
    }
    return cat;
});

const assignedTo = computed(() => {
    return members.value.filter(member => props.task.selected_contacts.includes(member.id));
});
const dueDate = computed(() => props.task.due_date);
const subtasks = computed(() => props.task.subtasks);
const prio = computed(() => props.task.prio);
const buttonImg = computed(() => {
  if (prio.value === 'high') {
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

const updateSubtask = async(subtask) => {
    try {
        const token = getToken();
        await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspace.value.id}/subtasks/${subtask.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                is_completed: !subtask.is_completed
            })
        });
        subtask.is_completed = !subtask.is_completed;
    } catch (error) {
        console.error('Error updating subtask:', error);
    }
};

const deleteTask = async() => {
    showOverlay();
    try {
        const token = getToken();
        await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspace.value.id}/tasks/${props.task.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        tasks.value = tasks.value.filter(task => task.id !== props.task.id);
        showConfirmation('Task deleted successfully');
        closeOverlay();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
    
    
};

const editTask = () => {
    closeOverlay();
    emit('edit');
};
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
    padding: 0px 1.2rem;
    height: 4rem;
    background: #FC71FF;
    border-radius: 8px;
    span{
        font-weight: 700;
        font-size: 2.7rem;
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
    font-weight: 700;
    font-size: 6rem;
    line-height: 6rem;
    color: var(--defaultDark);
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
}

.activeTaskDescription {
    max-width: 100%;
    font-size: 2rem;
    line-height:2rem;
    color: #000000;
    overflow-wrap: anywhere;
    white-space: normal;
}

.activeTaskDueDate {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 2.5rem;
    max-width: 100%;
    height: 2.5rem;
    span {
        font-size: 2.1rem;
        color: #000000;
        white-space: nowrap;
        &:first-child{
            font-weight: 700;
            font-size: 2.1rem;
        }
    }
    
}

.activeTaskElement{
    gap: 1rem;
}

.acticeTaskSubHeader{
    font-weight: 700;
    font-size: 2.1rem;
}

.activeTaskPriority {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 2.5rem;
    max-width: 100%;
    height: 3.3rem;
}

.activeTaskPriorityButton {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    width: 13rem;
    height: 3.3rem;
    background: #FF3D00;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    span {
       
        font-size: 2.1rem;
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
    min-height: 8rem;
    max-height: 13rem;   
}

.activeTaskAssignedTo {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 54rem;
    max-width: 99%;
    justify-content: space-between;
    height: 3.5rem;
    input{
        cursor: pointer;
    }
    &:first-child{
        margin-top: 1rem;
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

.activeTaskSubtasks {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 54rem;
    max-width: 99%;
    justify-content: space-between;
    height: 2.5rem;
    input{
        cursor: pointer;
    }
}

.activeTaskAssignedTo span,
.activeTaskSubtasks span {
    font-size: 2.1rem;
    color: #000000;
}


.activeTaskSubtasksContainer {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-width: 100%;
    min-height: 8rem;
    max-height: 13rem;
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
    width: 5rem;
    height: 5rem;
    background: #FFFFFF;
    border: 1px solid var(--color-warn);
    border-radius: 10px 0px 0px 10px;
    &:hover {
        border: 1px solid var(--color-warn-hover);
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
    width: 5rem;
    height: 5rem;
    background: var(--main-color);
    border-radius: 0px 10px 10px 0px;
    &:hover {
        background: var(--main-color-hover);
    }
}

.activeTaskCloseButton {
    position: absolute;
    right: 3.5rem;
    top: 3.5rem;
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
  margin-top:0.5rem
}
</style>

