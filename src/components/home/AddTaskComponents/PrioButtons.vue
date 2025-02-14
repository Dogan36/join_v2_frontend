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
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        default: 'medium'
    }
});

// Debugging hinzufügen, um sicherzustellen, dass der Standardwert korrekt ist
const currentPrio = ref(props.modelValue || 'medium');


/**
 * Resets the current priority value to 'medium'.
 */
 const clear = () => {
    currentPrio.value = 'medium';
};

/**
 * Updates the current priority value and emits an update event.
 *
 * @param {string} newPrio - The new priority value to set.
 */
 function updatePrio(newPrio) {
  currentPrio.value = newPrio;
  emit('update:modelValue', newPrio);
}

defineExpose({
    currentPrio,
    updatePrio,
    clear
});
</script>
