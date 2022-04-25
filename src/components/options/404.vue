<template>
  <el-result title="404" sub-title="哦豁！你来到了荒漠！">
    <template #extra>
      <el-button type="primary" @click="back">回到首页</el-button>
    </template>
  </el-result>
</template>
<script setup lang=ts>
import {useNavigation} from "@/hooks/useNavigation"

const {routerTo} = useNavigation()

const back = () => {
  routerTo("/")
}
</script>

<style lang="less">

</style>
