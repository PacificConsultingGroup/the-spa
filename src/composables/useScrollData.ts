
import { onMounted, onUnmounted, ref } from 'vue';

export function useScrollData() {
    const scrollYPos = ref(window.scrollY);
    const scrollYDirection = ref<'down' | 'up' | null>(null);

    function scrollHandler(ev) {
        const scrollYAfter = window.scrollY;
        if (scrollYAfter > scrollYPos.value) {
            scrollYDirection.value = 'down';
        } else if (scrollYAfter < scrollYPos.value) {
            scrollYDirection.value = 'up';
        } else {
            scrollYDirection.value = null;
        }
        scrollYPos.value = scrollYAfter;
    }

    onMounted(() => document.addEventListener('scroll', scrollHandler));
    onUnmounted(() => document.removeEventListener('scroll', scrollHandler));

    return { scrollYPos, scrollYDirection };
}