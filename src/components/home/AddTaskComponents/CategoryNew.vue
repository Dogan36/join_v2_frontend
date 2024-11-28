<template>
  <div class="inputField">
    <input placeholder="Enter new category"></input>
    <div class="iconContainer">
      <img @click="closeAddTaskNewCategory" :src="blackXIcon" alt="" />
      <div class="graySeperator"></div>
      <img @click="checkNewCategoryName" :src="blackCheckIcon" alt="" />
    </div>
  </div>
  
  <div id="colorContainer" class="colorContainer">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ backgroundColor: color }"
      @click="colorButton(index, 0)"
      class="colorCategoryButton colorCategoryButtonNew"
    ></div>
  </div>
  <p class="error-message">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from "vue";
import blackXIcon from "@/assets/img/blackX.svg";
import blackCheckIcon from "@/assets/img/blackCheck.svg";

const CategoryNew = ref("");
const errorMessage = ref("");
const error = ref(false);
import { defineEmits, defineComponent } from "vue";

const emit = defineEmits(["toggle", "add"]);
const add = () => {
  emit("add");
};

const toggle = () => {
  emit("toggle");
};
const closeAddTaskNewCategory = () => {
  emit("toggle");
};

const checkNewCategoryName = () => {
  // Add your logic here
};

const colorButton = (colorIndex, buttonIndex) => {
  // Add your logic here
};

const colors = ["purple", "red", "green", "yellow", "pink", "blue"];
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
    &:hover {
      border: 2px solid white;
      box-shadow: silver 4px 3px 6px;
      cursor: pointer;
      transform: scale(1.8);
    }
  }
}
</style>
