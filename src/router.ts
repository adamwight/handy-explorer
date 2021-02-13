import { createRouter, createWebHashHistory } from 'vue-router';
import DetailedSimulation from "@/views/DetailedSimulation.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/detail',
      name: 'home',
      component: DetailedSimulation,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
