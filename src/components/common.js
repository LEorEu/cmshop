// 后台接口数据转换 单位
export function unitConvert(item){
    let unit = ''
    switch(item){
        case null:
            unit = '件'
        break
        case "0001":
            unit = '件'
        break
        case "0002":
            unit = '斤'
        break
    }
    return unit
}
export default{
    unitConvert
}