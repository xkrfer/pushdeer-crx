<template>
  <div class="popup">
    <router-view/>
  </div>
</template>

<script lang="ts" setup></script>

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
