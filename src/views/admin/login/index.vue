<template>
  <div class="app-container">
    <!-- <v-container>
      <v-form>
        <v-text-field
          v-model="adminForm.userName"
          required
          :rules="adminFormRules.userName"
          :counter="10"
          label="登录账户"
          prepend-inner-icon="mdi-account-lock"
          variant="outlined"
          color="success"
          density="compact"
          shaped
        >
        </v-text-field>

        <v-text-field
          v-model="adminForm.password"
          required
          :rules="adminFormRules.password"
          :counter="10"
          label="登录密码"
          prepend-inner-icon="mdi-account-key"
          variant="outlined"
          color="success"
          density="compact"
          shaped
        ></v-text-field>
      </v-form>
    </v-container> -->
  </div>
</template>

<script lang="ts" setup>
const valid = $ref(false);
const firstname = $ref('');
const lastname = $ref('');
const email = $ref('');

const adminForm = reactive({
  userName: '',
  password: ''
});

const adminFormRules = reactive({
  userName: [(v: any) => !!v || '请输入用户名！', (v: any) => v.length <= 3 || '用户名长度太短！'],
  password: [(v: any) => !!v || '请输入密码！', (v: any) => /.+@.+/.test(v) || '密码过于简单了！']
});
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100%;
  background-image: url('/src/assets/images/admin/login/autumn.jpg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
