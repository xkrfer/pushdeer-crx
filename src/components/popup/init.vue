<template>
  <el-form :model="form" label-width="0px" class="w-[260px]" :rules="rules" ref="ruleFormRef" @submit.native.prevent>
    <el-form-item prop="endpoint">
      <el-input v-model="form.endpoint" placeholder="请输入API服务的endpoint url"/>
    </el-form-item>
    <el-form-item class="mt-[30px]">
      <el-button type="primary" @click="onSave(ruleFormRef)" class="mx-auto !bg-[#343e7e] !border-[#343e7e]">保存
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import type {FormInstance} from 'element-plus'
import {useGlobalStore} from "@/edge/useGlobal";
import {ElMessage} from "element-plus";
import {useNavigation} from "@/hooks/useNavigation";
import {ENDPOINT} from "@/helpers/constants";

const ruleFormRef = ref<FormInstance>()
const {routerTo} = useNavigation()
const rules = {
  endpoint: [
    {
      required: true,
      message: "请输入API服务的endpoint url",
      trigger: "blur"
    },
    {
      pattern: /^(http|https):\/\/[^\s]+$/,
      message: "请输入正确的API服务的endpoint url",
      trigger: "blur"
    }
  ]
}

const {endpoint} = useGlobalStore()

const form = reactive({
  endpoint,
})

const store = useGlobalStore()

const onSave = (formEl: FormInstance | undefined) => {
  if (formEl) {
    formEl.validate(async (valid: boolean) => {
      if (valid) {
        const {endpoint} = form
        store.set(ENDPOINT, endpoint)
        ElMessage.success('保存成功')
        await routerTo({
          name: "Login"
        })
      }
    })
  }
}
</script>
