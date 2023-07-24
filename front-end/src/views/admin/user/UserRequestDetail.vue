<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument } from '@/common/model';
import { ElMessageBox, ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';

const drawerRef = ref(false)
const loading = ref<boolean>(false)
const documentModel = ref<IDocument>()
const documentData = ref<any[]>([])


const showFormDialog = (item: any) => {
  drawerRef.value = true
  console.log(item)

  documentData.value = item
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
const previewFile = async (fileId: any) => {
  loading.value = true
await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)
    // loading.value = false
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
})
loading.value = false
}

defineExpose({
  showFormDialog
})
</script>
<template>
  <el-drawer
    v-model="drawerRef"
    modal-class="sp-bootstrap"
    v-loading="loading"
    :size="'40%'"
    :close-on-click-modal="false">
    <template #header>
      <div class="campscomp-roomform-header">
        <span class="campscomp-roomform-headertitle campsui-text-body"
          >Thông tin các tài liệu</span
        >
      </div>
    </template>
    <template #default>
      <div v-loading="loading" class="campscomp-roomform">
        <div class="campscomp-roomform-container">
          <div
            v-for="(item, i) in documentData"
            class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">{{ item?.name }}</div>
            <div
              class="campscomp-infoitem-value"
              @click="previewFile(item?.file.id)">
              {{ `${item?.name}.pdf`}}
            </div>
          </div>
        </div>
      </div>
    </template>
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
  cursor: pointer;
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
