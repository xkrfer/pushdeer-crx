<template>
  <div class="pb-[24px] pt-[12px] px-[12px] h-full" v-loading="listLoading">
    <div class="flex justify-between items-center text-[24px] pb-[12px]">
      <h3 class="font-bold">设备</h3>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" @click="addDevice">新增</el-button>
    </div>
    <el-scrollbar height="492px">
      <div class="device" v-for="device in devices" :key="device.id">
        <div class="box relative">
          <div class="flex items-center">
          <span class="iconfont mr-[10px] text-[20px]" :class="{
            'icon-liulanqi':device.type==='github',
            'icon-shouji':device.type==='ios'
          }"></span>
            <span>{{ device.name }}</span>
          </div>
          <span v-if="device.device_id === device_id">(当前设备)</span>
          <div class="operate absolute hidden right-[-24px] flex-col right-[-24px]">
            <span class="iconfont icon-bianji text-[18px] cursor-pointer hover:text-[#313d7d]"
                  @click="rename(device.id)"></span>
            <el-popconfirm title="确认删除此设备?" confirm-button-text="确定"
                           cancel-button-text="取消" @confirm="confirmDelete(device.id)">
              >
              <template #reference>
                <span class="iconfont icon-shanchu text-[18px] cursor-pointer hover:text-[#313d7d]"></span>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {useGetDeviceList} from "@/hooks/device/useGetDeviceList";
import {useGetFingerprint} from "@/hooks/device/useGetFingerprint";
import {useCreateDevice} from "@/hooks/device/useCreateDevice";
import {useGlobalStore} from "@/edge/popup/useGlobal";
import {storeToRefs} from "pinia";
import {ElMessage} from "element-plus";
import {useRemoveDevice} from "@/hooks/device/useRemoveDevice";
import {useRenameDevice} from "@/hooks/device/useRenameDevice";

const store = useGlobalStore()

const {devices, device_id} = storeToRefs(store)

useGetFingerprint()

const {listDevice, listLoading} = useGetDeviceList()

const {createDevice} = useCreateDevice()

const addDevice = async () => {
  // @ts-ignore
  const isExist = devices.value.some(item => item.device_id === device_id.value)
  if (isExist) {
    ElMessage.warning('当前设备已存在')
  } else {
    await createDevice()
    await listDevice()
  }
}


const {removeDevice} = useRemoveDevice()

const confirmDelete = async (id: number) => {
  await removeDevice(id)
  await listDevice()
  ElMessage.success('删除设备成功')
}

const {renameDevice} = useRenameDevice()

const rename = async (id: number) => {
  await renameDevice(id)
  await listDevice()
}
</script>

<style lang="less">
.device {
  &:hover {
    .operate {
      display: flex;
    }
  }
}

.device-remove {
  width: 300px !important;
}

</style>
