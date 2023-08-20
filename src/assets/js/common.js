import { computed } from "vue"
import axios from 'axios';

let windowHeight = window.innerWidth
const isMobile = computed(() => windowHeight > 750 ? 0 : 1)

function getImgSize(url) {
    let width = windowHeight > 750 ? 750 : windowHeight
    return new Promise(resolve => {
        let imgObj = new Image()
        imgObj.src = url
        imgObj.onload = () => {
            let scale = parseFloat(imgObj.height / imgObj.width)
            resolve({
                width: imgObj.width,
                height: imgObj.height,
                scale: scale,
                style: width * scale
            })
        }
    })
}

const getBannerDetail = code => {
    return new Promise((resolve, reject) => {
        axios.post('getBanner', { code: code }).then(res => {
            if (res.status == 200) {
                const data = res.data.data[0]
                resolve(data)
            } else {
                reject([])
            }
        })
    })

}

const getCatalogDetail = (code, limit, page, pageSize) => {
    return new Promise((resolve, reject) => {
        axios.post('getCatalog', { code: code, limit: limit, page: page, pageSize: pageSize }).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject([])
            }
        })
    })

}

const getCategory = () => {
    return new Promise((resolve, reject) => {
        axios.post('getCategoryList').then(res => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject([])
            }
        })
    })
}

const getProductDetail = (id) => {
    return new Promise((resolve, reject) => {
        axios.post('getProductDetail', { id: id }).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject([])
            }
        })
    })
}

const getProductSizes = (id) => {
    return new Promise((resolve, reject) => {
        axios.post('productSizes', { id: id }).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject([])
            }
        })
    })
}

const getCategoryProduct = (arr, page, pageSize) => {
    return new Promise((resolve, reject) => {
        axios.post('getCategoryProduct', { arr: arr, page: page, pageSize: pageSize }).then(res => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject([])
            }
        })
    })
}



export {
    isMobile,
    getImgSize,
    getBannerDetail,
    getCatalogDetail,
    getCategory,
    getProductDetail,
    getProductSizes,
    getCategoryProduct
}