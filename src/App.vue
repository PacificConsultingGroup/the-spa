<script setup lang="ts">
import { useScrollData } from '@/composables/useScrollData';

const { scrollYPos, scrollYDirection } = useScrollData();

</script>

<template>
    <nav
        :class="[
            $style.topNavBar,
            scrollYPos === 0 || scrollYDirection === 'up' ? $style.extended : $style.retracted
        ]">
        <RouterView name="TheTopNavBar" v-slot="{ Component }">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </nav>
    <div :class="$style.heroBanner">
        <RouterView name="TheHeroBanner" v-slot="{ Component }">
            <Transition name="fade">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </div>
    <main :class="$style.main">
        <RouterView v-slot="{ Component, route }">
            <Transition name="fade">
                <Component :is="Component" :key="route.path" />
            </Transition>
        </RouterView>
    </main>
</template>

<style module>
.topNavBar {
    position: fixed !important;
    width: 100%;
    top: 0px;
    z-index: 1;
    box-shadow: var(--box-shadow-standard);
    transition: translate 100ms ease-out;
}
.topNavBar.extended {
    translate: 0px;
}
.topNavBar.retracted {
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
