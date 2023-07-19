<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument } from '@/common/model';
import store from '@/store';
import { ElMessageBox, ElNotification } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import moment from 'moment';

const drawerRef = ref()
const loading = ref<boolean>(false)
const documentModel = ref<IDocument>()
const allTypes = computed(() => store.state.documentTypes)
const allUsers = computed(() => store.state.users)


const displayUser = computed<any>(() => {
const data = allUsers.value.find((user: any) => user._id === documentModel.value?.userId )
console.log(data)
return data
})



const showFormDialog = (item: IDocument) => {
  drawerRef.value = true
  console.log(item)
  documentModel.value = item
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const displayType = (typeId: any) => {
  const type: any = allTypes.value.find((type: any) => type._id === typeId)
  return type?.title
}

const downloadFile = async (fileId: any, filename: any) => {
  loading.value = true
await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)

    const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          if(url) {
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
})
  loading.value = false
}
onMounted(() => {
  console.log(displayUser.value)
})
defineExpose({
  showFormDialog
})
</script>
<template>
  <el-drawer
    v-loading="loading"
    v-model="drawerRef"
    modal-class="sp-bootstrap"
    :size="'40%'"
    :close-on-click-modal="false">
    <div>
      <div>
        <div class="campscomp-roomform-header mb-4">
          <span class="campscomp-roomform-headertitle campsui-text-body"
            >Thông tin tài liệu</span
          >
        </div>
      </div>
      <div class="campscomp-roomform">
        <div class="campscomp-roomform-container">
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Tên tài liệu</div>
            <div class="campscomp-infoitem-value">{{ documentModel?.name}}</div>
          </div>
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Tác giả</div>
            <div class="campscomp-infoitem-value">
              {{ documentModel?.author }}
            </div>
          </div>
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Thể loại</div>
            <div class="campscomp-infoitem-value">
              {{ displayType(documentModel?.documentTypeId) }}
            </div>
          </div>
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Mô tả</div>
            <div class="campscomp-infoitem-value">
              {{ documentModel?.description }}
            </div>
          </div>
          <div v-if="displayUser && displayUser?.role === 'user'" class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Người đăng</div>
            <div class="campscomp-infoitem-value d-flex align-items-center">
              <img
                v-if="displayUser.avatar"
                :src="displayUser.avatar"
                style="width: 30px; height: 30px; border-radius: 50%;" />
              <img
                v-else
                src="../../../assets/image/blank.png"
                style="width: 30px; height: 30px; border-radius: 50%;" />
              <el-tooltip
                effect="light"
                :content="`<ul class='list-group list-group-flush rounded-3'>
              <li class='list-group-item d-flex justify-content-between align-items-center p-3'>
                   <i class='fa-solid fa-user'></i>
                   <p class='mb-0'>${displayUser.gender === 'Male' ? 'Nam' : displayUser.gender === 'Female' ? 'Nữ': 'Khác'}</p>
                 </li>
                <li
                  class='list-group-item d-flex justify-content-between align-items-center p-3'>
                 <i class='fa-solid fa-at pe-3'></i>
                   <p class='mb-0'>${ displayUser.email }</p>
                 </li>
                 <li
                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
                   <i class='fa-solid fa-phone pe-3'></i>
                   <p class='mb-0'>${displayUser.phone}</p>
                 </li>
                 <li
                   class='list-group-item d-flex justify-content-between align-items-center p-3'>
                  <i class='fa-solid fa-location-dot pe-3'></i>
                   <p class='mb-0'>${ displayUser.address }</p>
                </li>
                 <li
                  class='list-group-item d-flex justify-content-between align-items-center p-3'>
                  <i class='fa-solid fa-cake-candles pe-3'></i>
                  <p class='mb-0'>${moment(displayUser.dob).format('DD/MM/YYYY')}</p>
                </li>

              </ul>`"
                raw-content>
                <span class="campscomp-infoitem-value">
                  {{ displayUser.account }}
                </span>
              </el-tooltip>
            </div>
          </div>
          <div class="campscomp-roomform-infoitem campscomp-roomform-photo">
            <div class="campscomp-infoitem-title">Ảnh</div>
            <div class="campscomp-infoitem-photo">
              <img v-if="documentModel?.photo" :src="documentModel.photo" />
            </div>
          </div>
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Link tài liệu</div>
            <div class="campscomp-infoitem-value">
              <el-button
                v-if="documentModel?.file"
                type="primary"
                link
                :loading="loading"
                @click="downloadFile(documentModel?.file?.id, documentModel?.name)"
                ><i class="fa-solid fa-file-pdf me-2"></i>Xem trước</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<style scoped lang="scss">
.campscomp-roomform-headertitle {
  font-weight: bold;
  font-size: 18px;
}
.campscomp-roomform-infoitem {
  display: flex;
  min-height: 34px;
  margin-bottom: 2px;
}

.campscomp-infoitem-title {
  min-width: 210px;
  padding: 8px;
  background: #f2f3f4;
  display: flex;
  align-items: center;

  & > p {
    width: 194px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
  }
}
.campscomp-infoitem-photo {
  width: 60%;
}
.campscomp-roomform-photo {
  height: 200px;

  img {
    padding: 8px;
    max-width: 100%;
    max-height: 208px;
  }
}

.campscomp-infoitem-value {
  padding: 8px;
}

.campscomp-form-title {
  padding-bottom: 24px;
  color: #242424;
  font-size: 14px;
  font-weight: bold;
}
.campscomp-roomform-bottom {
  text-align: right;
  margin-top: 24px;
}
</style>
