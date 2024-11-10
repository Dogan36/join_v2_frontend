<template>
    <div class="form-layout">
        <slot></slot>
    </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
@import './../../assets/base.css';

.form-layout {
  width: 470px;
  min-width: fit-content;
    max-width: 100vw;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--color-background-layout);
    min-height: 410px;
    max-height: 100svh;
    box-shadow: 0px 0px 14px 3px var(--color-border);
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
}


</style>