<template>
<div class="form-layout">
    <slot></slot>
</div>
</template>

<script setup>
</script>

<style scoped>

.form-layout {
    width: 470px;
    min-width: fit-content;
    max-width: 100vw;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--color-background-layout);
    max-height: 100svh;
    box-shadow: 0px 0px 14px 3px var(--color-border);
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 1rem
}
</style>
