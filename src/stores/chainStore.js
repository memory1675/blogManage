import { defineStore } from 'pinia'
import { getChain, addChain, deleteChain, modifyChain } from '@/api'
import { ElMessage } from 'element-plus'
export const chainStore = defineStore('chainStore', {
  state() {
    return {
      chain: []
    }
  },
  actions: {
    async getChains() {
      const data = await getChain()
      this.chain = data
      return Promise.resolve(data)
    },
    async ADDCHAIN(chain) {
      let result = await addChain(chain)
      if (result.flag) {
        ElMessage({
          type:'success',
          message:'添加成功!'
        })
      }
    },
    async DELETECHAIN(id){
      let flag = await deleteChain(id)
      if(flag){
        ElMessage({
          type:'success',
          message:'删除成功!'
        })
      }
    },
    async MODIFYCHAIN(chain){
      let flag = await modifyChain(chain)
      if(flag){
        ElMessage({
          type:'success',
          message:'修改成功!'
        })
      }
    }
  },
  getters: {

  }
})
