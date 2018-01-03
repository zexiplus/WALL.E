<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <h1 slot="header" class="textCenter">
                        led灯光模块
                    </h1>
                    <el-row :gutter="30">
                        <el-col :span="8">模块开/关</el-col>
                        <el-col :span="16">
                            <el-switch
                              v-model="moduleSwitch"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </el-row>                    
                    <el-row :gutter="30">
                        <el-col :span="8">led 1</el-col>
                        <el-col :span="16">
                            <el-switch
                              v-model="led1Switch"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">led 2</el-col>
                        <el-col :span="16">
                            <el-switch
                              v-model="led2Switch"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </el-row>  
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <span>
                                led1闪烁间隔
                            </span>
                        </el-col>
                        <el-col :span="16">
                            <el-slider v-model="led1Interval" :max="5000"></el-slider>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <span>
                                led2闪烁间隔
                            </span>
                        </el-col>
                        <el-col :span="16">
                            <el-slider v-model="led2Interval" :max="5000"></el-slider>
                        </el-col>
                    </el-row>  
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <span>
                                led1亮度
                            </span>
                        </el-col>
                        <el-col :span="16">
                            <el-slider @change="adjustLedBright(1)" v-model="led1Bright" :step="10" :max="100"></el-slider>
                        </el-col>
                    </el-row> 
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <span>
                                led2亮度
                            </span>
                        </el-col>
                        <el-col :span="16">
                            <el-slider v-model="led2Bright" :max="100"></el-slider>
                        </el-col>
                    </el-row>                                                                            
                </el-card>
            </el-col>
            <el-col :span="12"></el-col>            
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'led',
        data() {
            return {
                moduleSwitch: false,
                led1Switch: false,
                led2Switch: false,
                led1Interval: 0,
                led2Interval: 0,
                led1Bright: 100,
                led2Bright: 100,
            }
        },
        sockets: {
            openLight() {
                console.log()
            }
        },
        watch: {
            moduleSwitch(newVal) {
                this.led1Switch = this.led2Switch = newVal
                newVal ? this.enableModule() : this.disAbleModule()
            },
            led1Switch(newVal) {
                newVal ? this.turnOnLed(1) : this.turnOffLed(1)
            },
            led2Switch(newVal) {
                newVal ? this.turnOnLed(2) : this.turnOffLed(2)
            },
    	    led1Interval(newVal) {
        		this.$socket.emit('led1Blink',newVal)
    	    },
            led2Interval(newVal) {
                this.$socket.emit('led2Blink',newVal)
            }
        },
        mounted() {
        },
        methods: {
            enableModule() {
                this.$socket.emit('enableLedModule')
            },
            disAbleModule() {
                this.$socket.emit('disableLedModule')
            },
            turnOnLed(num) {
                this.$socket.emit('led' + num + 'TurnOn')
            },
            turnOffLed(num) {
                this.$socket.emit('led' + num + 'TurnOff')
            },
    	    adjustLedBright(num) {
                this.$socket.emit('led' + num + 'AdjustBright',this.led1Bright)
    	    }
        }
    }
</script>
<style scoped>
    .box-card {
        width: 400px;
    }
    .textCenter {
        text-align: center;
    }
</style>
