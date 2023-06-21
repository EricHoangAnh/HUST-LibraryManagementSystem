<template>
  <div class="search-center">
    <!-- <div class="sub-title my-2 text-sm text-gray-600">
      Hãy nhập tên tài liệu !
    </div> -->
    <div class="search-box d-flex justify-content-center">
      <el-input
        v-model="result"
        size="large"
        class="w-50 me-2"
        placeholder="Nhập tên tài liệu"
        @input="handleSearch"
      ></el-input>
      <el-button type="primary" size="large" @click="handleSearch"
        >Tìm kiếm <i class="fa-solid fa-magnifying-glass ms-2"></i
      ></el-button>
    </div>
  </div>
  <div v-loading="loading" class="search-result mt-5">
    <document-detail ref="documentDetailRef"></document-detail>
    <document-form ref="documentFormRef"></document-form>
    <template v-for="(document, i) in searchResult">
      <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div
                    class="bg-image hover-zoom ripple rounded ripple-surface"
                  >
                    <img :src="document?.photo" class="w-100" />
                    <a href="#!">
                      <div class="hover-overlay">
                        <div
                          class="mask"
                          style="background-color: rgba(253, 253, 253, 0.15)"
                        ></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-6">
                  <h5 class="fw-bold">
                    {{ `[${document.documentCode}]  ` + document.name }}
                  </h5>
                  <p class="description mb-4 mb-md-0 fst-italic">
                    <!-- There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. -->
                    {{ document.description }}
                  </p>
                </div>
                <div
                  class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start d-flex flex-column justify-content-center"
                >
                  <div class="d-flex flex-column">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      type="button"
                      @click="getDocumentById(document)"
                    >
                      <i class="fa-solid fa-circle-info"></i>
                      Thông tin
                    </button>
                    <button
                      class="btn btn-primary btn-sm mt-2"
                      type="button"
                      @click="editDocumentById(document)"
                    >
                      <i class="fa-sharp fa-solid fa-file-pen"></i>
                      Chỉnh sửa
                    </button>
                    <button
                      v-if="document?.file"
                      class="btn btn-outline-primary btn-sm mt-2"
                      type="button"
                      @click="downloadFile(document?.file?.id, document?.name)"
                    >
                      <i class="fa-sharp fa-solid fa-file-arrow-down"></i>
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

<script lang="ts" setup>
import axiosClient from "@/common/api/axiosClient";
import { IDocument } from "@/common/model";
import store from "@/store";
import { ElNotification } from "element-plus";
import { computed, onMounted, ref } from "vue";
const result = ref();
const loading = ref<boolean>(false);
const allDocuments = computed<IDocument[]>(() => store.state.documents);
const searchResult = ref<IDocument[]>([]);
const documentDetailRef = ref();
const documentFormRef = ref();
const documentData = ref<IDocument>();
const getDocumentById = async (doc: IDocument) => {
  documentData.value = allDocuments.value.find(
    (document: IDocument) => document._id === doc._id
  );

  documentDetailRef.value?.showFormDialog(documentData.value);
};
const editDocumentById = async (doc: IDocument) => {
  documentData.value = allDocuments.value.find(
    (document: IDocument) => document._id === doc._id
  );
  documentFormRef.value?.showFormDialog(documentData.value);
};
const downloadFile = async (fileId: any, filename: any) => {
  await axiosClient
    .get(`/download/${fileId}`, { responseType: "arraybuffer" })
    .then((res: any) => {
      if (res) {
        console.log(res);
        const blob = new Blob([res], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}.pdf`); // Thay thế bằng tên file và đuôi mở rộng tương ứng
        document.body.appendChild(link);
        link.click();
      } else {
        ElNotification({
          title: "Thất bại",
          message: "Không tìm thấy tài liệu để tải",
          type: "error",
        });
      }
    })
    .catch((err) => {
      ElNotification({
        title: "Thất bại",
        message: err,
        type: "error",
      });
    });
};

const handleSearch = () => {
  const resultDoc = allDocuments.value.filter((document: IDocument) => {
    return document?.name?.includes(result.value);
  });
  if (result.value === "") {
    searchResult.value = [];
  }
  else {
    searchResult.value = resultDoc
  }
};

onMounted(async () => {
  await store.dispatch("getDocuments");
});
</script>

<style scoped lang="scss">
.inline-input {
  height: 40px;
}
</style>
