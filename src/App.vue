<script setup>
import Home from '@/components/Home/Home.vue';
import { onMounted } from 'vue';
import { blogStore } from '@/stores'
const blog = blogStore()
onMounted(() => {
  blog.getBlogs()
})
</script>

<template>
  <Home/>
</template>

<style></style>