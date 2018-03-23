<script>
  import camera from '@c/Camera'
  import control from '@c/Control'
  import gps from '@c/Gps'
  export default {
      name: 'Integration',
      data() {
          return {
              showTitle: false
          }
      },
      components: {
          camera,
          control,
          gps
      }
  }
</script>
<template>
  <div class="container">
    <el-row>

      <el-col :span="13">
        <el-row>
          <el-col :span="24"><camera :fullCamera="false"></camera></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><control :fullControl="false"></control></el-col>
        </el-row>
      </el-col>

      <el-col :span="11">
        <el-row>
          <el-col :span="24"><gps :fullGps="false"></gps></el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>
<style scoped>
  .container {
  }
</style>
