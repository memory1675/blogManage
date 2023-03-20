import { defineStore } from 'pinia'
import {
  getBlog, getTags, getTypes, modifyBlog, deleteBlog,
  addBlog, addTag, addType, deleteTag, deleteType, getAll
} from '@/api'
import { blogFormat } from '@/utils/blogFormat'
import { ElMessage } from 'element-plus'
import { chainStore } from './chainStore'
import { commentStore } from './commentStore'
import { commentFormat } from '@/utils/commentFormat'
export const blogStore = defineStore('blogStore', {
  state() {
    return {
      blog: [],
      tags: [],
      types: [],
      pub: '',
      token: localStorage.getItem('token') || ''
    }
  },
  actions: {
    async getBlogs() {
      const result = await getAll()
      this.blog = blogFormat(result.article)
      this.tags = result.tag
      this.types = result.type
      chainStore().chain = result.chain
      commentStore().comment = commentFormat(result.comment)
      /* const data = await Promise.all([getBlog(), getTags(), getTypes()])
      this.blog = blogFormat(data[0])
      this.tags = data[1]
      this.types = data[2] */
      return Promise.resolve(result.blog)
    },
    async fleshBlog(){
      this.blog = blogFormat(await getBlog())
    },
    async fleshTypeOrTag(){
      const data = await Promise.all([getTags(),getTypes()])
      this.tags = data[0]
      this.types = data[1]
    },
    async ADDBLOG(blog) {
      const { flag } = await addBlog(blog)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '添加成功!'
        })
      }
    },
    async MODIFYBLOG(blog) {
      const { flag } = await modifyBlog(blog)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '修改成功!'
        })
      }
    },
    async DELETEBLOG(id) {
      const { flag } = await deleteBlog(id)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    async ADDTAG(tag) {
      const { flag } = await addTag(tag)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '添加成功!'
        })
      }
    },
    async ADDTYPE(type) {
      const { flag } = await addType(type)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '添加成功!'
        })
      }
    },
    async DELETETAG(id) {
      const { flag } = await deleteTag(id)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    async DELETETYPE(id) {
      const { flag } = await deleteType(id)
      if (flag) {
        ElMessage({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    handleLogin(user){
      if(user.username == 'admin' && user.password == 'Zxh2002113123'){
        ElMessage({
          type: 'success',
          message: '登录成功!'
        })
        this.token = '97e5eb1a-2a8f-4f0c-b125-8525454e2431'
        localStorage.setItem('token','97e5eb1a-2a8f-4f0c-b125-8525454e2431')
        return true
      }else{
        ElMessage({
          type: 'error',
          message: 'Error!'
        })
        return false
      }
    }
  },
  getters: {

  }
})
