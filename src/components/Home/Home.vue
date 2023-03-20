<template>
  <div class="common-layout">
    <el-container>
      <el-header v-if="blog.token">
        <header>
          <div class="logo"><img src="@/assets/logo.svg"></div>
          <Header />
        </header>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Header from '@/components/Home/HeaderMenu.vue';
import { RouterView } from 'vue-router';
import { blogStore } from '@/stores';
const blog = blogStore()
</script>

<style lang="less">
.el-header {
  padding: 0;

  header {
    width: 100vw;
    height: 60px;
    background: #009088;
    display: flex;
    justify-content: space-between;

    .logo {
      height: 60px;
      width: 200px;

      img {
        height: 60px;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.el-main {
  padding: 0;
  height: calc(100vh - 60px);
}</style>