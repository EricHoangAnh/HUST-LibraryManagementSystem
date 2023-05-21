<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IAccount } from "../../common/model";
import store from "../../store";
const loginUser = ref<IAccount>({ account: "", password: "" });
async function onSubmit() {
  const students = await store.state.students;
  console.log(students);
}
onMounted(async () => {
  await store.dispatch("getStudents");
});
</script>
<template>
  <div class="container">
    <h2>Đăng nhập vào hệ thống thư viện</h2>
    <el-form class="login-form">
      <el-form-item>
        <el-input
          v-model="loginUser.account"
          placeholder="Tên đăng nhập"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginUser.password"
          type="password"
          placeholder="Mật khẩu"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Đăng nhập</el-button>
    </el-form-item>
  </div>
</template>
<style lang="scss" scoped></style>
