import { onMounted, onUnmounted, ref } from 'vue';

export function useNetworkStatus() {

    const isOnline = ref(true);
    const isReconnected = ref(false);

    function getNetworkStatus() {
        isOnline.value = navigator.onLine;
        return isOnline.value ? 'online' : 'offline';
    }

    function eventHandlerOnline(ev) {
        isReconnected.value = true;
        isOnline.value = true;
    }
    function eventHandlerOffline(ev) {
        isReconnected.value = false;
        isOnline.value = false;
    }

    onMounted(() => {
        getNetworkStatus();
        window.addEventListener('online', eventHandlerOnline);
        window.addEventListener('offline', eventHandlerOffline);
    });
    onUnmounted(() => {
        window.removeEventListener('online', eventHandlerOnline);
        window.removeEventListener('offline', eventHandlerOffline);
    });

    return { isOnline, isReconnected, getNetworkStatus };
}