<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function clickHandlerPreferencesButton(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/preferences');
}
function clickHandlerHomeButton(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/home');
}
function clickHandlerLogOutButton(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/login'); // TODO: IMPLEMENT ACTUAL LOG OUT BEHAVIOUR
}

</script>

<template>
    <div :class="$style.theTopNavBarWrapper">
        <menu :class="$style.buttonsMenu">
            <button @click="clickHandlerHomeButton">Home</button>
            <button>Add Initiative</button>
            <button @click="clickHandlerPreferencesButton">Preferences</button>
            <button>Administration</button>
            <button :class="['secondary']" @click="clickHandlerLogOutButton">
                <Icon icon="entypo:log-out" />
            </button>
        </menu>
    </div>
</template>

<style module>
.theTopNavBarWrapper {
    position: relative;
    width: 100%;
    height: 60px;
    display: grid;
    grid-template: 'left right' 100% / 1fr 4fr;
    padding: 0px 20px;
}
.theTopNavBarWrapper::before {
    position: absolute;
    content: '';
    background-color: var(--color-surface-mono-3);
    width: 100%;
    height: 100%;
    z-index: -1;
}
.buttonsMenu {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    grid-area: right;
    place-self: center end;
}
.buttonsMenu > button {
    height: 40px;
}
</style>