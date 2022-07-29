import type { Router } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import type { Pinia } from "pinia";

export function applyRouter(router: Router, pinia: Pinia) {
  router.beforeEach(async (to) => {
    // ✅ This will work make sure the correct store is used for the
    // current running app
    const menuStore = useMenuStore();
    if (menuStore.allowRouters.length === 0) {
      await menuStore.generateRoutesDynamic({ router });
    }
  });
}
