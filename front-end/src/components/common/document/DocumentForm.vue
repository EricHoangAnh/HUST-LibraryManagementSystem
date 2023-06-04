<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import store from "@/store";
import {
  UploadProps,
  UploadFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
} from "element-plus";
import { IDocument } from "../../../common/model";

// const file = ref();
const fileList = ref<string[]>([]);
const upload = ref<UploadInstance>();
const file = ref<any>(null);
const allStudents = computed(() => store.state.students)
const allDocuments = computed(() => store.state.documents)
const document = ref<IDocument>();

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
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const onFileChange = (uploadFile: UploadFile) => {
  let fileType: string;
  let imgData: string;
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
const submitForm = () => {
  // Do something with the form data
  console.log(form);
};

const handleFileChange = (fileList: any) => {
  form.file = fileList[0];
};

const beforeFileUpload = (file: any) => {
  // Validate file before uploading
  // Return false to cancel upload if necessary
  console.log("Before file upload:", file);
};

const handlePhotoChange = (fileList: any) => {
  form.photo = fileList[0];
};

const beforePhotoUpload = (file: any) => {
  // Validate photo before uploading
  // Return false to cancel upload if necessary
  console.log("Before photo upload:", file);
};
const handleSubmit = () => {
  console.log(form)
}
</script>
<template>
  <div>
    <h2>Document Form</h2>
    <div class="container">
      <el-form
        :model="form"
        @submit.native.prevent="submitForm"
        class="d-flex flex-column"
      >
        <label class="form-label">Document Code</label>
        <el-form-item>
          <el-input v-model="form.documentCode"></el-input>
        </el-form-item>
        <label class="form-label">Document Type ID</label>
        <el-form-item prop="documentTypeId">
          <el-input v-model="form.documentTypeId" required></el-input>
        </el-form-item>
        <label class="form-label">Name</label>
        <el-form-item prop="name">
          <el-input v-model="form.name" required></el-input>
        </el-form-item>
        <label class="form-label">Author</label>
        <el-form-item prop="author">
          <el-input v-model="form.author" required></el-input>
        </el-form-item>
        <label class="form-label">File</label>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-change="handleFileChange"
            :before-upload="beforeFileUpload"
            multiple
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
        <label class="form-label">Description</label>
        <el-form-item>
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <label class="form-label">Photo</label>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-change="handlePhotoChange"
            :before-upload="beforePhotoUpload"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop photo here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
        <label>Ảnh nè</label>
        <el-form-item>
          <el-upload
            ref="upload"
            class="upload"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            list-type="picture-card"
            @change="onFileChange"
            accept="image/jpeg"
          >
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="handleSubmit">Submit</el-button>
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
