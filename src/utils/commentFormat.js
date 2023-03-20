export const commentFormat = function (data) {
    const result = data.map(item => {
        item.date = new Date(item.date).toLocaleString().replaceAll('/', '-')
        item.state = item.show == 1 ? { title: '显示中', type: 'success', statement: true } : { title: '隐藏中', type: 'info', statement: false }
        item.edit = false
        return item
    })
    return result
}

export const commentMerge = function (data) {
    data.show = data.state.statement ? '1' : '0'
    let result = data
    result = Object.entries(result).map(item => `${item[0]}=${item[1]}`).join('&&')
    return result
}