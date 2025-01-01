<template>
<div class="inputContainer">
  <label class="title">Category</label>
  <div v-if="!addingNewCategory" @click="toggleSelectCategory" class="inputField dropDown" :class="{ 'input-error': error}">
    <!-- Standardtext anzeigen, wenn keine Kategorie ausgewählt ist -->
    <div class="dropDownOption" v-if="!selectedCategory">
      <div class="dropDownOptionContent">Select Task Category</div>
      <img class="arrowIcon" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
    </div>

      <!-- Ausgewählte Kategorie anzeigen -->
    <div class="dropDownOption" v-if="selectedCategory">
      <div class="dropDownOptionContent">
        {{ selectedCategory.name }}
        <div class="colorCategoryButton" v-bind:style="{ backgroundColor: selectedCategory.color.code }"></div>
      </div>
      <img class="arrowIcon" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
    </div>
  
      <!-- "Neue Kategorie" Option -->
    <div @click="toggleAddingNewCategory" class="dropDownOption" v-if="selectingCategory">
      <div class="dropDownOptionContent">New Category</div>
    </div>
  
      <!-- Kategorien anzeigen, außer der ausgewählten -->
      <div
        v-for="category in categories"
        :key="category.id" 
        @click="selectCategory(category)"
        class="dropDownOption"
        v-if="selectingCategory"
        
      >
        <div class="dropDownOptionContent">
          {{ category.name }}
          <div class="colorCategoryButton" v-bind:style="{ backgroundColor: category.color.code }"></div>
        </div>
        <img @click.stop="deleteCategory(category.id)"
        src="@/assets/img/delete.png"
        alt="Delete">
      </div>
    </div>        
  </div>
  <CategoryNew :categories="categories" v-if="addingNewCategory" @toggle="toggleAddingNewCategory" @newCategory="addNewCategoryToList"></CategoryNew> 
  <p v-if="!addingNewCategory" class="error-message">{{ error }}</p> 
</template>
  
<script setup>


import { ref } from 'vue';
import CategoryNew from './CategoryNew.vue';
import { API_BASE_URL } from '@/config';
import { defineEmits, defineExpose, onMounted } from 'vue';
const selectingCategory = ref(false);
const selectedCategory = ref(null);
const addingNewCategory = ref(false);
const error = ref('');
const categories = ref([]);
// Fetch Categories from Backend
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'GET',
     
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    console.log(data);
    categories.value = data; // Kategorien ins Array speichern
  } catch (error) {
    console.error('Error fetching categories:', error.message);
  }
};

// Lade Kategorien, wenn die Komponente gemountet wird
onMounted(fetchCategories);

const setCategory = (category) => {
  selectedCategory.value = category;
};

const emit = defineEmits(['toggle']);
const toggleSelectCategory = () => {
    selectingCategory.value = !selectingCategory.value
};

const addNewCategoryToList = (createdCategory) => {
  categories.value.push(createdCategory); // Fügt die neue Kategorie inkl. ID hinzu
  selectedCategory.value = createdCategory; // Wählt die neue Kategorie aus
};

const selectCategory = (category) => {
    selectedCategory.value = category;
   
};

const deleteCategory = async (categoryId) => {
  try {
    // Sende die DELETE-Anfrage an das Backend
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }

    // Entferne die Kategorie aus der Liste nach erfolgreicher Löschung
    categories.value = categories.value.filter((category) => category.id !== categoryId);

    // Entferne die Auswahl, falls die gelöschte Kategorie ausgewählt war
    if (selectedCategory.value?.id === categoryId) {
      selectedCategory.value = null;
    }

    console.log(`Category with ID ${categoryId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting category:', error.message);
  }
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
  selectedCategory
});

</script>

<style>

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
    height: 30px;
    .arrowIcon {
      height: 8px;
    }
    :not(:first-child):hover {
      background-color: #f0f0f0;
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
}


.iconContainer {
  display: flex;
  gap: 0.5rem;
  img {
    cursor: pointer;
  }
}

.colorCategoryButton {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: red;
}


</style>