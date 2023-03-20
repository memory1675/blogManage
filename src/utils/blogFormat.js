export const blogFormat = function (data) {
    return data.map(item => {
        item.date = new Date(item.date).toLocaleString().replaceAll('/', '-')
        item.tags = item.tags.slice(1, -1).replaceAll("'", '').split(',')
        item.state = item.ispub > 0 ? (item.ispub == 1 ? { title: '已发布', type: 'success' } : { title: '隐藏中', type: 'info' }) : { title: '待发布', type: 'warning' }
        item.opencomment = item.opencomment == 1 ? true : false
        return item
    })
}
export const blogMerge = function (blog) {
    let result = {...blog}
    result.tags = `[${result.tags}]`
    switch (result.state.title) {
        case '已发布':
            result.ispub = '1'
            break;
        case '隐藏中':
            result.ispub = '2'
            break;
        case '待发布':
            result.ispub = '0'
            break;
    }
    result.opencomment = result.opencomment ? '1' : '0'
    return Object.entries(result).map(item => `${item[0]}=${item[1]}`).join('&&')
}