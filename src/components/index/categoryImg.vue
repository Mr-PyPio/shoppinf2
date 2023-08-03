<template>
    <div id="catagoryItem">
        <h2>CATEGORY</h2>
        <template v-for="items,key in data" :key="items">
            <ul v-if=" key % 2 == 1">
                <li v-for="item in items" :key="item.key" >
                    <a :href="item.link">
                        <img v-lazy="item.image" alt="" style="width: 100%">
                        <p>{{item.desc}}</p>
                    </a>
                </li>
            </ul>
            <ul v-if=" key % 2 == 0">
                <li v-for="item in items" :key="item.key" >
                    <a :href="item.link">
                        <img v-lazy="item.image" alt="" style="width: 100%">
                        <p>{{item.desc}}</p>
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
    setup() {
        const data = ref([
            [{
                key: 1,
                image: require('assets/image/cate1.png'),
                link: 'html',
                desc: 'TOP'
            },
            {
                key: 2,
                image: require('assets/image/cate2.png'),
                link: 'html',
                desc: 'TOP'

            },
            {
                key: 3,
                image: require('assets/image/cate3.png'),
                link: 'html',
                desc: 'TOP'

            }],
            [{
                key: 4,
                image: require('assets/image/cate4.png'),
                link: 'html',
                desc: 'TOP'

            },
            {
                key: 5,
                image: require('assets/image/cate5.png'),
                link: 'html',
                desc: 'TOP'

            },
            {
                key: 6,
                image: require('assets/image/cate6.png'),
                link: 'html',
                desc: 'TOP'

            }]
        ])
        
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