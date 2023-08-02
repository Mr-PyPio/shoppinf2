<template>
    <div class="meunTop">

        <div class="userEnter">
            <h2 style="text-align: center">
                <img :src="require('assets/image/userDefaultImg.png')" alt="">
            </h2>
            <ul>
                <li><a href="">ログイン</a></li>
                <li><a href="">会員登録</a></li>
            </ul>
        </div>

        <ul class="specialEnter">
            <li><a href=""><img :src="require('assets/image/meun1.png')" alt=""></a></li>
            <li><a href=""><img :src="require('assets/image/meun2.png')" alt=""></a></li>
            <li><a href=""><img :src="require('assets/image/meun3.png')" alt=""></a></li>
            <li><a href=""><img :src="require('assets/image/meun4.png')" alt=""></a></li>
        </ul>

        <div class="categoryEnter">
            <el-menu
                class="el-menu-vertical-demo"
            >
                <el-sub-menu index="1">
                <template #title>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3">
                <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                <span>Navigator Four</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
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
    }
</style>
