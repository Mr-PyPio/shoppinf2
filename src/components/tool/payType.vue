
<template>
  <div id="payType">
    <el-radio-group v-model="payRadio">
      <el-radio v-for="item in payData" :key="item.key" :label="item.key">
        <p>
          {{ item.name }}<br>
          {{ item.name2 }}
        </p>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { ref,computed } from 'vue'
export default {
  setup() {
    const payRadio = ref('0')
    const payData = ref([
      { name: 'クレジットカード',name2: 'Credit Card', key: '0' },
      { name: 'クレジットカード AE', name2: 'Credit Card AE',  key: '1' },
    ])

    const payName = computed(() => payData.value[payRadio.value].name)
    return {
      payData,
      payRadio,
      payName
    }
  },
}
</script>
<style lang="less">
#payType {
  padding: 0 24px;

  .el-radio {
    width: 100%;
    margin: 0;
    margin-bottom: 8px;

    .el-radio__label {
      width: 100%;
    }
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: #222;
    border-color: #222;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #222;
    font-weight: 600;
  }
}
</style>