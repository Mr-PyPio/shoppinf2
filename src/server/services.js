const db = require('./db.js')
const jwt = require('jsonwebtoken')
const e = require('express')
const { Date } = require('core-js')

exports.getBanner = (req, res) => {
  const code = req.body.code
  const sql = 'select * from banner_list where code=?'
  db.base(sql, code, (result) => {
    if (result) {
      return res.json({
        status: 200, data: result
      })
    } else {
      return res.json({
        status: 400, data: result
      })
    }
  })
}

exports.getCatalog = (req, res) => {
  let code = req.body.code
  let limit = req.body.limit ?? 0
  let page = req.body.page ?? 0
  const pageSize = req.body.pageSize ?? 0
  let sql = `select * from catalog_list where code = ?`
  db.base(sql, code, async result => {
    if (!result.length) {
      return res.json({
        status: 400, data: result, productList: []
      })
    } else {
      let productList
      if (Boolean(result[0].productsList)) {
        productList = await getArrProducts(result[0].productsList)
      } else {
        productList = []
      }

      if (page && pageSize) {
        const length = productList.length
        let size = Math.round(length / pageSize)
        if (length % pageSize > 0) {
          size += 1
        }
        if (page >= size && size > 0) {
          page = size
        } else if (page <= 1) {
          page = 1
        }
        let endIndex = page * pageSize
        if (endIndex > length - 1) {
          endIndex = length
        }
        const end = productList.slice((page - 1) * pageSize, endIndex, size)

        return res.json({
          status: 200, data: result, productList: end, total: length, last_page: size
        })
      }

      if (limit > 0) {
        productList = productList.splice(0, Number(limit))
      }

      return res.json({
        status: 200, data: result, productList: productList
      })
    }
  })
}

//获取id数组对于的产品数据
const getArrProducts = arr => {
  let arr2 = JSON.parse(arr)
  let sql = ''
  for (let i = 0; i < arr2.length; i++) {
    sql += `select id, name, status,list_price,price  from cc_products where id=${arr2[i]};`
  }
  return new Promise((resolve, reject) => {
    db.base(sql, null, async res => {
      if (res) {
        let imageArr = await getProductImg()
        for (let i = 0; i < res.length; i++) {
          if (res.length > 1) {
            res[i] = res[i][0]
          }
          for (let f = 0; f < imageArr.length; f++) {
            if (res[i].id == imageArr[f].product_id) {
              res[i].product_img = JSON.parse(imageArr[f].product_img)[0]
            }
          }
          res[i].key = res[i].id
        }

        resolve(res)
      } else {
        resolve([])
      }
    })
  })
}

const getProductImg = () => {
  return new Promise((resolve, reject) => {
    db.base('select * from cc_products_images', null, res => {
      if (res) {
        resolve(res)
      } else {
        resolve([])
      }
    })
  })
}

//获取分类
exports.getCategoryList = (req, res) => {
  let sql = 'select * from cc_categories'
  let arr = []
  db.base(sql, null, (result, error) => {
    if (result) {
      let level = 0
      for (let i = 0; i < result.length; i++) {
        if (result[i].parent_id == level) {
          arr.push(creatObject(result[i]))
          result.splice(i, 1)
          i--
        }
      }

      level = 1
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < result.length; k++) {
          if (result[k].parent_id == arr[i].id && result[k].nest_depth == level) {
            arr[i].children.push(creatObject(result[k]))
            result.splice(k, 1)
            k--
          }
        }
      }

      level = 2
      for (let f = 0; f < arr.length; f++) {
        for (let i = 0; i < arr[f].children.length; i++) {
          for (let k = 0; k < result.length; k++) {
            if (result[k].parent_id == arr[f].children[i].id && result[k].nest_depth == level) {
              arr[f].children[i].children.push(creatObject(result[k]))
              result.splice(k, 1)
              k--
            }
          }
        }
      }

      level = 3
      for (let f = 0; f < arr.length; f++) {
        for (let i = 0; i < arr[f].children.length; i++) {
          for (let o = 0; o < arr[f].children[i].children.length; o++) {
            for (let k = 0; k < result.length; k++) {
              if (result[k].parent_id == arr[f].children[i].children[o].id && result[k].nest_depth == level) {
                arr[f].children[i].children[o].children.push(creatObject(result[k]))
                result.splice(k, 1)
                k--
              }
            }
          }

        }
      }

      return res.json({
        status: 200,
        data: {
          arr,
          level
        }
      })
    } else {
      return res.json({
        status: 400,
        data: error
      })
    }
  })
}

