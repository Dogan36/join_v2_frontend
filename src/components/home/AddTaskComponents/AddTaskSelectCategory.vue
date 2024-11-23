<template>
    <div @click="toggleSelectCategory" class="inputField dropDown"
    :class="{ 'input-error': error,}">
      <!-- Ausgewählte Kategorie anzeigen -->
      <div class="dropDownOption" v-if="selectedCategory">
        <div class="dropDownOptionContent">
          {{ selectedCategory.name }}
          <div class="colorCategoryButton" v-bind:style="{ backgroundColor: selectedCategory.color }"></div>
        </div>
        <img class="arrowIcon" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
      </div>
  
      <!-- Standardtext anzeigen, wenn keine Kategorie ausgewählt ist -->
      <div class="dropDownOption" v-if="!selectedCategory">
        <div class="dropDownOptionContent">Select Task Category</div>
        <img class="arrowIcon" src="@/assets/img/arrowIcon.svg" :style="selectingCategory ? 'rotate: 180deg' : 'rotate:0deg'" alt="Delete" />
      </div>
  
      <!-- "Neue Kategorie" Option -->
      <div class="dropDownOption" v-if="selectingCategory">
        <div @click="$emit('toggle')" class="dropDownOptionContent">New Category</div>
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
    <p class="error-message">{{ errorMessage }}</p>
  </template>
  

<script setup>

import { defineProps, computed } from 'vue';
import { ref } from 'vue';
const selectingCategory = ref(false);
const selectedCategory = ref(null);
const category = ref(null);
const emit = defineEmits(['toggle']);
const toggleSelectCategory = () => {
    selectingCategory.value = !selectingCategory.value
};

const props = defineProps({
  modelValue: String,
    error: Boolean,
    errorMessages: {
        type: Object,
        default: () => ({ requiredError: '' }),
    },
  });

 
  const errorMessage = computed(() => {
  return Object.values(props.errorMessages).find(msg => msg) || '';
});

const selectCategory = (category) => {
    selectedCategory.value = category;
   
};

const deleteCategory = (categoryId) => {
  // Entferne die Kategorie aus der Liste
  categories.value = categories.value.filter((category) => category.id !== categoryId);

  // Falls die gelöschte Kategorie die ausgewählte war, entferne die Auswahl
  if (selectedCategory.value?.id === categoryId) {
    selectedCategory.value = null;
  }
};

const categories = ref([
  { id: 1, name: 'Work', color: '#ff0000' },
  { id: 2, name: 'Personal', color: '#00ff00' },
  { id: 3, name: 'Fitness', color: '#0000ff' },
]);

</script>

<style>

</style>