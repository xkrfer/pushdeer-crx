<template>
  <div class="w-full">
    <div class="search-bar">
      <div class="flex items-center justify-end pt-[20px] w-[1200px] mx-auto">
        <el-input v-model="keyword" placeholder="请输入关键词" class="!w-[250px] mr-[5px]" @keydown.enter="search" clearable
                  @clear="search"/>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
      <el-divider class="!mb-0 mt-[20px]"/>
    </div>
    <div class="pb-[20px] top-[70px] content">
      <div class="w-[1200px] mx-auto" v-loading="loading">
        <ul class="infinite-list" id="message" style="overflow: auto">
          <template v-if="list.length>0">
            <li v-for="message in list" :key="message.id" class="infinite-list-item">
              <div class="flex items-center my-[12px]">
                <span class="w-[20px] h-[1px] line"></span>
                <img :src="avatar" alt="" class="w-[32px] h-[32px] mx-[5px] relative top-[-5px]">
                {{ message.pushkey_name }}
                <div class="text-[14px] ml-[10px] mr-[5px] flex items-center">
                  <p class="mb-0 mr-[5px]">{{ message.date[0] }}</p>
                  <p class="mb-0">{{ message.date[1] }}</p>
                </div>
                <span class="flex-1 h-[1px] line"></span>
              </div>
              <div class="message-info p-[16px]">
                <h1 class="font-bold text-[16px] mb-[10px]">{{message.text}}</h1>
                <p v-html="message.html"></p>
              </div>
            </li>
          </template>
          <el-empty :image-size="200" v-else description="暂无数据"></el-empty>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMessage} from "@/hooks/message/useMessage";
import avatar from "@/assets/avatar.png";
import {onBeforeUnmount, onMounted} from "vue";

const {search, keyword, load, list, loading} = useMessage()

const onScrollBottom = () => {
  const scrollTop = document.getElementById('message')!.scrollTop
  const clientHeight = document.getElementById('message')!.clientHeight;
  const scrollHeight = document.getElementById('message')!.scrollHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    load()
  }
  return null
}


onMounted(() => {
  load()
  document.getElementById('message')!.addEventListener("scroll", onScrollBottom)
})

onBeforeUnmount(() => {
  document.getElementById('message')!.removeEventListener("scroll", onScrollBottom)
})


</script>

<style lang="less">
.content {
  overflow-y: auto;
  padding-top: 90px;
}

.search-bar {
  position: fixed;
  background: #fff;
  z-index: 100;
  left: 0;
  right: 0;
}

.infinite-list {
  height: calc(100vh - 110px);
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
