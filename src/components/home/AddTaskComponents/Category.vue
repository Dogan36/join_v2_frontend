<template>
<div class="input-container">
  <label class="title">Category</label>
  <div v-if="!addingNewCategory" @click="toggleSelectCategory" class="inputfield dropdown" :class="{ 'input-error': error}">
    <!-- Standardtext anzeigen, wenn keine Kategorie ausgewählt ist -->
    <div class="dropdown-option" v-if="!selectedCategory">
      <div class="dropdown-option-content">Select Task Category</div>
      <img class="arrow-icon-dropdown" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
    </div>

      <!-- Ausgewählte Kategorie anzeigen -->
    <div class="dropdown-option" v-if="selectedCategory">
      <div class="dropdown-option-content">
        {{ selectedCategory.name }}
        <div class="color-category-button" v-bind:style="{ backgroundColor: selectedCategory.color.hex_value }"></div>
      </div>
      <img class="arrow-icon-dropdown" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
    </div>
  
      <!-- "Neue Kategorie" Option -->
    <div @click="toggleAddingNewCategory" class="dropdown-option" v-if="selectingCategory">
      <div class="dropdown-option-content">New Category</div>
    </div>
  
      <!-- Kategorien anzeigen, außer der ausgewählten -->
      <div
        v-for="category in categories"
        :key="category.id" 
        @click="selectCategory(category)"
        class="dropdown-option"
        v-if="selectingCategory"
        
      >
        <div class="dropdown-option-content">
          {{ category.name }}
          <div class="color-category-button" v-bind:style="{ backgroundColor: category.color.hex_value }"></div>
        </div>
        <img @click.stop="deleteCategory(category.id)"
        src="@/assets/img/delete.png"
        alt="Delete">
      </div>
    </div>        
  </div>
  <CategoryNew v-if="addingNewCategory" @toggle="toggleAddingNewCategory"></CategoryNew> 
  <p v-if="!addingNewCategory" class="error-message">{{ error }}</p> 
</template>
  
<script setup>
import { ref } from 'vue';
import CategoryNew from './CategoryNew.vue';
import { API_BASE_URL } from '@/config';
import { defineEmits, defineExpose } from 'vue';
import { categories, getToken, currentWorkspace, selectedCategory } from '@/store/state';
import { useConfirmationOverlay } from '@/composables/useConfirmationOverlay';
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';

const { showConfirmation } = useConfirmationOverlay();
const { showOverlay, hideOverlay } = useLoadingOverlay();

const selectingCategory = ref(false); // Indicates whether the category selection is active
const addingNewCategory = ref(false); // Indicates whether a new category is being added

const workspaceId = currentWorkspace.value.id;
const error = ref(''); // Holds error message related to category selection
const token = getToken();

/**
 * @vue-method {Function} setCategory - Sets the selected category based on the provided category ID.
 * 
 * This function iterates through the list of categories and, if a category with a matching ID is found,
 * assigns it to `selectedCategory.value`.
 * 
 * @param {number} categoryId - The ID of the category to select.
 */
const setCategory = (categoryId) => {
  categories.value.forEach((category) => {
    if (category.id === categoryId) {
      selectedCategory.value = category;
    }
  });
};

/**
 * @vue-method {Function} clear - Clears the selected category and resets the related error and selection state.
 * 
 * This function:
 * - Sets the selected category to null.
 * - Clears any error messages.
 * - Sets `selectingCategory` to false to indicate that category selection is no longer active.
 */
const clear = () => {
  selectedCategory.value = null;
  error.value = '';
  selectingCategory.value = false;
};

const emit = defineEmits(['toggle']);

/**
 * @vue-method {Function} toggleSelectCategory - Toggles the category selection mode.
 * 
 * If category selection is active, it deactivates it; otherwise, it activates it.
 */
 const toggleSelectCategory = () => {
  selectingCategory.value = !selectingCategory.value;
};

/**
 * @vue-method {Function} selectCategory - Sets the selected category.
 *
 * @param {Object} category - The category object to be selected.
 */
const selectCategory = (category) => {
    selectedCategory.value = category;
};

/**
 * @vue-method {Function} deleteCategory - Deletes a category from the current workspace.
 * 
 * This async function sends a DELETE request to the API to remove the specified category.
 * Upon successful deletion:
 * - Filters the deleted category out of the `categories` array.
 * - If the deleted category was selected, it resets `selectedCategory` to null.
 * - Displays a confirmation message.
 * 
 * In case of an error, it logs the error message to the console.
 *
 * @async
 * @param {string|number} categoryId - The ID of the category to delete.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
const deleteCategory = async (categoryId) => {
  showOverlay();
  try {
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/categories/${categoryId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    categories.value = categories.value.filter((category) => category.id !== categoryId);
    if (selectedCategory.value?.id === categoryId) {
      selectedCategory.value = null;
    }
    showConfirmation('Category deleted successfully');
  } catch (error) {
    console.error('Error deleting category:', error.message);
  }
  hideOverlay();
};

/**
 * @vue-method {Function} toggleAddingNewCategory - Toggles the state for adding a new category.
 * 
 * If adding a new category is currently enabled, it will disable it, and vice versa.
 */
const toggleAddingNewCategory = () => {
  addingNewCategory.value = !addingNewCategory.value
};

/**
 * @vue-method {Function} validate - Validates the category selection.
 * 
 * This function checks if a category is selected. If no category is selected, it sets an error message
 * and returns false indicating an invalid state. Otherwise, it clears any error message and returns true.
 *
 * @returns {boolean} Returns true if a category is selected, otherwise false.
 */
const validate = () => {
  if (!selectedCategory.value) {
    error.value = 'The category is required';
    return false; // invalid
  } else {
    error.value = "";
    return true; // valid
  }
};

defineExpose({
  setCategory,
  validate,
  selectedCategory,
  clear
});
</script>


<style>

.dropdown {
  display: flex;
  flex-direction: column;
  align-items: start;
  height: auto;
  font-size: 1.6rem;
  /* Schriftgröße des Platzhalters */
  line-height: 1.6rem;
  padding: 0;

  .dropdown-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 2.1rem;
    height: 30px;
    .arrow-icon-dropdown {
      height: 8px;
    }
    :not(:first-child):hover {
      background-color: #f0f0f0;
    }

    .dropdown-option-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 100%;
      font-size: 1.6rem;
    }

    img {
      cursor: pointer;
      height: 20px;
    }
  }

  .dropdown-option:not(:first-child):hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
}


.icon-container {
  display: flex;
  gap: 0.5rem;
  img {
    cursor: pointer;
  }
}

.color-category-button {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: red;
}


</style>