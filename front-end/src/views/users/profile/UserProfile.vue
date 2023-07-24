<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument, IUser, IType } from '@/common/model';
import { ref, onMounted, computed } from 'vue';
import moment from 'moment'
import { ElNotification, UploadFile, UploadInstance, UploadProps, UploadRawFile, genFileId } from 'element-plus';
import {Plus} from '@element-plus/icons-vue'
import router from '@/router';
import store from '@/store';


const userInfo = ref<IUser>({})
const isEdit = ref<boolean>(false)
const loading = ref<boolean>(false)
const imageUpload = ref<UploadInstance>();
const fileUpload = ref<UploadInstance>()
const drawerRef = ref()

const file = ref<any>(null);
const loginUser = computed<any>(() => store.state.loginUser)
const allUserDocuments = computed<IDocument[]>(() => store.state.documents.filter((doc: IDocument) => doc.userId === loginUser.value._id))
const allTypes = computed<IType[]>(() => store.state.documentTypes)

const displayType = (typeId: any) => {
  const type: any = allTypes.value.find((type: any) => type._id === typeId)
  return type?.title
}
const documentsInType = (typeId: any) => {
  const data = allUserDocuments.value.filter((doc: IDocument) => doc.documentTypeId === typeId)
  const type: any = allTypes.value.find((type: any) => type._id === typeId)
  const obj = {...type, documentQuantity: data.length}
  return obj
}
const documentsByType = computed(() => {
 const datas = allTypes.value.map((type: IType) => {
  const documents = allUserDocuments.value.filter((doc: IDocument) => doc.documentTypeId === type._id)
  const typeObj: any = {...type, documentData: documents}
  return typeObj
  })
  return datas
})

const editProfile = () => {
    isEdit.value = true
}

const undoEditProfile = () => {
    isEdit.value = false
}

const handleEditProfile = async () => {
    loading.value = true
await axiosClient.put(`/user/${userInfo.value._id}`, userInfo.value).then((res) => {
    if(res) {
        console.log(res)
        drawerRef.value = false
        loading.value = false
    ElNotification({
       title: 'Thành công',
       message: 'Cập nhật dữ liệu hoàn tất !',
       type: 'success',
     })
    }
}).catch((err) => {
    loading.value = false
    ElNotification({
            title: 'Thất bại',
            message: err,
            type: 'error',
        })
}).finally(() => {
    isEdit.value = false
}
)
}
const openAvatarDrawer = () => {
    drawerRef.value = true
}

const handleExceed: UploadProps["onExceed"] = (files) => {
  imageUpload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  imageUpload.value!.handleStart(file);
};
const onFileChange = (uploadFile: UploadFile) => {
  let fileType: string;
  if (uploadFile) {
    file.value = uploadFile.raw;
  }
  const reader: any = new FileReader();
  reader.onload = () => {
  userInfo.value.avatar = reader.result;
  fileType = reader.result.split(";")[0].split(":")[1];

  };
  reader.readAsDataURL(file.value);
};

const backToHomeUser = () => {
  router.push('/')
}

