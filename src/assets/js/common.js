import { computed, } from "vue"

export function getWindowType() {
    let windowHeight = window.innerWidth
    const isMobile =  computed(() => windowHeight > 750 ? 0 : 1)
    return isMobile
}