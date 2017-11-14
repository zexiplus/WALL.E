<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <el-carousel height="400px">
                  <el-carousel-item v-for="item in 4" :key="item">
                   
                  </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <el-row :gutter="50" class="cardContainer">
            <el-col :span="8">
                <el-card>
                    
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card></el-card>
            </el-col>
            <el-col :span="8">
                <el-card></el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script></script>
<style>
  .el-carousel__item h3 {
        
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .cardContainer {
    padding: 30px 0;
  }
</style>