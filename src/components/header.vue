<template>
  <div id="header">
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="header_left">
            <el-button text @click="table = true">
              <el-icon :size="20" color="#000000"><Operation /></el-icon>
            </el-button>
            <a href=""><el-icon :size="20" color="#000000"><User /></el-icon></a>
        </el-col>
        <el-col :xs="8" :sm="6" :md="8" :lg="9" :xl="11" class="header_logo">
            <a href=""><img src="" alt=""></a>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="header_right">
            <a href=""><el-icon :size="20" color="#000000"><ShoppingCartFull /></el-icon></a>
        </el-col>
    </el-row>
     <el-drawer style="width: 75%;background: linear-gradient(90deg, rgba(245, 224, 230, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%);"
        v-model="table"
        direction="ltl"
        size="100%"
        :with-header="false"
        ref="navDrawer"
      >
        <el-icon :size="20" color="#000000" @click="handleClose" 
        :style="draweCloseStyle"
        ><Close /></el-icon>

        <MeunTop></MeunTop>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent,ref } from "vue";
import {getWindowType} from 'assets/js/common.js'
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

    const isMobile = getWindowType()

    const draweCloseStyle = ref({
        'position' : 'fixed',
        'background' : '#fff',
        'right' : isMobile ? '16%': `${(window.innerWidth - 750)  / 2}px`,
        'top' : '8px'
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