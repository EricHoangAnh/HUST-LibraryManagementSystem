<script setup lang="ts">
import DocumentList from "../../../components/common/document-list/DocumentList.vue";
import { RouteMap } from "../../../router/settingroute";
const navBar = [
  {
    iconClass: "ms-Icon ms-Icon--CityNext",
    title: "Tìm kiếm tài liệu",
    pageName: RouteMap.search,
  },
];
</script>
<template>
  <div class="home-user">
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
            <li class="nav-item">
              <a class="nav-link" href="/">Tìm kiếm tài liệu</a>
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
            <li class="nav-item">
              <a class="nav-link" href="/">Đóng góp tài liệu</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <document-list></document-list>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
