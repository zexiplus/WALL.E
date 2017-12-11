<template>
    <div class="container">
        <el-row type="flex" justify="start" :gutter="50">
            <el-col :span="12" >
                <el-card>
                    <h1 slot="header">全局模块开关</h1>
                        <el-row :gutter="30">
                            <el-col :span="8">总开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="globalSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">led开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="ledSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">摄像开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="cameraSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">温度开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="thermometerSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">测距开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="proximitySwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">gps开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="gpsSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">遥控开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="remoteControlSwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="8">红外开/关</el-col>
                            <el-col :span="16">
                                <el-switch
                                  v-model="redRaySwitch"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                </el-card>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">socket信道连接</h1>
                      <el-row>
                          <el-col :span="16" :push="4">
                              <el-input v-model="socketAddress"></el-input>
                          </el-col>
                          <el-col :span="20">
                              <div class="btnWrapper">
                                  <el-button type="success" @click="connectSocket" plain>连接</el-button>
                                  <el-button type="danger" @click="closeConnect" plain>关闭</el-button>
                              </div>
                          </el-col>
                      </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">摄像头ip连接</h1>
                      <el-row>
                          <el-col :span="16" :push="4">
                              <el-input v-model="cameraAddress"></el-input>
                          </el-col>
                          <el-col :span="20">
                              <div class="btnWrapper">
                                  <el-button type="success" @click="connectCamera" plain>连接</el-button>
                                  <el-button type="danger" @click="closeCamera" plain>关闭</el-button>
                              </div>
                          </el-col>
                      </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueSocketio from 'vue-socket.io'
    import {mapState} from 'vuex'
    export default {
        name: 'settings',
        socket: {
            connect() {
            }
        },
        watch: {
            allSwitch(val) {
                this.allSwitch = this.ledSwitch = this.cameraSwitch = this.thermometerSwitch = this.proximitySwitch = this.gpsSwitch = this.remoteControlSwitch = this.redRaySwitch = val;
            }
        },
        computed: {
            ...mapState(['globalSwitch','serverIp','cameraIp','ledSwitch','cameraSwitch',
                'thermometerSwitch','proximitySwitch','gpsSwitch','remoteControlSwitch','redRaySwitch'])
        },
        data() {
            return {
                socketAddress: '',
                cameraAddress: ''
            }
        },
        mounted() {
            this.socketAddress = this.serverIp
            this.cameraAddress = this.cameraIp
        },
        methods: {
            connectSocket() {
                this.changeIp()
                if(!this.$socket) {
                    Vue.use(VueSocketio,this.serverIp)
                }
                else {
                    if(this.$socket.connected) {
                        this.$socket.close()
                    }
                    this.$socket.connect(this.serverIp)
                    if(this.$socket.connected) {
                        this.$message({
                            type: 'success',
                            message: 'socket信道连接关闭成功'
                        })
                    }
                }
            },
            closeConnect() {
                if(this.$socket) {
                    this.$socket.close()
                    if(this.$socket.disconnected) {
                        this.$message({
                            type: 'success',
                            message: 'socket信道连接关闭成功'
                        })
                    }
                    else {
                        this.$message({
                            type: 'info',
                            message: 'socket信道连接关闭失败'
                        })
                    }
                }
                else {
                    this.$message({
                        type: 'info',
                        message: 'socket信道连接未建立'
                    })
                }
                console.log('this.socket',this.$socket)
            },
            changeIp() {
                this.$store.commit('changeRasSocketIp',this.socketAddress)
            },
            connectCamera() {
                this.$store.commit('changeRasCameraIp',this.cameraAddress)
            }
        }
    }
</script>
<style scoped>
    h1 {
        text-align: center;
    }
    .btnWrapper {
        padding-top: 2rem;
    }
</style>
