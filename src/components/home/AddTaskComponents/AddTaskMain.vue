<template>
  <div class="addtask-overlay">
    <div class="addtask-headline"><h1 class="headline-component">
      {{ isEditMode ? "Edit Task" : "Add Task" }}
    </h1>
    <img v-if="isAddTaskOverlayVisible" @click="closeOverlay" src="@/assets/img/blackX.svg" alt="">
  </div>
    
    <form class="addtask-main-content" @submit.prevent="handleSubmit">
      <div class="form-left">
        <Title ref="title" />
        <Description ref="description" />
        <Category ref="category" />
        <AssignContacts ref="assignContacts" />
      </div>

      <div class="form-right">
        <DueDate ref="dueDate" />
        <PrioButtons ref="prio" />
        <Subtasks ref="subtasks" @update:subtasks="updateSubtasks" />
        <div class="form-buttons">
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
/**
 * Lifecycle hook executed when the component is mounted.
 * 
 * - Checks if a task is currently selected (i.e., if a task is being edited) and sets
 *   the edit mode accordingly.
 * - Initializes the form.
 */
onMounted(() => {
isEditMode.value = !!currentTask.value; // Überprüfe, ob ein Task bearbeitet wird
initializeForm();
});

/**
 * Closes the overlay by clearing the form and emitting a "close" event.
 */
const closeOverlay = () => {
clearForm();
emit("close");
};

/**
 * Clears all form fields by calling the `clear()` method on each field, if available.
 */
 const clearForm = () => {
  title.value?.clear();
  description.value?.clear();
  category.value?.clear();
  assignContacts.value?.clear();
  dueDate.value?.clear();
  prio.value?.clear();
  subtasks.value?.clear();
};

/**
 * Initializes the form fields based on the current mode.
 * In edit mode, this function populates the form with the current task's data
 * If not in edit mode, it resets the selected category by setting `selectedCategory` to null.
 */
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

/**
 * Updates the current subtasks data with the new subtasks array.
 *
 * @param {Array} newSubtasks - An array containing the new subtask data.
 */
const updateSubtasks = (newSubtasks) => {
subtasksData.value = newSubtasks;
};

/**
 * Validates the form by checking if the title, category, and due date fields pass their respective validations.
 *
 * @returns {boolean} Returns true if all validations pass; otherwise, returns false.
 */
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

/**
 * Handles the form submission by validating the form and creating a new task if the form is valid.
 *
 * This async function:
 * - Validates the form using `validateForm()`.
 * - If the form is valid, it calls `createTask()` to create a new task.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves once the form submission handling is complete.
 */
const handleSubmit = async () => {
  const isValid = validateForm();
  if (isValid) {
    createTask();
  }
}

/**
 * Creates a task object based on the form data.
 *
 * @returns {Object} A task object containing the form data.
 */
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

/**
 * Creates a new task by sending a POST request to the API.
 *
 * This async function:
 * - Calls `createTaskObject()` to create a task object based on the form data.
 * - Sends a POST request to the API to create a new task.
 * - If the request is successful, adds the new task to the tasks list.
 * - If the request is successful and the form is in edit mode, updates the existing task in the tasks list.
 * - If an error occurs, logs the error to the console.
 */
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

/**
 * Sends a POST request to create a new task.
 *
 * @param {Object} taskData - The task data to be sent in the request body.
 * @returns {Promise<Object|null>} A promise that resolves with the task data if the request is successful; otherwise, resolves with null.
 */
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

/**
 * Sends a PUT request to update an existing task.
 *
 * @param {Object} taskData - The task data to be sent in the request body.
 * @returns {Promise<Object|null>} A promise that resolves with the updated task data if the request is successful; otherwise, resolves with null.
 */
const updateTaskFetch = async (taskData) => {
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
.addtask-overlay{
  max-width: 100%;
}
.addtask-main-content {
  display: flex;
  max-width: 900px;
  flex-wrap: wrap;
  gap: 3rem;
}

.form-left,
.form-right {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.input-container {
  display: flex;
  flex-direction: column;
  

  label {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
}

.form-buttons {
  display: flex;
  align-self: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.addtask-headline{
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
  .addtask-main-content {
    justify-content: center;
  }
}

</style>
