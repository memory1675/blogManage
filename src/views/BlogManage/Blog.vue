<template>
    <Structure text="管理文章">
        <el-table :data="pagiData" lazy max-height="700" style="width: 100%" :border="true" :highlight-current-row="true">
            <el-table-column label="标题" min-width="230">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="类型" min-width="80">
                <template #default="scope">
                    <el-tag type="success" effect="dark">{{ scope.row.type }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="篡写日期" min-width="150">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <Icon icon="timer" />
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="浏览量" min-width="70">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.views }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类" min-width="150">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-tag type="warning" effect="dark" v-for="(tag, index) in scope.row.tags" :key="index"
                            style="margin-left: 10px;">{{ tag }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发布状态" min-width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-tag :type="scope.row.state.type" effect="dark">{{ scope.row.state.title }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="300">
                <template #default="scope">
                    <el-button size="default" @click="handleEditShow(scope.row)" style="color:white" color="#7894D9">
                        <Icon icon="Edit" />编辑
                    </el-button>
                    <el-button size="default" @click="handleDelete(scope.row)" style="color:white" color="#EF5E5C">
                        <Icon icon="DeleteFilled" />删除
                    </el-button>
                    <el-button size="default" style="color:white" color="#FFD94D">
                        <Icon icon="ZoomIn" />预览
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :currentPage="currentPage" :pageSize="pageSize" :ItemCount="ItemCount" @pageSelect="emitFun" />
    </Structure>
    <el-dialog v-model="isEdit" title="修改文章信息" :close-on-click-modal="false" destroy-on-close>
        <div class="editContent">
            <!-- Title 文本输入框-->
            <div class="item">
                <span>文章标题:</span>
                <input type="text" v-model="editValue.title">
            </div>
            <!-- Type 单选下拉框-->
            <div class="item">
                <span>类型:</span>
                <div class="select">
                    <el-select v-model="editValue.type" placeholder="Select" size="large">
                        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled" />
                    </el-select>
                </div>
            </div>
            <!-- Tags 多选下拉框-->
            <div class="item">
                <span>标签:</span>
                <div class="select">
                    <el-select v-model="editValue.tags" multiple collapse-tags collapse-tags-tooltip placeholder="选择标签"
                        size="large">
                        <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>
            <!-- ispub  单选下拉框 -->
            <div class="item">
                <span>发布状态:</span>
                <div class="select">
                    <el-select v-model="editValue.state.title" placeholder="Select" size="large">
                        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled" />
                    </el-select>
                </div>
            </div>
            <!-- openComment 开关-->
            <div class="item">
                <span>开启评论:</span>
                <el-switch v-model="editValue.opencomment" active-color="#33B86C" inline-prompt active-text="开启"
                    inactive-text="关闭" />
            </div>
            <!-- route 文本输入框 -->
            <div class="item">
                <span>路径别名:</span>
                <input v-model="editValue.route" type="text">
            </div>
        </div>
        <template #footer>
            <div class="buttons">
                <el-button color="#FFC65A" :dark="true" @click="handleToPub">
                    <Icon icon="Edit" />富文本编辑器修改
                </el-button>
                <div class="buttonRight">
                    <el-button color="#626aef" :dark="true" @click="isEdit = false">取消</el-button>
                    <el-button color="#626aef" :dark="true" @click="handleEdit">保存修改</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed, reactive, onMounted, toRaw } from 'vue'
import Structure from '@/components/Blog/Structure.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import { blogStore } from '@/stores'
import { blogMerge } from '@/utils/blogFormat';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus'
//MODIFYBLOG 修改
const blog = blogStore()
//路由router
const router = useRouter()
//表数据
let tableData = ref(blog.blog || [])
//当前页
let currentPage = ref(1)
//页体积
let pageSize = ref(10)
//显示编辑框
let isEdit = ref(false)
//文章总数
let ItemCount = ref(tableData.value.length)
//显示数据
let pagiData = computed(() =>
    tableData.value.filter((_, index) =>
        index + 1 > (currentPage.value - 1) * pageSize.value &&
        index + 1 <= currentPage.value * pageSize.value
    )
)

let editValue = reactive({
})

let states = [
    {
        value: '待发布',
        label: '待发布',
    },
    {
        value: '已发布',
        label: '已发布',
    },
    {
        value: '隐藏中',
        label: '隐藏中',
    },
]

let tags = blog.tags.map(item => ({ label: item.tag, value: item.tag }))

let types = blog.types.map(item => ({ label: item.type, value: item.type }))

const getData = async () => {
    await blog.fleshBlog()
    tableData.value = blog.blog
}

const emitFun = (page) => {
    currentPage.value = page
}

const handleEditShow = (row) => {
    isEdit.value = true;
    editValue = reactive(structuredClone(toRaw(row)))
    editValue.oldroute = row.route
}

const handleEdit = async () => {
    await blog.MODIFYBLOG(blogMerge(editValue))
    isEdit.value = false
    getData()
}

const handleToPub = () => {
    if (blog.pub) {
        ElMessageBox.confirm(
            `文章信息未保存您确定要覆盖吗?`,
            '确认框',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        ).then(async () => {
            router.push({ path: '/blogmanage/publishblog', query: { id: editValue.id } })
        }).catch(() => {
            console.log('取消跳转操作！');
        })
    }else{
        router.push({ path: '/blogmanage/publishblog', query: { id: editValue.id } })
    }
}

const handleDelete = (row) => {
    ElMessageBox.confirm(
        `你确定要删除标题为${row.title}的文章吗?`,
        '确认框',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
        }
    ).then(async () => {
        await blog.DELETEBLOG(row.id)
        getData()
    }).catch(() => {
        console.log('取消删除操作！');
    })
}

onMounted(() => {
    if(tableData.length == 0) getData()
})

</script>


<style lang="less" scoped>
.content {
    position: relative;
    box-sizing: border-box;
    flex: 1;
    padding: 20px;
    width: 100%;

    .Pagination {
        position: absolute;
        right: 20px;
        margin-top: 20px;
    }
}

.editContent {
    .item {
        display: flex;
        height: 80px;
        align-items: center;

        span {
            flex: 0 0 30%;
            text-align: right;
            font-size: 1.3rem;
            box-sizing: border-box;
            padding-right: 20px;
            color: #6B63E3;
            font-weight: bold;
            font-family: '方正舒体';
        }

        .select {
            flex: 0 0 50%;
            height: 40px;
            border-radius: 5px;
            box-shadow: 2px 2px 5px 1px #6B63E3;

            .el-select {
                width: 100%;
                --el-fill-color-blank: #FAFAFA;

                .el-input__wrapper {
                    border: none !important;
                    box-shadow: none !important;
                }
            }
        }

        input {
            flex: 0 0 50%;
            height: 40px;
            font-size: 20px;
            box-sizing: border-box;
            border: none;
            border-radius: 2px;
            padding-left: 10px;
            box-shadow: 2px 2px 5px 1px #6B63E3;
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
}
</style>