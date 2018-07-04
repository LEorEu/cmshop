let utils={
    // 后台接口数据转换 单位
    unitConvert(item){
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
    },
    // 订单状态转换
    unitStatus(item){
        let unit = ''
        switch(item){
            case "0008":
                unit = '待发货'
            break
            case "0009":
                unit = '待收货'
            break
            case "0010":
                unit = '待评价'
            break
            case "0011":
                unit = '已完成'
            break
        }
        return unit
    },
    // 开发环境需执行此方法以便显示正确图片路径
    testImgUrl(url){
        let testUrl = `http://39.106.27.49${url}`
        return testUrl
    }
}
export default utils;