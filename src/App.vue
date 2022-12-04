<script setup lang="ts">
import { useScrollData } from '@/composables/useScrollData';

const { scrollYPos, scrollYDirection } = useScrollData();

</script>

<template>
    <nav
        :class="`top-nav-bar ${scrollYPos === 0 || scrollYDirection === 'up' ? 'extended' : 'retracted'}`">
        <RouterView name="TheTopNavBar" v-slot="{ Component }">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </nav>
    <div class="hero-banner">
        <RouterView name="TheHeroBanner" v-slot="{ Component }">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </div>
    <main class="main">
        <RouterView v-slot="{ Component, route }">
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
    translate: 0px -80px;
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 800px) {
    .main {
        padding: 0px 16px;
    }
}
</style>
