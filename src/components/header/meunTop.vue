<template>
    <div class="meunTop">

        <div class="userEnter">
            <h2 style="text-align: center">
                <img :src="require('assets/image/userDefaultImg.png')" alt="" style="width: 30%">
            </h2>
            <ul v-if="!loginStatus">
                <li><a href="/login.html">ログイン</a></li>
                <li><a href="/login.html?type=register">会員登録</a></li>
            </ul>
            <div v-if="loginStatus" style="text-align: center;">
                <p>{{ userName }}</p>
                <p>{{ email }}</p>

                <el-button type="primary" :loading="logOutLoading" @click="logOut" class="logOut">
                     <img :src="require('assets/image/carbon_logout.png')" alt="">
                    ログアウ
                </el-button>
            </div>
        </div>

        <ul class="specialEnter">
            <li><a href="/daily-new.html"><img :src="require('assets/image/meun1.png')" alt=""></a></li>
            <li><a href="/time-sale.html"><img :src="require('assets/image/meun2.png')" alt=""></a></li>
            <li><a href="/time-sale.html"><img :src="require('assets/image/meun3.png')" alt=""></a></li>
            <li><a href="/hot.html"><img :src="require('assets/image/meun4.png')" alt=""></a></li>
        </ul>

        <div class="categoryEnter" v-if="categoryData.length > 0">
            <el-menu class="el-menu-vertical-demo">
               <template v-for="category,key in categoryData" :key="category.id">
                    <el-sub-menu :index="key+''" v-if="category.children.length > 0">
                        <template #title>
                            <span>{{ category.title }}</span>
                        </template>
                        <el-menu-item-group v-if="category.children.length > 0">
                            <el-menu-item  :index="key + '-' + 0">
                                <a :href="'/category.html?id='+ category.id">ALL</a>
                            </el-menu-item>
                            <template v-for="cate,key2 in category.children" :key="cate.id">
                                <template v-if="!cate.children.length">
                                    <el-menu-item  :index="key + '-' + (key2+1)">
                                        <a :href="'/category.html?id=' + cate.id">{{ cate.title }}</a>
                                    </el-menu-item>
                                </template>
                                <template v-if="cate.children.length > 0">
                                    <el-sub-menu :index="key + '-' + (key2+1)">
                                        <template #title>{{ cate.title }}</template>
                                        <el-menu-item  :index="key + '-' + (key2 + 1) + '-' + 0">
                                            <a :href="'/category.html?id=' + cate.id">ALL</a>
                                        </el-menu-item>
                                        <template v-for="c,k3 in cate.children" :key="c.id">
                                            <el-menu-item :index="key + '-' + (key2 + 1) + '-' + (k3+1) ">
                                                <a :href="'/category.html?id=' + c.id">{{ c.title }}</a>
                                            </el-menu-item>
                                        </template>
                                    </el-sub-menu>
                                </template>
                            </template>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="key+''" v-if="!category.children.length">
                        <span><a :href="'/category.html?id=' + category.id">{{ category.title }}</a></span>
                    </el-menu-item>
               </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getCategory } from 'assets/js/common.js'
import { useCounterStore } from "@/store";
import { useRouter } from 'vue-router';
import axios from 'axios';
export default ({
    setup() {
        const logOutLoading = ref(false)
        const router = useRouter()
        const store = useCounterStore()
        const loginStatus = store.loginStatus
        const userName = store.userName
        const email = store.email
        const categoryData = ref([])
        const init = async () => {
            const { data: data } = await getCategory()
            data.arr.forEach(item => {
                if (item.id == 4) {
                    categoryData.value = item.children
                }
            })
        }
        init()
        const logOut = () => {
            logOutLoading.value = true
            axios.post('logOut', { userName }).then(res => {
                if (res.status == 200) {
                    alert('退出成功')
                    window.localStorage.removeItem('username')
                    window.localStorage.removeItem('userLimit')
                    store.$reset()
                    router.go(0)
                }
            })
        }
        return {
            categoryData,
            loginStatus,
            userName,
            email,
            logOut,
            logOutLoading
        }
    }
})
</script>


<style lang="less" scoped>
.meunTop{

    .userEnter{
        background: #fff;
        padding: 14px;
        margin-bottom: 17px;
        ul{
            display: flex;
            border: 1px solid #ddd;

            li{
                width: 50%;
                a{
                    height: 40px;
                    line-height: 38px;
                    .displayFlexCen();
                    font-size: 12px;
                    color: #000;
                    box-sizing: border-box;

                    &:first-of-type{
                        border-right: 1px solid #ddd;
                    }
                }
            }
        }
        
    }

    ul.specialEnter{
        background: #fff;
        .displayFlexCen();
        flex-wrap: @flex_wrap;
        margin-bottom: 17px;
        padding: 0 16px;

        li {
            a{
                display: block;
                width: 80px;
                
                img{width: 100%;}
            }
        }
    }

    .categoryEnter{
        background: #fff;


        .el-menu{
            border: 0;
        }
        .el-sub-menu__title{
            height: 40px;
            line-height: 40px;
        }
    }
    .logOut{
        margin: 10px auto;
        border-radius: 0;
        .displayFlexCen();
        border: 1px solid #ddd;
        color: #333;
        background: #fff;

        img{
            width: 16px;
            margin-right: 4px;
        }
    }
}
</style>
<style lang='less'>
    .categoryEnter{
        background: #fff;
        padding: 12px 0;

        .el-menu{
            border: 0;
        }
        .el-sub-menu__title{
            height: 40px;
            line-height: 40px;
        }

        a{
            display:  block;
            width: 100%
        }
        .el-menu-item-group__title{padding: 0;}
    }
</style>
