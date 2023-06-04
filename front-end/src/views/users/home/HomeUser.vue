<script setup lang="ts">
import store from "@/store";
import DocumentList from "../../../components/common/document/DocumentList.vue";
import { RouteMap } from "../../../router/settingroute";
import LayoutHome from "@/components/common/layout/LayoutHomeUser.vue";
import { computed, onMounted } from "vue";

const goToPage = (route: any) => {
  store.commit("setSettingPageName", route);
};
const router = computed(() => store.getters["getCurrentRouter"]);

const allDocument = computed(() => store.state.documents)
const allStudents = computed(() => store.state.students)

onMounted(async () => {
await store.dispatch('getDocuments')
await store.dispatch('getStudents')    
})
</script>
<template>
  <div class="home-user">
    <layout-home @go-to-page="goToPage"></layout-home>
    <div class="container">
      <!-- <document-list></document-list> -->
      <component :is="router.component" ref="componentRef"></component>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
