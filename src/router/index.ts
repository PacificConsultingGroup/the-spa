import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LogInView from '@/views/LogInView.vue';
import PreferencesView from '@/views/PreferencesView.vue';
import TheTopNavBar from '@/components/TheTopNavBar.vue';
import TheHeroBanner from '@/components/TheHeroBanner.vue';
import { gatewayAxios } from '@/lib/gatewayAxios';
import { getEnvVariableValue } from '@/utils/getEnvVariableValue';

async function navGuardRequireUserSession() {
    const claimedPersonUuid = localStorage.getItem(getEnvVariableValue('VITE_LS_LOGGED_IN_USER_KEY_NAME'));
    try {
        const { data: verified } = await gatewayAxios.post('/auth/verify', { person_uuid: claimedPersonUuid });
        if (!verified) {
            localStorage.removeItem(getEnvVariableValue('VITE_LS_LOGGED_IN_USER_KEY_NAME'));
            router.replace('/login');
        }
    } catch (err) {
        router.replace('/login');
    }
}

async function navGuardRequireNoUserSession() {
    const claimedPersonUuid = localStorage.getItem(getEnvVariableValue('VITE_LS_LOGGED_IN_USER_KEY_NAME'));
    try {
        const { data: verified } = await gatewayAxios.post('/auth/verify', { person_uuid: claimedPersonUuid });
        if (verified) router.push('/home');
    } catch (err) {
        return;
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return { ...savedPosition, behavior: 'smooth' };
        if (to.hash) return { el: to.hash, behavior: 'smooth' };
        return { top: 0, behavior: 'smooth' };
    },
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LogInView,
            beforeEnter: navGuardRequireNoUserSession
        },
        {
            path: '/',
            name: 'root',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            components: {
                default: HomeView,
                TheTopNavBar,
                TheHeroBanner
            },
            beforeEnter: navGuardRequireUserSession
        },
        {
            path: '/preferences',
            name: 'preferences',
            components: {
                default: PreferencesView,
                TheTopNavBar,
                TheHeroBanner
            },
            beforeEnter: navGuardRequireUserSession
        }
    ]
});

export default router;
