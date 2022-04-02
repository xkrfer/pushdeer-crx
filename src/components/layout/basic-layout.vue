<template>
  <div class="flex flex-col items-center">
    <div class="h-[375px]">
      <img :src="logo" alt="log">
    </div>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png"
</script>
