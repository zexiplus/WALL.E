<template>
    <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <div slot="header" class="textAlign">
                        <span>摄像机</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <iframe :src="url" id="camera"></iframe>
                        </el-col>
                    </el-row>
                    
                </el-card>                
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="textAlign">
                        <span>旋转相机</span>
                    </div>
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
        methods: {
            turnLeft() {
                this.$socket.emit('turnLeft')
            },
            turnRight() {
                this.$socket.emit('turnRight')
            }
        },
        sockets: {
            connect: function() {
                console.log('ah')
            }
        },
        mounted() {}
    }
</script>
<style>
    #camera {
        width: 640px;
        height: 480px;
        border: 0;
    }
    .textAlign {
        text-align: center;
        font-size: 2rem;
    }
</style>
