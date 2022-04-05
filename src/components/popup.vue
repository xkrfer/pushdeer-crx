<template>
  <div class="popup">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import {CONNECT_NAME} from "@/helpers/constants";

if (import.meta.env.PROD) {
  chrome.runtime.connect({name: CONNECT_NAME});
}


</script>

<style lang="less">
.popup {
  height: 600px;
  width: 375px;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
