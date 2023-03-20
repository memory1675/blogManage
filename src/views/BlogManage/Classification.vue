<template>
    <Structure text="分类/标签">
        <div class="show-item">
            <div class="types">
                <div class="item" @dblclick="handleDelete('type', item.id)" v-for="(item, index) in types"
                    :style="{ background: rgba() }" :key="item.id">{{
                        item.type }}</div>
            </div>
            <div class="tags">
                <div class="item" @dblclick="handleDelete('tag', item.id)" v-for="(item, index) in tags"
                    :style="{ background: rgba() }" :key="item.id">{{
                        item.tag
                    }}</div>
            </div>
        </div>
        <div class="add-item">
            <div class="type-input">
                <input type="text" ref="type" placeholder="分类" @keyup.enter="addType" />
                <button @click="addType">添加类型</button>
            </div>
            <div class="tag-input">
                <input type="text" ref="tag" placeholder="标签" @keyup.enter="addTag" />
                <button @click="addTag">添加标签</button>
            </div>
        </div>
    </Structure>
</template>

<script setup>
import Structure from '@/components/Blog/Structure.vue';
import random from '@/utils/random'
import { blogStore } from '@/stores';
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
const blog = blogStore()
let tags = ref(blog.tags || []);
let types = ref(blog.types || []);
const type = ref()
const tag = ref()
const getData = async () => {
    await blog.fleshTypeOrTag()
    tags.value = blog.tags
    types.value = blog.types
}
const addTag = async () => {
    if (blog.tags.some(item => item.tag == tag.value.value) || !tag.value.value) {
        ElMessage({
            type: 'warning',
            message: tag.value.value ? '标签已存在!' : '标签不能为空'
        })
    } else {
        await blog.ADDTAG(tag.value.value)
        getData()
        tag.value.value = ''
    }
}

const addType = async () => {
    if (blog.types.some(item => item.type == type.value.value) || !type.value.value) {
        ElMessage({
            type: 'warning',
            message: type.value.value ? '类型已存在!' : '类型不能为空'
        })
    } else {
        await blog.ADDTYPE(type.value.value)
        getData()
        type.value.value = ''
    }
}

const handleDelete = async (type, id) => {
    if (type == 'tag') {
        await blog.DELETETAG(id)
        getData()
    } else {
        await blog.DELETETYPE(id)
        getData()
    }
}

function rgba() {
    return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)},.8)`
}
</script>

<style lang="less" scoped>
.show-item {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;

    .types {
        flex: 0 0 45%;
        height: fit-content;
        padding: 20px;
        background: rgba(225, 241, 255, .5);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(243, 203, 203, 0.1);
        display: flex;
        flex-wrap: wrap;

        .item {
            margin: 5px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            font-size: 1.4rem;
            font-family: '方正舒体'
        }
    }

    .tags {
        flex: 0 0 45%;
        height: fit-content;
        padding: 20px;
        background: rgba(225, 241, 255, .5);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(243, 203, 203, 0.1);
        display: flex;
        flex-wrap: wrap;

        .item {
            margin: 5px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            font-size: 1.4rem;
            font-family: '方正舒体'
        }
    }
}

.add-item {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;

    div {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        flex: 0 0 45%;
        height: 100%;
        border-radius: 3px;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 20px;
            background: rgb(225, 241, 255);
            filter: blur(10px);
            z-index: -1;
        }

        input {
            width: 400px;
            height: 50px;
            border-radius: 8px;
            padding-left: 20px;
            font-size: large;
            font-weight: bold;
            border: none;
            outline: none;
            box-shadow: 0 0 10px 2px rgba(20, 19, 19, 0.3);
            background: transparent;
            font-family: '方正舒体';
            font-size: 2rem;
            color: #000;

            &:focus {
                box-shadow: 0 0 10px 2px rgb(0, 0, 0);
            }
        }

        button {
            width: 200px;
            height: 50px;
            border-radius: 8px;
            padding-left: 20px;
            font-size: 2rem;
            font-weight: bold;
            border: none;
            outline: none;
            box-shadow: 0 0 10px 2px rgba(37, 36, 36, 0.3);
            background: transparent;
            color: #000;
            font-family: '方正舒体';

            &:hover {
                cursor: pointer;
                box-shadow: 0 0 10px 2px rgb(0, 0, 0);
            }

            &:active {
                box-shadow: 1px 2px 10px 2px rgb(0, 0, 0);
            }
        }
    }

}
</style>