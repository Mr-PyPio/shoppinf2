<template>
  <div id="tabs">
    <ul ref="TabItemsTab">
      <template v-for="(item, key) in list" :key="item.code">
        <li  :style="liStyle" @click="turnTabConent(key)" :class="{ 'active': key == 0 ? true : false }" class="tabItems">
          {{ item.name }}
        </li>
      </template>
    </ul>
    <div ref="TabItemsConent">
        <div v-for="(item,key) in list" :key="item.code"  class="tabItemsConent" :class="{'active':  key == 0?true:false}" >
          <slot :name="item.code"></slot>
        </div>
    </div>

  </div>
</template>

<script>
import {ref, reactive, computed } from 'vue'
export default {
  name: '_tabs',
  props: {
    tabList: {
      type: Array,
      default: (() => [])
    }
  },
  setup(props) {
    const TabItemsConent = ref(null)
    const TabItemsTab = ref(null)
    console.log(TabItemsTab)
    const list = ref(props.tabList)
    const liWidth =  computed(() => Math.floor(window.innerWidth / list.value.length))
    const liStyle = reactive({
      'width': liWidth.value + 'px'
    })

    const turnTabConent = (index) => {
      for (let i = 0; i < TabItemsConent.value.children.length; i++) {
        if (i == index) {
          TabItemsConent.value.children[i].className = 'tabItemsConent active'
          TabItemsTab.value.children[i].className = 'tabItems active'
        } else {
          TabItemsConent.value.children[i].className = 'tabItemsConent'
          TabItemsTab.value.children[i].className = 'tabItems'
        }
      }
    }
    
    return {
      list,
      liStyle,
      turnTabConent,
      TabItemsConent,
      TabItemsTab
    }
  },
}
</script>
<style lang="less" scoped>
#tabs{
  ul{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0;

    li{
      font-size: 12px;
      color: #222;
      text-align: center;
      padding: 8px 0;
    }
  }

  .tabItemsConent{
    display: none;

    &.active{
      display: block;
    }
  }
}
</style>