<template>
  <div class="pb-[24px] pt-[12px] px-[12px] h-full">
    <div class="flex justify-between items-center text-[24px] pb-[12px]">
      <h3 class="font-bold">推送</h3>
    </div>
    <el-scrollbar height="492px">
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
          <textarea v-model="form.desp" autocomplete="off"
                    class="text-[#606266] w-[291px] px-[15px] py-[5px] leading-[1.5] rounded-[4px]"
                    placeholder="请输入消息内容"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPush">发送</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {useGetKeyList} from "@/hooks/key/useGetKeyList";
import {useGlobalStore} from "@/edge/useGlobal";
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

<style lang="less" scoped>
textarea {
  box-shadow: rgb(220, 223, 230) 0 0 0 1px inset;
  height: 250px;
  resize: none;
  &:hover {
    box-shadow: 0 0 0 1px #c0c4cc inset;
  }
  &:focus,&:focus-visible{
    outline: none;
    box-shadow: 0 0 0 1px #313d7d inset !important;
  }
}
</style>