exports.getProductDetail = (req, res) => {
  const id = parseInt(req.body.id)
  const sql = `select * from cc_products where id = '${id}'`
  let endData = null

  new Promise((resolve, reject) => {
    db.base(`select product_img,product_icon from cc_products_images where product_id = '${id}'`, id, (result2) => {
      if (result2.length) {
        db.base(sql, id, (result) => {
          result[0].product_img = result2[0].product_img
          result[0].product_icon = result2[0].product_icon
          endData = result
          resolve()
        })
      } else {
        db.base(sql, id, (result) => {
          result[0].product_img = ''
          result[0].product_icon = ''
          endData = result
          reject()
        })
      }
    })
  }).then(() => {
    const sql2 = 'select id,name,name2,parent_id,product_id,sort,required,type from cc_product_options where product_id=?'
    db.base(sql2, id, (option) => {
      if (option.length > 0) {
        let sql3 = ''
        option.forEach(item => {
          sql3 += `select * from cc_product_option_values where option_id=${item.id};`
        });

        db.base(sql3, null, (option_items) => {
          option.forEach((item, key) => {
            item.option_items = option_items[key]
          })
          endData[0].option = option

          return res.json({
            status: 200, data: endData
          })
        })
      } else {
        return res.json({
          status: 200, data: endData
        })
      }
    })
  }).catch(() => {
    return res.json({
      status: 200, data: endData
    })
  })

}

// 获取产品尺码表
exports.productSizes = (req, res) => {
  let id = req.body.id
  let sql = `select * from cc_product_sizes where product_id = '${id}'`
  db.base(sql, id, (result, error) => {
    if (result) {
      return res.json({
        status: 200,
        data: result
      })
    } else {
      return res.json({
        status: 400,
        data: error
      })
    }
  })
}
function creatObject(arr) {
  return {
    id: arr.id,
    key: arr.id,
    is_enabled: arr.is_enabled,
    title: arr.name,
    name2: arr.name2,
    slug: arr.slug,
    page_title: arr.page_title,
    nest_depth: arr.nest_depth,
    children: []
  }
}

exports.getCategoryProduct = (req, res) => {
  const arr = req.body.arr
  const pageSize = Number(req.body.pageSize)
  let page = Number(req.body.page)
  let sql = ''
  let productIdArr = []
  arr.forEach(item => {
    sql += `select product_id from cc_product_categories where category_id = ${item};`
  })
  db.base(sql, null, (result, error) => {
    if (result) {
      if (arr.length == 1) {
        result.forEach(item => {
          productIdArr.push(item.product_id)
        })
      } else {
        result.forEach(item => {
          if (item.length > 0) {
            item.forEach(obj => {
              const id = obj.product_id
              if (!productIdArr.includes(id)) {
                productIdArr.push(id)
              }
            })
          }
        })
      }
      const length = productIdArr.length
      let size = Math.round(length / pageSize)
      if (length % pageSize > 0) {
        size += 1
      }
      if (page >= size && size > 0) {
        page = size
      } else if (page <= 1) {
        page = 1
      }
      let endIndex = page * pageSize
      if (endIndex > length - 1) {
        endIndex = length
      }
      productIdArr = productIdArr.reverse()
      productIdArr.sort((a, b) => {
        return Number(b) - Number(a)
      })
      let end = productIdArr.slice((page - 1) * pageSize, endIndex)

      getArrProducts(JSON.stringify(end)).then(data => {
        return res.json({
          status: 200,
          data: {
            data,
            last_page: size,
            total: length,
          },
        })
      })
    } else {
      return res.json({
        status: 400,
        data: error
      })
    }
  })
}

