<template>
  <div class="mx-auto max-w-lg py-24">
    <Title>登入</Title>

    <div class="p-8 rounded text-lg">
      <FormGroup class="mb-6">
          <FormLabel text="信箱"/>
          <FormInput type="text" placeholder="請輸入信箱" v-model.trim="userInfo.email" />
      </FormGroup>

      <FormGroup class="mb-12">
        <FormLabel text="密碼" />
        <FormInput type="password" placeholder="請輸入密碼" v-model="userInfo.password" />
      </FormGroup>

      <FormGroup class="mb-1">
        <button class="mb-1 py-2 bg-green-500 text-white rounded" @click="onLogin">登入</button>
      </FormGroup>

      <FormGroup class="items-end">
        <p class="text-gray-500 text-base">還沒有帳號？ 立即註冊</p>
      </FormGroup>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AuthServices from '/@/services/authServices';
import Title from '/@/components/UI/Title.vue';
import FormGroup from '/@/components/UI/FormGroup.vue';
import FormLabel from '/@/components/UI/FormLabel.vue';
import FormInput from '/@/components/UI/FormInput.vue';

export default {
  name: 'Login',
  components: {
    Title,
    FormGroup,
    FormLabel,
    FormInput
  },
  setup() {
    const router = useRouter();
    const userInfo = reactive({
      email: '',
      password: ''
    });

    const onLogin = async () => {
      if (!userInfo.email || !userInfo.password) return;

      const res = await AuthServices.login(userInfo);
    
      if (res.status === 200) {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        router.replace({ name: 'Home' });
      }
    };

    return {
      userInfo,
      onLogin
    };
  }
}
</script>