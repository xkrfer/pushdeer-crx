<template>
  <div class="flex flex-col items-center">
    <div>
      <img :src="logo" alt="log">
    </div>
    <div class="h-[38px] leading-[30px] w-[170px] text-center bg-[#343e7e] text-white px-[18px] py-[4px] rounded-[5px] cursor-pointer">
      重置API endpoint
    </div>

    <div class="mt-[30px]">
        <div class="h-[38px] w-[170px] text-center leading-[30px] bg-[#161413]  text-white px-[18px] py-[4px] rounded-[5px] cursor-pointer">GitHub 登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/logo.png"

</script>

<style lang="less">

</style>
