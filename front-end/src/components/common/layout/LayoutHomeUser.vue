<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { RouteMap } from "@/router/settingroute";
import DocumentForm from "../document/DocumentForm.vue";
import { ref } from "vue";
const navBar = [
  {
    iconClass: "ms-Icon ms-Icon--CityNext",
    title: "Tìm kiếm tài liệu",
    pageName: RouteMap.search,
  },
];
const emit = defineEmits(["goToPage"]);
const showMainPage = (route: any) => {
  emit("goToPage", route);
};

const documentFormRef = ref()
const showDocumentForm = () => {
documentFormRef.value?.showFormDialog({})
}
</script>
<template>
  <nav class="nav-header navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="nav-title">
        <img src="../../../../src/assets/image/logo.png" style="width: 30px; height: 30px; margin-right: 5px;">
        <a class="navbar-brand" href="/">Trang chủ</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        style="border: none;">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="showMainPage(RouteMap.search)">
            <a class="nav-link">Tìm kiếm tài liệu</a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Tài liệu theo thể loại
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li>
          <li class="nav-item" @click="showDocumentForm">
            <a class="nav-link">Đóng góp tài liệu</a>
          </li>
        </ul>
      </div>
    </div>
    <document-form ref="documentFormRef"></document-form>
  </nav>
</template>
<style scoped lang="scss">
@import '../../../assets/scss/app.scss';


.nav-header {
  position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
  background: white;

}
.nav-item {
  cursor: pointer;
}
</style>
