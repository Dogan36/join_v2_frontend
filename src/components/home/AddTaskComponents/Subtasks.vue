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
        <input type="text" v-model="newSubtask" placeholder="Enter new subtask" maxlength="25">
        <div class="iconContainer">
            <img @click="toggleAddingNewSubtask" src="@/assets/img/blackX.svg" alt="">
            <div class="graySeperator"></div>
            <img @click="addNewSubtask" src="@/assets/img/blackCheck.svg" alt="">
        </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    </div>

    <div class="subTasksContainer">
        <div class="subTask" v-for="subtask in subtasks" :key="subtask.id">
            <span class="subTaskContent">{{ subtask.name }}</span>
            <div class="iconContainerSubtask">
                <img @click="deleteSubtask(subtask.id)" class="deleteIcon" src="@/assets/img/delete.svg" alt="Delete" />
                <input type="checkbox" v-model="subtask.is_completed" />
            </div>
            
        </div>
    </div>
  </template>
  

<script setup>
import { ref, watch, defineEmits } from 'vue';


const emit = defineEmits(["update:subtasks"]);
const addingNewSubtask = ref(false);
const newSubtask = ref('');
const error = ref('');

const subtasks = ref([]);

const addNewSubtask = () => {
    if (!newSubtask.value.trim()) {
        error.value = 'New subtask cannot be empty';
        return;
    }
    subtasks.value.push({ name: newSubtask.value, completed: false });
    newSubtask.value = '';
    error.value = '';
    emit("update:subtasks", subtasks.value);
    toggleAddingNewSubtask();
};


const toggleAddingNewSubtask = () => {
    newSubtask.value = '';
    addingNewSubtask.value = !addingNewSubtask.value;
}

const setSubtasks = (newSubtasks) => {
    subtasks.value = newSubtasks;
};

const clear = () => {
    subtasks.value = [];
};

const deleteSubtask = (index) => {
  subtasks.value.splice(index, 1);
  emit("update:subtasks", subtasks.value);
};

watch(subtasks, (newSubtasks) => {
  emit("update:subtasks", newSubtasks);
});

defineExpose({
    setSubtasks,
    clear
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
        &:first-child{
            margin-top:0.5rem;
        }
        &:hover{
            background-color: #E7E7E7;
        }
        &:hover .iconContainerSubtask > *:first-child{
            display: flex;
        }
    }
}

.iconContainerSubtask {
    display: flex;
    gap: 1rem;
    img, input {
        cursor: pointer;
        height: 1.5rem ;
    }
    img:hover, input:hover{ 
        scale: 1.1;
    }
    :first-child{
        display: none;
    }

}
</style>