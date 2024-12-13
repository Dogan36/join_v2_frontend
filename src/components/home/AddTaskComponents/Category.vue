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
        <div class="colorCategoryButton" v-bind:style="{ backgroundColor: selectedCategory.color }"></div>
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
          <div class="colorCategoryButton" v-bind:style="{ backgroundColor: category.color }"></div>
        </div>
        <img @click.stop="deleteCategory(category.id)"
        src="@/assets/img/delete.png"
        alt="Delete">
      </div>
    </div>        
  </div>
  <CategoryNew v-if="addingNewCategory" @toggle="toggleAddingNewCategory" @add="addNewCategory"></CategoryNew> 
  <p v-if="!addingNewCategory" class="error-message">{{ error }}</p> 
</template>
  
<script setup>

import { defineProps, computed } from 'vue';
import { ref } from 'vue';
import CategoryNew from './CategoryNew.vue';
const selectingCategory = ref(false);
const selectedCategory = ref(null);
const addingNewCategory = ref(false);
const error = ref('');


const emit = defineEmits(['toggle']);
const toggleSelectCategory = () => {
    selectingCategory.value = !selectingCategory.value
};



const selectCategory = (category) => {
    selectedCategory.value = category;
   
};

const addNewCategory = () => {
  // Add your logic here
};

const deleteCategory = (categoryId) => {
  // Entferne die Kategorie aus der Liste
  categories.value = categories.value.filter((category) => category.id !== categoryId);

  // Falls die gelöschte Kategorie die ausgewählte war, entferne die Auswahl
  if (selectedCategory.value?.id === categoryId) {
    selectedCategory.value = null;
  }
};

const toggleAddingNewCategory = () => {
  addingNewCategory.value = !addingNewCategory.value
};

const categories = ref([
  { id: 1, name: 'Work', color: '#ff0000' },
  { id: 2, name: 'Personal', color: '#00ff00' },
  { id: 3, name: 'Fitness', color: '#0000ff' },
]);

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