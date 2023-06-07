<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import store from "@/store";
import {
  UploadProps,
  UploadFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
ElNotification,
} from "element-plus";
import { IDocument } from "../../../common/model";
import axiosClient from "../../../common/api/axiosClient"

// const file = ref();
const fileList = ref<any[]>([]);
const upload = ref<UploadInstance>();
const imageUpload = ref<UploadInstance>();
const fileUpload = ref<UploadInstance>()

const file = ref<any>(null);
const allStudents = computed(() => store.state.students)
const allDocuments = computed(() => store.state.documents)
const documentFormRef = ref();

const loading = ref<boolean>(false)

const form = reactive<IDocument>({
  documentCode: "",
  documentTypeId: "",
  name: "",
  author: "",
  file: "",
  description: "",
  photo: "",
});
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
  // console.log(form.file)
};

const beforeFileUpload = (file: any) => {
  // Validate file before uploading
  // Return false to cancel upload if necessary
  console.log("Before file upload:", file);
};

const handleFileSuccess = (res: any, file: any) => {
  console.log("Success: ", file)
}


const handleSubmit = async () => {
  loading.value = true
  console.log(form)
  await axiosClient.post('document', form).then((res) => {
   if(res) {
    documentFormRef.value.resetFields()
    imageUpload.value?.clearFiles()
    fileUpload.value?.clearFiles()
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

  loading.value = false
}
</script>
<template>
  <div>
    <h2>Document Form</h2>
    <div class="container">
      <el-form
        ref="documentFormRef"
        v-loading="loading"
        :model="form"
        @submit.prevent
        class="d-flex flex-column">
        <label class="form-label">Mã tài liệu</label>
        <el-form-item prop="documentCode">
          <el-input v-model="form.documentCode"></el-input>
        </el-form-item>
        <label class="form-label">Thể loại</label>
        <el-form-item prop="documentTypeId">
          <el-input v-model="form.documentTypeId" required></el-input>
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
        <el-form-item prop="file">
          <el-upload
            ref="fileUpload"
            class="upload-demo"
            :name="'file'"
            :limit="1"
            :accept="'.pdf'"
            :on-change="handleFileChange"           
            action="http://localhost:8000/upload"
            :on-success="handleFileSuccess"
            single
            drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Kéo thả file vào đây hoặc <em>click để tải tệp lên</em>
            </div>
          </el-upload>
        </el-form-item>
        <label class="form-label">Mô tả</label>
        <el-form-item prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <label class="form-label">Ảnh bìa</label>
        <el-form-item prop="photo">
          <el-upload
            ref="imageUpload"
            class="upload"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            list-type="picture-card"
            @change="onFileChange"
            accept="image/jpeg/png">
            <i class="el-icon-upload"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="handleSubmit"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
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
</style>
