import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CartReview from '../views/CartReview.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'CartReview',
        component: CartReview
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router