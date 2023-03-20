import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
export const mainStore = defineStore('mainStore', {
  state() {
    return {
      routes: []
    }
  },
  actions: {
    getRouters() {
      const router = useRouter()
      const routes = router.getRoutes()
      this.routes = routes
    }
  },
  getters: {
    needShowRoutes(){
      return this.routes.filter(item => item.meta.isShow)
    },
    hasChildrenRoutes(){
      return this.routes.filter(item => item.meta.children)
    }
  }
})
