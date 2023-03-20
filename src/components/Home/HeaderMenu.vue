<template>
    <el-menu
    :default-active="routes[2].path"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item :index="route.path" v-for="route in routes" :key="route.path" :disabled="route.meta.disable">{{ route.meta.name }}</el-menu-item>
  </el-menu>
</template>

<script setup>
import {mainStore} from '@/stores/mainStore.js'
const store = mainStore();
store.getRouters()
const routes = store.needShowRoutes

</script>

<style lang="less" scoped>

.el-menu{
    width: 450px;
    height: 60px;
    border-bottom: none;
    background: #009088;
    .el-menu-item.is-active{
        border: none;
        color: white !important;
        background: rgba(133, 4, 255, 0.5);
    }
    .el-menu-item:not(.is-disabled):hover{
        color: white;
        background: rgba(133, 4, 255, 0.5);
    }
}
</style>