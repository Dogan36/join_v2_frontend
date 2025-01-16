<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Möchten Sie diesen Workspace wirklich verlassen?</h2>
        <button @click="confirmLeave">Ja</button>
        <button @click="cancel">Nein</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['close']);
  
  const confirmLeave = () => {
    // Implementiere die Logik, um den Workspace zu verlassen
    emit('close');
  };
  
  const cancel = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 990;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  </style>