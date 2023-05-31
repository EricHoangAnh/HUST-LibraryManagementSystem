<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { RouteMap } from "@/router/settingroute";
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
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Trang chủ</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
              aria-expanded="false"
            >
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
          <li class="nav-item" @click="showMainPage(RouteMap.uploadDocument)">
            <a class="nav-link">Đóng góp tài liệu</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