//加购购物车
exports.addToCart = (req, res) => {
  const product_data = req.body.product_data
  const id = req.body.userId
  const sql = "select * from cart_list where user_id = ?"
  db.base(sql, id, (result, error) => {
    if (result.length) {
      const old_product_list = result[0].product_list ? JSON.parse(result[0].product_list) : []
      let ishas = false
      let endQty = 0
      old_product_list.forEach(item => {
        if (item.product_id == product_data.product_id && item.size == product_data.size && item.color == product_data.color) {
          const old_qty = item.qty
          const add_qty = product_data.qty
          item.qty = old_qty + add_qty
          ishas = true
        }
        endQty += item.qty
      })
      if (!ishas) {
        old_product_list.push(product_data)
        endQty += product_data.qty
      }
      const new_product_list = JSON.stringify(old_product_list)
      const sql2 = `update cart_list set product_list = ? where user_id=${id}`
      db.base(sql2, [new_product_list, id], (result2, error2) => {
        if (result2) {

          const sql3 = `update user_list set cart_num =? where user_id=?`
          db.base(sql3, [endQty, id], (result3, error3) => {
            if (result3) {
              return res.json({
                status: 200,
                data: result3
              })
            } else {
              return res.json({
                status: 400,
                data: error3
              })
            }
          })
        } else {
          return res.json({
            status: 400,
            data: error2
          })
        }
      })
    } else {
      let new_product_data = JSON.stringify([product_data])
      const sql = `insert into cart_list(product_list,user_id) values(?,?)`
      db.base(sql, [new_product_data, id], (result, error) => {
        if (result) {
          const sql = 'select * from cart_list where user_id=?'
          db.base(sql, id, (result2, error2) => {
            if (result2) {

              const sql2 = 'select * from user_list where user_id=?'
              db.base(sql2, id, (result3, error3) => {
                if (result3) {
                  const cart_id = result3[0].user_cartid ?? []
                  const qty = product_data.qty
                  if (cart_id != result2[0].cart_id) {
                    const sql3 = `update user_list set user_cartid =${result2[0].cart_id},cart_num=${qty}  where user_id=${id}`
                    db.base(sql3, null, (result4, error4) => { })
                  }
                  return res.json({
                    status: 200,
                    data: result3
                  })
                } else {
                  return res.json({
                    status: 400,
                    data: error3
                  })
                }
              })

            }
          })
        } else {

          return res.json({
            status: 400,
            data: error
          })
        }
      })
    }
  })
}

class TokenObj {
  createToken(cont, time) {
    var payload = { msg: cont } // Token 数据
    var secret = 'pypio.com' // 这是加密的key（密钥或私钥） 
    return jwt.sign(payload, secret, {
      expiresIn: time // 24小时过期,以秒作为单位
    })
  }
  checkToken(token) {
    var secret = 'pypio.com' // 这是加密的key（密钥或私钥） 
    let status = true
    try {
      jwt.verify(token, secret)
      status = true
    } catch {
      status = false
    }
    return status
  }
}

exports.login = (req, res) => {
  const name = req.body.userName
  const password = req.body.passWord
  const cartData = req.body.cartData ?? []
  const myToken = new TokenObj()
  const sql = "select * from user_list where user_name=?"
  db.base(sql, name, (result, error) => {
    if (result.length > 0) {
      if (result[0].password == password) {
        const sql = "update user_list set status=? where user_name=?"
        db.base(sql, [1, name], (result2, error2) => {
          if (result2) {
            const token = myToken.createToken(name, 60 * 60 * 24)
            if (cartData.length > 0) {
              const userId = result[0].user_id
              const sql2 = "select * from cart_list where user_id=?"
              let allQty = 0
              db.base(sql2, userId, (result3, error3) => {
                if (result3) {
                  const listArr = result3[0].product_list ? JSON.parse(result3[0].product_list) : []
                  for (let i = 0; i < listArr.length; i++) {
                    for (let f = 0; f < cartData.length; f++) {
                      if (cartData[f].product_id == listArr[i].product_id && cartData[f].size == listArr[i].size && cartData[f].color == listArr[i].color) {
                        const old_qty = listArr[i].qty
                        const add_qty = cartData[f].qty
                        listArr[i].qty = old_qty + add_qty
                        cartData.splice(f, 1)
                      }
                    }
                    allQty += listArr[i].qty
                  }

                  cartData.forEach(item => {
                    listArr.push(item)
                    allQty += item.qty
                  })

                  const new_listArr = listArr.length > 0 ? JSON.stringify(listArr) : ''
                  const sql4 = 'update cart_list set product_list=? where user_id=? '
                  db.base(sql4, [new_listArr, userId], (result4, error4) => {
                    if (result4) {
                      const sql3 = `update user_list set cart_num =? where user_id=?`
                      db.base(sql3, [allQty, userId], (result5, error5) => {
                        if (result5) {
                          return res.json({
                            status: 200,
                            data: {
                              token,
                              message: '密码正确',
                              new_listArr
                            }
                          })
                        } else {
                          res.json({
                            status: 400,
                            message: 'lose,please change again'
                          })
                        }
                      })
                    } else {
                      res.json({
                        status: 400,
                        message: 'lose,please change again'
                      })
                    }
                  })

                } else {
                  return res.json({
                    status: 400,
                    data: {
                      message: 'lose',
                      error3
                    }
                  })
                }
              })
            } else {
              return res.json({
                status: 200,
                data: {
                  token,
                  message: '密码正确',
                }
              })
            }
          } else {
            return res.json({
              status: 400,
              data: {
                message: '登录失败',
              }
            })
          }
        })
      } else {
        return res.json({
          status: 400,
          data: {
            message: '密码错误',
          }
        })
      }
    } else {
      return res.json({
        status: 400,
        data: {
          message: '用户名不存在',
        }
      })
    }
  })
}

