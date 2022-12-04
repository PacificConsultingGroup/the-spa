
<script setup lang="ts">
import { useNetworkStatus } from '@/composables/useNetworkStatus';
import { Icon } from '@iconify/vue';

const { isOnline, isReconnected } = useNetworkStatus();

</script>

<template>
    <div :class="`the-network-status-banner-wrapper ${isOnline ? 'online' : 'offline'}`">
        <div class="content-container">
            <template v-if="!isOnline">
                <Icon icon="ic:outline-cloud-off" />
                <p>No internet connection</p>
            </template>
            <template v-else-if="isReconnected">
                <Icon icon="ic:outline-cloud-done" />
                <p>Connection re-established</p>
            </template>
        </div>
    </div>
</template>

<style scoped>
.the-network-status-banner-wrapper {
    position: relative;
    width: 100%;
    display: grid;
    place-items: center;
    height: 20px;
    transition: translate 100ms ease-out;
    translate: 0px -100%;
}
.the-network-status-banner-wrapper::before {
    transition: background-color 100ms ease-out;
}
.the-network-status-banner-wrapper.offline {
    translate: 0px 0px;
}
.the-network-status-banner-wrapper.online {
    transition: translate 100ms ease-out 2000ms;
}
.the-network-status-banner-wrapper.offline::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-error-base);
    filter: brightness(30%);
}
.the-network-status-banner-wrapper.online::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-ok-base);
    filter: brightness(30%);
}
.content-container {
    --color-mono-lightest: var(--color-mono-lightest-dark-theme);

    position: relative;
    display: flex;
    gap: 8px;
    padding: 2px 0px;
    color: var(--color-mono-lightest);
    align-items: center;
}
.content-container > p {
    font-size: var(--font-size-small);
    color: inherit;
}

@media (prefers-color-scheme: light) {
    .the-network-status-banner-wrapper.offline::before {
        filter: brightness(200%);
    }
    .the-network-status-banner-wrapper.online::before {
        filter: brightness(50%);
    }
}
</style>