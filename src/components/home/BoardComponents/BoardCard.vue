<template>
    <div v-if="props.task" class="board-card">
        <div class="card-category" :style="{ background: category.color.hex_value, color: getTextColor(category.color.hex_value) ? '#fff' : '#000'  }">{{category.name}}</div>
        <div class="card-content">
            <div class="card-title">{{ title }}</div>
            <div class="card-description">{{ description }}</div>
        </div>
        <div  class="card-progress">
            <progress v-if="subtasks.length > 0" :max="subtasks.length" :value="subtasksDone"></progress>
            <div v-if="subtasks.length > 0"><span>{{subtasksDone}}</span><span>/</span><span>{{subtasks.length}}</span><span>Done</span></div>
        </div>
        <div class="card-bottom-div">
            <!-- Übergabe des assignedTo Werts an das AssignedToAvatars-Component -->
           <AssignedToAvatars :assignedTo="assignedTo"></AssignedToAvatars>
            <img :src="buttonImg || require('@/assets/default-image.png')" alt="">
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, onMounted } from 'vue';
import AssignedToAvatars from '@/components/shared/AssignedToAvatars.vue';
import { categories } from '@/store/state';
import { Prioicons } from '@/utils/prioIcons';
import  useTextColor  from '@/composables/useTextColor';
const { getTextColor } = useTextColor();
const props = defineProps({
    task: {
        type: Object
    }
});

const title = computed(() => props.task.name);
const description = computed(() => props.task.description);
const category = computed(() => {
    const cat = categories.value.find(category => category.id === props.task.category);
    if (!cat) {
        return { name: 'Category Deleted', color: { hex_value: '#FFFF00'} }; // fallback value
    }
    return cat;
});

const subtasks = computed(() => props.task.subtasks);
const subtasksDone = computed(() => subtasks.value.filter(subtask => subtask.is_completed).length);
const assignedTo = computed(() => props.task.selected_contacts || []);
const prio = computed(() => props.task.prio);
const buttonImg = computed(() => {
  if (prio.value === 'high') {
    return Prioicons.urgent;
  } else if (prio.value === 'medium') {
    return Prioicons.medium; // Adjust the key if it's 'mediumWite'
  } else if (prio.value === 'low') {
    return Prioicons.low;
  }
  return ''; // Return a default or empty string if no match
});



</script>

<style scoped>
/* Dein Styles hier */
</style>
<style scoped>
.board-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 19px;
    gap: 20px;
    width: 250px;
    height: 239px;
    background: #FFFFFF;
    box-shadow: 0px 0px 14px 3px rgba(0, 0, 0, 0.04);
    border-radius: 30px;
    cursor: pointer;
}

.card-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7px 25px;
    background: black;
    border-radius: 8px;
    text-align: center;
    font-size: 2rem;
    line-height: 16px;
    font-weight: 600;
   
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    min-height: 36%;
}

.card-progress {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 20px;
    width: 209px;
    height: 14px;
    progress {
        width: 100%;
        height: 14px;
    }
    span {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        white-space: nowrap;
    }
}

.card-bottom-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%
}

.card-title {
    width: 100%;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 125%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-description {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #A8A8A8;
    line-height: 20px;
    max-height: 40px;
}

.card-bottom-div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    img{
        width: 20px;
        height: 20px;
    }
}
</style>
