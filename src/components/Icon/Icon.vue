<template>
    <el-icon :bind="$attrs">
        <component :is="icon"></component>
    </el-icon>
</template>

<script setup>
const {icon} = defineProps(['icon'])
</script>
