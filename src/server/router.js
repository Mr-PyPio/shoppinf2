const express = require('express')
const router = express.Router()
const services = require('./services.js')


// 获取banner
router.post('/api/getBanner', services.getBanner)
// 获取勾选位
router.post('/api/getCatalog', services.getCatalog)
// 获取分类
router.post('/api/getCategoryList', services.getCategoryList)
// 获取产品
router.post('/api/getProductDetail', services.getProductDetail)
// 获取产品尺码表
router.post('/api/productSizes', services.productSizes)
// 获取分类产品
router.post('/api/getCategoryProduct', services.getCategoryProduct)
//添加产品到购物车
router.post('/api/addToCart', services.addToCart)
//登录
router.post('/api/login', services.login)
//注册
router.post('/api/register', services.register)
//验证登录装填
router.post('/api/loginStatus', services.loginStatus)
//退出登录
router.post('/api/logOut', services.logOut)
//获取购物车列表
router.post('/api/getCartList', services.getCartList)
//生成订单
router.post('/api/checkout', services.checkout)
//修改购物车
router.post('/api/changeCart', services.changeCart)
//未登录获取购物车
router.post('/api/getCartListNo', services.getCartListNo)
//获取地址信息
router.post('/api/gerAddressMessage', services.gerAddressMessage)
//获取个人中心信息
router.post('/api/getUserMessage', services.getUserMessage)
//获取用户地址
router.post('/api/getUserAddress', services.getUserAddress)
//删除用户地址
router.post('/api/addressDelete', services.addressDelete)

module.exports = router