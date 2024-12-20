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
          <Subtasks ref="subtasks" />
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
import { ref, onMounted } from "vue";

import Title from "./Title.vue";
import Description from "./Description.vue";
import Category from "./Category.vue";
import AssignContacts from "./AssignContacts.vue";
import DueDate from "./DueDate.vue";
import PrioButtons from "./PrioButtons.vue";
import Subtasks from "./Subtasks.vue";

const props = defineProps({
  task: {
    type: Object,
    default: null, // Kein Task übergeben -> Add-Modus
  },
});

defineEmits(["close"]);

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
    title.value?.setTitle(props.task.title || "");
    description.value?.setDescription(props.task.description || "");
 

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

const Task = ref({
  title: "",
  description: "",
  category: "",
  selectedContacts: [],
  dueDate: "",
  prio: "",
  subtasksId: "",
});

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
  if (!isValid) {
    return;
  }

  try {
    // Subtasks Array erstellen (falls vorhanden)
    let subtaskArrayId = await createSubtaskArrayIfExists();

    // Task-Objekt mit Subtask-Array-ID erstellen
    Task.value = createTaskObject(subtaskArrayId);
    console.log("Task object:", Task.value);
    // Task an das Backend senden (z.B. via fetch)
    const taskResponse = await createTask(Task.value);
    if (taskResponse && taskResponse.id) {
      console.log("Task created successfully:", taskResponse);
    } else {
      console.log("Task creation failed");
    }
  } catch (error) {
    console.log("Error during submission:", error);
  }
};

const createSubtaskArrayIfExists = async () => {
  console.log("createSubtaskArrayIfExists");
  const subtaskArray = subtasks.value.getSubtasks();
  console.log(subtaskArray);
  if (subtaskArray && subtaskArray.length > 0) {
    console.log(subtaskArray);
    const subtaskArrayData = subtaskArray.map((subtask) => ({
      text: subtask.text || "", // Optional: Text des Subtasks
      completed: subtask.completed || false, // Standardmäßig nicht abgeschlossen
    }));

    const subtaskArrayResponse = await createSubtaskArray(subtaskArrayData);
    if (subtaskArrayResponse && subtaskArrayResponse.id) {
      return subtaskArrayResponse.id; // Subtask-Array ID zurückgeben
    }
  }
  return null;
};
const createSubtaskArray = async (subtaskArrayData) => {
  try {
    const response = await fetch("/api/subtasks/array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subtasks: subtaskArrayData }),
    });

    if (!response.ok) {
      throw new Error("Failed to create subtask array");
    }

    const data = await response.json();
    return data; // Antwort mit Subtask-Array-Daten (z. B. ID)
  } catch (error) {
    console.error("Error creating subtask array:", error);
    return null;
  }
};

const createTaskObject = () => {
  return {
    title: title.value?.title || "", // Required
    description: description.value?.description || "", // Optional
    category: category.value?.selectedCategory || "", // Required
    selectedContacts: assignContacts.value?.selectedContacts || [], // Optional
    dueDate: dueDate.value?.dueDate || "", // Required
    prio: prio.value?.currentPrio || "", // Optional
    subtaskArrayId: subtaskArrayId || null, // Optional
  };
};

const createTask = async (taskData) => {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
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
