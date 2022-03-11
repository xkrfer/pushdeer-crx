<template>
  <van-field class="bg-[#98DDCA]" v-model="value" icon-prefix="search" clearable placeholder="请输入用户名"/>
</template>

<script setup lang="ts">

import {ref} from 'vue';

const value = ref('');

console.log(location)
</script>
