<template>
  <div class="setting">
    <div class="box">
      <span>登录为 {{ userInfo?.name }}</span>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" @click="logout">退出</el-button>
    </div>
    <div class="box">
      <span>API endpoint</span>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" @click="reset">重置</el-button>
    </div>
    <div class="box">
      <span>使用PIN解锁</span>
      <div class="w-[60px] text-center">
        <el-switch v-model="pin" @change="changePin"/>
      </div>
    </div>
    <div class="box">
      <span>项目地址（GitHub） </span>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" @click="openUrl">前往</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "@/edge/useGlobal";
import {storeToRefs} from "pinia";
import {useNavigation} from "@/hooks/useNavigation";
import {adapter} from "@/helpers/adapter";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const store = useGlobalStore()
const {userInfo} = storeToRefs(store)
const {routerTo} = useNavigation()
const pin = ref(!!store.pin)

const logout = () => {
  store.logout()
  routerTo({
    name: "Login"
  })
}

const reset = () => {
  store.reset()
  routerTo({
    name: "Init"
  })
}

const openUrl = () => {
  adapter.openUrl("https://github.com/xkrfer/pushdeer-crx")
}

const changePin = () => {
  if (pin.value) {
    ElMessageBox.prompt('请输入4位数字PIN码，当重新打开浏览器时需要输入PIN码才能查看消息内容：', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      customClass: '!w-[300px]',
      inputPattern: /^\d{4}$/,
      inputErrorMessage: '请输入正确的PIN码',
    })
        .then(async ({value}) => {
          const md5 = adapter.md5(value)
          await store.set('pin', md5)
          ElMessage({
            type: 'success',
            message: `设置成功，PIN码为${value}`,
          })
        })
        .catch(async () => {
          pin.value = false
          await store.set('pin', "")
        })
  }else{
    store.set('pin', "")
  }
}

</script>

<style lang="less">
.setting {
  padding: 24px 12px 0;
}
</style>
