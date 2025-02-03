<template>
  <div class="addTaskOverlay">
    <h1 class="headlineComponent">
      {{ isEditMode ? "Edit Task" : "Add Task" }}
    </h1>
    <form class="addTaskMainContent" @submit.prevent="handleSubmit">
      <div class="formLeft">
        <Title ref="title" />
        <Description ref="description" />
        <Category ref="category" />
        <AssignContacts ref="assignContacts" />
      </div>

      <div class="formRight">
        <DueDate ref="dueDate" />
        <PrioButtons ref="prio" />
        <Subtasks ref="subtasks" @update:subtasks="updateSubtasks" />
        <div class="formButtons">
          <button
            class="secondary-button-layout"
            type="button"
            @click="cancel"
          >
            Cancel
          </button>
          <button class="main-button-layout" type="submit">
            {{ isEditMode ? "Save Changes" : "Add Task" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { API_BASE_URL } from "@/config";
import Title from "./Title.vue";
import Description from "./Description.vue";
import Category from "./Category.vue";
import AssignContacts from "./AssignContacts.vue";
import DueDate from "./DueDate.vue";
import PrioButtons from "./PrioButtons.vue";
import Subtasks from "./Subtasks.vue";
import { currentWorkspace, getToken } from "@/store/state";

const props = defineProps({
task: {
  type: Object,
  default: null, // Kein Task übergeben -> Add-Modus
},
});

const emit =  defineEmits(["close"]);

onMounted(() => {
initializeForm();
});

const isEditMode = props.task !== null;
const closeOverlay = () => {
emit("close");
};

const initializeForm = () => {
console.log(props.task);

if (isEditMode) {
  title.value?.setTitle(props.task.name || ""); // 'title' -> 'name'
  description.value?.setDescription(props.task.description || "");
  category.value?.setCategory(props.task.category || "");
  dueDate.value?.setDueDate(props.task.due_date || "");
  prio.value?.setPrio(props.task.status || "todo");
  assignContacts.value?.setContacts(props.task.selectedContacts || []);
  subtasks.value?.setSubtasks(props.task.subtasks || []);
}
};

// Referenzen für die Validierung der Komponenten
const title = ref(null);
const description = ref(null);
const category = ref(null);
const assignContacts = ref(null);
const dueDate = ref(null);
const prio = ref(null);
const subtasks = ref(null);
const status = "todo";
const subtasksData = ref([]); // Sammle die Subtasks

const updateSubtasks = (newSubtasks) => {
subtasksData.value = newSubtasks;
};

const validateForm = () => {
let isValid = true;
if (!title.value?.validate()) {
  isValid = false;
}
if (!category.value?.validate()) {
  isValid = false;
}
if (!dueDate.value?.validate()) {
  isValid = false;
}
return isValid;
};

// Funktion zum Starten der Validierung und Formular-Submit
const handleSubmit = async () => {
const isValid = validateForm();

if (isValid) {
  createTask();
}
}
const createTaskObject = () => {
  console.log(title.value?.title, description.value?.description, category.value?.selectedCategory, assignContacts.value?.selectedContacts, dueDate.value?.dueDate, prio.value?.currentPrio, subtasksData.value, status);
  return {
    name: title.value?.title || "", // 'title' -> 'name'
    description: description.value?.description || "",
    category: category.value?.selectedCategory.id || "",
    selectedContacts: assignContacts.value?.selectedContacts || [], // Optional, stelle sicher, dass Backend dies unterstützt
    due_date: dueDate.value?.dueDate || "", // 'dueDate' -> 'due_date'
    prio: prio.value?.currentPrio || "medium", // 'prio' -> 'status'
    subtasks: subtasksData.value || [], // 'subtaskArrayId' entfernt, 'subtasks' hinzugefügt
    status: status,
  };
  
};
const createTask = async () => {  
  try {
  const taskData = createTaskObject();
  const data = await createTaskFetch(taskData);
  if (data) {
    console.log("Task und Subtasks erstellt:", data);
    closeOverlay();
    // Optional: Aktualisiere die Task-Liste oder zeige eine Erfolgsmeldung
  }
} catch (error) {
  console.error("Fehler beim Erstellen:", error);
  // Optional: Zeige eine Fehlermeldung im UI
}

}
const createTaskFetch = async (taskData) => {
  console.log("Task-Daten:", taskData);
try {
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspace.value.id}/tasks/`, { // Korrekte URL mit workspaceId
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${getToken()}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task", response);
  }

  const data = await response.json();
  return data; // Antwort mit Task-Daten (z. B. ID)
} catch (error) {
  console.error("Error creating task:", error);
  return null;
}
};
</script>

<style>
@import "@/assets/base.css";
.addTaskMainContent {
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
 min-width: 360px;
  max-width: 100%;
}

.inputContainer {
  display: flex;
  flex-direction: column;
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
