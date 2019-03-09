import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.afterEach(route => {
  window.document.title = route.meta.title
})
export default router

