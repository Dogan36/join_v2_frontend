<template>
    <div class="board-task-detail">
        <div class="active-task-header">
            <div class="active-task-category" :style="{ background: category.color.hex_value }">
                <span :style="{color: getTextColor(category.color.hex_value)}">{{category.name}}</span>
            </div>
            <img @click="closeOverlay()" class="active-task-close-button" src="@/assets/img/blackX.svg" alt="">
        </div>
    <div class="active-task-title">{{title}}</div>
    <div class="active-task-description">{{description}}</div>
    <div class="active-task-duedate">
        <span class="actice-task-subheader">Due date:</span><span>{{dueDate}}</span>
    </div>
    <div class="active-task-priority">
        <span class="actice-task-subheader">Priority:</span>
        <div class="active-task-priority-button" :style="{ background: buttonColor }">
            <span>{{prio}}</span><img :src="buttonImg" alt=""></div>
    </div>
    <div class ="active-task-element">
    <span class="actice-task-subheader">Assigned To:</span>
    <div class="active-task-sssigned-to-container">
        <div v-for="contact in assignedTo" class="active-task-assigned-to">
            <div class="active-task-avatar" :style="{ background: contact.color.hex_value }">
                <span :style="{color: getTextColor(contact.color.hex_value)}">{{contact.avatar}}</span></div>
            <span>{{contact.name}}</span>
        </div>
    </div>
    </div>
    <div class ="active-task-element">
    <span class="actice-task-subheader">Subtasks:</span>
    <div class="active-task-subtasks-container">
        <div v-for="subtask in subtasks" class="active-task-subtasks">
            <span>{{subtask.name}}</span>
            <input @click="updateSubtask(subtask)" type="checkbox" :checked="subtask.is_completed">
        </div>
        <div v-if="subtasks.length === 0" class="subtasks-empty">No Subtasks assigned</div>
    </div>
    </div>
    <div class="active-task-change-container">
        <div class="active-task-buttons">
        <div @click="deleteTask" class="active-task-delete">
            <img src="@/assets/img/delete.svg" alt="Delete">
        </div>
        <div @click="editTask" class="active-task-edit">
            <img src="@/assets/img/editTaskPen.svg" alt="Edit">
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { categories } from '@/store/state';
import { Prioicons } from '@/utils/prioIcons';
import { members, tasks } from '@/store/state';
import useTextColor from '@/composables/useTextColor';
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
import { useConfirmationOverlay } from '@/composables/useConfirmationOverlay';
import { API_BASE_URL } from '@/config';
import { getToken, currentWorkspace } from '@/store/state';

// Get functions to handle UI states and overlays
const { showOverlay } = useLoadingOverlay();
const { showConfirmation } = useConfirmationOverlay();
const { getTextColor } = useTextColor();

// Define events for emitting changes
const emit = defineEmits(["close", "edit"]);

/**
 * @vue-method {Function} closeOverlay - Closes the current overlay and emits a "close" event.
 * 
 * This function emits the "close" event to signal the parent component to close the overlay.
 * 
 * @returns {void}
 */
const closeOverlay = () => {
    emit("close");
};

/**
 * @vue-prop {Object} task - The task object passed as a prop.
 * 
 * This object contains various details like the task's name, description, category, subtasks, etc.
 */
const props = defineProps({
    task: {
        type: Object
    }
});

// Computed properties for task details

/**
 * @vue-computed {string} title - The title of the task.
 * 
 * This computed property extracts the task's name from the `task` prop.
 */
const title = computed(() => props.task.name);

/**
 * @vue-computed {string} description - The description of the task.
 * 
 * This computed property extracts the task's description from the `task` prop.
 */
const description = computed(() => props.task.description);

/**
 * @vue-computed {Object} category - The category of the task.
 * 
 * This computed property finds the task's category from the `categories` array.
 * If no category is found, it returns a fallback category with the name 'Category Deleted'.
 */
const category = computed(() => {
    const cat = categories.value.find(category => category.id === props.task.category);
    if (!cat) {
        return { name: 'Category Deleted', color: { hex_value: '#FFFF00'} }; // fallback value
    }
    return cat;
});

/**
 * @vue-computed {Array} assignedTo - The list of users assigned to the task.
 * 
 * This computed property filters the `members` array to find users assigned to the task.
 */
const assignedTo = computed(() => {
    return members.value.filter(member => props.task.selected_contacts.includes(member.id));
});

/**
 * @vue-computed {string} dueDate - The due date of the task.
 * 
 * This computed property extracts the task's due date from the `task` prop.
 */
