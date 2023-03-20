import request from '@/utils/requrest';

//Blog文章

export const getAll = async function(){
    const result = await request.get('/getall');
    return result
}

export const getBlog = async function(){
    const result = await request.get('/getallarticle');
    return result
}

export const getTags = async function(){
    const result = await request.get('/gettags');
    return result
}

export const getTypes = async function(){
    const result = await request.get('/gettypes');
    return result
}

export const addBlog = async function(blog){
    blog.tags = `[${blog.tags}]`
    blog.opencomment = blog.opencomment ? '1' : '0'
    const result = await request({
        url:'/addarticle',
        method:'PUT',
        params:{...blog}
    })
    return result
}

export const addTag = async function(tag){
    const result = await request.put(`/addtag?tag=${tag}`)
    return result
}

export const addType = async function(type){
    const result = await request.put(`/addtype?type=${type}`)
    return result
}

export const deleteTag = async function(id){
    const result = await request.delete(`/deletetag/${id}`)
    return result
}

export const deleteType = async function(id){
    const result = await request.delete(`/deletetype/${id}`)
    return result
}

export const modifyBlog = async function(blog){
    const result = await request.get(`/modifyarticle?${blog}`)
    return result
}

export const deleteBlog = async function(id){
    const result = await request.delete(`/deletearticle/${id}`)
    return result
}

//Comment评论
export const getComment = async function(){
    const result = await request.get('/getallcomment')
    return result
}
export const modifyComment = async function(comment) {
    const result = await request.get(`/modifycomment?${comment}`)
    return result
}
export const deleteComment = async function(id) {
    const result = await request.delete(`/deletecomment/${id}`)
    return result
}

//Chain链接
export const getChain = async function(){
    const result = await request.get('/getallchain')
    return result
}

export const addChain = async function(chain) {
    const result = await request.put(`/addchain?${chain}`)
    return result
}

export const modifyChain = async function(chain){
    const result = await request.get(`/modifychain?${chain}`)
    return result.flag
}

export const deleteChain = async function(id) {
    const result = await request.delete(`/deletechain/${id}`)
    return result.flag
}