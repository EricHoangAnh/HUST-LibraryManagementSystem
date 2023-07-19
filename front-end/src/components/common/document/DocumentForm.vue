<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import store from "@/store";
import {
  UploadProps,
  UploadFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
ElNotification,
} from "element-plus";
import { IDocument, IType } from "../../../common/model";
import axiosClient from "../../../common/api/axiosClient"
import moment from "moment";

const drawerRef = ref<boolean>(false);
const imageUpload = ref<UploadInstance>();
const fileUpload = ref<UploadInstance>()

const file = ref<any>(null);
const successFile = ref()
const loginUser = computed<any>(() => store.state.loginUser)
const documentFormRef = ref();
const isAdmin = computed(() => loginUser.value.role === 'admin')
const formType = ref<string>('')
const documentTypes = computed<IType[]>(() => store.state.documentTypes)
const userDocument = computed(() => store.state.userDocuments.filter((doc: any) => doc.userId === loginUser.value._id))

const loading = ref<boolean>(false)
const isUpload = ref(true)
const isFileUpload = ref(false)

const emit = defineEmits(['refreshData'])


const form = reactive<IDocument>({
  documentCode: "",
  documentTypeId: "",
  name: "",
  author: "",
  file: "",
  description: "",
  photo: "",
});


const showFormDialog = (item: IDocument, type: any) => {
  console.log(item, type)
  console.log(loginUser.value)
  form._id = item?._id
  form.documentCode = item.documentCode
  form.documentTypeId = item.documentTypeId
  form.name = item.name
  form.author = item.author
  form.description = item.description
  form.file = item.file
  form.photo = item.photo
  form.status = item?.status
  form.docId = item?.docId,
  form.reqId = item?.reqId
  drawerRef.value = true
  formType.value = type
  if(form.photo) {
    isUpload.value = false
  }

}
const handleExceed: UploadProps["onExceed"] = (files) => {
  imageUpload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  imageUpload.value!.handleStart(file);
};
const onFileChange = (uploadFile: UploadFile) => {
  let fileType: string;
  if (uploadFile) {
    file.value = uploadFile.raw;
  }
  const reader: any = new FileReader();
  reader.onload = () => {
    form.photo = reader.result;
    fileType = reader.result.split(";")[0].split(":")[1];

  };
  reader.readAsDataURL(file.value);
};

const handleFileChange = (file: any, fileList: any) => {

// Gán file vào ref fileUpload
  // form.file = file.raw
  // console.log('Change: ', file)
};

const beforeFileUpload = (file: any) => {
  // Validate file before uploading
  // Return false to cancel upload if necessary
  console.log("Before file upload:", file);
};

const handleFileSuccess = (res: any, file: any) => {

  console.log("Success: ", file)
}


