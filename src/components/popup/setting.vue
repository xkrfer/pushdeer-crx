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
      <span>项目地址（GitHub） </span>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" @click="openUrl">前往</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {storeToRefs} from "pinia";
import {useNavigation} from "@/hooks/useNavigation";
import {adapter} from "@/helpers/adapter";

const store = useGlobalStore()
const {userInfo} = storeToRefs(store)
const {routerTo} = useNavigation()

const logout = () => {
  store.clear()
  routerTo({
    name: "Login"
  })
}

const reset = () => {
  store.clear()
  routerTo({
    name: "Init"
  })
}

const openUrl = () => {
  adapter.openUrl("https://github.com/xkrfer/pushdeer-crx")
}

</script>

<style lang="less">
.setting {
  padding: 24px 12px 0;
}
</style>