const dueDate = computed(() => props.task.due_date);

/**
 * @vue-computed {Array} subtasks - The list of subtasks associated with the task.
 * 
 * This computed property extracts the subtasks from the `task.subtasks`.
 */
const subtasks = computed(() => props.task.subtasks);

/**
 * @vue-computed {string} prio - The priority of the task.
 * 
 * This computed property extracts the priority level of the task from the `task.prio` field.
 */
const prio = computed(() => props.task.prio);

/**
 * @vue-computed {string} status - The status of the task.
 * 
 * This computed property extracts the status of the task from the `task.prio` field.
 */
const status = computed(() => props.task.status);

/**
 * @vue-computed {string} buttonImg - The image for the priority button.
 * 
 * This computed property returns the appropriate priority icon based on the task's priority.
 */
const buttonImg = computed(() => {
  if (prio.value === 'high') {
    return Prioicons.urgentWhite;
  } else if (prio.value === 'medium') {
    return Prioicons.mediumWhite; // Adjust the key if it's 'mediumWhite'
  } else if (prio.value === 'low') {
    return Prioicons.lowWhite;
  }
  return ''; // Return a default or empty string if no match
});

/**
 * @vue-computed {string} buttonColor - The color of the priority button.
 * 
 * This computed property returns a color code based on the task's priority.
 */
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

/**
 * @vue-method {Function} updateSubtask - Updates the completion status of a given subtask.
 * 
 * This async function sends a PATCH request to the server to update the subtask's completion status.
 * Upon a successful request, it toggles the `is_completed` field for the subtask.
 *
 * @async
 * @param {Object} subtask - The subtask object to update.
 * @param {number|string} subtask.id - The unique identifier of the subtask.
 * @param {boolean} subtask.is_completed - The current completion status of the subtask.
 * @returns {Promise<void>} A promise that resolves when the update operation is complete.
 */
const updateSubtask = async (subtask) => {
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

/**
 * @vue-method {Function} deleteTask - Deletes a task from the current workspace.
 * 
 * This async function:
 * 1. Displays an overlay to indicate that the process has started.
 * 2. Sends a DELETE request to the API to remove the task.
 * 3. Updates the local tasks list.
 * 4. Displays a confirmation message upon successful deletion.
 * 5. Closes the overlay.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the task deletion is complete.
 */
const deleteTask = async () => {
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

/**
 * @vue-method {Function} editTask - Initiates the task editing process.
 * 
 * This function emits an 'edit' event to signal the parent component that the task should be edited.
 * It also closes the current overlay.
 */
const editTask = () => {
    closeOverlay();
    emit('edit');
};
</script>


<style scoped>
.board-task-detail {
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

.active-task-subtasks-container::-webkit-scrollbar-track,
.active-task-assigned-to-container::-webkit-scrollbar-track{
  margin-block: 0px;
}

.active-task-header{
    display: flex;
    justify-content: space-between;
}

.active-task-category {
    display: flex;
    flex-direction: row;
    align-items: center;
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

.active-task-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 1px;
    max-width: 100%;
    font-weight: 700;
    font-size: 3rem;
    line-height: 3rem;
    color: var(--defaultDark);
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
}

.active-task-description {
    max-width: 100%;
    font-size: 2rem;
    line-height:2rem;
    color: #000000;
    overflow-wrap: anywhere;
    white-space: normal;
}

.active-task-duedate {
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

.active-task-element{
    gap: 1rem;
}

.actice-task-subheader{
    font-weight: 700;
    font-size: 2.1rem;
}

.active-task-priority {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 2.5rem;
    max-width: 100%;
    height: 3.3rem;
}

.active-task-priority-button {
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

.active-task-assigned-to-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-width: 100%;
    min-height: 8rem;
    max-height: 13rem;   
}

.active-task-assigned-to {
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

.active-task-avatar {
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

.active-task-subtasks {
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

.active-task-assigned-to span,
.active-task-subtasks span {
    font-size: 2.1rem;
    color: #000000;
}

.active-task-subtasks-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-width: 100%;
    min-height: 8rem;
    max-height: 13rem;
}

.active-task-buttons {
    cursor: pointer !important;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    justify-content: flex-end;
    justify-self: flex-end;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}


.active-task-delete {
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

.active-task-edit {
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

.active-task-close-button {
    position: absolute;
    right: 3.5rem;
    top: 3.5rem;
    cursor: pointer;
}

.subtasks-empty{
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

