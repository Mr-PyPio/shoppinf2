import { computed, } from "vue"

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

export { isMobile, getImgSize }