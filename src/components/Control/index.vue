<template>
   <div class="controlContainer">
        <el-row :gutter="50">
            <el-col :span=" fullControl ? 16 : 24">
                <el-card>
                    <h1 v-if="fullControl" slot="header" class="textAlign">
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
                        <el-col :span="4" :offset="2" class="canvasAlign">
                            <el-form-item label="遥控" label-width="50px">
                                <el-switch v-model="remoteMode"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="避障" label-width="50px">
                                <el-switch v-model="avoidMode"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="循迹" label-width="50px">
                                <el-switch v-model="trailMode"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="旋转" label-width="50px">
                                <el-switch v-model="rotateMode"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" class="canvasAlign">
                            <el-form-item label="倒退" label-width="50px">
                                <el-switch v-model="backMode"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="fullControl">
                        <el-col :span="10" :offset="0">
                            <div class="box" >
                                <el-row>
                                    <el-col :span="4" :offset="11">
                                        <i ref="forward" class="el-icon-caret-top"></i>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" :offset="6">
                                        <i ref="left" class="el-icon-caret-left"></i>
                                    </el-col>
                                    <el-col :span="4" :offset="1">
                                        <i ref="back" class="el-icon-caret-bottom"></i>
                                    </el-col>
                                    <el-col :span="4" :offset="1">
                                        <i ref="right" class="el-icon-caret-right"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="6" v-if="fullControl">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        当前方向
                    </h1>
                    <el-row>
                        <el-col :span="24">
                            <div class="currDirection">{{currDirection}}</div>
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
        props: {
            fullControl: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                speedLeft: 100,
                speedRight: 100,
                remoteMode: true,
                avoidMode: false,
                trailMode: false,
                rotateMode: false,
                backMode: false,
                currDirection: ''
            }
        },
        watch: {
            remoteMode(val) {
                if(val) {
                    this.bindControl()
                    this.avoidMode = this.trailMode = this.rotateMode = this.backMode = false
                }
                else {
                    this.removeControl()
                }
            },
            avoidMode(val) {
                if(val) {
                    this.remoteMode = this.trailMode = this.rotateMode = this.backMode = false
                }
            },
            trailMode(val) {
                if(val) {
                    this.avoidMode = this.remoteMode = this.rotateMode = this.backMode = false
                }
            },
            rotateMode(val) {
                if(val) {
                    this.avoidMode = this.trailMode = this.remoteMode = this.backMode = false
                }
            },
            backMode(val) {
                if(val) {
                    this.avoidMode = this.trailMode = this.rotateMode = this.remoteMode = false
                }
            }
        },
        created() {
            this.bindControl();
        },
        methods: {
            bindControl() {
                document.addEventListener('keydown',this.captureKeyPress)
                document.addEventListener('keyup',this.captureKeyUp)
            },
            //解绑键盘事件
            removeControl() {
                document.removeEventListener('keydown',this.captureKeyPress)
                document.removeEventListener('keyup',this.captureKeyPress)
            },
            driveMoto(direc) {
                this.$socket.emit('driveMoto',direc)
                this.currDirection = direc
            },
            stopMoto(direc) {
                this.$socket.emit('stopMoto',direc)
                this.currDirection = ''
            },
            captureKeyPress(e) {
                console.log('emit')
                switch(e.keyCode) {
                    case 37:
                    if(this.fullControl) {
                        this.setHeighLight('left')
                    }
                    this.driveMoto('left')
                    break;
                    case 38:
                    if(this.fullControl) {
                        this.setHeighLight('forward')
                    }
                    this.driveMoto('forward')
                    break;
                    case 39:
                    if(this.fullControl) {
                        this.setHeighLight('right')
                    }
                    this.driveMoto('right')
                    break;
                    case 40:
                    if(this.fullControl) {
                        this.setHeighLight('back')
                    }
                    this.driveMoto('back')
                    break;
                }
            },
            captureKeyUp(e) {
                switch(e.keyCode) {
                    case 37:
                    if(this.fullControl) {
                        this.removeHeithLight('left')
                    }
                    this.stopMoto('left')
                    break;
                    case 38:
                    if(this.fullControl) {
                        this.removeHeithLight('forward')
                    }
                    this.stopMoto('forward')
                    break;
                    case 39:
                    if(this.fullControl) {
                        this.removeHeithLight('right')
                    }
                    this.stopMoto('right')
                    break;
                    case 40:
                    if(this.fullControl) {
                        this.removeHeithLight('back')
                    }
                    this.stopMoto('back')
                    break;
                }
            },
            setHeighLight(refName) {
                this.$refs[refName].style.color = '#409EFF'
            },
            removeHeithLight(refName) {
                this.$refs[refName].style.color = '#CFD3DB'
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
    .el-icon-caret-top,.el-icon-caret-bottom,.el-icon-caret-left,.el-icon-caret-right {
        font-size: 4rem;
        color: #CFD3DB;
    }
    .currDirection {
        text-align: left !important;
        display: block;
        padding-left: 2rem;
        height: 50px;
    }
</style>
