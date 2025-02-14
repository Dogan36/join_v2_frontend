<template>
    <div class="dark-background" @click="closeModal">
        <div class="modal-container" @click.stop>
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
.dark-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.modal-container {
max-width:100%;
display:flex;
justify-content:center;
align-items:center;
}

</style>