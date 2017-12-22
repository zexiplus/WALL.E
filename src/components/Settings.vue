<template>
    <div class="container">
        <el-row type="flex" justify="start" :gutter="50">
            <el-col :span="14" >
                <el-card>
                    <h1 slot="header">web shell</h1>
                    <div class="webShell" contenteditable="true"></div>
                </el-card>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="24">
                  <el-card>
                      <h1 slot="header">socket信道连接</h1>
                      <el-row>
                          <el-col :span="14">
                              <el-input v-model="socketAddress"></el-input>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="success" @click="connectSocket" plain>连接</el-button>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="danger" @click="closeSocket" plain>关闭</el-button>
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
                      <h1 slot="header">摄像头ip连接</h1>
                      <el-row>
                          <el-col :span="14">
                              <el-input v-model="cameraAddress"></el-input>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="success" @click="connectCamera" plain>连接</el-button>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="danger" @click="closeCamera" plain>关闭</el-button>
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
                          <el-col :span="14">
                              <el-input v-model="serverAddress"></el-input>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="success" @click="connectServer" plain>连接</el-button>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-button type="danger" @click="closeServer" plain>关闭</el-button>
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
                socketAddr: '',
                cameraAddr: ''
            }
        },
        mounted() {
            this.serverAddr = this.serverAddress
            this.socketAddr = this.socketAddress
            this.cameraAddr = this.cameraAddress
        },
        methods: {
            connectSocket() {
                this.saveSocket()
                if(!this.$socket) {
                    Vue.use(VueSocketio,this.socketAddr)
                    this.$message({
                        type: 'success',
                        message: 'socket信道连接成功'
                    })
                }
                else {
                    if(this.$socket.connected) {
                        this.$socket.close()
                    }
                    this.$socket.connect(this.socketAddr)
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
                console.log('this.socket',this.$socket)
            },
            saveSocket() {
                this.$store.commit('changeSocket',this.socketAddr)
            },
            connectServer() {
                this.$store.commit('changeServer',this.serverAddr)
            },
            closeServer() {
                this.$store.commit('closeServer')
            },
            connectCamera() {
                this.$store.commit('changeCamera',this.cameraAddr)
            },
            closeCamera() {
                this.$store.commit('closeCamera')
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
</style>
