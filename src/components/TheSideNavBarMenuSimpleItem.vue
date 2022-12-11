<script setup lang="ts">
import { useRouter } from 'vue-router';
import TheSideNavBarMenuItemBase from './TheSideNavBarMenuItemBase.vue';

const props = defineProps<{
    label: string;
    icon: string;
    path: string;
}>();

const router = useRouter();

function selfClickHandler(ev: MouseEvent) {
    ev.preventDefault();
    router.push(props.path);
}

</script>

<template>
    <div class="the-side-nav-bar-menu-simple-item-wrapper" @click="selfClickHandler">
        <TheSideNavBarMenuItemBase :label="props.label" :icon="props.icon" />
    </div>
</template>

<style scoped>
.the-side-nav-bar-menu-simple-item-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>