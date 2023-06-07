<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument } from '@/common/model';
import { ElMessageBox, ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';

const drawerRef = ref()
const loading = ref<boolean>(false)
const documentModel = ref<IDocument>()


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
const downloadFile = async (fileId: any, filename: any) => {
  // loading.value = true
await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)
    // loading.value = false
    const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename); // Thay thế bằng tên file và đuôi mở rộng tương ứng
          document.body.appendChild(link);
          link.click();
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
}

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
    <template #header>
      <div class="campscomp-roomform-header">
        <span class="campscomp-roomform-headertitle campsui-text-body"
          >Thông tin tài liệu</span
        >
      </div>
    </template>
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
              {{ documentModel?.documentTypeId }}
            </div>
          </div>
          <div class="campscomp-roomform-infoitem">
            <div class="campscomp-infoitem-title">Mô tả</div>
            <div class="campscomp-infoitem-value">
              {{ documentModel?.description }}
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
                @click="downloadFile(documentModel?.file?.id, documentModel?.name)"
                >Tải xuống</el-button
              >
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
