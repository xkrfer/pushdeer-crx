<template>
  <div class="user">
    <div class="h-[552px]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
    <div class="tab-box h-[48px]  ">
      <div class="tab cursor-pointer" :class="active === tab.path ? 'active':''" v-for="tab in Tabs" :key="tab.name"
           @click="onTabChange(tab)">
        <span class="iconfont" :class="tab.icon"></span>
        <span>{{ tab.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useNavigation} from "@/hooks/useNavigation";
import {useGlobalStore} from "@/edge/useGlobal";

interface ITab {
  name: string;
  icon: string;
  path: string;
}

const Tabs: ITab[] = [
  {
    name: '消息',
    path: 'Message',
    icon: ''
  },
  {
    name: "设备",
    path: "Device",
    icon: "icon-shebei"
  },
  {
    name: "Key",
    path: "Key",
    icon: "icon-yuechi"
  },
  {
    name: "推送",
    path: "Push",
    icon: "icon-tuisong"
  },
  {
    name: "设置",
    path: "Setting",
    icon: "icon-shezhi"
  }
]

const {routerTo, route} = useNavigation()

const active = ref(route.name)

const store = useGlobalStore()

onMounted(async () => {
  const d = await store.getUserInfo()
  if (!d) {
    await store.set('token', undefined)
    await routerTo('/login')
  }
})


const onTabChange = (tab: ITab) => {
  routerTo({
    name: tab.path
  })
  active.value = tab.path
}


</script>

<style lang="less" scoped>
.user {
  background: url("../../assets/deer.png") 100% no-repeat;
  height: 100%;
  width: 100%;

  .tab-box {
    display: flex;
    background: #f6f5f6;
    font-size: 14px;
    position: relative;
    z-index: 10;

    .tab {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: #313d7d;
      }

      &:hover {
        color: #313d7d;
      }

      .iconfont {
        margin-right: 5px;
      }
    }
  }
}

.badge {
  :deep(.el-badge__content) {
    color: var(--el-color-danger);
    overflow: hidden;
  }
}
</style>
