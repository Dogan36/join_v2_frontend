<template>
    <div class="inputContainer">
      <div class="inputFieldContainer">
        <div class="inputFieldWithImg">
          <input
            :type="type"
            v-model="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', modelValue)"
            class="loginInput"
            required
          />
          <img :src="icon" alt="" />
        </div>
        <span v-if="errorMessage" class="loginErrorMessage">{{ errorMessage }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    icon: String,
    errorMessage: String,
  });
  
  const emits = defineEmits(['update:modelValue']);
  </script>
  <style scoped>
  .inputContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 422px;
}

.inputFieldContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 2px;
    width: 100%;
    height: 8.1vh;
    max-height: 50px;
}

.inputFieldWithImg {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 1.269vh 1.4583vw;
    gap: 0.9765625vh;
    width: 100%;
    height: 5.98vh;
    background: #FFFFFF;
    border: 1px solid #D1D1D1;
    border-radius: 10px;
}
  