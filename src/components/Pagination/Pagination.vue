<template>
    <div class="Pagination">
        <div class="buttongroup">
            <button v-if="startNumAndEnd[0] > 1" :class="{ active: currentPage == 1 }"
                @click="emit('pageSelect', 1)">1</button>
            <button v-if="startNumAndEnd[0] > 2">···</button>
            <button v-for="(item, index) in startNumAndEnd[1]" :key="index" v-show="item >= startNumAndEnd[0]"
                :class="{ active: currentPage == item }" @click="emit('pageSelect', item)">{{ item }}</button>
            <button v-if="startNumAndEnd[1] < pageCount - 1">···</button>
            <button v-if="startNumAndEnd[1] != pageCount" :class="{ active: currentPage == pageCount }"
                @click="emit('pageSelect', pageCount)">{{ pageCount }}</button>
        </div>
        <button style="width:fit-content" class="total">共 {{ pageCount }} 页</button>
    </div>
</template>

<script setup>
//:currentPage="1" :pageSize="5" :ItemCount="90"
import { ref, computed, toRefs } from 'vue';
let props = defineProps(['currentPage', 'pageSize', 'ItemCount'])
let { currentPage, pageSize, ItemCount } = toRefs(props)
let emit = defineEmits(['pageSelect'])
let pageCount = ref(Math.ceil(ItemCount.value / pageSize.value))
let continues = ref(5)

let startNumAndEnd = computed(() => {
    let start = 0, end = 0
    if (continues.value > pageCount.value) {
        start = 1
        end = pageCount.value
    } else {
        start = currentPage.value - parseInt(continues.value / 2)
        end = currentPage.value + parseInt(continues.value / 2)
        if (start < 1) {
            start = 1
            end = continues.value
        }
        if (end > pageCount.value) {
            start = pageCount.value - continues.value + 1
            end = pageCount.value
        }
    }
    return [start, end]
})

</script>


<style lang="less" scoped>
.Pagination {
    display: flex;
    height: 40px;
    width: fit-content;
    border-radius: 20px;
    border: 2px solid #434AC4;
    overflow: hidden;
    .buttongroup {
        button {
            background: none;
            border: none;
            border-right: 2px solid #434AC4;
            height: 40px;
            width: 50px;
            line-height: 30px;
            &:hover {
                cursor: pointer;
                background: rgba(67, 74, 196, .7);
            }

            &.active {
                background: rgba(67, 74, 196, .7);
            }
        }
    }

    .total {
        background: none;
        border: none;
        height: 40px;
        width: 50px;
        line-height: 30px;
    }
}</style>