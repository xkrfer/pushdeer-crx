<template>
  <div class="lock p-[24px] flex items-center justify-center relative">
    <push-locked route="/user"/>
    <el-button type="text" class="absolute right-[24px] top-[12px]" @click="open">注销</el-button>
  </div>
</template>

<script lang="ts" setup>
import PushLocked from "../common/push-locked.vue"
import {ElMessage, ElMessageBox} from "element-plus";
import {useGlobalStore} from "@/edge/useGlobal";
import {useNavigation} from "@/hooks/useNavigation";

const store = useGlobalStore();
const {routerTo} = useNavigation()
const open = () => {
  ElMessageBox.confirm(
      '确定要注销吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: '!w-[300px]',
        type: 'warning',
      }
  )
      .then(async () => {
        await store.logout()
        ElMessage({
          type: 'success',
          message: '注销成功！',
        })
        await routerTo({
          name: "Login"
        })
      }).catch(() => {
  })
}
</script>

<style lang="less">
.lock {
  background: url("../../assets/deer.png") 100% no-repeat;
  height: 100%;
  width: 100%;
}
</style>
