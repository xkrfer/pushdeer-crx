<template>
  <el-drawer
      v-model="visible"
      direction="rtl"
      size="100%"
      custom-class="message-info"
  >
    <template #title>
      <h1 class="text-black text-[24px] font-bold">详情</h1>
    </template>
    <div>
      <h2 class="text-black text-[20px] font-bold mb-[12px]">{{ info.text }}</h2>
      <div class="overflow-x-auto w-full pb-[12px]">
        <div v-html="info.html"/>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>

import {ref} from "vue";

interface MessageInfo {
  type: "image" | "markdown" | "text"
  text: string
  date: [string, string],
  html: ''
}

const visible = ref(false)

const info = ref<MessageInfo>({
  type: "markdown",
  html: "",
  text: "",
  date: ["", ""]
})

const openDrawer = (message: MessageInfo) => {
  visible.value = true
  info.value = {
    ...message
  }
}

defineExpose({
  openDrawer
})

</script>
<style lang="less">
@import "../../assets/styles/highlight/bootstrap.css";
@import "../../assets/styles/highlight/github.min.css";
.message-info {
  background: url("../../assets/deer.png") 100% no-repeat;

  .el-drawer__header {
    margin-bottom: 0 !important;
  }
}
</style>
