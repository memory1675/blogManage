<template>
    <div class="LoginContainer">
        <div class="loginForm">
            <h1>登录</h1>
            <div class="username">
                <label>账号:</label>
                <input type="text" v-model="user.username">
            </div>
            <div class="username">
                <label>密码:</label>
                <input type="password" v-model="user.password">
            </div>
            <button @click="handleToLogin">登录</button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { blogStore } from '@/stores';
const router = useRouter()
const blog = blogStore()
let user = reactive({
    username: '',
    password: ''
})
const handleToLogin = () => {
    if (blog.handleLogin(user)) {
        console.log(router);
        router.push('/blogmanage/blogview')
    }
}
</script>


<style lang="less" scoped>
.LoginContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #687798;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loginForm {
        height: 300px;
        width: 50%;
        max-width: 600px;
        min-width: 400px;
        border-radius: 10px;
        background-color: rgba(84, 92, 100, .5);
        box-shadow: 0 1px 4px 1px rgba(255, 255, 255, .5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        h1 {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
        }

        &>div {
            width: 100%;
            height: 30px;
            display: flex;

            label {
                flex: 0 0 20%;
                font-size: 20px;
                height: 30px;
                line-height: 30px;
                text-align: right;
            }

            input {
                overflow: hidden;
                flex: 0 0 60%;
                margin-left: 10px;
                height: 30px;
                font-size: 20px;
                border-radius: 5px;
                border: none;
            }
        }

        button {
            height: 30px;
            width: 50%;
            border: none;
            border-radius: 5px;
            margin-bottom: 10px;

            &:hover {
                opacity: .8;
                cursor: pointer;
            }

            &:active {
                box-shadow: 0 0 3px 1px white;
            }
        }
    }
}
</style>