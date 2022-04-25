<template>
  <el-result icon="error" title="403" sub-title="暂无权限，快打开插件进行登录吧！">
    <template #extra>
      此窗口 {{ count }}s 后关闭！
    </template>
  </el-result>
</template>
<script setup lang=ts>
import {useNavigation} from "@/hooks/useNavigation";
import {onMounted, ref} from "vue";

const {routerTo} = useNavigation()
const count = ref(10)
const countDown = () => {
  if (count.value > 0) {
    setTimeout(() => {
      count.value--
      countDown()
    }, 1000)
  } else {
    window.close()
  }
}

onMounted(() => {
  countDown()
})

</script>

<style lang="less">

</style>
