<template>
    <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        摄像机
                    </h1>
                    <el-row>
                        <el-col :span="24" class="cameraAlign">
                            <iframe :src="url" id="camera"></iframe>
                        </el-col>
                    </el-row>
                </el-card>                
            </el-col>
            <el-col :span="6">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        旋转相机
                    </h1>
                    <el-row>
                        <el-col :span="24">
                            <el-slider v-model="rotateAngle" :min="0" :max="180"></el-slider>
                        </el-col>
                    </el-row>
                </el-card>                
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {cameraUrl} from '&c'
    export default {
        name: 'camera',
        data() {
            return {
                url: cameraUrl,
                rotateAngle: 90,
            }
        },
        watch: {
            rotateAngle(newVal) {
                this.turnCamera(newVal)
            }
        },
        mounted() {},
        methods: {
            turnCamera(arg) {
                this.$socket.emit('turnCamera',arg)
            }
        },
        sockets: {
            connect: function() {
                console.log('ah')
            }
        },
        
    }
</script>
<style>
    #camera {
        width: 640px;
        height: 480px;
        border: 0;
    }
    .cameraAlign {
        text-align: center;
    }
    .textAlign {
        text-align: center;
        font-size: 2rem;
    }
</style>
