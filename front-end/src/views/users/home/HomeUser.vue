<script setup lang="ts">
import store from "@/store";
import DocumentList from "../../../components/common/document/DocumentList.vue";
import { RouteMap } from "../../../router/settingroute";
import LayoutHome from "@/components/common/layout/LayoutHomeUser.vue";
import { computed, onMounted, ref } from "vue";


const isEmit = ref<boolean>(false)

const goToPage = (route: any) => {
  isEmit.value = true;
  store.commit("setSettingPageName", route);
};
const router = computed(() => store.getters["getCurrentRouter"]);

const allDocument = computed(() => store.state.documents)
const allStudents = computed(() => store.state.students)

onMounted(async () => {

})
</script>
<template>
  <div class="home-user">
    <layout-home @go-to-page="goToPage"></layout-home>
    <div class="container">
      <!-- <document-list></document-list> -->
      <component
        :is="!isEmit ? RouteMap.documentList.component : router.component"
        ref="componentRef"></component>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