exports.register = (req, res) => {
  const name = req.body.userName
  const password = req.body.passWord
  const email = req.body.email
  const cartData = req.body.cartData ?? []
  const myToken = new TokenObj()
  const sql = "select password from user_list where user_name=?"
  db.base(sql, name, (result, error) => {
    if (result.length > 0) {
      return res.json({
        status: 400,
        data: {
          message: '该用户已存在！'
        }
      })
    } else {
      const sql = "insert into user_list(user_name,password,email,status) values(?,?,?,?)"
      db.base(sql, [name, password, email, 1], (result2, error2) => {
        if (result2) {
          const token = myToken.createToken(name, 60 * 60 * 24)

          if (cartData.length > 0) {
            const sql = "select * from user_list where user_name=?"
            db.base(sql, name, (result11, error11) => {
              if (result11) {
                const userId = result11[0].user_id
                let allQty = 0
                const listArr = []
                cartData.forEach(item => {
                  listArr.push(item)
                  allQty += item.qty
                })

                const new_listArr = listArr.length > 0 ? JSON.stringify(listArr) : ''
                const sql4 = `insert into cart_list(product_list,user_id) values(?,?)`
                db.base(sql4, [new_listArr, userId], (result4, error4) => {
                  if (result4) {
                    const sql22 = 'select * from cart_list where user_id=?'
                    db.base(sql22, userId, (result22, error22) => {
                      if (result22) {
                        const sql3 = `update user_list set cart_num =?,user_cartid=? where user_id=?`
                        db.base(sql3, [allQty, result22[0].cart_id, userId], (result5, error5) => {
                          if (result5) {
                            return res.json({
                              status: 200,
                              data: {
                                message: '注册成功',
                                token,
                              }
                            })
                          } else {
                            res.json({
                              status: 400,
                              message: 'lose,please change again'
                            })
                          }
                        })
                      }
                    })
                  } else {
                    res.json({
                      status: 400,
                      message: 'lose,please change again'
                    })
                  }
                })
              } else {
                return res.json({
                  status: 400,
                  data: {
                    message: '注册失败',
                    error11
                  }
                })
              }
            })
          } else {
            return res.json({
              status: 200,
              data: {
                message: '注册成功',
                token,
              }
            })
          }
        } else {
          return res.json({
            status: 400,
            data: {
              message: '注册失败'
            }
          })
        }
      })
    }
  })
}

//验证token
exports.loginStatus = (req, res) => {
  const token = req.body.token
  const myToken = new TokenObj()
  const name = req.body.userName
  const check = myToken.checkToken(token)
  if (!check) {
    const sql = "update user_list set status=? where user_name=?"
    db.base(sql, [1, name], (result, error) => {
      return res.json({
        status: 400,
        msg: '已过期'
      })
    })
  } else {
    const sql = "select * from user_list where user_name=?"
    db.base(sql, name, (result, error) => {
      if (result.length > 0) {
        return res.json({
          status: 200,
          data: result
        })
      } else {
        return res.json({
          status: 400,
          data: result
        })
      }
    })
  }
}

exports.logOut = (req, res) => {
  const name = req.body.userName
  const sql = "update user_list set status=? where user_name=?"
  db.base(sql, [0, name], (result, error) => {
    if (result) {
      return res.json({
        status: 200,
        msg: '退出登录成功'
      })
    } else {
      return res.json({
        status: 400,
        msg: '请重试'
      })
    }
  })
}

