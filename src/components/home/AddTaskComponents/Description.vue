<template>

<div class="inputContainer">
    <label class="title">Description</label>
    <div class="inputField">
           <input type="text" placeholder="Enter description">
    </div>
    <p class="error-message">{{ errorMessage }}</p>
</div>
        
</template>

<script setup>
import { ref } from 'vue';
import InputField from '@/components/shared/InputField.vue';
const description = ref('');
const errorMessage = ref('');


defineExpose({
    description,
});
</script>