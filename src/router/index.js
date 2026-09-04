import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { title: 'Пользователи' },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { title: 'Избранное' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - Users App` : 'Users App'
})

export default router
