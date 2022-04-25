<template>
  <div class="pb-[20px] h-[100vh] bg-#fff">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import {CONNECT_OPTION_NAME} from "@/helpers/constants";
import {adapter} from "@/helpers/adapter";
import {MessageType} from "@/helpers/message";
import {useGlobalStore} from "@/edge/useGlobal";
import {useNavigation} from "@/hooks/useNavigation";

const {routerTo} = useNavigation()

if (import.meta.env.PROD) {
  chrome.runtime.connect({name: CONNECT_OPTION_NAME});
}
const store = useGlobalStore()

adapter.on((message, sender, sendResponse) => {
  switch (message.type) {
    case MessageType.PIN_STATE:
      const locked = message.data
      store.$patch({
        passed: !locked
      })
      if (locked) {
        routerTo("/locked")
      }
      sendResponse('ok')
      break
  }
})
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url("../assets/deer.png") no-repeat center center fixed;
}

</style>
