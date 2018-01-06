<template>
    <div class="container">
        <el-row type="flex" justify="start" :gutter="20">
            <el-col :span="12" >
                <el-card>
                    <h1 slot="header">web shell</h1>
                    <div class="webShell" contenteditable="true"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">socket信道连接</h1>
                      <el-row>
                          <el-col :span="18">
                              <el-input size="small" v-model="socketAddr">
                                <el-select v-model="socketT" slot="prepend">
                                  <el-option label="http://" value="http://"></el-option>
                                  <el-option label="https://" value="https://"></el-option>
                                  <el-option label="none" value=""></el-option>
                                </el-select>
                              </el-input>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button type="success" size="small" round  @click="connectSocket" plain>连接</el-button>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button type="danger" size="small" round  @click="closeSocket" plain>关闭</el-button>
                          </el-col>
                      </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <div class="gutter"></div>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">摄像头连接</h1>
                      <el-row>
                          <el-col :span="18">
                              <el-input size="small" v-model="cameraAddr">
                                <el-select v-model="cameraT" slot="prepend">
                                  <el-option label="http://" value="http://"></el-option>
                                  <el-option label="https://" value="https://"></el-option>
                                  <el-option label="none" value=""></el-option>
                                </el-select>
                              </el-input>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button type="success" size="small" round @click="connectCamera" plain>连接</el-button>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button type="danger" size="small" round @click="closeCamera" plain>关闭</el-button>
                          </el-col>
                      </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <div class="gutter"></div>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">server连接</h1>
                      <el-row>
                          <el-col :span="18">
                              <el-input size="small" v-model="serverAddr">
                                <el-select v-model="serverT" slot="prepend">
                                  <el-option label="http://" value="http://"></el-option>
                                  <el-option label="https://" value="https://"></el-option>
                                  <el-option label="none" value=""></el-option>
                                </el-select>
                              </el-input>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button size="small" type="success" round @click="connectServer" plain>连接</el-button>
                          </el-col>
                          <el-col :span="2" :offset="1">
                              <el-button size="small" type="danger" round @click="closeServer" plain>关闭</el-button>
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
        },
        computed: {
            ...mapState(['serverAddress','socketAddress','cameraAddress'])
        },
        data() {
            return {
                serverAddr: '',
                serverT: '',
                socketAddr: '',
                socketT: '',
                cameraAddr: '',
                cameraT: ''
            }
        },
        mounted() {
            this.serverAddr = this.serverAddress[1]
            this.socketAddr = this.socketAddress[1]
            this.cameraAddr = this.cameraAddress[1]
            this.serverT = this.serverAddress[0]
            this.socketT = this.socketAddress[0]
            this.cameraT = this.cameraAddress[0]
        },
        methods: {
            connectSocket() {
                this.saveSocket()
                if(!this.$socket) {
                    Vue.use(VueSocketio,this.socketAddress.join(''))
                    this.$message({
                        type: 'success',
                        message: 'socket信道连接成功'
                    })
                }
                else {
                    if(this.$socket.connected) {
                        this.$socket.close()
                    }
                    this.$socket.connect(this.socketAddress.join(''))
                    this.$message({
                        type: 'success',
                        message: 'socket信道连接成功'
                    })

                }
                console.log('this socket is',this.$socket)
            },
            closeSocket() {
                console.log('this socket is',this.$socket)
                if(this.$socket) {
                    this.$socket.close()
                    this.$message({
                        type: 'success',
                        message: 'socket信道连接关闭成功'
                    })
                }
                else {
                    this.$message({
                        type: 'info',
                        message: 'socket信道连接未建立'
                    })
                }
            },
            saveSocket() {
                if(this.socketT == 'ngrok') {
                    this.$store.commit('changeSocket',['http://',this.socketAddr + '.ngrok.io'])
                }
                else {
                    this.$store.commit('changeSocket',[this.socketT,this.socketAddr])
                }
            },
            connectServer() {
                if(this.serverT == 'ngrok') {
                    this.$store.commit('changeServer',['http://',this.serverAddr + '.ngrok.io'])
                }
                else {
                    this.$store.commit('changeServer',[this.serverT,this.serverAddr])
                }
                this.$message({
                    type: 'success',
                    message: '服务器连接成功'
                })
            },
            closeServer() {
                this.$store.commit('changeCamera',[this.cameraT,''])
                this.$message({
                    type: 'info',
                    message: '服务器关闭成功'
                })
            },
            connectCamera() {
                if(this.cameraT == 'ngrok') {
                    this.$store.commit('changeCamera',['http://',this.cameraAddr + '.ngrok.io'])
                }
                else {
                    this.$store.commit('changeCamera',[this.cameraT,this.cameraAddr])
                }
                this.$message({
                    type: 'success',
                    message: '摄像机连接成功'
                })
            },
            closeCamera() {
                this.$store.commit('changeCamera',[this.cameraT,''])
                this.$message({
                    type: 'info',
                    message: '摄像机关闭成功'
                })
            }
        }
    }
</script>
<style scoped>
    h1 {
        text-align: center;
    }
    .gutter {
        height: 20px;
    }
    .webShell {
        width: calc(100% - 12px);
        height: 455px;
        background-color: #000;
        color: #fff;
        text-align: left;
        overflow: auto;
        padding: 12px;
    }
    .el-select {
      width: 90px;
    }
</style>
