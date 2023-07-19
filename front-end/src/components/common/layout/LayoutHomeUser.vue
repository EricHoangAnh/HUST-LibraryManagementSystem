<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { RouteMap } from "@/router/settingroute";
import DocumentForm from "../document/DocumentForm.vue";
import { computed, onMounted, ref } from "vue";
import axiosClient from "@/common/api/axiosClient";
import { IType, IUser } from "@/common/model";
import router from "@/router";
import { ElMessageBox } from "element-plus";
import store from "@/store";
const navBar = [
  {
    iconClass: "ms-Icon ms-Icon--CityNext",
    title: "Tìm kiếm tài liệu",
    pageName: RouteMap.search,
  },
];
const userInfo = ref<IUser>()
const allTypes = computed<IType[]>(() => store.state.documentTypes )
const isToggle = ref<boolean>(false)

const emit = defineEmits(["goToPage"]);
const showMainPage = (route: any) => {
  emit("goToPage", route);
};

const documentFormRef = ref()
const showDocumentForm = () => {
documentFormRef.value?.showFormDialog({}, "Add")
}

const goToUserProfile = () => {
  router.push(`/user/${userInfo.value?._id}`)
}

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
onMounted(async () => {
await store.dispatch('getLoginUser')
userInfo.value = store.state.loginUser
})
</script>
<template>
  <nav class="nav-header navbar navbar-expand-lg">
    <div class="container-fluid d-flex">
      <div class="nav-title">
        <img
          src="../../../../src/assets/image/logo.png"
          style="width: 30px; height: 30px; margin-right: 5px;" />
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
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
        style="border: none;">
        <ul class="navbar-nav mb-2 mb-lg-0">
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
              <li v-for="item in allTypes"><a class="dropdown-item" :href="`http://localhost:8080/document-type/${item._id}`">{{ item.title }}</a></li>
              
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="/">Tất cả tài liệu</a>
              </li>
            </ul>
          </li>
          <li class="nav-item" @click="showMainPage(RouteMap.myDocument)">
            <a class="nav-link">Tài liệu của tôi</a>
          </li>
          <li class="nav-item" @click="showMainPage(RouteMap.myRequest)">
            <a class="nav-link">Yêu cầu đăng tài liệu</a>
          </li>
        </ul>
        <div class="user-profile d-flex align-items-center">
          <el-dropdown>
            <img
              v-if="!userInfo?.avatar"
              src="../../../assets/image/blank.png" />
            <img v-else :src="userInfo?.avatar" />
            <!-- <span class="user-name ms-2 el-dropdown-link">{{ userInfo?.account }}</span> -->

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToUserProfile"
                  ><i class="fa-solid fa-user me-2"></i>Hồ sơ</el-dropdown-item
                >
                <el-dropdown-item @click="logOut"
                  ><i class="fa-solid fa-right-from-bracket me-2"></i>Đăng
                  xuất</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
  border-bottom: 1px solid #ccc;
}
.nav-item {
  cursor: pointer;
}
.user-profile{
  z-index: 1;
  color: black;
  img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
  .user-name {
    color: #2c3e50;
  }

}
</style>
