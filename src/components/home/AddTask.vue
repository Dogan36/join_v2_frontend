<template>
<h1 class="headlineComponent">AddTask</h1>
<form class="addTaskContent"  @submit.prevent="handleSubmit">
    <div class="formLeft">
      <Title ref="title" />
      <Description ref="description" />
      <Category ref="category" />
      <AssignContacts ref="assignContacts" />
    </div>

    <div class="formRight">
      <DueDate ref="dueDate" />
      <PrioButtons ref="prio" />
      <Subtasks ref="subtasks" />
      <div class="formButtons">
        <button class="secondary-button-layout" type="button">Cancel</button>
        <button class="main-button-layout" type="submit">Add Task</button>
      </div>
    </div>
</form>
</template>

<script setup>
import {ref} from "vue";
import Title from "./AddTaskComponents/Title.vue";
import Description from "./AddTaskComponents/Description.vue";
import Category from "./AddTaskComponents/Category.vue";
import AssignContacts from "./AddTaskComponents/AssignContacts.vue";
import DueDate from "./AddTaskComponents/DueDate.vue";
import PrioButtons from "./AddTaskComponents/PrioButtons.vue";
import Subtasks from "./AddTaskComponents/Subtasks.vue";

// Referenzen für die Validierung der Komponenten
const title = ref(null);
const description = ref(null);
const category = ref(null);
const assignContacts = ref(null);
const dueDate = ref(null);
const prio = ref(null);
const subtasks = ref(null);


const Task = ref({
  title: '',
  description: '',
  category: '',
  selectedContacts: [],
  dueDate: '',
  prio: '',
  subtasks: [],
});



// Funktion zum Starten der Validierung und Formular-Submit
const handleSubmit = () => {
  let isValid = true;

  // Validierungen
  isValid = title.value?.validate();
  isValid = category.value?.validate();
  isValid = dueDate.value?.validate();
  if (isValid) {
    // Task-Objekt aktualisieren
    Task.value.title = title.value?.title;
    Task.value.description = description.value?.description;
    Task.value.category = category.value?.selectedCategory;
    Task.value.selectedContacts = assignContacts.value?.selectedContacts;
    Task.value.dueDate = dueDate.value?.dueDate;
    Task.value.prio = prio.value?.currentPrio;
    //Task.value.subtasks = subtasks.value?.subtasks;

    console.log('Form is valid! Submit task');
    console.log(Task.value); // Finales Task-Objekt
  } else {
    console.log('Form is invalid!');
  }
};
</script>

<style>
@import './../../assets/main.css';
.addTaskContent {
    display: flex;
    max-width: 900px;
    flex-wrap: wrap;
    gap: 3rem;
}

.formLeft,
.formRight {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: auto;
    max-width: 100%;
}

.inputContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 0.8rem;

    label {
        font-size: 2.1rem;
    }
}

.formButtons {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}
</style>
