<template>
   <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        方向遥控
                    </h1>                    
                    <el-form>
                    <el-row>
                        <el-col :span="21" class="canvasAlign">
                            <el-form-item label="电机1转速(百分比)" label-width="200px">
                                <el-slider v-model="speedLeft" :min="0" :max="100"></el-slider>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="21" class="canvasAlign">
                            <el-form-item label="电机2转速(百分比)" label-width="200px">
                                <el-slider v-model="speedRight" :min="0" :max="100"></el-slider>
                            </el-form-item>
                        </el-col>
                    </el-row>    
                    <el-row>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="遥控" label-width="120px">
                                <el-switch v-model="remoteMode"></el-switch>
                            </el-form-item>
                        </el-col>                        
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="避障" label-width="120px">
                                <el-switch v-model="avoidMode"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="循迹" label-width="120px">
                                <el-switch v-model="trailMode"></el-switch>
                            </el-form-item>
                        </el-col>   
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="旋转" label-width="120px">
                                <el-switch v-model="rotateMode"></el-switch>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="倒退" label-width="120px">
                                <el-switch v-model="backMode"></el-switch>
                            </el-form-item>
                        </el-col>                                                                    
                    </el-row>                                         
                    </el-form>
                </el-card> 
            </el-col>
            <el-col :span="6">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        当前方向
                    </h1>
                    <el-row>
                        <el-col :span="24">
                            <h3></h3>
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
                speedLeft: 100,
                speedRight: 100,
                remoteMode: true,
                avoidMode: false,
                trailMode: false,
                rotateMode: false,
                backMode: false,
            }
        },
        watch: {
            remoteMode(val) {
                if(val) {
                    this.avoidMode = this.trailMode = this.rotateMode = this.backMode = false;
                }
            },
            avoidMode(val) {
                if(val) {
                    this.remoteMode = this.trailMode = this.rotateMode = this.backMode = false;
                }                
            },
            trailMode(val) {
                if(val) {
                    this.avoidMode = this.remoteMode = this.rotateMode = this.backMode = false;
                }
            },
            rotateMode(val) {
                if(val) {
                    this.avoidMode = this.trailMode = this.remoteMode = this.backMode = false;
                }
            },
            backMode(val) {
                if(val) {
                    this.avoidMode = this.trailMode = this.rotateMode = this.remoteMode = false;
                }                
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