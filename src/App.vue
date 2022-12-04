<script setup lang="ts">
import { useScrollData } from '@/composables/useScrollData';
import TheNetworkStatusBanner from './components/TheNetworkStatusBanner.vue';

const { scrollYPos, scrollYDirection } = useScrollData();

</script>

<template>
    <nav :class="`top-bar ${scrollYPos === 0 || scrollYDirection === 'up' ? 'extended' : 'retracted'}`">
        <RouterView name="TheTopNavBar" v-slot="{ Component }" class="top-nav-bar">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
        <div class="network-status-banner">
            <TheNetworkStatusBanner />
        </div>
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
.top-bar {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1;
    box-shadow: var(--box-shadow-standard);
    transition: translate 100ms ease-out;
}
.top-bar.extended {
    translate: 0px;
}
.top-bar.retracted {
    translate: 0px -60px;
}
.top-nav-bar {
    z-index: 1;
}
.network-status-banner {
    position: fixed;
    width: 100%;
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
