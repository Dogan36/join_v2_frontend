<template>
  <div class="inputField">
    <input v-model="newCategoryName" placeholder="Enter new category"></input>
    <div :style="{ backgroundColor: newCategoryColor?.code }" class="newCategoryColor"></div>
    <div class="iconContainer">
      <img @click="closeAddTaskNewCategory" :src="blackXIcon" alt="" />
      <div class="graySeperator"></div>
      <img @click="addNewCategory" :src="blackCheckIcon" alt="" />
    </div>
  </div>
  
  <div id="colorContainer" class="colorContainer">
    <div
      v-for="(color, index) in colors.slice(0, 5)"
      :key="index"
      :style="{ backgroundColor: color.code }"
      @click="chooseColor(index)"
      class="colorCategoryButton colorCategoryButtonNew"
    ></div>
  </div>
  <p class="error-message">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps } from "vue";
import blackXIcon from "@/assets/img/blackX.svg";
import blackCheckIcon from "@/assets/img/blackCheck.svg";
import { API_BASE_URL } from "@/config";

const colors = ref([]);

const newCategoryName = ref(null);
const newCategoryColor = ref(null);

const categoriesData = ref([]);
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
const errorMessage = ref("");

const emit = defineEmits(["toggle", "newCategory"]);

const chooseColor = (index) => {
  newCategoryColor.value = colors.value[index];
  
};

const checkNewCategoryName = () => {
  if (!newCategoryName.value) {
    errorMessage.value = "Please enter a category name";
    return false;
  }
  return true;
};

const checkCatgeoriesLength = () => {
  console.log(categoriesData.value.length);
  if (categoriesData.value.length === 20) {
    errorMessage.value = "Reached maximum number of categories";
    return false;
  }
  return true;
};

const fetchColors = async () => {
  try {
    // Alle Farben und Kategorien abrufen
    const [colorsResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/colors`, { method: 'GET' }),
      
    ]);

    if (!colorsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const colorsData = await colorsResponse.json();
    
    

    // IDs der genutzten Farben extrahieren
    const usedColorIds = props.categories.map(category => category.color.id);

    // Unbenutzte Farben filtern
    const availableColors = colorsData.filter(color => !usedColorIds.includes(color.id));

    // Die ersten 5 unbenutzten Farben auswählen
    colors.value = availableColors.slice(0, 5);
    newCategoryColor.value = colors.value[0] || null;
  } catch (error) {
    console.error('Error fetching colors:', error.message);
  }
};
onMounted(fetchColors);

const addNewCategory = async () => {
  if(!checkNewCategoryName() || !checkCatgeoriesLength()) {
    return;
  }
  const newCategory = {
    name: newCategoryName.value,
    color: newCategoryColor.value}
  try {
    console.log(JSON.stringify(newCategory))
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
   
    if (!response.ok) throw new Error('Failed to add new category');
    const createdCategory = await response.json(); // Hole die vollständige Antwort inkl. ID
      emit("newCategory", createdCategory); // Emitte die vollständige Kategorie
      emit("toggle"); // Schließe ggf. das Modal oder die Ansicht
  } catch (error) {
    console.error('Error adding new category:', error.message);
  }
}


</script>

<style scoped>
.iconContainer {
  display: flex;
  gap: 0.5rem;
  img {
    cursor: pointer;
  }
}

.colorContainer {
  display: flex;
  .colorCategoryButtonNew {
    margin: 1rem;
    cursor: pointer;
    border: 1px solid black;
    &:hover {
      border: 2px solid white;
      box-shadow: silver 4px 3px 6px;
      cursor: pointer;
      transform: scale(1.8);
    }
  }
}

.newCategoryColor {
  width: 12px;
    height: 12px;
    border-radius: 100%;
    border: 1px solid black;
}
</style>
