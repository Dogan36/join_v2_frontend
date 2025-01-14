<template>
  <div class="workspace-info-overlay">
    <h2>Workspace Details</h2>
    <div class="workspace-info">
      <h3>{{ currentWorkspace.name }}</h3>
      <p>Owner: {{ currentWorkspace.owner.name }}</p>
      <button @click="openJoinWorkspace">Join Another Workspace</button>
      <button @click="leaveWorkspace">Leave Workspace</button>
      <button @click="sendInvitations">Send Invitations</button>
    </div>
    <button class="secondary-button-layout" @click="$emit('close')">
      Close
    </button>
  </div>
</template>

<script setup>
import { currentWorkspace } from '@/services/workspaceService';
import { ref, onMounted } from 'vue';
onMounted(() => {
  console.log(currentWorkspace.value);
});


</script>

<style scoped>
.workspace-info-overlay {
    display: flex
;
    flex-direction: column;
    position: absolute;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    z-index: 2;
    
    transform: translate(-50%, -50%);
    top: 50%;
    padding: 5rem;
    max-width: 1000px;
    overflow-y: auto;
}
</style>
