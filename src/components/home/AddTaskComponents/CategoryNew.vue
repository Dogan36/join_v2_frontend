<template>
  <div class="inputField" :class="{ 'input-error': error }">
    <input v-model="newCategoryName" placeholder="Enter new category"></input>
    <div :style="{ backgroundColor: newCategoryColor?.hex_value }" class="newCategoryColor"></div>
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
      :style="{ backgroundColor: color.hex_value }"
      @click="chooseColor(index)"
      class="colorCategoryButton colorCategoryButtonNew"
    ></div>
  </div>
  <p class="error-message">{{ error }}</p>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import blackXIcon from "@/assets/img/blackX.svg";
import blackCheckIcon from "@/assets/img/blackCheck.svg";
import { API_BASE_URL } from "@/config";
import { categories, getToken, currentWorkspace, selectedCategory } from '@/store/state';
import { useLoadingOverlay } from "@/composables/useLoadingOverlay";
import { useConfirmationOverlay } from "@/composables/useConfirmationOverlay";
const { showConfirmation } = useConfirmationOverlay();
const { showOverlay, hideOverlay } = useLoadingOverlay();
const colors = ref([]);
const error = ref("");
const newCategoryName = ref(null);
const newCategoryColor = ref(null);
const workspaceId = currentWorkspace.value.id;

const emit = defineEmits(["toggle"]);

const chooseColor = (index) => {
  newCategoryColor.value = colors.value[index];
};

const checkNewCategoryName = () => {
  if (!newCategoryName.value) {
    error.value = "Please enter a category name";
    return false;
  }
  return true;
};


const checkCatgeoriesLength = () => {
  if (categories.value.length === 20) {
    error.value = "Reached maximum number of categories";
    return false;
  }
  return true;
};

const checkCatgeoriesNameTaken = () => {
  if (categories.value.find(category => category.name === newCategoryName.value)) {
    error.value = "Category name already taken";
    return false;
  }
  return true;
};


const loadColors = async () => {
  console.log("fetchColors");
  try {
    const colorsData = await fetchColors();
    const usedColorIds = categories.value.map(category => category.color.id);
    const availableColors = colorsData.filter(color => !usedColorIds.includes(color.id));
    colors.value = availableColors.slice(0, 5);
    newCategoryColor.value = colors.value[0] || null;
  } catch (error) {
    console.error('Error fetching colors:', error.message);
  }
};

const fetchColors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/colors/colors`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch colors');
    const colorsData = await response.json();
    return colorsData;
  } catch (error) {
    console.error('Error fetching colors:', error.message);
  }
};
onMounted(loadColors);
const addNewCategoryToList = (createdCategory) => {
  categories.value.push(createdCategory); // Fügt die neue Kategorie inkl. ID hinzu
  selectedCategory.value = createdCategory; // Wählt die neue Kategorie aus
};
const addNewCategory = async () => {
  console.log(newCategoryColor.value.id)
  if (!checkNewCategoryName() || !checkCatgeoriesLength() || !checkCatgeoriesNameTaken()) {
    return;
  }
  const newCategory = {
    name: newCategoryName.value,
    color: newCategoryColor.value,
  }
  showOverlay();
  try {
    const response = await fetch(`${API_BASE_URL}/workspaces/workspaces/${workspaceId}/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`,
      },
      body: JSON.stringify(newCategory),
    });
    addNewCategoryToList(newCategory)
    showConfirmation('Category added successfully');
    if (!response.ok) throw new Error('Failed to add new category');
    const createdCategory = await response.json(); // Hole die vollständige Antwort inkl. ID
    emit("toggle"); // Schließe ggf. das Modal oder die Ansicht
  } catch (error) {
    console.error('Error adding new category:', error.message);
  }
  finally {
    hideOverlay();
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
