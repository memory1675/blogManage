<template>
    <el-menu :default-active="needToShowRouter[0].path" 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse"
    router>
        <el-menu-item :index="route.path" v-for="route in needToShowRouter" :key="route.path" :disabled="route.meta.disable">
            <template #title><Icon :icon="route.meta.icon"/>{{ route.meta.name }}</template>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const isCollapse = ref(false)
const router = useRouter()
const needToShowRouter = router.getRoutes().filter(item => item.meta.isBlogChidren)









/* window.addEventListener('resize',() => {
    if(window.innerWidth < 700) isCollapse.value = true
    else isCollapse.value = false
}) */
</script>

<style lang="less">
.el-menu {
    height: calc(100vh - 60px);
    .el-menu-item.is-active{
        border: none;
        color: white !important;
        background: #434AC4;
    }
    .el-menu-item:not(.is-disabled):hover{
        color: white;
        background: #434AC4;
    }
}
</style>