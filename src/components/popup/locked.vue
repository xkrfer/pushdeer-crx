<template>
  <div class="lock p-[24px] flex items-center justify-center relative">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="40px"
        class="w-full"
    >
      <el-form-item label="PIN">
        <el-input v-model="ruleForm.pin" type="password" show-password placeholder="请输入pin码"/>
      </el-form-item>
      <el-form-item class="mt-[24px]">
        <el-button type="primary" class="w-full" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
    <el-button type="text" class="absolute right-[24px] top-[12px]" @click="open">注销</el-button>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessage, ElMessageBox} from "element-plus";
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {useNavigation} from "@/hooks/useNavigation";
import {adapter} from "@/helpers/adapter";
import {MessageType} from "@/helpers/message";

const store = useGlobalStore()
const {routerTo} = useNavigation()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  pin: '',
})

const submitForm = async () => {
  const {pin} = ruleForm
  if (!pin) {
    ElMessage.error('请输入pin码')
    return
  }
  if (adapter.md5(pin) === store.pin) {
    ElMessage.success('解锁成功！')
    adapter.emit({
      type: MessageType.PIN_PASS
    })
    await routerTo('/user')
  } else {
    ElMessage.error('错误的PIN码')
  }
}

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
