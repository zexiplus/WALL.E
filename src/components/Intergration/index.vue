<script>
  import camera from '@c/Camera'
  export default {
      name: 'Integration',
      data() {
          return {

          }
      },
      components: {
          camera
      }
  }
</script>
<template>
  <div class="container">
    <el-row>
      <el-col :span="20"><camera ></camera></el-col>
    </el-row>

  </div>
</template>
<style scoped>
  .container {
  }
</style>
