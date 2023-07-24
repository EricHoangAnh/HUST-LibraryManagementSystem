<script setup lang="ts">
import store from '@/store';
import { computed, onMounted, ref } from 'vue';
import {Plus} from '@element-plus/icons-vue';
import DocumentTypeForm from './DocumentTypeForm.vue';
import axiosClient from '@/common/api/axiosClient';
import { ElMessageBox, ElNotification } from 'element-plus';

const loading = ref(false)
const typeFormRef = ref()

const allDocumentType = computed(() => store.state.documentTypes)

const createType = () => {
    typeFormRef.value.showFormDialog({}, "Add")
}

const updateType = (item: any) => {
    typeFormRef.value.showFormDialog(item, "Edit")
}

const deleteType = async (item: any) => {
    ElMessageBox.confirm(
    `Bạn có chắc chắn muốn xóa thể loại ${item?.title} ?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
        loading.value = true
    await axiosClient.delete(`document-type/${item._id}`).then((res) => {
        if(res) {
       ElNotification({
         title: 'Thành công',
         message: 'Xóa thể loại thành công',
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
    await store.dispatch('getDocumentTypes')
    loading.value = false

    })
    .catch((err) => {
      console.log(err)
    })


}

onMounted(async () => {

})
</script>
<template>
  <div class="document-type">
    <DocumentTypeForm ref="typeFormRef"></DocumentTypeForm>
    <div
      class="document-type-create d-flex align-items-center"
      @click="createType">
      <el-icon><Plus /></el-icon> <span>Thêm thể loại mới</span>
    </div>
    <div class="document-type-table">
      <el-table v-loading="loading" :data="allDocumentType" style="width: 100%; margin-top: 30px;">
        <el-table-column
          prop="title"
          label="Tên thể loại"
          min-width="100"></el-table-column>
        <el-table-column
          prop="note"
          label="Mô tả"
          min-width="100">
          <template #default="scope">
            <el-tooltip :content="scope.row.note" placement="top">
              <div class="campscomp-equipment-propertymgt-explain">{{ scope.row.note }}</div>
            </el-tooltip>
          </template></el-table-column>
        <el-table-column>
          <template #default="scope">
            <i
              class="fa-solid fa-pen me-4"
              style="cursor: pointer;"
              @click="updateType(scope.row)"></i>
            <i
              class="fa-solid fa-trash-can"
              style="cursor: pointer;"
              @click="deleteType(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.document-type-create {
    cursor: pointer;
    display: inline-block;
}
.campscomp-equipment-propertymgt-explain {
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 8em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
