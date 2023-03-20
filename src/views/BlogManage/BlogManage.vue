<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="200px"><LeftMenu /></el-aside>
      <el-main><RouterView/></el-main>
    </el-container>
  </div>
</template>

<script setup>
import LeftMenu from '@/components/Home/LeftMenu.vue';
import { RouterView } from 'vue-router';

</script>

<style>


</style>