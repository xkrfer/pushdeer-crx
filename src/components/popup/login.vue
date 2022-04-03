<template>
  <div class="flex flex-col items-center">
    <p class="mb-[10px]">当前endpoint：{{ endpoint || "无" }}</p>
    <router-link to="/login/init">
      <div
          class="h-[38px] leading-[30px] w-[170px] text-center bg-[#343e7e] text-white px-[18px] py-[4px] rounded-[5px] cursor-pointer">
        重置API endpoint
      </div>
    </router-link>
    <div class="mt-[30px]" v-if="endpoint && github">
      <div
          @click="login"
          class="h-[38px] w-[170px] text-center leading-[30px] bg-[#161413]  text-white px-[18px] py-[4px] rounded-[5px] cursor-pointer">
        GitHub 登录
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useGlobalStore} from "@/edge/popup/useGlobal";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useRequest} from "@/hooks/useRequest";
import {API, GITHUB, LOGIN_SUCCESS} from "@/helpers/constants";
import {adapter} from "@/helpers/adapter";

const store = useGlobalStore()

const {endpoint, github} = storeToRefs(store)

const {run} = useRequest(API.getAppid)

const login = () => {
  adapter.loginGithub()
}

const getAppid = async () => {
  if (!endpoint.value) return
  const data = await run()
  store.set(GITHUB, data.content.github)
}

onMounted(() => {
  getAppid()
})

</script>
