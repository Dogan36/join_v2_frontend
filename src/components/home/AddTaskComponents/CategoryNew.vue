<template>
  <div class="inputfield" :class="{ 'input-error': error }">
    <input v-model="newCategoryName" placeholder="Enter new category" maxlength="25"></input>
    <div :style="{ backgroundColor: newCategoryColor?.hex_value }" class="new-category-color"></div>
    <div class="icon-container">
      <img @click="emit('toggle')" :src="blackXIcon" alt="" />
      <div class="gray-seperator"></div>
      <img @click="addNewCategory" :src="blackCheckIcon" alt="" />
    </div>
  </div>
  
  <div id="colorContainer" class="color-container">
    <div
      v-for="(color, index) in colors.slice(0, 5)"
      :key="index"
      :style="{ backgroundColor: color.hex_value }"
      @click="chooseColor(index)"
      class="color-category-button color-category-button-new"
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

const colors = ref([]); // Holds the available colors for the new category
const error = ref(""); // Holds any error messages related to category creation
const newCategoryName = ref(null); // Holds the name of the new category
const newCategoryColor = ref(null); // Holds the color of the new category
const workspaceId = currentWorkspace.value.id;

const emit = defineEmits(["toggle"]);

/**
 * @vue-method {Function} chooseColor - Selects a color for the new category based on the provided index.
 * 
 * @param {number} index - The index of the desired color in the colors array.
 */
const chooseColor = (index) => {
  newCategoryColor.value = colors.value[index];
};

/**
 * @vue-method {Function} checkNewCategoryName - Checks if a new category name has been provided.
 * 
 * If no name is entered, it sets an error message and returns false, indicating that the new category name is invalid.
 * 
 * @returns {boolean} Returns true if a new category name is provided, otherwise false.
 */
const checkNewCategoryName = () => {
  if (!newCategoryName.value) {
    error.value = "Please enter a category name";
    return false;
  }
  return true;
};

/**
 * @vue-method {Function} checkCatgeoriesLength - Checks if the maximum number of categories has been reached.
 * 
 * If the number of categories is exactly 20, it sets an error message and returns false, indicating no more categories can be added.
 * 
 * @returns {boolean} Returns true if fewer than 20 categories exist, otherwise false.
 */
const checkCatgeoriesLength = () => {
  if (categories.value.length === 20) {
    error.value = "Reached maximum number of categories";
    return false;
  }
  return true;
};

/**
 * @vue-method {Function} checkCatgeoriesNameTaken - Checks if the new category name is already taken.
 * 
 * Iterates through the existing categories to determine if any category already has the name provided in `newCategoryName.value`.
 * If a matching category is found, it sets an error message and returns false, indicating the name is already in use.
 * 
 * @returns {boolean} Returns true if the new category name is unique, otherwise false.
 */
const checkCatgeoriesNameTaken = () => {
  if (categories.value.find(category => category.name === newCategoryName.value)) {
    error.value = "Category name already taken";
    return false;
  }
  return true;
};

/**
 * @vue-method {Function} loadColors - Loads available colors from an API and sets them for a new category.
 * 
 * This async function:
 * 1. Fetches the colors data using `fetchColors()`.
 * 2. Determines which colors are already in use by mapping the `color.id` from the current categories.
 * 3. Filters out the colors that are already used.
 * 4. Randomly shuffles the available colors.
 * 5. Selects up to 5 colors from the shuffled list and updates the `colors` value.
 * 6. Sets the first color in the list as the default new category color, or `null` if no color is available.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when the colors have been loaded.
 */
const loadColors = async () => {
  try {
    const colorsData = await fetchColors();
    const usedColorIds = categories.value.map(category => category.color.id);
    const availableColors = colorsData.filter(color => !usedColorIds.includes(color.id));
    const shuffledColors = availableColors.sort(() => Math.random() - 0.5);
    colors.value = shuffledColors.slice(0, 5);
    newCategoryColor.value = colors.value[0] || null;
  } catch (error) {
    console.error('Error fetching colors:', error.message);
  }
};

/**
 * @vue-method {Function} fetchColors - Fetches the list of colors from the API.
 * 
 * This async function sends a GET request to the colors endpoint and returns the parsed JSON data.
 * If the response is not OK, it throws an error.
 * 
 * @async
 * @returns {Promise<Object[]|undefined>} A promise that resolves to an array of color objects, or undefined if an error occurs.
 */
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

/**
 * @vue-method {Function} addNewCategoryToList - Adds a newly created category to the categories list and selects it.
 * 
 * This function takes the newly created category object (which should include its ID)
 * and appends it to the existing list of categories. It then sets this new category as the currently selected category.
 * 
 * @param {Object} createdCategory - The new category object, including its unique ID.
 */
const addNewCategoryToList = (createdCategory) => {
  categories.value.push(createdCategory); // Adds the new category including its ID
  selectedCategory.value = createdCategory;
};

/**
 * @vue-method {Function} addNewCategory - Adds a new category after performing necessary validations.
 * 
 * This async function:
 * 1. Validates the new category name, checks that the maximum number of categories hasn't been reached,
 *    and ensures the category name is unique.
 * 2. If validations pass, it creates a new category object with the provided name and selected color.
 * 3. Displays an overlay while the new category is being added.
 * 4. Sends a POST request to the API to create the new category.
 * 5. On successful creation, it shows a confirmation message, adds the new category to the local list, and emits a "toggle" event.
 * 6. If an error occurs, it logs the error message.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
const addNewCategory = async () => {
  if (!checkNewCategoryName() || !checkCatgeoriesLength() || !checkCatgeoriesNameTaken()) {
    return;
  }

  const newCategory = {
    name: newCategoryName.value,
    color: newCategoryColor.value,
  };

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
    showConfirmation('Category added successfully');
    if (!response.ok) throw new Error('Failed to add new category');
    const createdCategory = await response.json();
    addNewCategoryToList(createdCategory);
    emit("toggle"); // Closes the modal or view if necessary
  } catch (error) {
    console.error('Error adding new category:', error.message);
  }
  finally {
    hideOverlay();
  }
};
</script>


<style scoped>
.icon-container {
  display: flex;
  gap: 0.5rem;
  img {
    cursor: pointer;
  }
}

.color-container {
  display: flex;
  .color-category-button-new {
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

.new-category-color {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 1px solid black;
  margin-right: 1rem;
}
</style>
