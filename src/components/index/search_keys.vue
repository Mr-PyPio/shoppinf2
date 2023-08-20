<template>
    <div id="searchKeys">
        <h2>TREND KEYWORD
        </h2>
        
        <ul>
            <li v-for="item in keysData" :key="item.name" @click="getSearch(item.name)" >
                #{{item.name}}
            </li>
        </ul>

    </div>
</template>

<script>
    import {defineComponent, ref} from 'vue'
    import { useRouter } from 'vue-router'

export default defineComponent({
    props: {
        keyWords: {
            type: Array,
            default: (() => [])
        }  
    },
    setup(props) {
        const router = useRouter()
        const keysData = ref(props.keyWords)

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
        }
        ul{
            .displayFlex();
            flex-wrap: @flex_wrap;
            justify-content: center;

            li{
                display: inline-block;
                margin: 0 4px 4px 0;
                height: 32px;
                line-height: 32px;
                background: #ddd;
                padding:0 12px;
                font-size: 12px;
            }
        }
    }
</style>