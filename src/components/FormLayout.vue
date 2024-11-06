<template>
    <div class="form-layout">
        <slot>test</slot>
    </div>
</template>
  
  <script setup>
</script>
  
  <style>
    

.form-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 3.41vh 0px;
    background: #631212;
    width: 45%;
    min-width: 505px;
    max-width: 600px;
    height: 63%;
    min-height: 513px;
    box-shadow: 0px 0px 14px 33px var(--color-border);
    border-radius: 30px;
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease-in-out;
}
</style>