const handleUserSubmit = async () => {
  loading.value = true
  if(formType.value === 'Add') {
    await axiosClient.post('user-document', {...form, userId: loginUser.value?._id, file: successFile.value,  createdAt: moment().format("DD-MM-YYYY"), lastUpdated: moment().format("DD-MM-YYYY")}).then((res) => {
     if(res) {
       ElNotification({
         title: 'Thành công',
         message: 'Tải tài liệu của bạn lên thành công',
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
  }
  else {
      await axiosClient.put(`user-document/${form._id}`, {...form, userId: loginUser.value?._id, file: successFile.value, lastUpdated: moment().format("DD-MM-YYYY")}).then( async(res) => {
       if(res) {
        console.log(res)

      if(form.status === 3) {
      console.log(form)
      await axiosClient.put(`user-action-document`, form).then((res) => {console.log(res)})
      .catch((err) => {
       console.log(err)
       ElNotification({
         title: 'Thất bại',
         message: 'Tải tài liệu lên server thất bại, hãy kiểm tra lại',
         type: 'error',
            })
      })
    }
      ElNotification({
           title: 'Thành công',
           message: 'Cập nhật tài liệu thành công',
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
    }
    documentFormRef.value.resetFields()
        imageUpload.value?.clearFiles()
        fileUpload.value?.clearFiles()
        drawerRef.value = false
        isFileUpload.value = false
  emit("refreshData")
  await store.dispatch('getUserDocuments')
  loading.value = false;
}


const handleAdminSubmit = async () => {
  loading.value = true
  console.log(form)
  if(formType.value === 'Add') {

    await axiosClient.post('document', {...form, userId: loginUser.value?._id, createdAt: moment().format("DD-MM-YYYY"), lastUpdated: moment().format("DD-MM-YYYY")}).then((res) => {
     if(res) {
      documentFormRef.value.resetFields()
      imageUpload.value?.clearFiles()
      fileUpload.value?.clearFiles()
      emit("refreshData")
      drawerRef.value = false
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
  }
  else {
    await axiosClient.put(`document/${form._id}`, {...form, userId: loginUser.value?._id, lastUpdated: moment().format("DD-MM-YYYY")}).then((res) => {
     if(res) {
      documentFormRef.value.resetFields()
      imageUpload.value?.clearFiles()
      fileUpload.value?.clearFiles()
      emit("refreshData")
      drawerRef.value = false
       ElNotification({
         title: 'Thành công',
         message: 'Cập nhật tài liệu thành công',
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
  }
  isFileUpload.value = false
  loading.value = false;
}

const showUpload = () => {
  isUpload.value = true
}
watch(form.photo, () => {
  if (form.photo) {
    isUpload.value = false
  }
  else {
    isUpload.value = true
  }
})
watch(form.file, () => {
  if (form.file) {
    isFileUpload.value = false
  }
  else {
    isFileUpload.value = true
  }
})

const handleUpdateFile = () => {
  isFileUpload.value = true
  
}
const closeDrawer = (done: () => void) => {
  isFileUpload.value = false
  done()
}

onMounted(async () => {
  await store.dispatch('getLoginUser')
  await store.dispatch('getDocumentTypes')
})

defineExpose({
  showFormDialog
})
</script>
<template>
  <el-drawer
    v-model="drawerRef"
    modal-class="sp-bootstrap"
    :size="'40%'"
    :before-close="closeDrawer"
    :close-on-click-modal="false">
    <h2>{{ formType === "Add" ? 'Thêm tài liệu': 'Sửa tài liệu' }}</h2>
    <div class="container">
      <el-form
        ref="documentFormRef"
        v-loading="loading"
        :model="form"
        @submit.prevent
        class="d-flex flex-column">
        <label class="form-label">Mã tài liệu</label>
        <el-form-item
          prop="documentCode"
          :rules="[{
          type: 'number',
          message: 'Hãy nhập số nguyên vào đây'
        }]">
          <el-input v-model.number="form.documentCode"></el-input>
        </el-form-item>
        <label class="form-label">Thể loại</label>
        <el-form-item prop="documentTypeId">
          <el-select
            v-model="form.documentTypeId"
            class="w-100"
            placeholder="Select"
            @change="() => console.log(form.documentTypeId)"
            required>
            <el-option
              v-for="item in documentTypes"
              :key="item._id"
              :label="item.title"
              :value="item._id" />
          </el-select>
        </el-form-item>
        <label class="form-label">Tên tài liệu</label>
        <el-form-item prop="name">
          <el-input v-model="form.name" required></el-input>
        </el-form-item>
        <label class="form-label">Tác giả</label>
        <el-form-item prop="author">
          <el-input v-model="form.author" required></el-input>
        </el-form-item>
        <label class="form-label">File</label>
        <el-form-item v-if="isFileUpload || !form.file" prop="file">
          <el-upload
            ref="fileUpload"
            class="upload-demo"
            :name="'file'"
            :limit="1"
            :accept="'.pdf'"
            :on-change="handleFileChange"
            :action="isAdmin ? 'http://localhost:8000/upload' : 'http://localhost:8000/user-upload'"
            :on-success="handleFileSuccess"
            single
            drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Kéo thả file vào đây hoặc <em>click để tải tệp lên</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item v-else prop="file">
          <div class="file-uploaded d-flex justify-content-between align-items-center">
            <div class="file-info me-3"> 
              <i class="fa-solid fa-file-pdf me-2"></i>
              <span>{{ form?.file?.filename }}</span>
            </div>
            <i class="fa-solid fa-xmark" @click="handleUpdateFile" style="cursor: pointer;"></i>
          </div>
        </el-form-item>
        <label class="form-label">Mô tả</label>
        <el-form-item prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <label class="form-label">Ảnh bìa</label>
        <el-form-item prop="photo">
          <div class="image-preview" v-if="!isUpload">
            <img
              :src="form.photo"
              style="height: 146px; width: 146px; border-radius: 8px;" />
            <span @click="showUpload">x</span>
          </div>
          <el-upload
            v-if="isUpload"
            ref="imageUpload"
            class="upload"
            :limit="1"
            v-model="form.photo"
            :on-exceed="handleExceed"
            :auto-upload="false"
            list-type="picture-card"
            @change="onFileChange"
            accept="image/jpeg/png">
            <i class="el-icon-upload"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="loginUser?.role === 'user'"
            type="primary"
            native-type="submit"
            @click="handleUserSubmit"
            >{{formType === 'Add' ? 'Thêm tài liệu mới': 'Chỉnh sửa'}}</el-button
          >
          <el-button
            v-else
            type="primary"
            native-type="submit"
            @click="handleAdminSubmit"
            >{{formType === 'Add' ? 'Thêm mới': 'Chỉnh sửa'}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>
<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  text-align: left;
}
.asterisk-left .el-form-item__content {
  margin-left: 0 !important;
}
.file-uploaded {
  max-width: 100%;
  padding: 5px 20px;
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.image-preview  {
position: relative;
span {
  background-color: #ccc;
    padding: 0 12px;
    border-radius: 50%;
    position: absolute;
    top: -12px;
    right: -13px;
    cursor: pointer;
}
}
</style>
