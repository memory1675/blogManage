<template>
    <div class="blog blogview">
        <div class="title">
            <div class="font" :style="'font-size:' + $attrs.fontSize || '1.7rem'" >{{ $attrs.text }}</div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <footer v-if="showFooter">
            <div class="year">2023</div>&copy
            <div class="beian">赣ICP备2022010745号-1</div>
        </footer>
    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const showFooter = router.currentRoute.value.meta.showFooter
</script>

<style lang="less" scoped>
.blogview {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .title {
        flex: 0 0 10%;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 2px solid #575362;
        
        .font {
            position: absolute;
            color: #575362;
            font-size: 1.7rem;
            bottom: 20px;
            left: 50px;

        }
    }

    .content {
        box-sizing: border-box;
        flex: 1;
        padding: 20px;
        width: 100%;
        
    }
    footer{
        height: 40px;
        width: 100%;
        box-shadow: 0 -1px 5px 1px gray;
        line-height: 40px;
        padding-left: 20px;
        display: flex;
        color: rgba(101, 20, 90, 1);
        .year{
            color: rgba(10, 20, 90, .5);
        }

        .beian{
            font-size: 13px;
            color: rgba(10, 20, 90, .5);
        }
    }
}
</style>