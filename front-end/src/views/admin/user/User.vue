<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import { IUser } from '@/common/model';
import moment from 'moment';
import UserRequestDetail from './UserRequestDetail.vue'
const loading = ref(false)
const userRequestDetailRef = ref()

const allUsers = computed<IUser[]>(() => store.state.users.filter((user: any) => user.role === 'user'))
const allRequest = computed(() => store.state.requests.filter((req: any) => req.status === 2))

const datas = computed(() => {
  const data = allUsers.value.map((user: IUser) => {
    const requestData = allRequest.value.filter((request: any) => request.userId === user._id)
    const dataObj = {...user, requestData: requestData}
    return dataObj
  })
  return data
})

const viewDetail = (item: any) => {
  userRequestDetailRef.value.showFormDialog(item)
}


onMounted(async () => {

})
</script>
<template>
  <div class="user-view">
    <div class="user-view-table">
      <UserRequestDetail ref="userRequestDetailRef"></UserRequestDetail>
      <el-table
      v-loading="loading"
      :data="datas"
      style="width: 100%; margin-top: 30px;">
          <el-table-column
            prop="account"
            label="Tên người dùng"
            min-width="120"></el-table-column>
          <el-table-column prop="dob" label="Ngày sinh" min-width="100">
            <template #default="scope">
              {{scope.row.dob ? moment(scope.row.dob).format('DD/MM/YYYY'): '' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            min-width="150"
            ></el-table-column>
            <el-table-column
            prop="phone"
            label="Số điện thoại"
            min-width="150"></el-table-column>
            <el-table-column
            prop="address"
            label="Địa chỉ"
            min-width="180"></el-table-column>
          <el-table-column min-width="150">
            <template #default="scope">
            <el-button @click="viewDetail(scope.row.requestData)" type="primary">Tài liệu đóng góp</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
