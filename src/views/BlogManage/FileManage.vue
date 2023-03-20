<template>
    <Structure text="文件管理">
        <el-upload class="upload-demo" drag action="http://localhost:5173" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
        </el-upload>
    </Structure>
</template>

<script setup>
import Structure from '@/components/Blog/Structure.vue';
import { onMounted } from 'vue';
import { blogStore } from '@/stores'
const blog = blogStore()
onMounted(() => {
    blog.enterPub = true
})
</script>

<style lang="less"></style>