// 获取购物车列表
exports.getCartList = (req, res) => {
  const id = req.body.id
  const sql = "select * from cart_list where user_id = ?"
  db.base(sql, id, async (result, error) => {
    if (result) {

      if (result[0].product_list) {
        let product_list = []
        const listArr = JSON.parse(result[0].product_list)
        let product_list_id = []
        for (let i = 0; i < listArr.length; i++) {
          product_list_id.push(listArr[i].product_id)
        }
        if (product_list_id.length > 0) {
          product_list = await getArrProducts(JSON.stringify(product_list_id))
          product_list.forEach((item, key) => {
            item.size = listArr[key].size
            item.color = listArr[key].color
            item.qty = listArr[key].qty
          })
        }
        return res.json({
          status: 200,
          product_list,
          aa: result[0].product_list
        })
      } else {
        return res.json({
          status: 200,
          product_list: []
        })
      }


    } else {
      return res.json({
        status: 400,
        error
      })
    }
  })
}

// 生成订单
exports.checkout = async (req, res) => {
  const user_id = req.body.userId
  const data = req.body.data
  const userName = req.body.userName
  const date = new Date()
  const year = date.getFullYear()
  const month = checkTime(date.getMonth() + 1)
  const day = checkTime(date.getDate())
  const h = checkTime(date.getHours())
  const m = checkTime(date.getMinutes())
  const s = checkTime(date.getSeconds())
  const num = user_id + year + month + day + h + m + s
  console.log(num)
  const orderId = PrefixInteger(num, 18)
  console.log(orderId)
  const addressId = data.addressId ?? 0

  const order_list = await findCartList(user_id)
  let address = {}
  saveAddress(user_id, data.address, addressId).then((returnRes) => {
    if (order_list) {
      if (addressId) {
        address = returnRes
      } else {
        address = data.address
      }
      const newData = [orderId + '', JSON.stringify(order_list), data.allPrice, user_id, data.sendName, data.sendPrice, 'payed', JSON.stringify(address), data.payName]
      const sql = `insert into order_list(order_id,order_list,order_price,user_id,send_type,send_price,order_status,order_address,pay_type) values(?,?,?,?,?,?,?,?,?)`
      db.base(sql, newData, (result, error) => {
        if (result) {
          const sql2 = 'update cart_list set product_list=? where user_id=? '
          db.base(sql2, ['', user_id], (result2, error2) => {
            if (result2) {
              const sql3 = 'update user_list set cart_num=? where user_id=? '
              db.base(sql3, [0, user_id], (result3, error3) => {
                if (result3) {
                  return res.json({
                    status: 200,
                    result3
                  })
                } else {
                  return res.json({
                    status: 400,
                    error3
                  })
                }
              })

            } else {
              return res.json({
                status: 400,
                error2
              })
            }
          })
        } else {
          return res.json({
            status: 400,
            error
          })
        }
      })
    } else {
      return res.json({
        status: 400,
        message: 'error'
      })
    }
  }).catch((error) => {
    return res.json({
      status: 400,
      message: '地址保存失败',
      error
    })
  })
}

