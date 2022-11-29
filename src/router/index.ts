import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LogInView from '@/views/LogInView.vue';
import PreferencesView from '@/views/PreferencesView.vue';
import TheTopNavBar from '@/components/TheTopNavBar.vue';
import TheHeroBanner from '@/components/TheHeroBanner.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return { ...savedPosition, behavior: 'smooth' };
        if (to.hash) return { el: to.hash, behavior: 'smooth' };
        return { top: 0, behavior: 'smooth' };
    },
    routes: [
        {
            path: '/',
            name: 'root',
            components: {
                default: HomeView,
                TheTopNavBar,
                TheHeroBanner
            }
        },
        {
            path: '/home',
            name: 'home',
            components: {
                default: HomeView,
                TheTopNavBar,
                TheHeroBanner
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        },
        {
            path: '/preferences',
            name: 'preferences',
            components: {
                default: PreferencesView,
                TheTopNavBar,
                TheHeroBanner
            }
        }
    ]
});

export default router;
