<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {Plus} from '@element-plus/icons-vue';
import store from '@/store'
import { IType, RequestSatus } from '@/common/model';
import { ElMessageBox, ElNotification } from 'element-plus';
import axiosClient from '@/common/api/axiosClient';
import DocumentForm from '@/components/common/document/DocumentForm.vue';



const loading = ref<boolean>(false)
const loadingButton = ref<any>({})
const documentFormRef = ref()
const tabActive = ref(0)

const loginUser = computed<any>(() => store.state.loginUser)
const requestDatas = computed<any[]>(() => store.state.requests.filter((request: any) => request.userId === loginUser.value._id))
const allTypes = computed<IType[]>(() => store.state.documentTypes)

const myReqDatas = computed<any[]>(() => {
  if(tabActive.value === 0) {
    return requestDatas.value.filter((request) => request.status === 1)
  }
  else if(tabActive.value === 1) {
    return requestDatas.value.filter((request) => { return request.status === 2 || request.status === 3})
  }
  return requestDatas.value.filter((request) => request.status === 0)
})

const getValue = (value: any) => {
  return RequestSatus[value]
}


const menuTab = [
    'Chờ phê duyệt', 'Đã chấp thuận', 'Đã hủy'
]

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

const refreshData = async () => {
  loading.value = true
  await store.dispatch('getRequests')
  //  const res = await store.getters.getAllDocumentsDatas
  //  console.log(res)
  //  myReqDatas.value = res
   loading.value = false
}


const createRequest = () => {
  documentFormRef.value?.showFormDialog({}, 'Add')
}

const updateRequest = (item: any) => {
  documentFormRef.value?.showFormDialog(item, 'Edit')

}

const deleteRequest = async(id: any) => {
  await ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa yêu cầu này ?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
    loading.value = true
     const res = await axiosClient.delete(`request/${id}`)
     if(res) {
      console.log(res)
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
   await store.dispatch('getRequests')
   loading.value = false

}
const handleTabActive = (tab: any, index: any) => {
  console.log(myReqDatas.value)
  console.log(requestDatas.value)
    tabActive.value = index
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

const displayType = (id: any) => {
  const type = allTypes.value.find((type: IType) => type._id === id)
  console.log(type)
  return type?.title
}

onMounted(async () => {
  loading.value = true
  await store.dispatch('getDocumentTypes')
  await store.dispatch('getRequests')
  await store.dispatch("getLoginUser")
  console.log(myReqDatas.value)
  loading.value = false
})
</script>
<template>
  <DocumentForm ref="documentFormRef"></DocumentForm>
  <div class="my-request">
    <div class="request-list-menu">
      <ul class="menu-list d-flex flex-row">
        <template v-for="(tab, i) in menuTab">
          <li
            class="request-list-menu-item py-2 px-3"
            :class="[ tabActive === i &&'active']"
            @click="handleTabActive(tab, i)">
            {{ tab }}
          </li>
        </template>
      </ul>
    </div>
    <div class="my-request-table">
      <el-table
        v-loading="loading"
        :data="myReqDatas"
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
        <el-table-column prop="status" label="Trạng thái" min-width="150">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <i
                class="me-1 dot rounded-circle"
                :style="{
                  width: '0.35rem',
                  aspectRatio: '1/1',
                  backgroundColor: ReqStatusColor[getValue(scope.row?.status) as keyof typeof ReqStatusColor]
                }"
                aria-hidden="true"
              ></i>
              <span class="d-inline-block">{{ ReqStatusLabel[getValue(scope.row.status) as keyof typeof ReqStatusLabel] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <div>
              <!-- <i
                class="fa-solid fa-pen me-4"
                style="cursor: pointer;"
                @click="updateRequest(scope.row)"></i> -->
              <i
                class="fa-solid fa-trash-can"
                style="cursor: pointer;"
                @click="deleteRequest(scope.row._id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.menu-list {
    list-style-type: none;
    padding-left: 0;
    .request-list-menu-item{
        cursor: pointer;
    }
    .active {
        color: #3A36DB;
        border-bottom: 1px solid #3A36DB ;
    }

}
.my-request-create {
float: left;
margin-bottom: 10px;
  
}
</style>
