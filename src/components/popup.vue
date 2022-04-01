<template>
  <div class="root">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import InitServer from "@/components/popup/init-server.vue";
import {adapter} from "@/helpers/adapter";

const init = async () => {
  // 获取token
  const token = await adapter.getStorage("token")
  const api = await adapter.getStorage("api")

}

onMounted(() => {
  init()
})

</script>

<style lang="less">
.root {
  //background: url("../assets/deer.png") 100% no-repeat;
  height: 667px;
  width: 375px;
}
</style>
