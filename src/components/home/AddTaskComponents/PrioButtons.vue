<template>

<div class="inputContainer">
          <label class="title">Prio</label>
        
    <div class="prioButtons">
        <div class="prioButton" 
        :style="currentPrio === 'High' ? { backgroundColor: '#ff3c00', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }" 
        @click="updatePrio('High')">
            <span>Urgent</span>
            <img
                :src="currentPrio === 'High' ? 
                Prioicons.urgentWhite:  
                Prioicons.urgent"
                alt="" />
        </div>

        <div class="prioButton"
        :style="currentPrio === 'Medium' ? { backgroundColor: '#ffa800', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }"
        @click="updatePrio('Medium')">
            <span>Medium</span>
            <img
                :src="currentPrio === 'Medium' ? 
                Prioicons.mediumWhite:  
                Prioicons.medium"
                alt="" />
        </div>

        <div class="prioButton"
        :style="currentPrio === 'Low' ? { backgroundColor: '#7ae229', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }"
        @click="updatePrio('Low')">
            <span>Low</span>
            <img
            :src="currentPrio === 'Low' ? 
                Prioicons.lowWhite:  
                Prioicons.low"
                alt="" />
        </div>
    </div>
    
        </div>
    <p class="error-message"></p>
</template>

<style scoped>
.prioButtons{
    display: flex;
    gap: 10px;
    margin-top: 5px;
}

.prioButton{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 134px;
    height: 51px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 18px 10px;
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

const choosenPrio = ref('Medium');
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        default: 'Medium'
    }
});

// Debugging hinzufügen, um sicherzustellen, dass der Standardwert korrekt ist
const currentPrio = ref(props.modelValue || 'Medium');


function updatePrio(newPrio) {
    currentPrio.value = newPrio;
    emit('update:modelValue', newPrio);
}

defineExpose({
    currentPrio
});
</script>
