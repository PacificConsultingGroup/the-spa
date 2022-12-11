<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
    label: string;
    icon: string;
}>();

</script>

<template>
    <div class="the-side-nav-bar-menu-item-base-wrapper">
        <Icon :icon="props.icon" class="item-icon" width="100%" height="100%" />
        <aside class="item-tooltip">{{ props.label }}</aside>
    </div>
</template>

<style scoped>
.the-side-nav-bar-menu-item-base-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: grid;
    place-items: center;
}
.the-side-nav-bar-menu-item-base-wrapper::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-mono-base);
    opacity: 0;
    transition: opacity 100ms ease-out;
}
.item-icon {
    position: relative;
    pointer-events: none;
    color: var(--color-mono-base);
    transition: opacity 100ms ease-out;
}
.item-tooltip {

    --tooltip-background-color: var(--color-mono-darkest);
    --tooltip-text-color: var(--color-mono-light);
    --tooltip-arrow-size: 7px;
    --tooltip-offset: 15px;

    position: absolute;
    padding: 0.5em 1em;
    display: grid;
    place-items: center;
    background-color: var(--tooltip-background-color);
    border-radius: 0.2em;
    left: calc(100% + var(--tooltip-offset));
    color: var(--tooltip-text-color);
    box-shadow: var(--box-shadow-hover);
    opacity: 0;
    transition: opacity 100ms ease-out;
}
.item-tooltip::before {
    position: absolute;
    content: '';
    left: calc(-1*var(--tooltip-arrow-size));
    border-top: var(--tooltip-arrow-size) solid transparent;
    border-bottom: var(--tooltip-arrow-size) solid transparent;
    border-right: var(--tooltip-arrow-size) solid var(--tooltip-background-color);
}
.the-side-nav-bar-menu-item-base-wrapper:hover .item-tooltip {
    opacity: 1;
}
.the-side-nav-bar-menu-item-base-wrapper:hover::before {
    cursor: pointer;
    opacity: 0.3;
}
.the-side-nav-bar-menu-item-base-wrapper:hover .item-icon {
    color: var(--color-mono-lighter);
}

@media (prefers-color-scheme: light) {
    .item-tooltip {
        --tooltip-background-color: var(--color-mono-light);
        --tooltip-text-color: var(--color-mono-dark);
    }
}
</style>