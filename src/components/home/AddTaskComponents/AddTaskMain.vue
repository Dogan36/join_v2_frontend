<template>
  <div class="addTaskOverlay">
    <div class="addTaskHeadline"><h1 class="headlineComponent">
      {{ isEditMode ? "Edit Task" : "Add Task" }}
    </h1>
    <img v-if="isAddTaskOverlayVisible" @click="closeOverlay" src="@/assets/img/blackX.svg" alt="">
  </div>
    
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
            @click="closeOverlay"
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
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
const { showConfirmation } = useConfirmationOverlay();
const { showOverlay, hideOverlay } = useLoadingOverlay();
import { currentWorkspace, getToken, currentTask, tasks, selectedCategory, currentView, isAddTaskOverlayVisible} from "@/store/state";

const isEditMode = ref(false); // Wird auf true gesetzt, wenn der Task bearbeitet wird
const props = defineProps({
  status: {
    type: String,
    default: "todo", // Standardstatus für neuen Task
},
});

const emit =  defineEmits(["close"]);

onMounted(() => {
isEditMode.value = !!currentTask.value; // Überprüfe, ob ein Task bearbeitet wird
initializeForm();
});


const closeOverlay = () => {
emit("close");
};

const initializeForm = () => {
  if (isEditMode.value) {
    title.value?.setTitle(currentTask.value.name); // 'title' -> 'name'
    description.value?.setDescription(currentTask.value.description || "");
    category.value?.setCategory(currentTask.value.category || "");
    dueDate.value?.setDueDate(currentTask.value.due_date || "");
    prio.value?.updatePrio(currentTask.value.prio || "todo");
    assignContacts.value?.setContacts(currentTask.value.selected_contacts || []);
    subtasks.value?.setSubtasks(currentTask.value.subtasks || []);
  }
  else {
    selectedCategory.value = null
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
const status = props.status;
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
  return {
    name: title.value?.title || "", // 'title' -> 'name'
    description: description.value?.description || "",
    category: category.value?.selectedCategory.id || "",
    selected_contacts: assignContacts.value?.selectedContacts || [],
    due_date: dueDate.value?.dueDate || "",
    prio: prio.value?.currentPrio || "medium", 
    subtasks: subtasksData.value || [],
    status: props.status || "todo", 
  };
};

const createTask = async () => {  
  try {
    const taskData = createTaskObject();
    if (!isEditMode.value) {
      const task = await createTaskFetch(taskData);
      tasks.value.push(task);
      currentView.value = "board" // Füge den neuen Task zur Liste hinzu
    }
    else if (isEditMode.value) {
      const task = await updateTaskFetch(taskData);
      tasks.value = tasks.value.map((t) => {
      if (t.id === currentTask.value.id) {
        return task;
      }
      return t;
    });
    }
  } catch (error) {
    console.error("Fehler beim Erstellen:", error);
  }
  closeOverlay();
}


const createTaskFetch = async (taskData) => {
  showOverlay();
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
    const task = await response.json();
    showConfirmation("Task added successfully");
    return task; // Antwort mit Task-Daten (z. B. ID)
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
  
};

const updateTaskFetch = async (taskData) => {
console.log("taskData", taskData)
showOverlay();
try {
  const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${currentWorkspace.value.id}/tasks/${currentTask.value.id}/`, { // Korrekte URL mit workspaceId
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${getToken()}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task", response);
  }

  const task = await response.json();
  showConfirmation("Task updated successfully");
  return task; // Antwort mit Task-Daten (z. B. ID)
} catch (error) {
  console.error("Error creating task:", error);
  return null;
}
};
</script>

<style>
.addTaskOverlay{
  max-width: 100%;
}
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
  max-width: 100%;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  

  label {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
}

.formButtons {
  display: flex;
  align-self: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.addTaskHeadline{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  img{
    height: 20px;
    margin-bottom: 2rem;
    cursor: pointer;
  }
}

@media screen and (max-width: 1000px) {
  .addTaskMainContent {
    justify-content: center;
  }
  
}

</style>
