<script setup lang="ts">
import { useScrollData } from '@/composables/useScrollData';

const { scrollYPos, scrollYDirection } = useScrollData();

</script>

<template>
    <RouterView name="TheTopNavBar" v-slot="{ Component }" :class="`top-nav-bar ${scrollYPos === 0 || scrollYDirection === 'up' ? 'extended' : 'retracted'}`">
        <Transition name="fade">
            <Component :is="Component" />
        </Transition>
    </RouterView>
    <RouterView name="TheHeroBanner" v-slot="{ Component }">
        <Transition name="fade">
            <Component :is="Component" />
        </Transition>
    </RouterView>
    <main class="main">
        <RouterView name="TheSideNavBar" v-slot="{ Component }" class="side-nav-bar">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
        <RouterView v-slot="{ Component, route }" class="main-content">
            <Transition name="fade">
                <Component :is="Component" :key="route.path" />
            </Transition>
        </RouterView>
    </main>
</template>

<style scoped>
.top-nav-bar {
    position: fixed !important;
    width: 100%;
    top: 0px;
    z-index: 1;
    box-shadow: var(--box-shadow-standard);
    transition: translate 100ms ease-out;
}
.top-nav-bar.extended {
    translate: 0px;
}
.top-nav-bar.retracted {
    translate: 0px -60px;
}
.main {
    position: relative;
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-areas: 'side-nav main-content';
    padding: 0px 2vw;
    gap: 20px;
}
.side-nav-bar {
    position: sticky !important;
    top: 100px;
    height: fit-content;
    z-index: 1;
}
.main-content {
    position: relative;
    grid-area: main-content;
    width: 100%;
}

@media (max-width: 800px) {
    .main {
        padding: 0px 16px;
        gap: 0px;
    }
    .side-nav-bar {
        display: none;
    }
}
</style>
