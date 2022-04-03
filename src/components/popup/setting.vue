<template>
  <div class="setting">
    <div class="box">
      <span>登录为 {{userInfo?.name}}</span>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]">退出</el-button>
    </div>
    <div class="box">
      <span>API endpoint</span>
      <el-button type="primary"  class="!bg-[#343e7e] !border-[#343e7e]">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "@/edge/popup/useGlobal";

const {userInfo} = useGlobalStore()

</script>

<style lang="less">
.setting {
  padding-top: 24px;
}
</style>
