<template>
  <div class="pb-[24px] pt-[12px] px-[12px] h-full">
    <div class="flex justify-between items-center text-[24px] pb-[12px]">
      <h3 class="font-bold">消息</h3>
    </div>
    <div class="flex">
      <el-input v-model="keyword" placeholder="请输入关键词" class="mr-[5px]" @keydown.enter="search" clearable
                @clear="search"/>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="h-[460px] py-[12px]">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="message in list" :key="message.id" class="infinite-list-item">
          <div class="flex items-center my-[12px]">
            <span class="w-[20px] h-[1px] line"></span>
            <img :src="avatar" alt="" class="w-[32px] h-[32px] mx-[5px] relative top-[-5px]">
            {{ message.pushkey_name }}
            <div class="text-[12px] ml-[10px] mr-[5px]">
              <p>{{ message.date[0] }}</p>
              <p>{{ message.date[1] }}</p>
            </div>
            <span class="flex-1 h-[1px] line"></span>
          </div>
          <div class="message-info py-[5px] px-[15px]">
            <div class="flex items-center">
              <h3 class="font-bold text-[16px] flex-1 mr-[5px] line-clamp-1">{{ message.text }}</h3>
              <el-button type="text" plain @click.stop="openInfo(message)">查看详情</el-button>
            </div>
            <p class="line-clamp-5" v-html="message.html"></p>
          </div>
        </li>
      </ul>
    </div>
    <message-info ref="InfoRef"/>
  </div>
</template>

<script lang="ts" setup>
import avatar from "@/assets/avatar.png";
import MessageInfo from "@/components/popup/message-info.vue";
import {onMounted, ref} from "vue";
import {useMessage} from "@/hooks/message/useMessage";

const InfoRef = ref()

const {load, keyword, search, list} = useMessage()

onMounted(() => {
  load()
})


const openInfo = (message: any) => {
  const {type, text, date, html} = message
  InfoRef.value.openDrawer({
    type, text, date, html
  })
}


</script>

<style lang="less" scoped>
.infinite-list {
  height: 436px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  margin: 24px 0;
}

.line {
  background: #313d7d;
}


.message-info {
  min-height: 48px;
  border: 1px solid #313d7d;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(49, 61, 125, 0.25);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
