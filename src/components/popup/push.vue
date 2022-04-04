<template>
  <div class="pb-[24px] pt-[12px] px-[12px] h-full">
    <div class="flex justify-between items-center text-[24px] pb-[12px]">
      <h3 class="font-bold">推送</h3>
    </div>
    <div>
      <el-form :model="form" label-width="60px" :rules="rules" ref="Form">
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="markdown">MarkDown</el-radio>
            <el-radio label="text">文本</el-radio>
            <el-radio label="image">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Key" prop="pushkey">
          <el-input v-model="form.pushkey" placeholder="请填入Key"/>
        </el-form-item>
        <el-form-item label="标题" prop="text">
          <el-input v-model="form.text" placeholder="请输入消息标题"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.desp" type="textarea" :rows="12" resize="none" placeholder="请输入消息内容"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPush">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useGetKeyList} from "@/hooks/key/useGetKeyList";
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {storeToRefs} from "pinia";
import {usePushMessage} from "@/hooks/message/usePushMessage";
import {watch} from "vue";
const {onPush, Form, form, rules} = usePushMessage()
const store = useGlobalStore()
const {pushkeys} = storeToRefs(store)

watch(() => pushkeys, () => {
  if (pushkeys.value.length > 0) {
    form.pushkey = pushkeys.value[0]
  }
}, {
  deep: true,
  immediate: true
})


useGetKeyList()
</script>
