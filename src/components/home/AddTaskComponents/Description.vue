<template>

<div class="inputContainer">
    <label class="title">Description</label>
    <div class="inputField">
           <textarea  type="text" placeholder="Enter description"></textarea>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
</div>
        
</template>

<script setup>
import { ref } from 'vue';
const description = ref('');
const errorMessage = ref('');


defineExpose({
    description,
});
</script>

<style scoped>
.inputField{
    height: unset;
    overflow-y: auto;
    max-width: 100%;
}
</style>