<template>
  <div id="shopProductList">
      <ul v-if="cartList.length > 0">
        <li v-for="item in cartList" :key="item.key">
          <a :href="'/product.html?id=' + item.id">
            <img v-lazy="item.product_img.url" alt="" :style="{ width: '100px', 'aspect-ratio': 1 / item.product_img.imgMessage.scale }">
          </a>
          <div class="text">
            <p class="name">{{ item.name }}</p>
            <p class="option">{{ item.color }}/{{ item.size }}</p>
            <p class="list_price">￥{{ item.list_price }}税込</p>
            <div class="price">￥{{ item.price }}<span>税込</span>
              <div class="changeNumber">x{{ item.qty }}</div>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: {
    data: {
      type: Array,
      default: (() => [])
    }
  },
  setup(props) {
    const cartList = ref(props.data)

    return {
      cartList
    }
  },
}
</script>

<style lang="less" scoped>
#shopProductList{
    ul{
    margin-bottom: 20px;
    padding: 0 12px;

    li{
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #ddd;

      a{
        display: block;
        width: 100px;
        margin-right: 12px;
      }

      .text{
        width: calc(100% - 112px);

        .name{
          .overflwText1();
          font-size: 12px;
          padding-bottom: 12px;
          color: #222;
        }
        .option{
          padding-bottom: 15px;
          font-size: 12px;
          color: #999;
        }
        .list_price{
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          padding-bottom: 8px;
        }

        .price{
          font-size: 16px;
          color: #333;
          font-weight: 600;
          position: relative;

          .changeNumber{
                font-size: 12px;
                position: absolute;
                right: 10px;
                bottom: 0;
                display: flex;
                align-content: center;
            }
          span{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>