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
import { defineEmits, defineExpose} from 'vue';
import { categories, getToken, currentWorkspace, selectedCategory } from '@/store/state';
import { useConfirmationOverlay } from '@/composables/useConfirmationOverlay';
import { useLoadingOverlay } from '@/composables/useLoadingOverlay';
const { showConfirmation } = useConfirmationOverlay();
const { showOverlay, hideOverlay } = useLoadingOverlay();
const selectingCategory = ref(false);
const addingNewCategory = ref(false);

const workspaceId = currentWorkspace.value.id;
const error = ref('');
const token = getToken();


const setCategory = (categoryId) => {
  categories.value.forEach((category) => {
    if (category.id === categoryId) {
      selectedCategory.value = category;
    }
  });
};

const clear = () => {
  selectedCategory.value = null;
  error.value = '';
  selectingCategory.value = false;
};

const emit = defineEmits(['toggle']);
const toggleSelectCategory = () => {
    selectingCategory.value = !selectingCategory.value
};


const selectCategory = (category) => {
    selectedCategory.value = category;
   
};

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


const toggleAddingNewCategory = () => {
  addingNewCategory.value = !addingNewCategory.value
};



const validate = () => {
  if (!selectedCategory.value) {
    error.value = 'The category is required';
    return false; // ungültig
  } else {
    error.value = "";
    return true; // gültig
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