<template>
  <Default>
    <div id="payFailure" style="margin-top: 100px">
      <el-result icon="error" title="Failure Tip" sub-title="Please follow the instructions">
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </div>
  </Default>
</template>

<script>
import Default from 'components/tool/default.vue'
export default {
  components: {
    Default
  },
  setup() {

  },
}
</script>