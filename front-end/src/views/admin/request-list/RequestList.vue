<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import {
  Check,
  Close
} from '@element-plus/icons-vue'
import store from '@/store';
import axiosClient from '@/common/api/axiosClient';
import { ElMessageBox, ElNotification } from 'element-plus';
import moment from 'moment';
import { IType } from '@/common/model';
const menuTab = [
    'Chờ phê duyệt', 'Đã chấp thuận', 'Đã hủy'
]
const tabActive = ref(0)
const allUsers = computed(() => store.state.users)
const allRequests = computed(() => store.state.requests)
const allDocumentTypes = computed<IType[]>(() => store.state.documentTypes)
const loadingButton = ref<any>({})
const loading = ref(false)

const userInfo = (id: any) => {
  const user = allUsers.value.find((user: any) => user._id === id)
  return user
}
const typeInfo = (id : any) => {
  const type = allDocumentTypes.value.find((type: any) => type._id === id)
  return type
}

const displayType = (typeId: any) => {
  const type: any = allDocumentTypes.value.find((type: any) => type._id === typeId)
  return type?.title
}


const requestDatas = computed<any[]>(() => {
  let datas: any[] =[]
  allRequests.value.forEach((request: any) => {
    const requestObj = {...request, userInfo: userInfo(request.userId), typeInfo: typeInfo(request.documentTypeId) }
    datas.push(requestObj)
  })
  return datas
})
// const stringN = `                <li class='list-group-item d-flex justify-content-between align-items-center p-3'>
//                   <i class='fa-solid fa-user'></i>
//                   <p class='mb-0'>${scope.row.userInfo?.gender === 'Male' ? 'Nam' : scope.row.userInfo?.gender === 'Female' ? 'Nữ': 'Khác'}</p>
//                 </li>
//                 <li
//                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
//                   <i class="fa-solid fa-at"></i>
//                   <p class='mb-0'>${ scope.row.userInfo?.email }}</p>
//                 </li>
//                 <li
//                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
//                   <i class="fa-solid fa-phone"></i>
//                   <p class='mb-0'>${scope.row.userInfo?.phone}</p>
//                 </li>
//                 <li
//                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
//                   <i class="fa-solid fa-location-dot"></i>
//                   <p class='mb-0'>${ scope.row.userInfo?.address }</p>
//                 </li>
//                 <li
//                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
//                   <i class="fa-solid fa-cake-candles"></i>
//                   <p class='mb-0'>${scope.row.userInfo?.dob}</p>
//                 </li>`



const requests = computed<any[]>(() => {
  if(tabActive.value === 0) {
    return requestDatas.value.filter((request) => request.status === 1)
  }
  else if(tabActive.value === 1) {
    return requestDatas.value.filter((request) => request.status === 2 || request.status === 3)
  }
  return requestDatas.value.filter((request) => request.status === 0)
})



const approveRequest = async (id: any) => {
const temp = {
  status: 2
}
loading.value = true
await axiosClient.put(`request/${id}`, temp).then(async (res) => {
  if(res) {

  }
  else {
    ElNotification({
       title: 'Thất bại',
       message: 'Tải tài liệu lên thất bại, hãy thử lại',
       type: 'error',
     })
   }
 }).catch((err) => {
  console.log(err)
  ElNotification({
       title: 'Thất bại',
       message: 'Tải tài liệu lên server thất bại, hãy kiểm tra lại',
       type: 'error',
     })
 })
 await store.dispatch('getRequests');
//  await store.getters('getAllRequestsDatas')
//  debugger
 loading.value = false
 ElNotification({
       title: 'Thành công',
       message: 'Phê duyệt tài liệu thành công',
       type: 'success',
     })
}
const rejectRequest = async (id: any) => {
  const temp = {
    status: 0
  }
  loading.value = true
  await axiosClient.put(`request/${id}`, temp).then(async (res) => {
  if(res) {

  }
  else {
    ElNotification({
       title: 'Thất bại',
       message: 'Tải tài liệu lên thất bại, hãy thử lại',
       type: 'error',
     })
   }
 }).catch((err) => {
  console.log(err)
  ElNotification({
       title: 'Thất bại',
       message: 'Tải tài liệu lên server thất bại, hãy kiểm tra lại',
       type: 'error',
     })
 })
 await store.dispatch('getRequests');
//  await store.getters('getAllRequestsDatas')
//  debugger
     loading.value = false
     ElNotification({
       title: 'Thành công',
       message: 'Phê duyệt tài liệu thành công',
       type: 'success',
     })

}

const handleApproveRequest = async (id: any) => {
  try {
    await ElMessageBox.confirm('Bạn chắc chấn chấp thuận yêu cầu này chứ ?', 'Cảnh báo', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    });
    await approveRequest(id)
  } catch (error) {
    console.log('cancel');
  }
}
const handleRejectRequest = async (id: any) => {
  try {
    await ElMessageBox.confirm('Bạn chắc chấn hủy yêu cầu này chứ ?', 'Cảnh báo', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    });
    await rejectRequest(id)
  } catch (error) {
    console.log('cancel');
  }
}

const handleTabActive = (tab: any, index: any) => {
    tabActive.value = index
}

