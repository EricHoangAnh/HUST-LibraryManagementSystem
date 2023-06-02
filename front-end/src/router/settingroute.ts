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
  uploadDocument: {
    pageValue: "upload-document",
    pageName: "uploadDocument",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/users/upload-document/UploadDocument.vue")
      )
    ),
    refresh: true,
  },
  documentForm: {
    pageValue: "document-form",
    pageName: "documentForm",
    component: markRaw(
      defineAsyncComponent(
        () => import("../components/common/document/DocumentForm.vue")
      )
    ),
    refresh: true,
  },
};
