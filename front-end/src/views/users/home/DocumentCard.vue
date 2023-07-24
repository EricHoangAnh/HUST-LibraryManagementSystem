<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument } from '@/common/model';
import store from '@/store';
import { ElNotification } from 'element-plus';
import { computed, ref } from 'vue';
import DocumentDetail from '@/components/common/document/DocumentDetail.vue';

const prop = defineProps<{
    data?: any
}>()
const documentDetailRef = ref()
const documentDatas = computed (() => store.state.documents)
const documentData = ref<IDocument>()
const loading = ref(false)
const loadingButton = ref<any>({})

const getDocumentById = async (doc: IDocument) => {

documentData.value = documentDatas.value.find(
  (document: IDocument) => document._id === doc._id
);
console.log(documentData.value)
documentDetailRef.value?.showFormDialog(documentData.value);
};

const downloadFile = async (fileId: any, filename: any) => {
  loading.value = true
  loadingButton.value[fileId] = true
await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)
    const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        if(url) {
          window.open(url, '_blank')?.focus()
        }

          // const link = document.createElement('a');
          // link.href = url;
          // link.setAttribute('download', `${filename}.pdf`); // Thay thế bằng tên file và đuôi mở rộng tương ứng
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
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
  loading.value = false
  loadingButton.value[fileId] = false
})
}
</script>
<template>
  <el-scrollbar>
    <div class="document-wrapper mt-5 mb-5">
      <document-detail ref="documentDetailRef"></document-detail>
      <div class="wrapper d-flex mt-5 px-4">
        <template v-for="(item, i) in prop?.data">
          <div class="document-card me-5">
            <img v-if="item.photo" :src="item.photo" />
            <img v-else src="../../../assets//image/document-background.png" />
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <div class="col-md-12 d-flex flex-column justify-content-center">
              <div class="d-flex flex-column">
                <el-button
                  class="ms-0"
                  type="primary"
                  @click="getDocumentById(item)"
                  plain>
                  <i class="fa-solid fa-circle-info me-2"></i>
                  Thông tin
                </el-button>
                <el-button
                  v-if="item?.file"
                  class="ms-0 mt-2"
                  type="primary"
                  :loading="loadingButton[item?.file?.id]"
                  @click="downloadFile(item?.file?.id, item?.name)">
                  <i class="fa-solid fa-file-pdf me-2"></i>
                  Xem trước
                </el-button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </el-scrollbar>
</template>
<style scoped lang="scss">
.document-card {
  background-color: #fff;
    padding: 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 6px #00000029;
    img {
        border-radius: 10px;
        width: 200px;
        height: 200px;
    }
    color: black;
    p {
      white-space: pre-wrap;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
}
</style>
