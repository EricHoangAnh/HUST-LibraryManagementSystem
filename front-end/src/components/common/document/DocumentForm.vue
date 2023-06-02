<script setup lang="ts">
import { ref } from "vue";
import {
  UploadProps,
  UploadFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
} from "element-plus";

// const file = ref();
const fileList = ref<string[]>([]);
const upload = ref<UploadInstance>();
const file = ref<any>(null);

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const onFileChange = (uploadFile: UploadFile) => {
  let fileType: string;
  if (uploadFile) {
    file.value = uploadFile.raw;
  }
  const reader: any = new FileReader();
  reader.onload = () => {
    fileType = reader.result.split(";")[0].split(":")[1];
    console.log(fileType);
  };
  reader.readAsDataURL(file.value);
};

const handleChange = (file: any, fileList: any) => {
  console.log(fileList);
  // fileList.value.push(URL.createObjectURL(file.raw));
};
</script>
<template>
  <div>
    <h2>Document Form</h2>

    <el-upload
      ref="upload"
      class="upload"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      list-type="picture-card"
      @change="onFileChange"
      accept="image/jpeg">
    </el-upload>

    <el-image
      style="width: 100px; height: 100px"
      :src="fileList[0]"
      :preview-src-list="fileList">
    </el-image>
  </div>
</template>
<style scoped></style>
