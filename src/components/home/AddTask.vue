<template>
    <h1 class="headlineComponent">AddTask</h1>
    <form id="addTaskForm0" novalidate onsubmit="checkMandatoryFields(); return false">
    
      <div class="containerLeft">
        <div class="inputContainer">
            <label class="title">Title</label>
            <InputField
                v-model="title"
                type="text"
                placeholder="Enter a title"
                :error="requiredError"
                :errorMessages="{
                requiredError: requiredError ? 'This field is required' : '',
                }"
            />
        </div>
        <div class="inputContainer">
            <label class="title">Description</label>
            <InputField
                :isTextarea="true"
                v-model="description"
                type="text"
                placeholder="Enter description"
               
            />
        </div>
        <div class="inputContainer">
            <label class="title">Category</label>
            
            <AddTaskSelectCategory v-if="!addingNewCategory" @toggle="toggleAddingNewCategory">></AddTaskSelectCategory>
                        
            <AddTaskAddingNewCategory v-if="addingNewCategory" @toggle="toggleAddingNewCategory" @add="addNewCategory"></AddTaskAddingNewCategory>
        </div>
        <div class="inputContainer">
            <label class="title">Assigned to</label>
          
            <AddTaskAssignContacts></AddTaskAssignContacts>
          
        </div>
      </div>
      <div class="containerCenter"></div>
      <div class="containerRight">
        <div class="titleContainer">
          <p>
            <label class="title">Due date</label>
          </p>
          <div id="dateButton0">
            <input class="titleInput noOutline cursorPointer" type="date" id="dueDate0" required
              oninput="checkMandatoryFieldDueDate()" />
          </div>
          <p id="requiredDueDate0" class="required hidden">
            This field is required
          </p>
        </div>
        <div class="prioContainer">
          <p>
            <label class="title">Prio</label>
          </p>
          <div class="prioBodyContainer">
            <div id="prioRed0" class="prioButton" onclick="choosePrio('prioRed')">

              <div class="prioButtonName">Urgent</div>
              <img id="prioUrgentIcon0" class="prioIcon" src="./assets/img/prioUrgentIcon.svg" alt="" />
            </div>
            <div id="prioYellow0" class="prioButton" onclick="choosePrio('prioYellow')">
              <div class="prioButtonName">Medium</div>
              <img id="prioMediumIcon0" class="prioIcon" src="./assets/img/prioMediumIcon.svg" alt="" />
            </div>
            <div id="prioGreen0" class="prioButton" onclick="choosePrio('prioGreen')">
              <div class="prioButtonName">Low</div>
              <img id="prioLowIcon0" class="prioIcon" src="./assets/img/prioLowIcon.svg" alt="" />
            </div>
          </div>
          <p id="requiredPrio0" class="required hidden">
            This field is required
          </p>
        </div>
        <div>
          <p>
            <label class="title">Subtasks</label>
          </p>
          <div id="newSubtaskContainer0" class="newCategoryContainer d-none ">
            <input id="newSubtaskPoint0" class="newCategoryInput noOutline" type="text" maxlength="40"
              placeholder="New Subtasks" />
            <div class="imgContainer cursorPointer">
              <img onclick="closeSubtask()" src="./assets/img/blackX.svg" alt="" />
              <div class="dashContaier cursorPointer"><span class="dash"></span></div>
              <img onclick="addNewSubtask()" src="./assets/img/blackCheck.svg" alt="" />
            </div>
          </div>
          <div id="addNewSubtaskContainer0" class="newCategoryContainer cursorPointer" onclick="openSubtask()">
            <div class="addNewSubtask">Add new subtask</div>
            <img class="plusIcon" src="./assets/img/plusBlackIcon.svg" alt="" />
          </div>
          <p id="required0" class="required hidden">
            This field is required
          </p>
        </div>
        <div id="addTaskSubtaskPoint0"></div>
        <div class="submitBtnsContainer">
          <button type="button" class="addTaskCancelButton" onclick="clearTheInputFields()"
            >
            <span>Cancel</span>
            <img id="addTaskClearButton0" src="@/assets/img/buttonX.svg" alt="">
          </button>
          <button type="submit" class="createTaskBtn">
            <span>Create Task</span>
            <img src="./assets/img/creatTaskCheck.svg" alt="" />
          </button>
        </div>
      </div>
    
  </form>
    
</template>

<style>
.inputContainer {
  display: flex;
  flex-direction: column;  
  margin-bottom: 1rem;
  gap:0.8rem;
  label{
    font-size: 2.1rem;
  }
}
.dropDown {
    display: flex;
    flex-direction: column;
    align-items: start;
    height: auto;
    font-size: 1.6rem;
    /* Schriftgröße des Platzhalters */
    line-height: 1.6rem;
    padding: 0;

    .dropDownOption {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 2.1rem;
        height: 4.5rem;
        padding: 10px;
        .arrowIcon {
            height: 8px;
        }
        :not(:first-child):hover {
            background-color: #f0f0f0
        }

        .dropDownOptionContent {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            height: 100%;
        }

        img {
            cursor: pointer;
            height: 20px;
        }
    }

    .dropDownOption:not(:first-child):hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .colorCategoryButton {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background-color: red;
    }
}


</style>


<script setup>
import InputField from '../shared/InputField.vue';
import AddTaskSelectCategory from '../shared/AddTaskSelectCategory.vue';
import AddTaskAddingNewCategory from '../shared/AddTaskAddingNewCategory.vue';
import AddTaskAssignContacts from '../shared/AddTaskAssignContacts.vue';
const addingNewCategory = ref(false);
import { ref } from 'vue';
const title = ref('');
const description = ref('');
const requiredError = ref(false);

const error = ref(false);
const errorMessage = ref('');



const toggleAddingNewCategory = () => {
    console.log(addingNewCategory);
  addingNewCategory.value = !addingNewCategory.value
};




const addNewCategory = () => {
    console.log('addNewCategory');
};



</script>