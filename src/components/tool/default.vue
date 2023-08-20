<template>
    <div>
        <Header></Header>
            <slot></slot>
        <Footer></Footer>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Header from 'components/header.vue'
// import Footer from 'components/footer.vue'
const Footer = defineAsyncComponent(() => import('components/footer.vue'))
export default {
    name: '_default',
    components: {
        Header,
        Footer
    },
    setup() {
    }
}
</script>