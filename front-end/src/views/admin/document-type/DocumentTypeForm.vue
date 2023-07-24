<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import store from "@/store";
import { IType } from "../../../common/model";
import axiosClient from "../../../common/api/axiosClient"
import { ElNotification } from "element-plus";


const drawerRef = ref<boolean>(false);

const loginUser = computed<any>(() => store.state.loginUser)
const loading = ref<boolean>(false)
const formType = ref<string>('')
const documentTypeFormRef = ref()

const showFormDialog = (item: IType, type: any) => {
  drawerRef.value = true
  console.log(item)
//   console.log(loginUser.value)
form._id = item._id
form.title = item.title
form.note = item.note
formType.value = type
}

const submitForm = async () => {
  loading.value = true
  console.log(form)
  if(formType.value === 'Add') {
    await axiosClient.post('document-type', form).then((res) => {
      if(res) {
         ElNotification({
           title: 'Thành công',
           message: 'Thêm thể loại thành công',
           type: 'success',
         })
          }
      }).catch((err) => {
          ElNotification({
           title: 'Thất bại',
           message: err,
           type: 'success',
         })
      })
  }
  else {
    await axiosClient.put(`document-type/${form._id}`, form).then((res) => {
      if(res) {
         ElNotification({
           title: 'Thành công',
           message: 'Cập nhật thể loại thành công',
           type: 'success',
         })
          }
      }).catch((err) => {
          ElNotification({
           title: 'Thất bại',
           message: err,
           type: 'error',
         })
      })
  }
  documentTypeFormRef.value.resetFields()
  loading.value = false
  drawerRef.value = false
  await store.dispatch('getDocumentTypes')
}

const form = reactive<IType>({
  title: '',
  note: '',
});

defineExpose({
  showFormDialog
})
</script>
<template>
  <el-drawer
    v-model="drawerRef"
    modal-class="sp-bootstrap"
    :size="'40%'"
    :close-on-click-modal="false">
    <h2>{{ formType === 'Add' ? 'Thêm thể loại mới' : 'Sửa thể loại' }}</h2>
    <div class="container">
      <el-form
        ref="documentTypeFormRef"
        v-loading="loading"
        :model="form"
        @submit.prevent
        class="d-flex flex-column">
        <label class="form-label">Tên thể loại</label>
        <el-form-item prop="documentTypeId">
          <el-input v-model="form.title" require></el-input>
        </el-form-item>
        <label class="form-label">Ghi chú</label>
        <el-form-item prop="name">
          <el-input v-model="form.note" type="textarea" required></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        native-type="submit"
        @click="submitForm"
        >{{formType === 'Add' ? 'Thêm mới': 'Chỉnh sửa'}}</el-button
      >
    </div>
  </el-drawer>
</template>
<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  text-align: left;
}
.asterisk-left .el-form-item__content {
  margin-left: 0 !important;
}
</style>
