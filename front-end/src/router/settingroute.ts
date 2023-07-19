import { defineAsyncComponent, markRaw } from "vue";
export const RouteMap = {
  documentList: {
    pageValue: "document-list",
    pageName: "documentList",
    component: markRaw(
      defineAsyncComponent(
        () => import("../components/common/document/DocumentList.vue")
      )
    ),
    refresh: false,
  },
  dashboard: {
    pageValue: "dashboard",
    pageName: "dashboard",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/admin/dashboard/DashBoard.vue")
      )
    ),
    refresh: false,
  },
  requestList: {
    pageValue: "request-list",
    pageName: "requestList",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/admin/request-list/RequestList.vue")
      )
    ),
    refresh: false,
  },
  documentType: {
    pageValue: "document-type",
    pageName: "documentType",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/admin/document-type/DocumentType.vue")
      )
    ),
    refresh: false,
  },
  
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
  userManagement: {
    pageValue: "user-management",
    pageName: "userManagement",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/admin/user/User.vue")
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
  myRequest: {
    pageValue: "my-request",
    pageName: "myRequest",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/users/my-request/MyRequest.vue")
      )
    ),
    refresh: true,
  },
  myDocument: {
    pageValue: "my-document",
    pageName: "myDocument",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/users/my-document/MyDocument.vue")
      )
    ),
    refresh: true,
  },
  home: {
    pageValue: "home",
    pageName: "home",
    component: markRaw(
      defineAsyncComponent(
        () => import("../views/users/home/DocumentHome.vue")
      )
    ),
    refresh: true,
  },

};
