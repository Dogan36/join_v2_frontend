<template>
    <div class="inputContainer">
        <label class="title">Subtasks</label>
    <div v-if="!addingNewSubtask" @click="toggleAddingNewSubtask" class="inputField dropDown">
        <div class="dropDownOption">
            <div class="dropDownOptionContent">Add new Subtask</div>
            <img class="plusIcon" src="@/assets/img/plusBlackIcon.svg" alt="Add" />
        </div>
    </div>

    <div v-if="addingNewSubtask" class="inputField" :class="{ 'input-error': error }">
        <input type="text" v-model="newSubtask" placeholder="Enter new subtask" maxlength="20">
        <div class="iconContainer">
            <img @click="toggleAddingNewSubtask" src="@/assets/img/blackX.svg" alt="">
            <div class="graySeperator"></div>
            <img @click="addNewSubtask" src="@/assets/img/blackCheck.svg" alt="">
        </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    </div>

    <div class="subTasksContainer">
        <div v-for="subtask in subtasks" :key="subtask.id" class="subTask">
            <div class="subTaskContent">{{ subtask.name }}</div>
            <div class="iconContainerSubtask">
                <img @click="deleteSubtask" class="deleteIcon" src="@/assets/img/delete.svg" alt="Delete" />
            </div>
            
        </div>
    </div>
  </template>
  

<script setup>
import { ref, defineExpose } from 'vue';

const addingNewSubtask = ref(false);
const newSubtask = ref('');
const error = ref('');

const subtasks = ref([
 
]);

const addNewSubtask = () => {
    if (!newSubtask.value.trim()) {
        error.value = 'New subtask cannot be empty';
        return;
    }
    console.log(newSubtask.value);
    subtasks.value.push({ name: newSubtask.value, completed: false });
    console.log(subtasks.value);
    newSubtask.value = '';
    error.value = '';
    toggleAddingNewSubtask();
};


const toggleAddingNewSubtask = () => {
    newSubtask.value = '';
    addingNewSubtask.value = !addingNewSubtask.value;
}

const getSubtasks = () => {
    return subtasks.value;
};
defineExpose({
  getSubtasks
});
</script>

<style>
.subTasksContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .subTask{
        display: flex;
        justify-content: space-between;
    
        padding: 0.5rem;
        border-radius: 10px;
        align-items: center;
        font-size: 1.8rem;
        &:hover{
            background-color: #E7E7E7;
        }
        &:hover .iconContainerSubtask{
            display: flex;
        }
    }
}

.iconContainerSubtask {
    display: none;
    gap: 0.5rem;
    img {
        cursor: pointer;
        height: 1.5rem ;
    }
    img:hover{ 
        scale: 1.1;
    }
}
</style>