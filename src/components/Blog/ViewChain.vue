<template>
    <div class="viewchain" v-if="$attrs.logourl && $attrs.url && $attrs.chainname">
        <div class="head">
            <img :src="$attrs.logourl">
        </div>
        <div class="text">
            {{ $attrs.chainname }}<br>
            {{ $attrs.url }}
        </div>
    </div>
    <el-skeleton v-else style="--el-skeleton-circle-size: 70px; margin-top: 10px;" :loading="$attrs.url" animated>
        <template #template>
            <div class="align" style="display: flex; width: 200px; flex-wrap: wrap;">
                <el-skeleton-item variant="circle" style="min-width: 70px;" />
                <div class="line" style="width:130px;display: flex; flex-direction: column; justify-content: space-around;">
                    <el-skeleton-item variant="text" style="margin-right: 16px;" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                    <el-skeleton-item variant="text" style="margin-right: 16px; width: 70%" />
                </div>
            </div>
        </template>
    </el-skeleton>
</template>

<script setup>

</script>

<style lang="less" scoped>
.viewchain {
    display: flex;
    width: 100%;
    height: 70px;
    margin-top: 10px;

    .head {
        height: 70px;
        display: flex;

        img {
            margin: auto auto;
            height: 70px;
            width: 70px;
            border-radius: 50%;
            background-color: #E1F1FF;

        }
    }

    .text {
        width: 200px;
        height: 70px;
        line-height: 40px;
        font-family: '宋体';
        font-weight: 700;
        font-size: 1.5rem;
        color: #A33C8E;
    }
}
</style>