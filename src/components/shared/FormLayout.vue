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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 3.41vh 0px;
    background-color: var(--color-background-layout);
    max-width: 600px;
    min-height: 513px;
    box-shadow: 0px 0px 14px 3px var(--color-border);
    border-radius: 30px;
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease-in-out;
}
</style>