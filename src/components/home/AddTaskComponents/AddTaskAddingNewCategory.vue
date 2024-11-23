<template>
<div class="inputField" :class="{ 'input-error': error }">
    <input type="text" name="" id="" placeholder="Enter new category" maxlength="20">
    <div class="iconContainer">
        <img @click="$emit('toggle')" src="@/assets/img/blackX.svg" alt="">
        <div class="graySeperator"></div>
        <img @click="$emit('add')" src="@/assets/img/blackCheck.svg" alt="">
    </div>

</div>
<p class="error-message">{{ errorMessage }}</p>
<div id="selectContainer0" class="selectContainer">
</div>
<div id="newCategoryContainer0" class="newCategoryContainer d-none">
    <div class="inputAndColorButtonContainer">
        <div class></div>
    </div>
    <div class="imgContainer">
        <img class="xOrHook" onclick="closeAddTaskNewCategory()" src="./assets/img/blackX.svg" alt="" />
        <div class="dashContainer">
            <span class="dash"></span>
        </div>
        <img onclick="checkNewCategoryName()" class="xOrHook" src="./assets/img/blackCheck.svg" alt="" />
    </div>
</div>
<div id="colorContainer0" class="colorContainer d-none">
    <div id="colorButton0" class="purple color wheel" onclick="colorButton(0, 0)"></div>
    <div class="red color wheel" onclick="colorButton(1, 0)"></div>
    <div class="green color wheel" onclick="colorButton(2, 0)"></div>
    <div class="yellow color wheel" onclick="colorButton(3, 0)"></div>
    <div class="pink color wheel" onclick="colorButton(4, 0)"></div>
    <div class="blue color wheel" onclick="colorButton(5, 0)"></div>
</div>
<p id="requiredCategory" class="required hidden">
    This field is required
</p>

</template>

<script setup>
import { ref } from 'vue';
const errorMessage = ref('');
const error = ref(false);
const emit = defineEmits(['toggle', 'add']);
</script>

<style scoped>
.iconContainer{
   display: flex;
    gap: 0.5rem;
    img{
      cursor: pointer;
    }
}
</style>