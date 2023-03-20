<template>
    <Structure text="友链管理">
        <el-table :data="pagiData" lazy max-height="700" style="width: 100%" :border="true" :highlight-current-row="true">
            <el-table-column label="链接名称" min-width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.chainname }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="链接地址" min-width="150">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.url }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="链接logo" min-width="250">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.logourl }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="链接排序" min-width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.sort }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="200">
                <template #default="scope">
                    <el-button size="default" @click="handlerEdit(scope.$index, scope.row)" style="color:white"
                        color="#7894D9">
                        <Icon icon="Edit" />编辑
                    </el-button>
                    <el-button size="default" @click="handleDelete(scope.$index, scope.row)" style="color:white"
                        color="#EF5E5C">
                        <Icon icon="DeleteFilled" />删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :currentPage="currentPage" :pageSize="pageSize" :ItemCount="ItemCount" @pageSelect="emitFun" />
        <div class="messageItem">
            <div class="title">
                添加友链
            </div>
            <div class="content">

                <input type="text" v-model="form.chainname" id="title" placeholder="请输入链接标题">
                <input type="text" @blur="handleUrlBlur" v-model="form.url" id="website" placeholder="请输入链接地址">
                <input type="text" @blur="handleUrlBlur" v-model="form.logourl" id="logoUrl" placeholder="请输入链接LOGO">
                <input type="number" v-model="form.sort" id="position">
                <button @click.prevent="handleSave">保存链接</button>
                <ViewChain :url="form.url" :chainname="form.chainname" :logourl="form.logourl" />

            </div>
        </div>

    </Structure>
    <el-dialog v-model="EditDialogVisible" title="修改友链信息" :close-on-click-modal="false" destroy-on-close>
        <div class="modify">
            <input type="text" v-model="edit.chainname" id="title" placeholder="请输入链接标题">
            <input type="text" v-model="edit.url" @blur="handleUrlBlur" id="website" placeholder="请输入链接地址">
            <input type="text" v-model="edit.logourl" @blur="handleUrlBlur" id="logoUrl" placeholder="请输入链接LOGO">
            <input type="number" v-model="edit.sort" id="position">
        </div>
        <template #footer>
            <el-button color="#626aef" :dark="true" @click="handleSaveEdit">保存修改</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import ViewChain from '@/components/Blog/ViewChain.vue';
import { ref, computed, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import Structure from '@/components/Blog/Structure.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import { chainStore } from '@/stores';
const chain = chainStore()
let tableData = ref(chain.chain)
let currentPage = ref(1)
let pageSize = ref(10)
let ItemCount = ref(tableData.value.length)
let EditDialogVisible = ref(false)
let form = reactive({
    chainname: '',
    url: '',
    logourl: '',
    sort: 0
})

//修改处理
let edit = reactive({
    chainname: '',
    url: '',
    logourl: '',
    sort: 0
})

//输入框语法检查
let formCheck = reactive({
    chainname: false,
    url: false,
    logo: false,
    sort: false
})

//分页器的数据
let pagiData = computed(() =>
    tableData.value.filter((_, index) =>
        index + 1 > (currentPage.value - 1) * pageSize.value &&
        index + 1 <= currentPage.value * pageSize.value
    )
)

//获取数据
const getData = async () => {
    tableData.value = await chain.getChains()
}

//分页器返回选中页
const emitFun = (page) => {
    currentPage.value = page
}

//修改按钮事件
const handlerEdit = (index, row) => {
    formCheck = {
        chainname: true,
        url: true,
        logo: true,
        sort: true
    }
    //显示对话框
    EditDialogVisible.value = true
    //显示信息
    edit = Object.assign(edit, row)
}

const handleSaveEdit = async () => {
    //关闭对话框
    if (!chain.chain.map(item => item.sort).filter(item => item != edit.sort).includes(parseInt(edit.sort))) formCheck.sort = true
    else formCheck.sort = false
    if (edit.chainname != '') formCheck.chainname = true
    else formCheck.chainname = false
    if (!Object.values(formCheck).includes(false)) {
        EditDialogVisible.value = false;
        await chain.MODIFYCHAIN(Object.entries(edit).map(item => `${item[0]}=${item[1]}`).join('&&'))
        getData()
        formCheck = {
            chainname: false,
            url: false,
            logo: false,
            sort: false
        }
        edit = reactive({
            chainname: '',
            url: '',
            logourl: '',
            sort: 0
        })
    } else {
        ElMessage({
            message: '请输入正确信息',
            type: 'warning'
        })
    }
}

//输入框失去焦点事件
const handleUrlBlur = (e) => {
    const zz = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
    if (zz.test(e.target.value)) {
        formCheck.url = true
        formCheck.logo = true
        e.target.style.border = 'none'
    } else {
        formCheck.url = false
        formCheck.logo = false
        e.target.style.border = '1px solid red'
    }
}

//保存按钮事件
const handleSave = async () => {
    if (!chain.chain.map(item => item.sort).includes(parseInt(form.sort))) formCheck.sort = true
    if (form.chainname != '') formCheck.chainname = true
    if (!Object.values(formCheck).includes(false)) {
        await chain.ADDCHAIN(Object.entries(form).map(item => `${item[0]}=${item[1]}`).join('&&'))
        getData()
        formCheck = {
            chainname: false,
            url: false,
            logo: false,
            sort: false
        }
        form = reactive({
            chainname: '',
            url: '',
            logourl: '',
            sort: 0
        })
    } else {
        ElMessage({
            message: '请输入正确信息',
            type: 'warning'
        })
    }
}

//删除按钮
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        `你确定要删除${row.chainname}用户的友链吗?`,
        '确认框',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
        }
    ).then(async () => {
        await chain.DELETECHAIN(row.id)
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

.el-button--primary {
    background: #F56C6C !important;
    border: none;

    &:hover {
        opacity: .8;
    }
}

.messageItem {
    margin-top: 100px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 4px 1px gray;
    border-radius: 5px;

    .title {
        height: 50px;
        background: rgba(10, 10, 10, .1);
        font-size: 20px;
        font-weight: bold;
        color: gray;
        line-height: 50px;
        padding-left: 20px;
    }

    .content {
        height: fit-content;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px;

        input {
            margin-top: 10px;
            margin-left: 10px;
            width: 200px;
            height: 40px;
            border: none;
            border-radius: 3px;
            box-shadow: 1px 1px 3px 1px gray;
            background: #FAFAFA;
            box-sizing: border-box;
            padding-left: 10px;
            line-height: 40px;
            font-size: 17px;
            color: gray;
            font-weight: 550;
        }

        button {
            margin-top: 10px;
            height: 35px;
            width: 80px;
            outline: none;
            border: none;
            background-color: #8BCE82;
            border-radius: 5px;
            margin-left: 10px;
            box-shadow: 1px 1px 3px 1px gray;
            color: white;

            &:hover {
                cursor: pointer;
            }

            &:active {
                box-shadow: 2px 2px 3px 1px gray;
            }
        }
    }
}

.modify {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    input {
        margin-top: 10px;
        margin-left: 10px;
        width: 80%;
        height: 40px;
        border: none;
        border-radius: 3px;
        box-shadow: 1px 1px 3px 1px gray;
        background: #FAFAFA;
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 40px;
        font-size: 17px;
        color: gray;
        font-weight: 550;
    }
}
</style>