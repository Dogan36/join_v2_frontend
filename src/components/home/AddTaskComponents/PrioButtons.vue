<template>

<div class="inputContainer">
          <label class="title">Prio</label>
        
    <div class="prioButtons">
        <div class="prioButton" 
        :style="currentPrio === 'high' ? { backgroundColor: '#ff3c00', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }" 
        @click="updatePrio('high')">
            <span>Urgent</span>
            <img
                :src="currentPrio === 'high' ? 
                Prioicons.urgentWhite:  
                Prioicons.urgent"
                alt="" />
        </div>

        <div class="prioButton"
        :style="currentPrio === 'medium' ? { backgroundColor: '#ffa800', color: 'white' } : { backgroundColor: 'unset', color: 'unset' }"
        @click="updatePrio('medium')">
            <span>Medium</span>
            <img
                :src="currentPrio === 'medium' ? 
                Prioicons.mediumWhite:  
                Prioicons.medium"
                alt="" />
        </div>

        <div class="prioButton"
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
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        default: 'medium'
    }
});

// Debugging hinzufügen, um sicherzustellen, dass der Standardwert korrekt ist
const currentPrio = ref(props.modelValue || 'medium');


function updatePrio(newPrio) {
    console.log('updatePrio', newPrio);
    currentPrio.value = newPrio;
    emit('update:modelValue', newPrio);
}



defineExpose({
    currentPrio,
    updatePrio,
});
</script>
