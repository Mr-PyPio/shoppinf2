<template>
    <div id="catagoryItem">
        <h2>CATEGORY</h2>
        <template v-for="items,key in data" :key="items">
            <ul v-if=" key % 2 == 1">
                <li v-for="item in items" :key="item.key" >
                    <a :href="item.link">
                        <img v-lazy="item.img.url" alt="" :style="{ width: '100%', 'aspect-ratio': item.img.imgMessage.scale }">
                    </a>
                </li>
            </ul>
            <ul v-if=" key % 2 == 0">
                <li v-for="item in items" :key="item.key" >
                    <a :href="item.link">
                        <img v-lazy="item.img.url" alt="" :style="{width: '100%','aspect-ratio':item.img.imgMessage.scale}">
                    </a>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: '_category',
    props: {
        categoryData: {
            type: Array,
            default: (() => [])
        }
    },
    setup(props) {
        const data = ref(props.categoryData)
        return {
            data,
        }
    },
}
</script>

<style lang="less" scoped>
#catagoryItem{
    padding: 0 12px;
    h2{
        font-size: 24px;
        font-weight: 500;
        padding:20px 0 12px;
        text-align: center;
    }

    ul{
        overflow: hidden;

        li{
            float: left;
            width: calc((100% - 16px) / 3);
            margin-bottom: 8px; 
            position: relative;

            p{
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                padding-left: 8px;
                height: 24px;
                line-height: 24px;
            }

            &:first-of-type{
                width: calc(((100% - 16px) / 3 * 2) + 8px ) ;
                margin-right: 8px;

                p{
                    font-size: 18px;
                }
            }
        }

        &:nth-of-type(n+2) {
            li{
                display: inline-block;

                &:first-of-type{
                    width: calc((100% - 16px) / 3) ;
                    margin-right: 8px;

                    p{
                        font-size: 12px;
                    }
                }
                &:nth-of-type(2){
                    float: right;
                    width: calc(((100% - 16px) / 3 * 2) + 8px ) ;

                    p{
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>