function findCartList(user_id) {
  return new Promise((resolve, reject) => {
    let order_list = []
    const sql = 'select * from cart_list where user_id=?'
    db.base(sql, user_id, (result, error) => {
      if (result) {
        if (result[0].product_list) {
          order_list = JSON.parse(result[0].product_list)
          resolve(order_list)
        } else {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    })
  })
}

function saveAddress(user_id, address, addressId) {
  return new Promise((resolve, reject) => {
    if (addressId) {
      const sql = 'select * from user_address where id=?'
      db.base(sql, addressId, (result, error) => {
        if (result) {
          resolve(result[0])
        } else {
          reject(error)
        }
      })
    } else {
      const data = [user_id + '', address.state, address.province, address.city, address.street, address.other, address.default ? '1' : '0', address.username, address.email, address.zip, address.tel]
      const sql = `insert into user_address(user_id,state,province,city,street,other,is_default,user_name,email,zip,tel) values(?,?,?,?,?,?,?,?,?,?,?)`
      db.base(sql, data, (result, error) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    }

  })
}

function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

const checkTime = (i) => {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

//修改购物车
exports.changeCart = (req, res) => {
  const user_id = req.body.user_id
  const product_id = req.body.product_id
  const num = req.body.qty
  let endQty = 0
  let spliceKey = 0

  const sql = 'select * from cart_list where user_id=?'
  db.base(sql, user_id, (result, error) => {
    if (result) {
      if (result[0].product_list) {
        const listArr = JSON.parse(result[0].product_list)
        for (let i = 0; i < listArr.length; i++) {
          if (num == 0) {
            if (listArr[i].product_id == product_id) {
              spliceKey = i + 1
            }
          } else {
            if (listArr[i].product_id == product_id) {
              listArr[i].qty = num
            }
            endQty += listArr[i].qty
          }
        }
        if (spliceKey > 0) {
          listArr.splice(spliceKey - 1, 1)
        }
        const new_listArr = listArr.length > 0 ? JSON.stringify(listArr) : ''
        const sql2 = 'update cart_list set product_list=? where user_id=? '
        db.base(sql2, [new_listArr, user_id], (result2, error2) => {
          if (result2) {
            const sql3 = `update user_list set cart_num =? where user_id=?`
            db.base(sql3, [endQty, user_id], (result3, error3) => {
              if (result3) {
                res.json({
                  status: 200,
                  message: 'success'
                })
              } else {
                res.json({
                  status: 400,
                  message: 'lose,please change again'
                })
              }
            })
          } else {
            res.json({
              status: 400,
              message: 'lose,please change again'
            })
          }
        })
      }
    } else {
      return res.json({
        status: 400,
        message: 'lose,please change again'
      })
    }
  })
}

//未登录获取加购产品数据
exports.getCartListNo = async (req, res) => {
  const cart_list = req.body.cartList
  let product_list_id = []
  for (let i = 0; i < cart_list.length; i++) {
    product_list_id.push(cart_list[i].product_id)
  }
  const product_list = await getArrProducts(JSON.stringify(product_list_id))
  product_list.forEach(item => {
    cart_list.forEach(item2 => {
      if (item.id == item2.product_id) {
        item.size = item2.size
        item.color = item2.color
        item.qty = item2.qty
      }
    })
  })
  return res.json({
    status: 200,
    product_list
  })
}

//获取地址信息
exports.gerAddressMessage = (req, res) => {
  const sql = 'select * from cc_zip_codes'
  db.base(sql, null, (result, error) => {
    if (result) {
      let country = {
        "北海道": {},
        "秋田県": {},
        '山形県': {},
        "千葉県": {}
      }
      const arr = ['北海道', '秋田県', '山形県', '千葉県']
      result.forEach(item => {
        if (arr.includes(item.county))
          if (!country[item.county][item.city]) {
            country[item.county][item.city] = []
            country[item.county][item.city].push(item)
          } else {
            country[item.county][item.city].push(item)
          }
      })
      return res.json({
        status: 200,
        data: country
      })
    } else {
      return res.json({
        status: 400,
        data: error
      })
    }
  })
}

//获取用户个人中心信息
exports.getUserMessage = (req, res) => {
  const userId = req.body.userId
  let order = {}
  const sql = "select order_id,order_status from order_list where user_id = ?"
  db.base(sql, userId, (result, error) => {
    if (result) {
      result.forEach(item => {
        if (order[item.order_status]) {
          order[item.order_status].push(item.order_id)
        } else {
          order[item.order_status] = []
          order[item.order_status].push(item.order_id)
        }
      })

      return res.json({
        status: 200,
        order
      })
    } else {
      return res.json({
        status: 400,
        order: {}
      })
    }
  })
}

//获取用户地址
exports.getUserAddress = (req, res) => {
  const userId = req.body.userId
  const sql = "select * from user_address where user_id = ?"
  db.base(sql, userId, (result, error) => {
    if (result) {
      return res.json({
        status: 200,
        data: result
      })
    } else {
      return res.json({
        status: 400,
        data: []
      })
    }
  })
}

//删除用户地址
exports.addressDelete = (req, res) => {
  const addressId = req.body.id
  const sql = `delete from user_address where id = ?`
  db.base(sql, addressId, (result, error) => {
    if (result) {
      return res.json({
        status: 200,
        data: 'success'
      })
    } else {
      return res.json({
        status: 400,
        error
      })
    }
  })
}

