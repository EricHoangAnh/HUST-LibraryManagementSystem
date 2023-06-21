<script setup lang="ts">
import store from "@/store";
import { RouteMap } from "../../../router/settingroute";
import LayoutHome from "@/components/common/layout/LayoutHomeUser.vue";
import { computed, onMounted, ref } from "vue";
import axiosClient from "@/common/api/axiosClient";


const isEmit = ref<boolean>(false)

const goToPage = (route: any) => {
  isEmit.value = true;
  store.commit("setSettingPageName", route);
};
const router = computed(() => store.getters["getCurrentRouter"]);


onMounted(async () => {  
await axiosClient.get('/user', {headers: {token: localStorage.getItem('token')}}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
})
</script>
<template>
  <div class="home-user">
    <layout-home @go-to-page="goToPage"></layout-home>
    <div class="container" style="margin-top: 100px;">
      <component
        :is="!isEmit ? RouteMap.documentList.component : router.component"
        ref="componentRef"></component>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
