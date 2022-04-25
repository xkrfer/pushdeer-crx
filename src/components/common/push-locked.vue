<template>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="40px"
      :class="props.classname"
  >
    <el-form-item label="PIN">
      <el-input v-model="ruleForm.pin" type="password" show-password placeholder="请输入pin码"/>
    </el-form-item>
    <el-form-item class="mt-[24px]">
      <el-button type="primary" class="w-full" @click="submitForm">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {adapter} from "@/helpers/adapter";
import {MessageType} from "@/helpers/message";
import {useGlobalStore} from "@/edge/useGlobal";
import {useNavigation} from "@/hooks/useNavigation";

const props = defineProps({
  classname: {
    type: String,
    default: "w-full",
  },
  route: {
    type: String,
    default: "",
  }
})

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
    await routerTo(props.route)
    ElMessage.success('解锁成功！')
    adapter.emit({
      type: MessageType.PIN_PASS
    })
  } else {
    ElMessage.error('错误的PIN码')
  }
}

</script>

<style lang="less">

</style>
