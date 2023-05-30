import { defineAsyncComponent, markRaw } from "vue";
export const RouteMap = {
  search: {
    pageValue: "search",
    pageName: "search",
    component: markRaw(
      defineAsyncComponent(
        () => import("../components/common/search-center/SearchCenter.vue")
      )
    ),
    refresh: true,
  },
};
