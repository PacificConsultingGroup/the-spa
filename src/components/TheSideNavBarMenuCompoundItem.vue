<script setup lang="ts">
import TheSideNavBarMenuItemBase from './TheSideNavBarMenuItemBase.vue';


const props = defineProps<{
    label: string;
    icon: string;
    menuItems: {
        label: string;
        icon: string;
        path: string;
    }[];
}>();

</script>

<template>
    <div class="the-side-nav-bar-menu-compound-item-wrapper">
        <TheSideNavBarMenuItemBase :label="props.label" :icon="props.icon" />
    </div>
</template>

<style scoped>
.the-side-nav-bar-menu-compound-item-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>