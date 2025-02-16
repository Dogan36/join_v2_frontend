<template>

<div class="input-container">
          <label class="title">Prio</label>
        
    <div class="prio-buttons">
        <div class="prio-button" 
        :style="currentPrio === 'high' ? { backgroundColor: '#ff3c00', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }" 
        @click="updatePrio('high')">
            <span>Urgent</span>
            <img
                :src="currentPrio === 'high' ? 
                Prioicons.urgentWhite:  
                Prioicons.urgent"
                alt="" />
        </div>

        <div class="prio-button"
        :style="currentPrio === 'medium' ? { backgroundColor: '#ffa800', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }"
        @click="updatePrio('medium')">
            <span>Medium</span>
            <img
                :src="currentPrio === 'medium' ? 
                Prioicons.mediumWhite:  
                Prioicons.medium"
                alt="" />
        </div>

        <div class="prio-button"
        :style="currentPrio === 'low' ? { backgroundColor: '#7ae229', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }"
        @click="updatePrio('low')">
            <span>Low</span>
            <img
            :src="currentPrio === 'low' ? 
                Prioicons.lowWhite:  
                Prioicons.low"
                alt="" />
        </div>
    </div>
    </div>
    <p class="error-message"></p>
</template>

<style scoped>
.prio-buttons{
    display: flex;
    gap: 10px;
    margin-top: 5px;
    flex-wrap: wrap;
}

.prio-button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0px 2rem;
    height: 4rem;
    gap: 10px;
    font-size: 21px;
    cursor: pointer;
    span{
        font-size: 21px;
    }
    img{
        width: 20px;
    }
}
</style>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import { ref } from 'vue';
import Prioicons from '@/utils/prioIcons';

// Emit event to update the model value
/**
 * @vue-method {Function} updatePrio - Updates the current priority value and emits an update event.
 * 
 * This function sets the new priority value and emits an update event to notify the parent component.
 * 
 * @param {string} newPrio - The new priority value to set.
 */
const emit = defineEmits(['update:modelValue']);

// Define the component's props
/**
 * @vue-prop {string} modelValue - The initial priority value. Defaults to 'medium'.
 */
const props = defineProps({
    modelValue: {
        type: String,
        default: 'medium'
    }
});

// Debugging to ensure the default value is correct
/**
 * @vue-data {string} currentPrio - The current priority value.
 * 
 * This data property holds the current priority value, which can be updated.
 */
const currentPrio = ref(props.modelValue || 'medium');

/**
 * @vue-method {Function} clear - Resets the current priority value to 'medium'.
 * 
 * This function resets the `currentPrio` to the default value 'medium'.
 */
const clear = () => {
    currentPrio.value = 'medium';
};

/**
 * @vue-method {Function} updatePrio - Updates the current priority value and emits an update event.
 * 
 * This function updates the priority and emits the new value.
 *
 * @param {string} newPrio - The new priority value to set.
 */
function updatePrio(newPrio) {
  currentPrio.value = newPrio;
  emit('update:modelValue', newPrio);
}

// Expose methods and data
defineExpose({
    currentPrio,
    updatePrio,
    clear
});
</script>

