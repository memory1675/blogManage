<template>
    <Structure text="评论管理">
        <el-table :data="pagiData" lazy max-height="700" style="width: 100%" :border="true" :highlight-current-row="true">
            <el-table-column label="名称" min-width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.username }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" min-width="230">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.comment }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="文章id" min-width="230">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.articleid }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论日期" min-width="200">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <Icon icon="timer" />
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" min-width="200">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.email }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论状态" min-width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-tag v-if="!scope.row.edit" :type="scope.row.state.type" effect="dark">{{ scope.row.state.title
                        }}</el-tag>
                        <el-switch v-else v-model="scope.row.state.statement" class="ml-2" @change="handleChange(scope.row)"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #808080" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="300">
                <template #default="scope">
                    <el-button size="default" @click="handlerEdit(scope.$index, scope.row)" style="color:white"
                        color="#7894D9">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import Structure from '@/components/Blog/Structure.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import { commentStore } from '@/stores';
import { commentMerge } from '@/utils/commentFormat'
import {ElMessageBox} from 'element-plus'
const comment = commentStore();
let tableData = ref(comment.comment || [])
let currentPage = ref(1)
let pageSize = ref(10)
let ItemCount = ref(tableData.value.length)
let pagiData = computed(() =>
    tableData.value.filter((_, index) =>
        index + 1 > (currentPage.value - 1) * pageSize.value &&
        index + 1 <= currentPage.value * pageSize.value
    )
)

const getData = async () => {
    tableData.value = await comment.getComments()
}

const emitFun = (page) => {
    currentPage.value = page
}

const handlerEdit = (index, row) => {
    tableData.value[index].edit = !tableData.value[index].edit
}

const handleChange = async (row) => {
    await comment.MODIFYCOMMENT(commentMerge(row))
    getData()
}
const handleDelete = (row) => {
    ElMessageBox.confirm(
        `你确定要删除${row.username}用户的评论吗?`,
        '确认框',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
        }
    ).then(async () => {
        await comment.DELETECOMMENT(row.id)
        getData()
    }).catch(() => {
        console.log('取消删除操作！');
    })
}
</script>

<style lang="less">
.Pagination {
    position: absolute;
    right: 20px;
    margin-top: 20px;
}
</style>