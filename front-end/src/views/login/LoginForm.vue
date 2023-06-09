<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { IAccount, IUser } from "../../common/model";
import store from "../../store";
import axiosClient from "@/common/api/axiosClient";
import { ElNotification } from "element-plus";
import router from "@/router";



const loginUser = ref<IAccount>({});
const signUpUser = ref<IUser>({})
const passwordConfirm = ref()
const isSignUp = ref<boolean>(false)
const loading = ref<boolean>(false)

const users = computed(() => store.state.users)


async function onSubmitLogin() {
  const matchAccount = users.value.find((user: IUser) => user.account === loginUser.value.account && user.password === loginUser.value.password)
  if (matchAccount){
        await axiosClient.post('/login', loginUser.value).then((res: any) => {
          console.log(res)
          localStorage.setItem('token', res.token)
          router.push('/')

        }).catch((err) => {
          ElNotification({
            title: 'Thất bại',
            message: err,
            type: 'error',
        })
      }) 
  }
  else {
    ElNotification({
       title: 'Thất bại',
       message: "Tài khoản hoặc mật khẩu không đúng",
       type: 'error',
     })
  }
}

const onSubmitSignUp = async  () => {
  loading.value = true
await axiosClient.post('/signup', signUpUser.value)
.then((res) => {
  loading.value = false
  ElNotification({
       title: 'Thành công',
       message: 'Đăng ký thành công',
       type: 'success',
     })
})
.catch((err) => {
  console.log(err)
  ElNotification({
       title: 'Thất bại',
       message: err,
       type: 'error',
     })})
.finally(() => {
  isSignUp.value = false
}
)
}


const showSignUpForm = () => {
  isSignUp.value = true
}
const showLoginForm = () => {
  isSignUp.value = false
}

onMounted(async () => {
await store.dispatch('getUsers')
});
</script>
<template>
  <div class="login">
    <div v-loading="loading" class="container">
      <el-form v-if="!isSignUp" class="login-form">
        <h2 class="mb-4">Đăng nhập</h2>
        <el-form-item>
          <el-input
            v-model="loginUser.account"
            placeholder="Tên đăng nhập"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginUser.password"
            type="password"
            placeholder="Mật khẩu"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitLogin">Đăng nhập</el-button>
          <div class="login-form-tooltip mt-3">
            Chưa có tài khoản,
            <a class="primary" @click="showSignUpForm">ấn vào đây</a>
          </div>
        </el-form-item>
      </el-form>

      <el-form v-else class="signup-form">
        <h2 class="mb-4">Đăng ký tài khoản</h2>
        <el-form-item>
          <el-input
            v-model="signUpUser.account"
            placeholder="Tên đăng nhập"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signUpUser.userName"
            placeholder="Tên người dùng"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="signUpUser.gender">
            <el-radio label="Male">Nam</el-radio>
            <el-radio label="Female">Nữ</el-radio>
            <el-radio label="Other">Khác</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="signUpUser.dob"
            type="date"
            placeholder="Pick a day"
            size="large"
            class="w-100" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="signUpUser.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signUpUser.phone"
            placeholder="Điện thoại"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signUpUser.address"
            placeholder="Địa chỉ"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="signUpUser.password"
            type="password"
            placeholder="Mật khẩu"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="passwordConfirm"
            type="password"
            placeholder="Xác nhận mật khẩu"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitSignUp">Đăng ký</el-button>
          <div class="login-form-tooltip ms-3">
            Đã có tài khoản,
            <a class="primary" @click="showLoginForm">ấn vào đây</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  background-image: url('../../../src/assets/image/login-background.jpg');
  background-size:  cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  padding: 120px;
}
.container {
  background-color: white;
  padding: 40px 50px;
  max-width: 380px;
  border-radius: 20px;
}
.login-form-tooltip {
  cursor: pointer;
}
</style>
