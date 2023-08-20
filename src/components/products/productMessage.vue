<template>
  <div id="message">
    <el-table :data="message" border style="width: 100%;" :row-style="{'text-align': 'center','padding':'0'}">
      <template v-for="item in titleArr" :key="item">
        <el-table-column :prop="item" :label="item"  :width="tdwidth+'px'"/>
      </template>
    </el-table>
  </div>
</template>

<script>
import { getProductSizes } from 'assets/js/common.js'
import {ref,computed} from 'vue'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const message = ref([])
    const titleArr = ref([])
    const init = async() => {
      const data = await getProductSizes(props.id)
      console.log(data.data[0])
      if (data.data[0] && data.data[0].sizes) {
        const sizeData = JSON.parse(data.data[0].sizes)
        sizeData.forEach(item => {
          titleArr.value.push(item.trans_name)
          for (let i = 0; i < item.values.length; i++) {
            if (message.value[i]) {
              message.value[i][item.trans_name] = item.values[i]
            } else {
              message.value[i] = {}
              message.value[i][item.trans_name] = item.values[i]
            }
          }
        })
      }
    }
    const tdwidth = computed(() => Math.floor(window.innerWidth / titleArr.value.length))
    init()

    return {
      message,
      titleArr,
      tdwidth
    }
  }
}
</script>

<style>
.el-table__header{
  width: 100% !important;
}
.el-table .cell{
  padding: 0 5px;
  text-align: center;
}
</style>