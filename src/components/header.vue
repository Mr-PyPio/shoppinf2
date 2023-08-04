<template>
  <menu id="header">
    <el-row style="justify-content: space-between">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="header_left">
            <el-button text @click="table = true">
              <!-- <el-icon :size="20" color="#000000"><Operation /></el-icon> -->
              <svg style="width: 20px;color:#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor" d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"></path>
              </svg>
            </el-button>
            <a href="">
              <!-- <el-icon :size="20" color="#000000"><User /></el-icon> -->
              <svg style="width: 20px;color:#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor" d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"></path>
              </svg>
            </a>
        </el-col>
        <el-col :xs="8" :sm="6" :md="8" :lg="9" :xl="11" class="header_logo">
            <a href="/"><img :src="require('assets/image/logo.png')" alt=""></a>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="header_right">
            <a href="">
              <!-- <el-icon :size="20" color="#000000"><ShoppingCartFull /></el-icon> -->
              <svg style="width: 20px;color:#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor" d="M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zM96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128H96zm314.24 576h395.904l82.304-384H333.44l76.8 384z"></path>
              </svg>
            </a>
        </el-col>
    </el-row>
     <el-drawer style="width: 75%;background: linear-gradient(90deg, rgba(245, 224, 230, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%);"
        v-model="table"
        direction="ltr"
        size="75%"
        :with-header="false"
        ref="navDrawer"
      >
        <el-icon :size="20" color="#000000" @click="handleClose"  :style="draweCloseStyle">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
        </el-icon>



        <MeunTop></MeunTop>
    </el-drawer>

    <el-backtop :bottom="60" :right="12">
    </el-backtop>
  </menu>
</template>

<script>
import { defineComponent,ref } from "vue";
import { isMobile } from 'assets/js/common.js'
import MeunTop from 'components/header/meunTop.vue'

export default defineComponent({
  name: "_header",
  components : {
    MeunTop,
  }
  ,
  setup() {
    const table = ref(false)
    const navDrawer = ref()

    const handleClose = () => {
      navDrawer.value.close()
    }

    const draweCloseStyle = ref({
        'position' : 'fixed',
        'background' : '#fff',
        'right' : isMobile ? '16%': `${(window.innerWidth - 750)  / 2}px`,
        'top' : '8px',
        'transition-duration': '0.3s'
    })

    return{
      table,
      navDrawer,
      handleClose,
      isMobile,
      draweCloseStyle
    }
  },
});
</script>

<style lang="less" scoped>
#header{
  border-bottom: 1px solid #ddd;
  padding-right: 15px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: #fff;

  @media screen and(min-width: 750px) {
    width: 750px;
    left: 50%;
    transform: translateX(-50%);
  }

  .header_left{
    display: flex;
    align-items: center;
  }
  .header_logo{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header_right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>