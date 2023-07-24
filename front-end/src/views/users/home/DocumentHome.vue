<script setup lang="ts">
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import DocumentCard from './DocumentCard.vue';
import SearchCenter from '@/components/common/search-center/SearchCenter.vue';
import MyRequest from '../my-request/MyRequest.vue';

const allTypes = computed(() => store.state.documentTypes)
const allDocuments = computed (() => store.state.documents)
const showSearch = ref(false)
const loading = ref(false)

const showMyRequest = ref(false)
const emit = defineEmits(['home-search'])


const searchkey = ref('')

const documentDatas = computed(() => {
    let datas: any = [] 
    allTypes.value.forEach((type: any) => {
       const documents =  allDocuments.value.filter((doc: any) => doc.documentTypeId === type._id)
       const typeData = {...type, documentData: documents}
       if(documents.length) {
         datas.push(typeData)
       }
    })
    console.log(datas)
    return datas
})

const sortEvents = (d1: any, d2: any) => {
    const date1: any = new Date(d1);
    const date2: any = new Date(d2);
    return date1 - date2;
}

const newDocumentDatas = computed(() => {
let datas: any = []
allDocuments.value.forEach((doc) => {
    datas.unshift(doc)
})
return datas.splice(0,4)
})

const searchDocument = () => {
    showSearch.value = true
    emit('home-search', searchkey.value, showSearch.value)

}
const showMyRequestList = () => {
    showMyRequest.value = true
}
const backToHome = () => {
    showSearch.value = false
    showMyRequest.value = false
}
onMounted(async () => {
  loading.value = true
  await store.dispatch('getDocumentTypes')
  await store.dispatch('getDocuments')
  loading.value = false
})
</script>
<template>
  <Transition name="slide-fade">
    <div v-if="!showSearch && !showMyRequest" v-loading.fullscreen.lock="loading" class="home-panel">
      <!-- <search-center></search-center> -->
      <div class="container d-flex h-100 align-items-center">
        <div class="home-panel-content-left col-md-6">
          <h2>Chào mừng đến với kho tài liệu V-Doc</h2>
          <p>
            Kho tài liệu V-Doc có số lượng tài liệu vô cùng lớn với thể loại đa
            dạng. Hãy bắt đầu tìm hiểu tài liệu đầu tiên nào !
            <a
              href="#"
              style="font-weight: bold; cursor: pointer;"
              @click="searchDocument"
              >Bắt đầu tìm kiếm</a
            >
          </p>
          <div class="d-flex">
            <el-input
              size="large"
              v-model="searchkey"
              placeholder="Nhập tên tài liệu vào đây..."
              @focus="searchDocument"></el-input
            ><el-button type="primary" class="ms-2" size="large"
              >Tìm kiếm <i class="fa-solid fa-magnifying-glass ms-2"></i
            ></el-button>
          </div>
        </div>
        <div class="home-panel-content-right col-md-6">
          <!-- <img src="../../../assets/image/documents.avif" /> -->
        </div>
      </div>

      <div class="home-content">
        <div class="home-content-new">
          <h2>Các tài liệu mới cập nhật</h2>
          <h5>Đây là những tài liệu mới được cập nhật trong thời gian gần đây, hãy ấn vào và tìm hiểu thêm</h5>
          <div class="container">
            <el-scrolbar>
                <document-card :data="newDocumentDatas"></document-card>
            </el-scrolbar>
          </div>
        </div>
        <div class="add-request-doc">
          <div class="container d-flex align-items-center">
              <img src="../../../assets/image/idea.png" />
              <h1 class="col-6 ms-5">
                Bạn muốn đóng góp tài liệu? Còn chần chừ gì mà không tải lên,
                <span @click="showMyRequestList" style="font-weight: bold; cursor: pointer;">Bắt đầu ngay !</span>
              </h1>
          </div>
        </div>
        <template v-for="(item, i) in documentDatas">
          <h3 class="document-type-title" style="font-weight: bold;">
            {{ item?.title }}
          </h3>
          <p>{{ item?.note }}</p>
          <document-card :data="item?.documentData"></document-card>
        </template>
      </div>
    </div>
  </Transition>
  <Transition name="slide">
    <div v-if="showSearch">
      <el-button type="info" @click="backToHome" class="mb-3"
        ><i class="fa-sharp fa-solid fa-arrow-right-from-bracket me-2"></i>Trở
        về trang chủ</el-button
      >
      <search-center v-if="showSearch"></search-center>
    </div>
  </Transition>
  <Transition name="slide">
    <div v-if="showMyRequest">
      <el-button type="info" @click="backToHome" class="mb-3"
        ><i class="fa-sharp fa-solid fa-arrow-right-from-bracket me-2"></i>Trở
        về trang chủ</el-button
      >
      <my-request v-if="showMyRequest"></my-request>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
.home-panel {
    min-height: 400px;
    .home-panel-content-right {
        background-image: url('../../../assets/image/documents.avif');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 620px;
        img {
            width: 300px;
        }
    }
}
.home-content-new {
    background-image: url('../../../assets/image/new-background.avif');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 500px;
    margin: 0 calc(50% - 49vw);
    padding: 30px 0;

    h2, h5 {
        color: #fff;
        font-family: 'Bevan', cursive;
    }

}
.add-request-doc {
    // background-image: url('../../../assets/image/upload-own-background.png');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 400px;
    margin: 0 calc(50% - 49vw);
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
<style lang="scss">
.home-content-new .el-scrollbar__view .document-wrapper .wrapper{
    justify-content: center;
}
.el-loading-mask {
  z-index: 1 !important;
}
</style>
