import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/episodes',
        name: 'Episodes',
        component: () => import('@/views/EpisodeList.vue'),
    },
    { path: '/episode/:id', component: () => import('@/views/Episode.vue') },

    {
        path: '/characters',
        name: 'Characters',
        component: () => import('@/views/CharacterList.vue'),
    },
    { path: '/character/:id', component: () => import('@/views/Character.vue') },

    {
        path: '/locations',
        name: 'Locations',
        component: () => import('@/views/LocationList.vue'),
    },
    { path: '/location/:id', component: () => import('@/views/Location.vue') },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
