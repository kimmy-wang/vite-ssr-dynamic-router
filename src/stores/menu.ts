import { defineStore } from "pinia";
import type { RouteRecordRaw, Router } from "vue-router";
import { generatorDynamicRouter } from "@/router/generator-routers";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    allowRouters: [] as RouteRecordRaw[],
  }),
  getters: {},
  actions: {
    // 从后端获取路由表结构体，并构建前端路由
    generateRoutesDynamic({ router }: { router: Router }) {
      return new Promise<RouteRecordRaw>((resolve) => {
        generatorDynamicRouter()
          .then((routes: RouteRecordRaw) => {
            const allowRoutes = routes.children || [];
            // 添加到路由表
            router.addRoute(routes);
            this.allowRouters = allowRoutes;
            resolve(routes);
          })
          .catch((err) => {
            console.error("generatorDynamicRouter", err);
          });
      });
    },
  },
});
