<template>
    <Structure text="发布文章">
        <div class="content">
            <input type="text" v-model="inputValue.title" placeholder="请输入标题(必填)">
            <input type="text" v-model="inputValue.route" placeholder="自定义访问路径">
            <div class="m-4">
                <el-select v-model="inputValue.type" class="m-2" placeholder="选择类型" size="large">
                    <el-option v-for="item in blog.types" :key="item.id" :label="item.type" :value="item.type" />
                </el-select>
            </div>
            <input type="text" v-model="inputValue.text" placeholder="请输入基础信息">
            <div class="m-4">
                <el-select v-model="inputValue.tags" multiple collapse-tags collapse-tags-tooltip placeholder="选择标签"
                    size="large">
                    <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <md-editor v-model="text" theme="light" @onSave="handleSave" />
        <div class="setting">
            <footer>
                开启评论
                <el-switch v-model="inputValue.opencomment" active-color="#33B86C" inline-prompt active-text="开启"
                    inactive-text="关闭" />
            </footer>
        </div>
    </Structure>
</template>

<script setup>
import Structure from '@/components/Blog/Structure.vue';
import MdEditor from 'md-editor-v3';
import { useRoute } from 'vue-router';
import { blogStore } from '@/stores';
import { blogMerge } from '@/utils/blogFormat';
import { ElMessage } from 'element-plus'
import 'md-editor-v3/lib/style.css';
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const blog = blogStore()
let inputValue = ref({
    title: '',
    route: '',
    type: '',
    text: '',
    tags: [],
    opencomment: false
})

const text = ref(blog.pub || '# Hello Editor')
onMounted(() => {
    if (route.query.id) {
        inputValue.value = { ...blog.blog.filter(item => item.id == route.query.id)[0] }
        inputValue.value.oldroute = inputValue.value.route
        axios.get(`/file/${inputValue.value.route}.md`).then(res => {
            text.value = res.data
        }, err => {
            alert('file not find')
        })
    }
})

const fleshData = async () => {
    await blog.fleshBlog()
}

onUnmounted(() => {
    if (!route.query.id && text.value != '# Hello Editor') {
        blog.pub = text.value
    }
})

const handleSave = async function () {
    if (inputValue.value.title.length < 1) {
        ElMessage({
            message: '标题不能为空',
            type: 'warning'
        })
        return
    }
    if (inputValue.value.route.length < 1) {
        ElMessage({
            message: '访问路径不能为空',
            type: 'warning'
        })
        return
    }
    if (inputValue.value.type.length < 1) {
        ElMessage({
            message: '类型不能为空',
            type: 'warning'
        })
        return
    }
    if (inputValue.value.tags.length < 1) {
        ElMessage({
            message: '标签不能为空',
            type: 'warning'
        })
        return
    }
    if (inputValue.value.text.length < 1) {
        ElMessage({
            message: '标签不能为空',
            type: 'warning'
        })
        return
    }
    const file = new File([text.value], `${inputValue.value.route}.md`, { type: 'text/plain' })
    const fd = new FormData()
    if (route.query.id) {
        await blog.MODIFYBLOG(blogMerge(inputValue.value))
        fleshData()
        text.value = ''
        router.push('/blogmanage/blog')
    } else {
        fd.append('file', file)
        axios.post('/file/load', fd, {
            headers: {
                'Content-Type': 'multipart/form-data?charset=utf-8'
            }
        })
        blog.ADDBLOG(inputValue.value)
        fleshData()
    }
    inputValue.value = {
        title: '',
        route: '',
        type: '',
        tags: [],
        opencomment: false
    }
}
let tags = blog.tags.map(item => ({ label: item.tag, value: item.tag }))

</script>

<style lang="less" scoped>
.content {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    input {
        flex: 0 0 45%;
        height: 40px;
        border: none;
        border-radius: 5px;
        box-shadow: 2px 2px 5px 1px gray;
        box-sizing: border-box;
        padding-left: 13px;
        font-size: 17px;
        background: #FAFAFA;
    }

    .m-4 {
        flex: 0 0 45%;
        height: 40px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px 1px gray;

        .el-select {
            width: 100%;
            --el-fill-color-blank: #FAFAFA;

            .el-input__wrapper {
                border: none !important;
                box-shadow: none !important;
            }
        }
    }


    .el-input__inner {
        border: none !important;
        box-shadow: none !important;
    }

    .el-select {
        --el-select-input-focus-border-color: transparent;
    }

}

footer {
    margin-top: 10px;
}
</style>