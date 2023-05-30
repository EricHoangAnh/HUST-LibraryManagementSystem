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
    <layout></layout>
    <div class="container">
      <document-list></document-list>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
