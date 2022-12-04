<script setup lang="ts">


</script>

<template>
    <div class="content-panel-wrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
.content-panel-wrapper {
    position: relative;
    background-color: var(--color-surface-mono-3);
    box-shadow: var(--box-shadow-hover);
    padding: 30px 40px;
    border-radius: 0.3em;
}
</style>
