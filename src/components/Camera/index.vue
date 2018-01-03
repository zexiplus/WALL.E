<template>
    <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="fullCamera ? 14 : 24">
                <el-card :body-style="fullCamera ? {} : cardStyle">
                    <h1 v-if="fullCamera" slot="header" class="textAlign">
                        摄像机
                    </h1>
                    <el-row>
                        <el-col :span="24" class="cameraAlign">
                            <iframe :src="urlType + url" id="camera"></iframe>
                        </el-col>
                    </el-row>
                    <el-row v-if="!fullCamera">
                        <el-col :offset="1" :span="22">
                            <el-slider v-model="rotateAngle" :min="0" :max="180"></el-slider>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6" v-if="fullCamera">
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
    export default {
        name: 'camera',
        props: {
            fullCamera: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                rotateAngle: 90,
                cardStyle: {padding: "0px",paddingTop: '10px'}
            }
        },
        computed: {
            urlType() {
                return this.$store.state.cameraType
            },
            url() {
                return this.$store.state.cameraAddress
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
<style scoped>
    #camera {
        width: 600px;
        height: 400px;
        border: 0;
        padding: 0;
        transform: rotate(180deg);
    }
    .cameraAlign {
        text-align: center;
    }
    .textAlign {
        text-align: center;
    }
</style>
