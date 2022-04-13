<template>
  <router-view/>
</template>

<script lang="ts" setup>
import {CONNECT_NAME} from "@/helpers/constants";
import {adapter} from "@/helpers/adapter";
import {MessageType} from "@/helpers/message";
import {useNavigation} from "@/hooks/useNavigation";
import {useGlobalStore} from "@/edge/popup/useGlobal";

if (import.meta.env.PROD) {
  chrome.runtime.connect({name: CONNECT_NAME});
}
const {routerTo} = useNavigation()
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
  height: 100vh;
  width: 375px;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
