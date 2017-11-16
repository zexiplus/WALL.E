<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <el-carousel height="400px">
                  <el-carousel-item v-for="(item,index) in picList" :key="index">
                    <img :src="item.src" class="picCls" />
                  </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <el-row :gutter="50" class="cardContainer">
            <el-col :span="8">
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <ul>
                        <li v-for="item in cardOneListOne">{{item}}</li>
                      </ul>                      
                    </el-col>
                    <el-col :span="12">
                      <ul>
                        <li v-for="(item,index) in cardOneListTwo" :key="index">{{item}}</li>
                      </ul>                       
                    </el-col>                    
                  </el-row>
                    
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                  <p class="desc">
                    这是一个十足有趣的物联网项目！它运行在基于arm架构的raspiberry(树莓派）开发板上。凭借着node的出色性能和多系统支持，我们创建了这个项目。
                  </p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                  <el-row>
                      <el-col :span="6">
                        <p class="imgTitle">项目地址</p>
                      </el-col>
                      <el-col :span="16">
                        <img width="170" height="170" :src="projectImgAddress" />
                      </el-col>
                  </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    name: 'description',
    data() {
      return {
        picList: [{src:'/static/one.jpg'},{src: '/static/two.jpg'},{src: '/static/three.jpg'},{src: '/static/four.jpg'}],
        projectImgAddress: '/static/githubAddress.png',
        cardOneListOne: ['温度测控','地理定位','视频传输','距离测量'],
        cardOneListTwo: ['红外寻迹','方向遥控','速度测量']
      }
    }
  }
</script>
<style scoped>
  .picCls {
      width: 1200px;
      
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .desc {
    text-align: left;

  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .cardContainer {
    padding: 30px 0;
  }
  ul li {
    list-style: none;
    text-align: left;
  }
</style>