<template>
    <div id="searchKeys">
        <h2>TREND KEYWORD
            <p>人気のキーワード</p>
        </h2>
        
        <ul>
            <li v-for="item in keysData" :key="item.id" @click="getSearch(item.name)" >
                {{item.name}}
            </li>
        </ul>

    </div>
</template>

<script>
    import {defineComponent, ref} from 'vue'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        setup() {
            const router = useRouter()
            const keysData = ref([
                {
                    id: 1,
                    name: '#VERY掲載アイテム',
                },
                {
                    id: 2,
                    name: '#シフォン素材ボトム',
                },
                {
                    id: 3,
                    name: '#Tシャツコレクション',
                },
                {
                    id: 4,
                    name: '#ボーダーアイテム',
                },
                {
                    id: 5,
                    name: '#ジレ'
                }
            ])

            const getSearch = (key) => {
                router.push({ path: 'search.html', query: { keys: `${key}` }})
                
            }

            return {
                keysData,
                getSearch
            }
        }
    })
</script>

<style lang="less" scoped>
    #searchKeys{
        padding: 0 12px;
        h2{
            font-size: 24px;
            text-align: center;
            padding: 30px 0 15px;

            p{
                font-size: 12px;
                padding-top: 4px
            }
        }
        ul{
            .displayFlex();
            flex-wrap: @flex_wrap;

            li{
                display: inline-block;
                margin: 0 4px 4px 0;
                height: 32px;
                line-height: 32px;
                background: #F2F2F2;
                padding:0 12px;
                font-size: 12px;
            }
        }
    }
</style>