<script setup lang="ts">
import store from '@/store';
import { computed, onMounted, ref } from 'vue';
import {Plus} from '@element-plus/icons-vue';
import DocumentTypeForm from './DocumentTypeForm.vue';
import DocumentForm from '@/components/common/document/DocumentForm.vue';
import axiosClient from '@/common/api/axiosClient';
import { ElMessageBox, ElNotification } from 'element-plus';
import { IDocument, IType, RequestSatus } from '@/common/model';

const loading = ref(false)
const typeFormRef = ref()
const loadingButton = ref<any>({})
const loginUser = computed<any>(() => store.state.loginUser)
const documentData = ref<IDocument>()
const canUpload = ref<any>({})

const ReqStatusColor = {
  UserCancel: '#909399',
  Rejected : '#C2582D',
  Pending : '#E6A23C',
  Approved :'#409EFF',
  Completed : '#3E940E',
}
const ReqStatusLabel = {
  UserCancel: 'Đã hủy',
  Rejected: 'Bị từ chối',
  Pending: 'Chờ phê duyệt',
  Approved: 'Đã được duyệt',
  Completed: 'Đã được đăng',
};

const getValue = (value: any) => {
  return RequestSatus[value]
}

const allUserDocuments = computed<IDocument[]>(() => store.state.userDocuments.filter((doc: IDocument) => doc.userId === loginUser.value._id))
const allTypes = computed<IType[]>(() => store.state.documentTypes)
const userRequest = computed<any>(() => store.state.requests.filter((req: any) => req.userId === loginUser.value._id))

const datas = computed(() => {
  const data = allUserDocuments.value.map((doc: IDocument) => {
    const request = userRequest.value.find((req: any) => req.docId === doc._id)
    const document = {... doc, status: request?.status, docId: request?.docId, reqId: request?._id }
    return document
  })
  return data
})

const createType = () => {
    typeFormRef.value.showFormDialog({}, "Add")
}
const editDocumentById = async (doc: IDocument) => {
  documentData.value = datas.value.find(
    (document: IDocument) => document._id === doc._id
  );
  typeFormRef.value?.showFormDialog({...documentData.value});
};
const sendRequest = async (item: IDocument) => {
  console.log(item)
  await ElMessageBox.confirm(
    'Bạn có chắc chắn muốn gửi yêu cầu đến admin để đăng tài liệu này lên trang chủ ?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    loading.value = true
     const res = await axiosClient.post('request', {...item, docId: item?._id})
     if(res) {
      console.log(res)
      ElNotification({
         title: 'Thành công',
         message: 'Đã gửi yêu cầu đăng tài liệu thành công',
         type: 'success',
       })

     }
     else {
      ElNotification({
         title: 'Thất bại',
         message: 'Gửi yêu cầu đăng tài liệu thất bại, hãy thử lại',
         type: 'error',
       })
     }
  })
  .catch((err) => {
    console.log(err)
    ElNotification({
         title: 'Thất bại',
         message: err,
         type: 'error',
       })
   })
   await store.dispatch('getRequests')
   await store.dispatch('getUserDocuments')
   loading.value = false
}
const deleteDocument = async (item: any) => {
  console.log(item)
  await ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa tài liệu này ?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
    loading.value = true
     const res = await axiosClient.delete(`user-document/${item._id}`)
     if(res) {
      if(item.reqId) {
        await axiosClient.delete(`request`,{data: item}).then((res) => {})
      .catch((err) => {
       console.log(err)
       ElNotification({
         title: 'Thất bại',
         message: err,
         type: 'error',
            })
      })  

      }
      if(item.status === 3) {
        await axiosClient.delete(`user-action-document`,{data: item}).then((res) => {})
      .catch((err) => {
       console.log(err)
       ElNotification({
         title: 'Thất bại',
         message: err,
         type: 'error',
            })
      })  
    }
    
      ElNotification({
         title: 'Thành công',
         message: 'Đã xóa tài liệu thành công',
         type: 'success',
       })

     }
     else {
      ElNotification({
         title: 'Thất bại',
         message: 'Xóa tài liệu thất bại, hãy thử lại',
         type: 'error',
       })
     }
   }).catch((err) => {
    console.log(err)
    ElNotification({
         title: 'Thất bại',
         message: err,
         type: 'error',
       })
   })
   await store.dispatch('getUserDocuments')
   loading.value = false
}

const displayType = (id: any) => {
  const type = allTypes.value.find((type: IType) => type._id === id)
  return type?.title
}

const previewPDF = async (fileId: any, id:any) => {
  loadingButton.value[id] = true
  await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)
    const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        if(url) {
          console.log(url)
          window.open(url, '_blank')?.focus()
        }
  }
  else {
    ElNotification({
       title: 'Thất bại',
       message: 'Không tìm thấy tài liệu để tải',
       type: 'error',
     })
  }
}).catch((err) => {
  ElNotification({
       title: 'Thất bại',
       message: err,
       type: 'error',
     })
}).finally(() => {
  loadingButton.value[id] = false
})

}



onMounted(async () => {
  loading.value = true
  await store.dispatch('getDocumentTypes')
  await store.dispatch('getUserDocuments')
  await store.dispatch('getRequests')
  await store.dispatch("getLoginUser")
  console.log(userRequest.value)
  loading.value = false
})
</script>
<template>
  <div class="document-type">
    <DocumentForm ref="typeFormRef"></DocumentForm>
    <div
      class="document-type-create d-flex align-items-center"
      @click="createType">
      <el-icon><Plus /></el-icon> <span>Thêm tài liệu mới</span>
    </div>
    <div class="document-type-table">
      <el-table
        v-loading="loading"
        :data="datas"
        style="width: 100%; margin-top: 30px;">
        <el-table-column
          prop="name"
          label="Tên tài liệu"
          min-width="100"></el-table-column>
        <el-table-column
          prop="documentCode"
          label="Mã tài liệu"
          min-width="100"></el-table-column>
        <el-table-column label="Thể loại" min-width="100">
          <template #default="scope">
            {{ displayType(scope.row?.documentTypeId) }}
          </template>
        </el-table-column>
        <el-table-column prop="author" label="Tác giả"></el-table-column>
        <el-table-column
          prop="description"
          label="Mô tả"
          min-width="100"></el-table-column>
        <el-table-column prop="file" label="Tệp đính kèm" min-width="150">
          <template #default="scope">
            <el-button
              v-if="scope.row.file"
              type="primary"
              link
              @click="previewPDF(scope.row.file?.id, scope.row._id)"
              :loading="loadingButton[scope.row._id]"
              >Xem tài liệu</el-button
            >
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <i
              class="fa-solid fa-pen me-4"
              style="cursor: pointer;"
              @click="editDocumentById(scope.row)"></i>
            <i
              class="fa-solid fa-trash-can me-4"
              style="cursor: pointer;"
              @click="deleteDocument(scope.row)"></i>

            <div v-if="scope.row.status" class="d-flex align-items-center">
              <i
                class="me-1 dot rounded-circle"
                :style="{
                  width: '0.35rem',
                  aspectRatio: '1/1',
                  backgroundColor: ReqStatusColor[getValue(scope.row?.status) as keyof typeof ReqStatusColor]
                }"
                aria-hidden="true"></i>
              <span
                class="d-inline-block"
                >{{ ReqStatusLabel[getValue(scope.row?.status) as keyof typeof ReqStatusLabel] }}</span
              >
            </div>
            <i
              v-else
              class="fa-solid fa-cloud-arrow-up"
              style="cursor: pointer;"
              @click="sendRequest(scope.row)"></i>
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
</style>
