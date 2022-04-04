<template>
  <div class="pb-[24px] pt-[12px] px-[12px] h-full" v-loading="listLoading">
    <div class="flex justify-between items-center text-[24px] pb-[12px]">
      <h3 class="font-bold">Key</h3>
      <el-button type="primary" class="!bg-[#343e7e] !border-[#343e7e]" :disabled="createLoading" @click="addKey">新增
      </el-button>
    </div>
    <el-scrollbar height="492px">
      <div v-for="key in keyList" :key="key.id" class="relative">
        <div class="box flex-col">
          <div class="flex w-full justify-between items-center">
            <div class="flex items-center">
              <img :src="avatar" class="h-[32px] w-[32px]" alt=""/>
              <span class="self-end ml-[10px]">{{ key.name }}</span>
            </div>
            <span class="self-end"> <i class="iconfont icon-icon text-[16px] mr-[5px]"></i>{{ key.created_at }}</span>
          </div>
          <div class="my-[12px] w-full">
            <el-input v-model="key.key" readonly/>
          </div>
          <el-divider border-style="dashed" class="!my-[0px]"/>
          <div class="mt-[12px] flex justify-between w-full">
            <el-button plain @click="reset(key.id)">重置</el-button>
            <el-button type="primary" @click="copy(key.key)">复制</el-button>
          </div>
        </div>
        <div class="absolute right-[28px] top-0">
          <el-popconfirm title="确认删除此Key?" confirm-button-text="确定"
                         @confirm="remove(key.id)"
                         cancel-button-text="取消">
            <template #reference>
              <span class="iconfont icon-shanchu text-[18px] cursor-pointer hover:text-[#313d7d]"></span>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import avatar from "@/assets/avatar.png";
import {useGetKeyList} from "@/hooks/key/useGetKeyList";
import {useCreateKey} from "@/hooks/key/useCreateKey";
import {useRegen} from "@/hooks/key/useRegen";
import {useCopy} from "@/hooks/useCopy";
import {useRemoveKey} from "@/hooks/key/useRemoveKey";

const {keyList, getKeyList, listLoading} = useGetKeyList()
const {createKey, createLoading} = useCreateKey()
const {regenKey} = useRegen()
const {removeKey} = useRemoveKey()
const {copy} = useCopy()
const addKey = async () => {
  await createKey()
  await getKeyList()
}

const reset = async (id: number) => {
  await regenKey(id)
  await getKeyList()
}

const remove = async (id: number) => {
  await removeKey(id)
  await getKeyList()
}
</script>
