<script setup lang="ts">

import { ref } from 'vue';
import { RouteMap } from '@/router/settingroute';
import { ElMessageBox } from 'element-plus';
import router from '@/router';

const isActive= ref(0)

const leftSidebar = [
    {
      iconClass: 'fa-sharp fa-solid fa-kaaba',
      title: 'Dashboard',
      component: RouteMap.dashboard,
    },
    {
      iconClass: 'fa-solid fa-folder',
      title: 'Thể loại tài liệu',
      component: RouteMap.documentType,
    },
    {
      iconClass: 'fa-regular fa-file',
      title: 'Quản lý tài liệu',
      component: RouteMap.search,
    },
    {
      iconClass: 'fa-solid fa-user',
      title: 'Người dùng',
      component: RouteMap.userManagement,
    },
    {
      iconClass: 'fa-solid fa-list-check',
      title: 'Phê duyệt tài liệu',
      component: RouteMap.requestList,
    },
    
]

const logOut = () => {
  ElMessageBox.confirm(
    'Bạn có chắc chắn muốn đăng xuất ?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      localStorage.clear();
      router.push('/login');

    })
    .catch((err) => {
      console.log(err)
    })
  }

const emit = defineEmits(["goToPage"]);
const showMainPage = (route: any, index :any) => {
    isActive.value = index
  emit("goToPage", route);
};

</script>
<template>
  <div class="left-sidebar ">
    <div class="container-fluid d-flex flex-column justify-content-between h-100 py-4">
      <div class="menu">
        <div class="left-sidebar-title mb-3">
          <img
            src="../../../assets/image/logo.png"
            style="height: 30px; width: 30px;" />
            <h5>Trang quản lý</h5>
        </div>
        <div class="left-sidebar-menu">
          <template v-for="(item, i) in leftSidebar">
            <div class="menu-item d-flex align-items-center py-3" :class="[i === isActive && 'active']" @click="showMainPage(item.component, i)" style="cursor: pointer;">
              <i :class="item.iconClass" style="width: 16px; height: 16px;"></i>
              <span class="ms-3">{{ item.title }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="log-out d-flex align-items-center" style="cursor: pointer;" @click="logOut">
        <i class="fa-solid fa-right-from-bracket me-3"></i>
        <span>Đăng xuất</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-sidebar {
    min-width: 200px;
    border-right: 1px solid #ccc;
    height: 100vh;
}
.active {
    color: #3A36DB ;
    border-bottom: 1px solid #3A36DB;
}
</style>
