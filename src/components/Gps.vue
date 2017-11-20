<template>
   <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        导航图
                    </h1>
                    <el-row>
                        <el-col :span="24" class="canvasAlign">
                            <canvas ref="myCanvas" width="600" height="400"></canvas>
                        </el-col>
                    </el-row>
                </el-card>                
            </el-col>
            <el-col :span="6">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        当前温度
                    </h1>
                    <el-row>
                        <el-col :span="24">
                            <h3> {{currTemperature}}</h3>
                        </el-col>
                    </el-row>
                </el-card>                
            </el-col>
        </el-row>
    </div>    
</template>
<script>
    export default {
        name: 'thermometer',
        data() {
            return {
                currTemperature: 22
            }
        }
    }
</script>
<style scoped>
    h1 {
        text-align: center;
    }
    .canvasAlign {
        text-align: center;
    }
</style>