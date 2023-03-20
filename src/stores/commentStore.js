import { defineStore } from 'pinia'
import { getComment, modifyComment, deleteComment } from '@/api'
import { commentFormat } from '@/utils/commentFormat'
import {ElMessage} from 'element-plus'
export const commentStore = defineStore('commentStore', {
  state() {
    return {
      comment:[]
    }
  },
  actions: {
    async getComments(){
      const data = await getComment()
      this.comment = commentFormat(data)
      return Promise.resolve(data)
    },
    async MODIFYCOMMENT(comment){
      const {flag} = await modifyComment(comment)
      if (flag) {
        ElMessage({
          type:'success',
          message:'更新成功!'
        })
      }
    },
    async DELETECOMMENT(id){
      const {flag} =  await deleteComment(id)
      if (flag) {
        ElMessage({
          type:'success',
          message:'删除成功!'
        })
      }
    }
  },
  getters: {
    
  }
})
