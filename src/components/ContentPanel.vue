<script setup lang="ts">


</script>

<template>
    <div :class="$style.contentPanelWrapper">
        <slot></slot>
    </div>
</template>

<style module>
.contentPanelWrapper {
    position: relative;
    background-color: var(--color-surface-mono-3);
    box-shadow: var(--box-shadow-hover);
    padding: 30px 40px;
    border-radius: 0.3em;
}
</style>