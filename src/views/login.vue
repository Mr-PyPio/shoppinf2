<template>
  <Default>
    <div id="login" class="content">
          <template v-if="banner">
            <img v-lazy="banner.url" :alt="banner.imgMessage.scale"  :style="{ width: '100%', 'aspect-ratio': 1 / banner.imgMessage.scale }">
          </template>
          <ul class="changeBtn">
            <li :class="{ active: ischoose }" @click="changeFrom(1)">ログイン</li>
            <li :class="{ active: !ischoose }" @click="changeFrom(2)">登録します</li>
          </ul>

          <div class="loginForm " :class="{ active: ischoose }">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              status-icon
            >
            <el-form-item label="メールアドレス" prop="username">
                  <el-input v-model="ruleForm.username" size="large" autocomplete="on"/>
                </el-form-item>
                <el-form-item label="パスワード" prop="password">
                  <el-input v-model="ruleForm.password" size="large" type="password" show-password  placeholder="Please input password"/>
                </el-form-item>
                <el-form-item>
                      <el-button type="primary" :loading="loginLoading" @click="submitForm(ruleFormRef)">登录</el-button>
                      <el-button type="info"  @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
          </div>

          <div class="registerForm" :class="{ active: !ischoose }">
              <el-form
                ref="ruleFormRegisterRef"
                :model="ruleFormRegister"
                :rules="rulesRegister"
                label-width="120px"
                status-icon
              >
                   <el-form-item label="メールアドレス" prop="username">
                    <el-input v-model="ruleFormRegister.username" size="large" />
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                      <el-input v-model="ruleFormRegister.email" size="large" type="email"  />
                    </el-form-item>
                  <el-form-item label="パスワード" prop="password">
                    <el-input v-model="ruleFormRegister.password" size="large" type="password" show-password  placeholder="Please input password"/>
                  </el-form-item>
                  <el-form-item label="パスワード確認" prop="password2">
                    <el-input v-model="ruleFormRegister.password2" size="large" type="password" show-password  placeholder="Please input password again"/>
                  </el-form-item>
                  <el-form-item>
                        <el-button type="primary" :loading="registerLoading" @click="submitRegisterForm(ruleFormRegisterRef)">注册</el-button>
                        <el-button type="info"  @click="resetForm(ruleFormRegisterRef)">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
      </div>
  </Default>
</template>

<script>
import Default from 'components/tool/default.vue'
import { reactive, ref } from 'vue'
import { getBannerDetail } from 'assets/js/common.js'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useCounterStore } from "@/store";
export default {
  components: {
    Default
  },
  name: '_login',
  setup() {
    const router = useRouter()
    const store = useCounterStore()
    const type = ref(router.currentRoute.value.query.type)
    const ruleFormRef = ref(null)
    const ruleFormRegisterRef = ref(null)
    const ruleForm = reactive({
      username: '',
      password: ''
    })
    const ruleFormRegister = reactive({
      username: '',
      email: '',
      password: '',
      password2: ''
    })

    const banner = ref(null)

    const ischoose = ref(true)
    if (type.value == 'register') {
      ischoose.value  = false
    }
    const rules = reactive({
      username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please input Activity password', trigger: 'blur' },
        { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
      ],
    })


    const checkPassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input the password again'))
      } else {
        if (ruleFormRegister.password == ruleFormRegister.password2) {
          callback()
        } else {
           callback(new Error("Two inputs don't match!"))
        }
      }
    }

    const checkEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input Activity eamil'))
      } else { 
        if ((ruleFormRegister.email).match(
          /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$/   // eslint-disable-line
        )) {
          callback()
        } else {
          callback(new Error("Please input Activity eamil"))
        }

      }
    }

    

    const rulesRegister = reactive({
      username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      email: [
        { required: true, message: 'Please input Activity eamil', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input Activity password', trigger: 'blur' },
        { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
      ],
      password2: [
        { required: true, message: 'Please input Activity password', trigger: 'blur' },
        { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur' }
      ]
    })

    const resetForm = (formName) => {
      formName.resetFields()
    }

    const submitForm = async (formName) => {
      await formName.validate((valid, fields) => {
        if (valid) {
          let data = null
          if (store.noLoginCartData.length > 0) {
            data = { userName: ruleForm.username, passWord: ruleForm.password ,cartData: store.noLoginCartData }
          } else {
            data = { userName: ruleForm.username, passWord: ruleForm.password }
          }
          axios.post('login', data).then(res => {
           const data = res.data.data
            if (res.data.status == 200) {
              if (data.token) {
                window.localStorage.setItem('userLimit', data.token)
              }
              window.localStorage.setItem('username', ruleForm.username)
              store.userName  = ruleForm.username
              store.userMessage()
              router.push('/')
            } else if (res.data.status == 400) {
              alert('登录失败，请检查账号密码是否正确')
            }
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    }



    const submitRegisterForm = async (formName) => {
      await formName.validate((valid, fields) => {
        if (valid) {
          let data = null
          if (store.noLoginCartData.length > 0) {
            data = { userName: ruleFormRegister.username, passWord: ruleFormRegister.password, email: ruleFormRegister.email, cartData: store.noLoginCartData }
          } else {
            data = { userName: ruleFormRegister.username, passWord: ruleFormRegister.password, email: ruleFormRegister.email }
          }
          axios.post('register', data).then(res => {
            const data = res.data.data
            if (res.data.status == 200) {
              if (data.token) {
                window.localStorage.setItem('userLimit', data.token)
              }
              window.localStorage.setItem('username', ruleFormRegister.username)
              store.userName = ruleFormRegister.username
              store.userMessage(ruleFormRegister.username)
              router.push('/')
            } else if (res.data.status == 400) {
              alert(data.message)
            }
          })
        } else {
          console.log('error Registe!', fields)
        }
      })
    }

    const loginLoading = ref(false)
    const registerLoading = ref(false)

    getBannerDetail('login_banner').then(res => {
      banner.value = JSON.parse(res.detail)[0].img
    })

    const changeFrom = (index) => {
      if (index == 1) {
        ischoose.value = true
      }
      if (index == 2) {
        ischoose.value = false
      }
    }

    return {
      ruleForm,
      loginLoading,
      registerLoading,
      ruleFormRegisterRef,
      ruleFormRef,
      rules,
      resetForm,
      submitForm,
      ischoose,
      banner,
      changeFrom,
      ruleFormRegister,
      rulesRegister,
      submitRegisterForm
    }
  },
}
</script>

<style lang="less">
#login{
  .loginForm {
    display: none;
    margin:  30px 12px 15px;

    &.active{
      display: block;
    }


  }
    .el-form-item__label{
      justify-content: flex-start;
      font-size: 12px;
      align-content: center;
    }
  .registerForm{
    display: none;
    margin:  30px 12px 15px;

    &.active{
      display: block;
    }
  }

  .changeBtn{
    margin-top: 15px;
    .displayFlexCen();

    li{
      width: 45%;
      height: 46px;
      line-height: 46px;
      font-size: 18px;
      color: #222;
      border: 1px solid #ddd;
      text-align: center;

      &.active{
        border: 0;
        background: #000;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}
</style>