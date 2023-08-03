<template>
    <Header></Header>
    <router-view/>
    <Footer></Footer>
</template>

<script>
import Header from 'components/header.vue'
import Footer from 'components/footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>



