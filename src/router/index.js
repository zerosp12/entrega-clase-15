import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/InicioView.vue"
import VerArticulo from "../views/VerArticuloView.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/ver/:id", component: VerArticulo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
