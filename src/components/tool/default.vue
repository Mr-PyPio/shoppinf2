<template>
    <Header></Header>
        <slot></slot>
    <Footer></Footer>
</template>

<script>
import Header from 'components/header.vue'
import Footer from 'components/footer.vue'
export default {
    name: '_default',
    components: {
        Header,
        Footer
    },
}
</script>