onMounted(async () => {
  loading.value = true
  await store.dispatch('getDocuments')
  await store.dispatch('getDocumentTypes')
  console.log(store.state.loginUser)
  userInfo.value = store.state.loginUser
  console.log(allUserDocuments.value)
  loading.value = false
})
</script>
<template>
  <!-- <div>User profile</div>
    <div>{{ userInfo }}</div> -->
  <el-drawer
    v-model="drawerRef"
    modal-class="sp-bootstrap"
    :size="'40%'"
    :close-on-click-modal="false">
    <div v-loading="loading">
      <el-upload
        ref="imageUpload"
        class="upload"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        list-type="picture-card"
        @change="onFileChange"
        accept="image/jpeg/png">
        <el-icon><Plus style="color: #ccc;" /></el-icon>
      </el-upload>
    </div>
    <el-button
      v-if="file"
      :loading="loading"
      type="primary"
      class="mt-3"
      @click="handleEditProfile"
      >Lưu ảnh</el-button
    >
  </el-drawer>
  <section style="background-color: #eee;">
    <div v-loading="loading" class="container py-5" style="height: 100vh;">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
            <div
              class="breadcrumb mb-0 align-items-center justify-content-between">
              <div
                @click="backToHomeUser"
                class="item"
                aria-current="page"
                style="cursor: pointer;">
                <i class="fa-sharp fa-solid fa-arrow-right-from-bracket"></i
                ><span> Trở về trang chủ </span>
              </div>
              <div
                @click="undoEditProfile"
                :class="['item', !isEdit && 'focus-tab']"
                aria-current="page"
                style="cursor: pointer;">
                <i class="fa-solid fa-user"></i
                ><span> Thông tin tài khoản </span>
              </div>
              <div
                :class="['edit-profile', isEdit && 'focus-tab']"
                style="cursor: pointer;"
                @click="editProfile">
                <i class="fa-solid fa-pen"></i>
                <span> Chỉnh sửa thông tin </span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                v-if="!userInfo?.avatar"
                src="../../../assets/image/blank.png"
                alt="avatar"
                class="rounded-circle img-fluid"
                style="width: 183px; height: 183px;" />
              <img
                v-else
                :src="userInfo?.avatar"
                alt="avatar"
                class="rounded-circle img-fluid"
                style="width: 183px; height: 183px;" />
              <h5 class="my-3">{{ userInfo.account }}</h5>
              <el-button type="primary" @click="openAvatarDrawer"
                >Tải ảnh lên</el-button
              >
            </div>
          </div>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-0">
              <h3 class="py-3">Liên hệ với chúng tôi</h3>
              <ul class="list-group list-group-flush rounded-3">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fas fa-globe fa-lg text-warning"></i>
                  <p class="mb-0">https://v-doc.com</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                  <p class="mb-0">v-doc</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-twitter fa-lg" style="color: #55acee;"></i>
                  <p class="mb-0">@v-doc</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                  <p class="mb-0">vdoc</p>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i
                    class="fab fa-facebook-f fa-lg"
                    style="color: #3b5998;"></i>
                  <p class="mb-0">V-Doc: Kho chia sẻ tài liệu</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div v-loading="loading" class="card mb-4">
            <div v-if="!isEdit" class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Tên tài khoản</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">{{ userInfo.account }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mật khẩu</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">{{ userInfo.password }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">{{ userInfo.email }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ngày sinh</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">
                    {{ moment(userInfo.dob).format('DD/MM/YYYY') }}
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mobile</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">{{ userInfo.phone }}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Address</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <p class="text-muted mb-0">{{ userInfo.address }}</p>
                </div>
              </div>
            </div>

            <!-- -------------------------edit----------------------------- -->

            <div v-else class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Tên tài khoản</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <input
                    type="text"
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.account" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mật khẩu</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <el-input
                    type="text"
                    style="border: none; outline: none;"
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.password"
                    show-password />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <input
                    type="text"
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.email" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ngày sinh</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <el-date-picker
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.dob" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Số điện thoại</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <input
                    type="text"
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.phone" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Địa chỉ</p>
                </div>
                <div
                  class="col-sm-9 d-flex align-items-center justify-content-between">
                  <!-- <p class="text-muted mb-0">{{ userInfo.account }}</p> -->
                  <input
                    type="text"
                    class="edit-input text-muted mb-0"
                    v-model="userInfo.address" />
                </div>
              </div>
              <hr />
              <el-button
                type="primary"
                @click="handleEditProfile"
                :loading="loading"
                >Lưu thông tin</el-button
              >
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4>Thông kê tài liệu của bạn</h4>
              <ul class="list-group list-group-flush rounded-3">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div>
                    <span style="font-weight: bold;">Số tài liệu đã đóng góp</span>
                  </div>
                  <p class="mb-0">{{ allUserDocuments.length }}</p>
                </li>
                <li
                v-for="(item, i) in documentsByType"
                  class="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div>
                    <i class="fa-solid fa-book me-2"></i>
                    <span>{{ displayType(item._id) }}</span>
                  </div>
                  <p class="mb-0">{{ item.documentData.length }}</p>
                </li>
                
                
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.edit-input, .edit-input:focus, .edit-input:hover {
    border: none;
    outline: none;
}

.focus-tab {
    span, i{

        color: #0d6efd;
    }
    border-bottom: 2px solid #0d6efd ;
}
</style>
