<script setup lang="ts">
import store from '@/store';
import { computed, onMounted, ref } from 'vue';


// const allUsers = computed(() => store.state.users)
// const allDocuments = computed(() => store.state.documents)
// const allDocumentTypes = computed(() => store.state.documentTypes)
// const allRequestsNeedApprove = computed(() => store.state.requests.filter((req: any) => req?.status === 1))
const loading = ref(false)

const userQuantity = computed(() => {
  const quantity = store.state.users.length
  return quantity
})
const documentQuantity = computed(() => {
  const quantity = store.state.documents.length
  return quantity
})
const documentTypeQuantity = computed(() => {
  const quantity = store.state.documentTypes.length
  return quantity
})
const requestNeedApproveQuantity = computed(() => {
  const quantity = store.state.requests.filter((req: any) => req?.status === 1).length
  return quantity
})
const card = ref( [
    {
      iconClass: 'fa-solid fa-list-check',
      title: 'Yêu cầu duyệt',
      quantity: requestNeedApproveQuantity
    },
    {
      iconClass: 'fa-solid fa-folder',
      title: 'Thể loại',
      quantity: documentTypeQuantity
    },
    {
      iconClass: 'fa-regular fa-file',
      title: 'Tài liệu',
      quantity: documentQuantity
    },
    {
      iconClass: 'fa-solid fa-user',
      title: 'Người dùng',
      quantity: userQuantity
    },

])


onMounted(async () => {
// loading.value = true
// await store.dispatch('getUsers')
// await store.dispatch('getDocumentTypes')
// await store.dispatch('getDocuments')
// loading.value = false
})
</script>
<template>
  <el-scrollbar>
    <div class="dashboard-card-wrapper d-flex mb-4">
      <template v-for="(item, i) in card">
        <div class="dashboard-card d-flex align-items-center col-3 me-4">
          <div class="card-icon">
            <i :class="item.iconClass"></i>
          </div>
          <div class="card-content ms-4 d-flex flex-column align-items-start">
            <h4 class="card-content-header">{{ item.quantity }}</h4>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>
<style scoped lang="scss">
.dashboard-card {
    padding: 20px 30px;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 6px #00000029;
}
</style>
