<script setup lang="ts">

import { gatewayAxios } from '@/lib/gatewayAxios';
import { getEnvVariableValue } from '@/utils/getEnvVariableValue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import TheNetworkStatusBanner from './TheNetworkStatusBanner.vue';

const router = useRouter();

function clickHandlerPreferencesButton(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/preferences');
}
function clickHandlerHomeButton(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/home');
}
async function clickHandlerLogOutButton(ev: MouseEvent) {
    ev.preventDefault();
    router.replace('/login');
    try {
        await gatewayAxios.post('/auth/logout');
        localStorage.removeItem(getEnvVariableValue('VITE_LS_LOGGED_IN_USER_KEY_NAME'));
    } catch (err) {
        console.log(err);
        if (!axios.isAxiosError(err)) return;
        if (!err.response) return;
        if (err.response.status === 500) console.log('Failed to log out!');
    }
}

</script>

<template>
    <nav class="the-top-nav-bar-wrapper">
        <div class="nav-content-container">
            <menu class="buttons-menu">
                <button @click="clickHandlerHomeButton">Home</button>
                <button>Add Initiative</button>
                <button @click="clickHandlerPreferencesButton">Preferences</button>
                <button>Administration</button>
                <button class="secondary" @click="clickHandlerLogOutButton">
                    <Icon icon="entypo:log-out" />
                </button>
            </menu>
        </div>
        <TheNetworkStatusBanner class="network-status-banner" />
    </nav>
</template>

<style scoped>
.the-top-nav-bar-wrapper {
    position: relative;
    width: 100%;
    height: 60px;
}
.nav-content-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template: 'left right' 100% / 1fr 4fr;
    padding: 0px 20px;
}
.nav-content-container::before {
    position: absolute;
    content: '';
    background-color: var(--color-surface-mono-3);
    width: 100%;
    height: 100%;
}
.buttons-menu {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    grid-area: right;
    place-self: center end;
}
.buttons-menu > button {
    height: 40px;
}
.network-status-banner {
    position: relative;
    width: 100%;
    z-index: -1;
}
</style>