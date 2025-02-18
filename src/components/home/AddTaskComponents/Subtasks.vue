<template>
    <div class="input-container">
        <label class="title">Subtasks</label>
    <div v-if="!addingNewSubtask" @click="toggleAddingNewSubtask" class="inputfield dropdown">
        <div class="dropdown-option">
            <div class="dropdown-option-content">Add new Subtask</div>
            <img class="plus-icon" src="@/assets/img/plusBlackIcon.svg" alt="Add" />
        </div>
    </div>

    <div v-if="addingNewSubtask" class="inputfield" :class="{ 'input-error': error }">
        <input type="text" v-model="newSubtask" placeholder="Enter new subtask" maxlength="25">
        <div class="icon-container">
            <img @click="toggleAddingNewSubtask" src="@/assets/img/blackX.svg" alt="">
            <div class="gray-seperator"></div>
            <img @click="addNewSubtask" src="@/assets/img/blackCheck.svg" alt="">
        </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    </div>

    <div class="subtasks-container">
      <div class="subtask" v-for="(subtask, index) in subtasks" :key="index">
            <span class="subtask-content">{{ subtask.name }}</span>
            <div class="icon-container-subtask">
                <img @click="editSubtask(index)" src="@/assets/img/editIcon.svg" alt="">
                <img @click="deleteSubtask(index)" class="delete-icon" src="@/assets/img/delete.svg" alt="Delete" />
                <input type="checkbox" v-model="subtask.is_completed" />
            </div>
            
        </div>
    </div>
  </template>
  

  <script setup>
  import { ref, watch, defineEmits } from 'vue';
  const editedSubtaskIndex = ref(null);
  const emit = defineEmits(["update:subtasks"]);
  
  // Reactive state for managing subtasks
  /**
   * @vue-data {boolean} addingNewSubtask - Indicates if the UI for adding a new subtask is active.
   */
  const addingNewSubtask = ref(false);
  
  /**
   * @vue-data {string} newSubtask - The input value for the new subtask.
   */
  const newSubtask = ref('');
  
  /**
   * @vue-data {string} error - The error message related to the new subtask input.
   */
  const error = ref('');
  
  /**
   * @vue-data {Array} subtasks - The list of subtasks associated with the task.
   */
  const subtasks = ref([]);
  
  /**
   * @vue-method {Function} addNewSubtask - Adds a new subtask to the subtasks list.
   * 
   * This function performs the following steps:
   * 1. Checks if the new subtask input is empty (after trimming whitespace). If it is empty,
   *    an error message is set and the function returns early.
   * 2. If the input is valid, it appends a new subtask object (with `name` and `completed` status) to the subtasks array.
   * 3. Resets the new subtask input and error message.
   * 4. Emits an event to update the parent component with the updated subtasks list.
   * 5. Toggles the UI state for adding a new subtask.
   * 
   * @returns {void}
   */
  const addNewSubtask = () => {
    if (!newSubtask.value.trim()) {
      error.value = 'Subtask cannot be empty';
      return;
    }
    if(editedSubtaskIndex.value !== null){
        subtasks.value[editedSubtaskIndex.value].name = newSubtask.value;
    } else {
    subtasks.value.push({ name: newSubtask.value, completed: false });
  }
  newSubtask.value = '';
  error.value = '';
  editedSubtaskIndex.value = null;
  emit("update:subtasks", subtasks.value);
  toggleAddingNewSubtask();
  };
  
  /**
   * @vue-method {Function} toggleAddingNewSubtask - Toggles the UI state for adding a new subtask.
   * 
   * This function clears the current input for a new subtask and toggles the boolean flag
   * that indicates whether the UI for adding a new subtask is active.
   * 
   * @returns {void}
   */
  const toggleAddingNewSubtask = () => {
    newSubtask.value = '';
    addingNewSubtask.value = !addingNewSubtask.value;
  };
  
  /**
   * @vue-method {Function} setSubtasks - Sets the subtasks array to the provided list.
   * 
   * This function is used to set the `subtasks` array from the parent component.
   * 
   * @param {Array} newSubtasks - The new list of subtasks.
   * @returns {void}
   */
  const setSubtasks = (newSubtasks) => {
    subtasks.value = newSubtasks;
  };
  
  /**
   * @vue-method {Function} clear - Clears all subtasks by resetting the subtasks array to an empty array.
   * 
   * @returns {void}
   */
  const clear = () => {
    subtasks.value = [];
  };
  
  /**
   * @vue-method {Function} deleteSubtask - Deletes a subtask at the specified index from the subtasks array.
   * 
   * After removing the subtask, it emits an event to update the parent component with the updated subtasks list.
   * 
   * @param {number} index - The index of the subtask to be removed.
   * @returns {void}
   */
  const deleteSubtask = (index) => {
    subtasks.value.splice(index, 1);
    emit("update:subtasks", subtasks.value);
  };

  const editSubtask = (index) => {
    editedSubtaskIndex.value = index;
    toggleAddingNewSubtask();
    newSubtask.value = subtasks.value[editedSubtaskIndex.value].name;

  };
  
  /**
   * @vue-method {Function} watch - Watches the `subtasks` array for changes and emits an update event with the new subtasks.
   * 
   * This ensures that any change in the `subtasks` array is immediately communicated to the parent component.
   * 
   * @param {Array} newSubtasks - The updated list of subtasks.
   * @returns {void}
   */
  watch(subtasks, (newSubtasks) => {
    emit("update:subtasks", newSubtasks);
  });
  
  defineExpose({
    setSubtasks,
    clear
  });
  </script>
  

<style>
.subtasks-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .subtask{
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
        &:hover .icon-container-subtask > *:first-child {
            display: flex;
        }
        &:hover .icon-container-subtask > *:nth-child(2) {
            display: flex;
        }
    }
}

.icon-container-subtask {
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
    :nth-child(2){
        display: none;
    }
}
</style>