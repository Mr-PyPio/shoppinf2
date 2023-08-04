<template>
    <div id="option-element">
        <div class="option-element-item">
            <p>カラー</p>
            <el-select v-model="value" class="option-select" placeholder="[必須] ご希望のオプションをお選びく">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </div>
        <div class="option-element-item">
            <p>サイズ</p>
            <el-select v-model="value" class="option-select" placeholder="[必須] ご希望のオプションをお選びく">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </div>

        <p class="numberTitle">商品総額(数量)  <span>¥0（0点）</span></p>

        <div class="optopnButton">
            <button type="button" class="wished">お気に入り</button>
            <button type="button" class="addToCart">カートに入れる</button>
        </div>
    </div>
</template>

<script>
// import {ref} from 'vue'
// export default {
//     props: {
//         data: {
//             type: Array,
//             default: (()=> {})
//         }
//     },
//     setup(props) {
//         // console.log(props.data)
//         const optionValue = ref(props.data)

//         return(
//             optionValue
//         )
//     },
// }
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
                background: #ddd;
                color: #fff;
            }
        }
    }
}
</style>