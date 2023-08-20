<template>
    <div id="option-element">
        <template v-for="options in optionValue" :key="options.id">
            <template v-if="options.name == 'カラー' || options.name2 == '颜色'">
                <div class="option-element-item" :option_id="options.id">
                    <p>カラー</p>
                    <el-select v-model="color" class="option-select" placeholder="[必須] ご希望のオプションをお選びく" @change="chooseOption">
                        <el-option
                        v-for="item in options.option_items"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>
                </div>
            </template>
            <template v-if="options.name == 'サイズ' || options.name2 == '尺码'">
                <div class="option-element-item" :option_id="options.id" >
                    <p>サイズ</p>
                    <el-select v-model="size" class="option-select" placeholder="[必須] ご希望のオプションをお選びく" @change="chooseOption">
                        <el-option
                        v-for="item in options.option_items"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>
                </div>
            </template>
        </template>

        <div class="changeNumber">
            <span>数量</span>
            <button type="button" @click="decrease">-</button>
            <input type="number" v-model="qty">
            <button type="button" @click="add">+</button>
        </div>

        <p class="numberTitle">商品総額(数量)  <span>¥
            {{ allPrice }}
            （
            {{ qty }}
            点）</span></p>

        <div class="optopnButton">
            <button type="button" class="wished">お気に入り</button>
            <button type="button" class="addToCart" disabled  ref="AddToCartRefs" @click="addToCart">カートに入れる</button>
        </div>

        <div v-show="afterSuccessWrap" class="successWrap">
            <div style="background: #fff;width: 300px;">
                <el-col style="width: 100%;">
                    <el-result
                        icon="success"
                        title="SUCCESS"
                        style=" padding: 12px"
                    >
                    <template #extra>
                        <el-button type="default" style="background: #222;color: #fff;" @click="closeWrap">ショッピング続け</el-button>
                        <el-button type="default"><a href="/cart.html" style="display:block">カートを見る</a></el-button>
                    </template>
                    </el-result>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
import {ref,computed} from 'vue'
import axios from 'axios'
import { useCounterStore } from "@/store";
export default {
    props:{
        productOption: {
            type: Array,
            default: (()=> [])
        },
        price: {
            type: String,
            default: ''
        },
        productId: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const afterSuccessWrap = ref(false)
        const store = useCounterStore()
        const AddToCartRefs = ref(null)
        const optionValue = ref(props.productOption)
        const color =ref('')
        const size = ref('')
        const qty = ref(1)
        const singlePrice = ref(props.price)
        const product_id = ref(props.productId)
        const userId = store.userId

        const decrease = () => {
            if (qty.value > 1) {
                qty.value --
            }
        }
        const closeWrap = () => {
            afterSuccessWrap.value = false
        }

        const allPrice = computed(() => qty.value* singlePrice.value)

        const add = () => {
            if (qty.value < 100){
                qty.value ++
            }
        }

        const wrapShow = () => {
            afterSuccessWrap.value = true
            setTimeout(() => {
                afterSuccessWrap.value = false
            },3000)
        }

        const addToCart = () => {
            if (userId) {
                const data = {
                    product_id: product_id.value,
                    size: size.value,
                    color: color.value,
                    qty: qty.value
                }
                axios.post('addToCart', {
                    product_data: data,
                    userId: userId
                }).then(res => {
                    console.log(res)
                    wrapShow()
                    store.cartNum = Number(store.cartNum) + Number(qty.value)
                })
            } else {
                const cartDate = store.noLoginCartData
                let allqty = 0
                if (cartDate.length > 0) {
                    cartDate.forEach(item => {
                        if (item.product_id == product_id.value && item.size == size.value && item.color == color.value) {
                            const old_qty = item.qty
                            item.qty = old_qty + qty.value
                        } else {
                            cartDate.push({
                                product_id: product_id.value,
                                size: size.value,
                                color: color.value,
                                qty: qty.value
                            })
                        }
                        allqty += item.qty
                    })
                    wrapShow()
                    store.cartNum = allqty
                } else {
                    cartDate.push({
                        product_id: product_id.value,
                        size: size.value,
                        color: color.value,
                        qty: qty.value
                    })
                    wrapShow()
                    store.cartNum = qty.value
                }
            }
        }

        const chooseOption = () => {
            if (size.value && color.value) {
                AddToCartRefs.value.disabled = false
            }
        }
        
        return {
            optionValue,
            color,
            size,
            qty,
            decrease,
            add,
            allPrice,
            AddToCartRefs,
            addToCart,
            chooseOption,
            afterSuccessWrap,
            closeWrap
        }
    },
}
</script>

<style lang='less' scoped>
#option-element{
    padding:  20px 0 0;
    margin: 0 12px;

    .option-element-item{
        padding-bottom: 10px;
        .displayFlexCen();

        p{
            width: 90px;
            font-size: 13px;
            color: #666666;
        }

        .option-select{
            width: calc(100% - 90px);
            color: #999;
        }

        &:nth-of-type(2) {
            border-bottom: 1px solid #ddd;
            padding-bottom: 25px;
        }
    }

    .changeNumber{
        display: flex;
        align-content: center;
        margin: 15px 0;

        span{
            width: 90px;
        }

        button{
            width: 30px;
            height: 30px;
            .displayFlexCen();
            border-color: #ddd;
            border-radius: 0;
        }

        input{
            border-radius: 0;
            border: 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            height: 30px;
            line-height: 30px;
            width: 40px;
            text-align: center;
        }
    }
    
    .numberTitle{
        font-size: 14px;
        font-weight: 600;
        .displayFlexBew();
        padding: 20px 0;
    }
    .optopnButton{
        .displayFlexBew();

        button{
            height: 42px;
            .displayFlexCen();
            width: 48%;
            border: 1px solid #ddd;
            color: #222;
            font-size: 12px;
            background:#fff;

            &.addToCart{
                color: #fff;
                background: #222;

                &:disabled {
                background: #ddd;

                }
            }
        }
    }
    .successWrap {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;

        @media screen and (min-width: 750px) {
            left: 50%;
            transform: translateX(50%);
            width: 750px;
            
        }
    }
}
</style>