<script setup lang="ts">
import axiosClient from '@/common/api/axiosClient';
import { IDocument } from '@/common/model';
import store from '@/store';
import { ElNotification } from 'element-plus';
import { ref, computed, onMounted } from 'vue';
import DocumentDetail from './DocumentDetail.vue'


const documentDetailRef = ref()
const isVisible = ref<boolean>(false)
const allDocuments = computed<IDocument[]>(() => store.state.documents)
const documentData = ref<IDocument>()
const loading = ref<boolean>(false)

const getDocumentById = async (doc: IDocument) => {
  documentData.value = allDocuments.value.find((document: IDocument) => document._id === doc._id)
  isVisible.value = true
  documentDetailRef.value?.showFormDialog(documentData.value)

}
const downloadFile = async (fileId: any, filename: any) => {
await axiosClient.get(`/download/${fileId}`, {responseType: 'arraybuffer'}).then((res: any) => {
  if(res) {
    console.log(res)
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

onMounted(async () => {
  await store.dispatch("getDocuments")
})
</script>
<template>
  <div class="container my-5">
    <document-detail ref="documentDetailRef"></document-detail>
    <template v-for="(document, i) in allDocuments">
      <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div
                    class="bg-image hover-zoom ripple rounded ripple-surface">
                    <img :src="document?.photo" class="w-100" />
                    <a href="#!">
                      <div class="hover-overlay">
                        <div
                          class="mask"
                          style="background-color: rgba(253, 253, 253, 0.15)"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-6">
                  <h5 class="fw-bold">{{ document.name }}</h5>
                  <p class="description mb-4 mb-md-0 fst-italic col-8">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>
                </div>
                <div
                  class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start d-flex flex-column justify-content-center">
                  <div class="d-flex flex-column">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      @click="getDocumentById(document)">
                      Thông tin chi tiết
                    </button>
                    <button
                      class="btn btn-outline-primary btn-sm mt-2"
                      type="button"
                      @click="downloadFile(document?.file?.id, document?.file?.filename)">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.description {
  display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
