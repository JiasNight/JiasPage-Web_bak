<template>
  <n-loading-bar-provider>
    <div class="login-container" :style="{ backgroundImage: 'url(' + backImgUrl + ')' }">
      <div class="container-header">
        <n-button
          v-for="(item, index) in btnList"
          :key="index"
          :type="item.type"
          ghost
          @click="seasonClickBtn(item)"
          >{{ item.label }}</n-button
        >
      </div>
      <!-- 表单 -->
      <div class="container-login">
        <n-message-provider>
          <n-form
            ref="loginFormRef"
            :label-width="80"
            :model="loginFormData"
            :rules="loginFormRules"
          >
            <n-form-item label="用户名" path="userName">
              <n-input v-model:value="loginFormData.userName" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item label="密码" type="password" path="password">
              <n-input placeholder="输入密码" v-model:value="loginFormData.password" />
            </n-form-item>
            <n-form-item>
              <n-button @click="submitLoginBtn" attr-type="button">验 证</n-button>
            </n-form-item>
          </n-form>
        </n-message-provider>
      </div>
    </div>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  reactive,
  isRef,
  toRefs,
  watch,
  computed,
  onMounted,
  getCurrentInstance
} from 'vue';
import { useMessage, useLoadingBar } from 'naive-ui';
import { userLogin } from '@/api/client/login/index';

interface IBtnType {
  type: string;
  label: string;
  bgImg: string;
}
const btnList: IBtnType[] = reactive([
  { type: 'primary', label: '春', bgImg: '/src/assets/images/login_spring.jpg' },
  { type: 'info', label: '夏', bgImg: '/src/assets/images/login_summer.jpg' },
  { type: 'warning', label: '秋', bgImg: '/src/assets/images/login_autumn.jpg' },
  { type: 'error', label: '冬', bgImg: '/src/assets/images/login_winter.jpg' }
]);
let backImgUrl = ref('/src/assets/images/login_spring.jpg');
const seasonClickBtn = (val: String) => {
  backImgUrl.value = (val as any).bgImg;
};
const loginFormRef: any = ref(null);
const message = useMessage();

interface ILoginFormType {
  userName: string;
  password: string;
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

// onMounted(() => {
//   /*获取屏幕可视宽高*/
//   let v_h = document.documentElement.clientHeight;
//   let v_w = document.documentElement.clientWidth;
//   let block = document.getElementsByClassName('block')[0];
//   /*创建雪花*/
//   for(let i = 0; i < 200; i++){
//       let snow = document.createElement('img');
//       snow.className = 'snow';
//       snow.src = '/src/assets/images/snow.png';
//       /*随机大小*/
//       let s_w = Math.random() * 10 + 5;
//       snow.style.width = s_w + 'px';
//       snow.style.height = s_w + 'px';
//       /*随机位置分布*/
//       //top值 left值
//       //若top值小于自身高度，则设置top,若大于自身高度则top值为获取的高度减去自身高度
//       let s_t = Math.random() * v_h < parseInt(snow.style.height) ? Math.random() * v_h : (Math.random() * v_h - parseInt(snow.style.height));
//       snow.style.top = s_t + 'px';
//       let s_l = Math.random() * v_w < parseInt(snow.style.width) ? Math.random() * v_w : (Math.random() * v_w - parseInt(snow.style.width));
//       snow.style.left = s_l + 'px';

//       block.appendChild(snow);
//   }
//   let snowh = document.getElementsByClassName('snow');
//   setInterval(() => {
//       for(let j = 0; j < snowh.length; j++){
//           //top的改变
//           let snow_t = parseInt(snowh[j].style.top);
//           snow_t++;
//           if(snow_t>v_h){
//               snow_t = 0;
//           }
//           snowh[j].style.top = snow_t+'px';
//           //left的改变
//           let snow_l = parseInt(snowh[j].style.left);
//           snow_l+= Math.sin(snow_t/2*0.1);
//           if(snow_l<0){
//               snow_l = v_w-parseInt(snowh[j].style.left);
//           }
//           if(snow_l>v_w){
//               snow_l = 0;
//           }
//           snowh[j].style.left = snow_l+'px';
//       }
//   },50)
// })
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
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
