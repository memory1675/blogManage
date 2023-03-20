<template>
    <Structure text="仪表盘">
        <div class="blogView">
            <div class="mainView">
                <div class="viewItem" style="--bgColor:rgba(41,182,246, .8)">
                    <div class="viewLeft" style="--bgColor:rgba(41,182,246, .5)">
                        <Icon icon="DocumentRemove" />
                    </div>
                    <div class="viewRight">
                        <p>发表了</p>
                        <p>{{ blog.blog.length }}</p>
                        <p>篇文章</p>
                    </div>
                </div>
                <div class="viewItem" style="--bgColor:rgba(126,87,194, .8)">
                    <div class="viewLeft" style="--bgColor:rgba(126,87,194, .5)">
                        <Icon icon="ChatLineRound" />
                    </div>
                    <div class="viewRight">
                        <p>收到了</p>
                        <p>{{ comment.comment.length }}</p>
                        <p>条留言</p>
                    </div>
                </div>
                <div class="viewItem" style="--bgColor:rgba(51,184,108, .8)">
                    <div class="viewLeft">
                        <Icon icon="UploadFilled" />
                    </div>
                    <div class="viewRight">
                        <p>上传了</p>
                        <p>0</p>
                        <p>个附件</p>
                    </div>
                </div>
                <div class="viewItem" style="--bgColor:rgba(110,140,215, .8)">
                    <div class="viewLeft">
                        <Icon icon="Connection" />
                    </div>
                    <div class="viewRight">
                        <p>友链了</p>
                        <p>{{ chain.chain.length }}</p>
                        <p>个好友</p>
                    </div>
                </div>
            </div>
            <div class="message">
                <div class="messageItem">
                    <div class="title">
                        最新文章
                    </div>
                    <div class="content">
                        <div class="item" v-for="(item, index) in blogShow" :key="index">
                            <div class="text">{{ item.title }}</div>
                            <div class="views">{{ item.views }}</div>
                        </div>
                    </div>
                </div>
                <div class="messageItem">
                    <div class="title">
                        最新留言
                    </div>
                    <div class="content">
                        <div class="commentItem" v-for="(item, index) in commentShow" :key="index">
                            <div class="name">{{ item.username }}</div>
                            <div class="time">于{{ item.date }}</div>
                            <div class="comment">{{ item.comment }}</div>
                        </div>
                    </div>
                </div>
                <div class="messageItem">
                    <div class="title">
                        系统日志
                    </div>
                    <div class="content">
                        <div class="configItem" v-for="(item, index) in newConfig" :key="index">
                            <div class="config">{{ `${item.time}=>${item.config}` }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Structure>
</template>

<script setup>
import Structure from '@/components/Blog/Structure.vue';
import { computed } from 'vue'
import { blogStore, chainStore, commentStore } from '@/stores';
const blog = blogStore()
const chain = chainStore()
const comment = commentStore()
const blogShow = computed(() => {
    return blog.blog.slice(0,5)
})

const commentShow = computed(() => {
    return comment.comment.slice(0,3)
})

const newConfig = [
    {
        time: '2023-02-11 16:23:44',
        config: '登录后台'
    },
    {
        time: '2023-02-13 16:23:44',
        config: '登录后台'
    },
    {
        time: '2023-02-24 12:23:44',
        config: '登录后台'
    },
    {
        time: '2023-02-28 13:23:44',
        config: '登录后台'
    }
];

</script>

<style lang="less" scoped>
.blogView {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .mainView {
        flex: 0 0 25%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .viewItem {
            height: 80%;
            flex: 0 0 24%;
            background: var(--bgColor);
            border-radius: 5px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            &:hover {
                opacity: .7;
                cursor: pointer;
            }

            .viewLeft {
                height: 80px;
                width: 80px;
                background: var(--bgColor);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;

                &:first-child {
                    font-size: 40px;
                }
            }

            .viewRight {
                width: 90px;
                height: 70%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                color: white;

                p:nth-child(1),
                p:nth-child(3) {
                    opacity: .6;
                }

                p:nth-child(2) {
                    width: 100%;
                    text-align: right;
                    padding-right: 30px;
                    font-size: 30px;

                }
            }
        }
    }

    .message {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .messageItem {
            flex: 0 0 32.5%;
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
                flex: 1;
                padding: 30px;

                //文章样式
                .item {
                    height: fit-content;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 1px 1px 4px 1px gainsboro;

                    &:hover {
                        background: rgba(10, 10, 10, .1);
                        cursor: pointer;
                    }

                    .text {
                        padding: 20px;
                        color: rgba(17, 60, 255, .7);

                    }

                    .views {
                        min-height: 30px;
                        min-width: 30px;
                        text-align: center;
                        line-height: 30px;
                        margin-right: 20px;
                        color: white;
                        background: rgba(110, 140, 215, .8);
                        border-radius: 50%;
                    }
                }

                //留言样式
                .commentItem {
                    height: fit-content;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-shadow: 1px 1px 4px 1px gainsboro;
                    box-sizing: border-box;
                    padding: 20px;

                    &:hover {
                        background: rgba(10, 10, 10, .1);
                        cursor: pointer;
                    }

                    .name {
                        color: rgba(17, 60, 255, .7);
                    }

                    .time {
                        margin: 10px 0;
                    }

                    .comment {
                        color: rgba(17, 60, 255, .7);
                    }
                }

                .configItem {
                    height: fit-content;
                    width: 100%;
                    box-shadow: 1px 1px 4px 1px gainsboro;
                    box-sizing: border-box;

                    &:hover {
                        background: rgba(10, 10, 10, .1);
                        cursor: pointer;
                    }

                    .config {
                        padding: 20px;
                    }
                }
            }
        }
    }
}

@media (max-width:1200px) {
    .viewRight {
        display: none !important;
    }

}

@media (max-width: 800px) {
    .viewLeft {
        width: 40px !important;
        height: 40px !important;

        &:first-child {
            font-size: 20px !important;
        }
    }
}
</style>