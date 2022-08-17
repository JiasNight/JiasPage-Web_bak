<template>
  <n-loading-bar-provider>
    <div class="login-container" :style="{ backgroundImage: 'url(' + backImgUrl + ')' }">
      <div class="container-header">
        <n-button v-for="(item, index) in btnList" :key="index" :type="item.type" ghost @click="seasonClickBtn(item)">{{
          item.label
        }}</n-button>
      </div>
      <!-- 表单 -->
      <div class="container-login">
        <n-message-provider>
          <n-form ref="loginFormRef" :label-width="80" :model="loginFormData" :rules="loginFormRules">
            <n-form-item label="用户名" path="userName">
              <n-input v-model:value="loginFormData.userName" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item label="密码" type="password" path="password">
              <n-input v-model:value="loginFormData.password" placeholder="输入密码" />
            </n-form-item>
            <n-form-item>
              <n-button attr-type="button" @click="submitLoginBtn">验 证</n-button>
            </n-form-item>
          </n-form>
        </n-message-provider>
      </div>
    </div>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, isRef, toRefs, watch, computed, onMounted, getCurrentInstance } from 'vue';
import { useMessage, useLoadingBar } from 'naive-ui';
import { userLogin } from '@/api/login/index';

interface IBtnType {
  type: string
  label: string
  bgImg: string
}
const btnList: IBtnType[] = reactive([
  { type: 'primary', label: '春', bgImg: '/src/assets/images/login_spring.jpg' },
  { type: 'info', label: '夏', bgImg: '/src/assets/images/login_summer.jpg' },
  { type: 'warning', label: '秋', bgImg: '/src/assets/images/login_autumn.jpg' },
  { type: 'error', label: '冬', bgImg: '/src/assets/images/login_winter.jpg' }
]);
let backImgUrl = ref('/src/assets/images/login_spring.jpg');
const seasonClickBtn = (val: any) => {
  backImgUrl.value = (val as any).bgImg;
};
const loginFormRef: any = ref(null);
const message = useMessage();

interface ILoginFormType {
  userName: string
  password: string
}
const loginFormData: ILoginFormType = reactive({
  userName: '',
  password: ''
});

const loginFormRules = {
  userName: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
};

const submitLoginBtn = () => {
  loginFormRef.value.validate((verify: any) => {
    if (!verify) {
      message.success('验证通过');
      userLogin(loginFormData)
      .then(() => {
        console.log('请求');
      })
      .catch(() => {
        console.log('异常');
      });
    } else {
      console.log(verify);
      message.warning('验证不通过');
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
  .container-header {
    width: 200px;
    float: right;
    margin-right: 30px;
    margin-top: 20px;
  }
  .container-login {
    width: 500px;
    height: 600px;
    margin: 0 auto;
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
}
// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
}
// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
}
// 大屏幕
@media (min-width: 1200px) {
}
// 超大屏幕
@media (min-width: 1600px) {
}
</style>
