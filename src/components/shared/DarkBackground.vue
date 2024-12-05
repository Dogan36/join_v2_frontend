<template>
    <div class="darkBackground" @click="closeModal">
        <div class="modalContainer" @click.stop>
        <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
const emit = defineEmits(['close']);
const closeModal = () => {
    emit('close');
};

</script>

<style scoped>
.darkBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

  
</style>