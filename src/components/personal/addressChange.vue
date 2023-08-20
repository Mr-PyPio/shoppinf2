<template>
  <Default>
    <div id="address" class="content">
      <h1>
          <el-icon class="title_icon" @click="titleClick"><ArrowLeftBold /></el-icon>
          ADDRESS RECISTER
      </h1>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon style="margin-top: 30px">
        <el-form-item label="氏名" prop="username">
          <el-input v-model="ruleForm.username" size="default" autocomplete="on" />
        </el-form-item>
        <el-form-item label="電話番号" prop="tel">
          <el-input v-model="ruleForm.tel" size="default" type="tel" />
        </el-form-item>
        <div class="displayFlex">
          <p style="width: 120px;color: #606266;"><span style="color:#f56c6c;">*</span> 住所</p>
          <div style="width: calc(100% - 120px)">
            <el-form-item label="" prop="state">
              <el-select v-model="ruleForm.state" class="m-2" placeholder="日本" disabled></el-select>
            </el-form-item>
            <el-form-item label="" prop="province">
              <el-select v-model="ruleForm.province" class="m-2" placeholder="都道府県" @change="provinceChange">
                <el-option v-for="item in provinceOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="city">
              <el-select v-model="ruleForm.city" class="m-2" placeholder="市区" @change="cityChange">
                <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="street">
              <el-select v-model="ruleForm.street" class="m-2" placeholder="町村" @change="streetChange">
                <el-option v-for="item in streetOptions" :key="item.zip" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="other">
              <el-input v-model="ruleForm.other" size="default" type="text" placeholder="番地/ビル・マンション名" />
            </el-form-item>
          </div>
        </div>
        <el-form-item label="郵便番号" prop="zip">
          <el-input v-model="ruleForm.zip" size="default" type="number" />
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="ruleForm.email" size="default" type="email" />
        </el-form-item>
        <div style="display: flex;align-items: center;font-size: 12px;">
          <el-switch v-model="ruleForm.default" style="margin-right: 8px;--el-switch-on-color: #222;" />デフォルトの配送先として保存
        </div>
      </el-form>
    </div>
  </Default>
</template>

<script>
import Default from 'components/tool/default.vue'
import { reactive, ref, onDeactivated , onActivated } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name: '_address_change',
  components: {
    Default
  },
  setup() {
    const router = useRouter()
    const addressId = ref(router.currentRoute.value.query.id ?? '')
    const ruleFormRef = ref()
    const provinceOptions = ref([])
    const cityOptions = ref([])
    const streetOptions = ref([])
    const addressList = ref({})
    const init = async () => {
      const { data: data } = await axios.post('gerAddressMessage')
      console.log(data.data)
      addressList.value = data.data
      for (let key in addressList.value) {
        provinceOptions.value.push(key)
      }
    }
    init()
    const ruleForm = reactive({
      username: '',
      email: '',
      tel: '',
      zip: '',
      state: '日本',
      province: '',
      city: '',
      street: '',
      other: '',
      default: false
    })
    if (addressId.value) {
      onActivated(() => {
        const defaultAddressMessage = window.localStorage.getItem('defaultAddressMessage') ?? []
        if (defaultAddressMessage) {
          const data = JSON.parse(defaultAddressMessage)
          ruleForm.username = data.username
          ruleForm.email = data.email
          ruleForm.tel = data.tel
          ruleForm.zip = data.zip
          ruleForm.state = data.state
          ruleForm.province = data.province
          ruleForm.city = data.city
          ruleForm.street = data.street
          ruleForm.other = data.other
          ruleForm.default = data.default
        }
      })

    }
    onDeactivated(() => { window.localStorage.setItem('defaultAddressMessage' ,'') })
    const titleClick = () => {
      router.go(-1)
    }
    const provinceChange = (val) => {
      cityOptions.value = []
      if (addressList.value) {
        for (let key in addressList.value) {
          if (key == val) {
            for (let key2 in addressList.value[key]) {
              cityOptions.value.push(key2)
            }
          }
        }
      }
    }
    const cityChange = (val) => {
      streetOptions.value = []
      if (addressList.value) {
        for (let key in addressList.value) {
          if (key == ruleForm.province) {
            for (let key2 in addressList.value[key]) {
              if (key2 == val) {
                const arr = addressList.value[key][key2]
                for (let i = 0; i < arr.length; i++) {
                  streetOptions.value.push({
                    name: arr[i].town,
                    zip: arr[i].zip_code,
                  })
                }
              }
            }
          }
        }
      }
    }

    const streetChange = (val) => {
      streetOptions.value.forEach(item => {
        if (item.name == val) {
          ruleForm.zip = item.zip
        }
      })
    }

    const checkEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input Activity eamil'))
      } else {
        if ((ruleForm.email).match(
          /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$/   // eslint-disable-line
        )) {
          callback()
        } else {
          callback(new Error("Please input Activity eamil"))
        }
      }
    }
    const checkTel = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('Please input Activity tel'))
      } else {
        if ((ruleForm.tel).match(
          /^090-\d{8}$/   // eslint-disable-line
        )) {
          callback()
        } else {
          callback(new Error("Please input Activity tel (090-***)"))
        }

      }
    }

    const rules = reactive({
      username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      email: [
        { required: true, message: 'Please input Activity eamil', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      tel: [
        { required: true, message: 'Please input Activity tel', trigger: 'blur' },
        { min: 12, max: 12, message: 'Length should be 11', trigger: 'blur' },
        { validator: checkTel, trigger: 'blur' }
      ],
      zip: [
        { required: true, message: 'Please input Activity zip', trigger: 'blur' }
      ],
      province: [
        { required: true, message: 'Please input Activity province', trigger: 'change' }
      ],
      city: [
        { required: true, message: 'Please input Activity city', trigger: 'change' }
      ],
      street: [
        { required: true, message: 'Please input Activity street', trigger: 'change' }
      ]
    })

    const checkFrom = async () => {
      return new Promise((resolve, reject) => {
        ruleFormRef.value.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    }

    return {
      ruleForm,
      rules,
      cityOptions,
      provinceOptions,
      streetOptions,
      checkFrom,
      ruleFormRef,
      provinceChange,
      cityChange,
      streetChange,
      titleClick
    }
  },
}
</script>

<style lang="less">
#address {
  padding-left: 16px;
  padding-right: 16px;

  h1{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    position: relative;
    margin-top: 20px;

    .title_icon{
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      transform: translateY(-50%);
      left: 0
    }
  }

  .el-form-item__label {
    justify-content: flex-start;
  }

  .el-select {
    width: 100%;
  }

  .el-input.is-disabled .el-input__wrapper {
    background: #ddd;
  }

  .el-form-item__content {
    width: 100%;
    margin-left: 0 !important;
  }
}
</style>
