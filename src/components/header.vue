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
     <el-drawer style="width: 80%"
        v-model="table"
        direction="ltl"
        size="100%"
        :with-header="false"
        ref="navDrawer"
      >
        <el-icon :size="20" color="#000000" @click="handleClose"><Close /></el-icon>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent,ref } from "vue";
import 'assets/css/media.less'

export default defineComponent({
  name: "_header",
  setup() {
    const table = ref(false)
    const navDrawer = ref()

    const handleClose = () => {
      navDrawer.value.close()
    }


    return{
      table,
      navDrawer,
      handleClose
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