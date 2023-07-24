<script setup lang="ts">

import axiosClient from '@/common/api/axiosClient';
import { IType } from '@/common/model';
import { ElMessageBox, ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';


const drawerRef = ref()
const loading = ref<boolean>(false)
const typeModel = ref<IType>()


const showFormDialog = (item: IType) => {
  drawerRef.value = true
  console.log(item)
  typeModel.value = item
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
            >Thông tin thể loại</span
          >
        </div>
      </template>
        <div class="campscomp-roomform">
          <div class="campscomp-roomform-container">
            <div class="campscomp-roomform-infoitem">
              <div class="campscomp-infoitem-title">Tên thể loại</div>
              <div class="campscomp-infoitem-value">{{ typeModel?.title}}</div>
            </div>
            <div class="campscomp-roomform-infoitem">
              <div class="campscomp-infoitem-title">Ghi chú</div>
              <div class="campscomp-infoitem-value">
                {{ typeModel?.note }}
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