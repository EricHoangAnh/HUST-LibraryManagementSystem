<script setup lang="ts">
import LayoutDashboard from '@/components/common/layout/LayoutDashboard.vue';
import store from '@/store';
import { ref, computed, onMounted, nextTick } from 'vue';
import { RouteMap } from '@/router/settingroute';

const isEmit = ref<boolean>(false)
const loading = ref<boolean>(false)

const goToPage = (route: any) => {
  isEmit.value = true;
  store.commit("setSettingAdminPageName", route);
};
const router = computed(() => store.getters["getCurrentAdminRouter"]);

onMounted(async () => {
loading.value = true
await store.dispatch('getUsers')
// await store.dispatch('getDocumentTypes')
// await store.dispatch('getDocuments')
await store.dispatch('getRequests')
await store.dispatch("getLoginUser")
// await nextTick();
loading.value = false
})
</script>
<template>
  <div class="home-main d-flex">
    <LayoutDashboard @go-to-page="goToPage"></LayoutDashboard>
    <div v-loading="loading" class="home-main-content">
      <el-scrollbar>
        <div class="container" style="margin-top: 80px; margin-bottom: 80px">
          <component
            :is="!isEmit ? RouteMap.dashboard.component : router.component"
            ref="componentRef"></component>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<style scoped>

.home-main-content {
  background-color: #f1f4fa;
  width: calc(100% - 200px);
  height: 100vh;
}
</style>
