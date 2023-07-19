<template>
  <div v-loading="loading">
    <div class="search-center">
      <!-- <div class="sub-title my-2 text-sm text-gray-600">
        Hãy nhập tên tài liệu !
      </div> -->
      <div class="search-box d-flex justify-content-center">
        <el-input
          :autofocus="true"
          v-model="result"
          size="large"
          class="w-50 me-2"
          placeholder="Nhập tên tài liệu"
          @input="handleSearch"></el-input>
        <el-button type="primary" size="large" @click="handleSearch"
          >Tìm kiếm <i class="fa-solid fa-magnifying-glass ms-2"></i
        ></el-button>
      </div>
      <el-button
        v-if="isAdmin"
        class="document-type-create align-items-center mt-4"
        style="cursor: pointer; display: inline-flex;"
        type="primary"
        @click="createDocument">
        <el-icon><Plus /></el-icon> <span>Thêm thể loại mới</span>
      </el-button>
    </div>
    <div class="search-result mt-3">
      <document-detail ref="documentDetailRef"></document-detail>
      <document-form ref="documentFormRef" @refresh-data="refreshData"></document-form>
      <h3>Kết quả tìm kiếm {{ `(${searchResult.length} kết quả)` }}</h3>
      <div v-if="!searchResult.length" class="no-data mt-5 d-flex flex-column align-items-center">
      <img src="../../../assets/image/nodata.png" style="width: 200px; margin: 30px 0">
      <span>Không tìm thấy tài liệu, hãy thử lại !!!</span>
      </div>
      <div v-else>
        <template v-for="(document, i) in searchResult">
          <div class="row justify-content-center mb-3 mt-4">
            <div class="col-md-12 col-xl-10">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div
                        class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img v-if="!document.photo" src="../../../assets/image//document-background.png" style="height: 250px; background-size: cover;" />
                        <img v-else :src="document?.photo" style="height: 250px; background-size: cover;" />
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
                      class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start d-flex flex-column justify-content-center">
                      <div class="d-flex flex-column">
                        <el-button
                          class="ms-0"
                          type="primary"
                          @click="getDocumentById(document)"
                          plain>
                          <i class="fa-solid fa-circle-info me-2"></i>
                          Thông tin
                        </el-button>
                        <el-button
                          v-if="isAdmin"
                          class="ms-0 mt-2"
                          type="primary"
                          @click="editDocumentById(document)">
                          <i class="fa-sharp fa-solid fa-file-pen me-2"></i>
                          Chỉnh sửa
                        </el-button>
                        <el-button
                          v-if="isAdmin"
                          class="ms-0 mt-2"
                          type="danger"
                          @click="deleteDocument(document._id)">
                          <i class="fa-solid fa-trash-can me-2"></i>
                          Xóa tài liệu
                        </el-button>
                        <el-button
                          v-if="document?.file"
                          class="ms-0 mt-2"
                          type="primary"
                          :loading="loadingButton[document?.file?.id]"
                          @click="downloadFile(document?.file?.id, document?.name)">
                          <i class="fa-solid fa-file-pdf me-2"></i>
                          Xem trước
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axiosClient from "@/common/api/axiosClient";
import { IDocument, IType, IUser } from "@/common/model";
import store from "@/store";
import {Plus} from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import DocumentDetail from "../document/DocumentDetail.vue";
import DocumentForm from "../document/DocumentForm.vue";
import DocumentHome from "@/views/users/home/DocumentHome.vue";
const loadingButton = ref<any>({})

const result = ref();
const loading = ref<boolean>(false);
const allDocuments = computed<IDocument[]>(() => store.state.documents);
const documentDetailRef = ref();
const documentFormRef = ref();
const documentData = ref<IDocument>();
const allDocumentTypes = computed<IType[]>(() => store.state.documentTypes)
const loginUser = computed<any>(() => store.state.loginUser)
const isAdmin = ref<boolean>(loginUser.value.role === 'admin')
// const isAdmin = ref(true)


const refreshData = async () => {
  loading.value = true
  await store.dispatch('getDocuments')
   const res = await store.getters.getAllDocumentsDatas
   console.log(res)
   searchResult.value = res
   loading.value = false
}

const documentDatas = computed(() => {
  const datas = allDocuments.value.map((document: any) => {
    const type = allDocumentTypes.value.find((type: any) => type._id === document.documentTypeId )
    return {...document, typeInfo: type}
  })
  return datas

})
const searchResult = ref<IDocument[]>(documentDatas.value);

const createDocument = () => {
  documentFormRef.value.showFormDialog({}, "Add")
}

const getDocumentById = async (doc: IDocument) => {

  documentData.value = documentDatas.value.find(
    (document: IDocument) => document._id === doc._id
  );
  console.log(documentData.value)
  documentDetailRef.value?.showFormDialog(documentData.value);
};
const editDocumentById = async (doc: IDocument) => {
  documentData.value = documentDatas.value.find(
    (document: IDocument) => document._id === doc._id
  );
  documentFormRef.value?.showFormDialog(documentData.value);
};

const deleteDocument = async (id: any) => {
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
     const res = await axiosClient.delete(`document/${id}`)
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
   await store.dispatch('getDocuments')
   const res = await store.getters.getAllDocumentsDatas
   console.log(res)
   searchResult.value = res
   loading.value = false
    }


const downloadFile = async (fileId: any, filename: any) => {
  loading.value = true
  await axiosClient
    .get(`/download/${fileId}`, { responseType: "arraybuffer" })
    .then((res: any) => {
      if (res) {
        console.log(res);
        const blob = new Blob([res], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        if(url) {
          window.open(url, '_blank')?.focus()
        }
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", `${filename}.pdf`); // Thay thế bằng tên file và đuôi mở rộng tương ứng
        // document.body.appendChild(link);
        // link.click();
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
    loading.value=false
};

const handleSearch = () => {
  const resultDoc = documentDatas.value.filter((document: IDocument) => {
    return document?.name?.toLowerCase().includes(result.value);
  });
  if (result.value === "") {
    searchResult.value = documentDatas.value;
  }
  else {
    searchResult.value = resultDoc
  }
};
const homeSearch = (key: any) => {
  result.value = key

}

onMounted(async () => {
  // loading.value = true
  // loading.value = false
  // console.log(loginUser.value)
  // console.log(isAdmin.value)
  // console.log(documentDatas.value)
  const res = await store.getters.getAllDocumentsDatas
   console.log(res)
   searchResult.value = res
  
});
</script>

<style scoped lang="scss">
.inline-input {
  height: 40px;
}
</style>
