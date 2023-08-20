<template>
  <div id="sendType">
       <el-radio-group v-model="sendRadio">
          <el-radio v-for="item in sendData" :key="item.key" :label="item.key">
            <p>
              {{ item.name }}
              <span>￥{{ item.price }}</span>
            </p>
          </el-radio>
        </el-radio-group>
  </div>
</template>

<script>
import {ref,computed} from 'vue'
export default {
  setup() {
    const sendRadio = ref('0')
    const sendData = ref([
      {name: 'DHL快递', price: '956',key: '0'},
      {name: 'UPS', price: '1599',key: '1'},
      {name: 'FedEx', price: '1980',key: '2'},
      { name: 'EMS', price: '2590', key: '3' },
    ])

    const sendName = computed(() => sendData.value[sendRadio.value].name)
    const sendPrice = computed(() => sendData.value[sendRadio.value].price)

    return {
      sendData,
      sendRadio,
      sendName,
      sendPrice
    }
  },
}
</script>
<style lang="less">
#sendType{
  padding:  0 24px;

  .el-radio{
    width: 100%;
    margin: 0;

    .el-radio__label{
      width: 100%;
    }

    p{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .el-radio__input.is-checked .el-radio__inner{
    background: #222;
    border-color: #222;
  }

  .el-radio__input.is-checked+.el-radio__label{
    color: #222;
    font-weight: 600;
  }
}
</style>