const handlePostDocument = async (item: any) => {
  try {
    console.log(item)
    await ElMessageBox.confirm('Bạn chắc chấn muốn đăng tài liệu này lên trang chủ ?', 'Cảnh báo', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    });
    await postDocument(item)
  } catch (error) {
    console.log('cancel');
  }
}

const postDocument = async (item: any) => {

loading.value = true
    await axiosClient.post('request-document', {...item, createdAt: moment().format("DD-MM-YYYY"), lastUpdated: moment().format("DD-MM-YYYY")}).then(async (res) => {
     if(res) {
      await axiosClient.put(`request/${item._id}`, {status: 3})
       ElNotification({
         title: 'Thành công',
         message: 'Tải tài liệu lên thành công',
         type: 'success',
       })


     }
     else {
      ElNotification({
         title: 'Thất bại',
         message: 'Tải tài liệu lên thất bại, hãy thử lại',
         type: 'error',
       })
     }
   }).catch((err) => {
    console.log(err)
    ElNotification({
         title: 'Thất bại',
         message: 'Tải tài liệu lên server thất bại, hãy kiểm tra lại',
         type: 'error',
       })
   })
   await store.dispatch('getDocuments')
   await store.dispatch('getRequests')
  loading.value = false

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
    await store.dispatch('getRequests');
    await store.dispatch('getUsers');
    // getRequestsDatas()
})
</script>
<template>
  <div class="request-list">
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
    <div class="request-list-table">
      <el-table v-loading="loading" :data="requests" style="width: 100%">
        <el-table-column prop="name" label="Tên tài liệu" min-width="120" />
        <el-table-column prop="type" label="Thể loại" min-width="100">
          <template #default="scope">
            {{ displayType(scope.row?.documentTypeId) }}
          </template>
        </el-table-column>
        <el-table-column prop="author" label="Tác giả" min-width="100" />
        <el-table-column prop="description" label="Mô tả" />
        <el-table-column prop="userId" label="Người yêu cầu" min-width="150">
          <template #default="scope">
            <el-tooltip
              effect="light"
              :content="`<ul class='list-group list-group-flush rounded-3'>
              <li class='list-group-item d-flex justify-content-between align-items-center p-3'>
                   <i class='fa-solid fa-user'></i>
                   <p class='mb-0'>${scope.row.userInfo?.gender === 'Male' ? 'Nam' : scope.row.userInfo?.gender === 'Female' ? 'Nữ': 'Khác'}</p>
                 </li>
                <li
                  class='list-group-item d-flex justify-content-between align-items-center p-3'>
                 <i class='fa-solid fa-at pe-3'></i>
                   <p class='mb-0'>${ scope.row.userInfo?.email }</p>
                 </li>
                 <li
                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
                   <i class='fa-solid fa-phone pe-3'></i>
                   <p class='mb-0'>${scope.row.userInfo?.phone}</p>
                 </li>
                 <li
                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
                  <i class='fa-solid fa-location-dot pe-3'></i>
                   <p class='mb-0'>${ scope.row.userInfo?.address }</p>
                </li>
                 <li
                  class='list-group-item d-flex justify-content-between align-items-center p-3'>
                  <i class='fa-solid fa-cake-candles pe-3'></i>
                  <p class='mb-0'>${moment(scope.row.userInfo?.dob).format('DD/MM/YYYY')}</p>
                </li>

              </ul>`"
              raw-content>
              <div class="user-info d-flex align-items-center">
                <img
                  v-if="!scope.row.userInfo.avatar"
                  src="../../../assets/image/blank.png"
                  style="width: 30px; height: 30px; border-radius: 50%;" />
                <img
                  v-else
                  :src="scope.row.userInfo.avatar"
                  style="width: 30px; height: 30px; border-radius: 50%;" />
                <span
                  style="padding: 2px 8px;"
                  >{{ scope.row.userInfo.account }}</span
                >
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="file" label="Tệp đính kèm" min-width="160">
          <template #default="scope">
            <el-button
              type="primary"
              link
              @click="previewPDF(scope.row.file?.id, scope.row._id)"
              :loading="loadingButton[scope.row._id]"
              >Xem tài liệu</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="Ngày gửi yêu cầu"
          min-width="150" />
        <el-table-column v-if="tabActive === 0" min-width="100">
          <template #default="scope">
            <el-button
              type="success"
              :icon="Check"
              circle
              @click="handleApproveRequest(scope.row._id)" />
            <el-button
              type="danger"
              :icon="Close"
              circle
              @click="handleRejectRequest(scope.row._id)" />
          </template>
        </el-table-column>
        <el-table-column v-if="tabActive === 1" min-width="120">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 2"
              type="success"
              @click="handlePostDocument(scope.row)">
              Đăng tải
            </el-button>
            <div v-if="scope.row.status === 3">
              <i
                class="me-1 dot rounded-circle"
                :style="{
                    height:'0.35rem',
                    width: '0.35rem',
                    aspectRatio: '1/1',
                    backgroundColor: '#3E940E',
                  }"></i>
              <span style="color: #3E940E;">Đã đăng tải</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.request-list {
}
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
</style>
