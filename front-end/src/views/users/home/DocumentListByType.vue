<script setup lang="ts">
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import router from '@/router';
import { IDocument, IType } from '@/common/model';
import LayoutHomeUser from '@/components/common/layout/LayoutHomeUser.vue';
import DocumentCard from './DocumentCard.vue';
import MyRequest from '../my-request/MyRequest.vue';

const routeId = computed(() => router.currentRoute.value.params.id)
const allDocuments = computed<IDocument[]>(() => store.state.documents)
const documentType = computed<any>(() => {
    const type: any = store.state.documentTypes.find((type: IType) => type._id === routeId.value)
    return type
}
)
const showMyRequest = ref(false)

const datas = computed(() => {
    const data = allDocuments.value.filter((doc: IDocument) => doc.documentTypeId === documentType.value._id )
    return data
})

const showMyRequestList = () => {
    showMyRequest.value = true
}
const backToHome = () => {
    showMyRequest.value = false
    router.push('/')
}

onMounted(async () => {
 await store.dispatch('getDocuments')
 await store.dispatch('getDocumentTypes')
 console.log(documentType.value)
 console.log(datas.value)
})
</script>
<template>
    <LayoutHomeUser></LayoutHomeUser>
    <div>
        <!-- <div class="add-request-doc" @click="showMyRequestList" >
          <div class="container d-flex align-items-center">
            <h1 class="col-6 me-5">Bạn muốn đóng góp tài liệu? Còn chần chừ gì mà không tải lên, <span style="font-weight: bold; cursor: pointer;">Bắt đầu ngay !</span></h1>
            <img src="../../../assets/image/idea.png">  
        </div>
        </div> -->
        <div class="container" style="padding: 100px 0;">
          <el-button type="info" @click="backToHome" class="mb-3" style=""
            ><i class="fa-sharp fa-solid fa-arrow-right-from-bracket me-2"></i>Trở
            về</el-button
          >
          <h3 class="document-type-title" style="font-weight: bold;">
            {{ documentType?.title }}
          </h3>
          <p>{{ documentType?.note }}</p>
            <document-card :data="datas"></document-card>
        </div>
    </div>
    <!-- <Transition name="slide">
    <div class="container"  style="padding: 100px 0;" v-if="showMyRequest">
      <my-request v-if="showMyRequest"></my-request>
    </div>
  </Transition> -->
  </template>
<style scoped lang="scss">
.add-request-doc {
    
    margin-top: 57px;
    background-image: url('../../../assets/image/upload-own-background.png');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 400px;
    color: #fff;
    font-family: 'Bevan', cursive;
    padding: 40px 0;

    img{
        background: transparent;
    }
}
.slide-enter-from {
transform: translateX(100%)
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-from {
  transform: translateX(-100%)
}
</style>