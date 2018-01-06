<template>
   <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        温度记录
                    </h1>
                    <el-row :gutter="20" type="flex" justify="end">
                        <el-col :span="6" class="alignLeft">
                            <el-input-number v-model="num" size="mini" :min="1" :max="30" label="">

                            </el-input-number>
                        </el-col>
                        <el-col :span="4">
                            <el-button size="mini" round @click="getTemperature(num)">获取温度数据</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="canvasAlign">
                            <canvas ref="temperatureChart" width="600" height="400"></canvas>
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
                        <el-col :span="20">
                            <canvas ref="thermometer" width="150" height="400"></canvas>
                        </el-col>
                        <el-col :span="4">
                            <h3> {{currTemperature}}</h3>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-button size="mini" round @click="updateTemperature">更新温度</el-button>
                        </el-col>
                        <el-col :offset="6" :span="8">
                            <el-button size="mini" round @click="saveTemperature(currTemperature)">存储温度</el-button>
                        </el-col>

                    </el-row>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {api} from '&c'
    export default {
        name: 'thermometer',
        data() {
            return {
                num: 5,
                currTemperature: 0
            }
        },
        computed: {
            serverIp() {
                return this.$store.state.serverAddress.join('')
            }
        },
        mounted() {
            this.updateTemperature()
            this.drawThermometer()
            this.drawThermometerLine(this.currTemperature)
            this.drawChart()
            this.getTemperature(this.num)
        },
        sockets: {
            changeT(data) {
                this.currTemperature = data
                this.drawThermometerLine(data)
            }
        },
        methods: {
            updateTemperature() {
                this.$socket.emit('updateTemperature')
            },
            saveTemperature(num) {
                var date = new Date(),
                    time = date.getFullYear() + '-' +( 1 + date.getMonth()) + '-' + date.getDate() + '-' + date.getHours() + '/' + date.getMinutes() + '/' + date.getSeconds()
                return this.$http.post(this.serverIp + api.temperture.saveTemperature,{
                    temperature: num,
                    time: time
                })
            },
            getTemperature(num) {
                return this.$http.get(this.serverIp + api.temperture.getTemperature,{
                    params: {
                        total: num
                    }
                }).then(res => {
                    var arr = res.body.map(item => JSON.parse(item)),
                        labels = [],
                        values = [];
                    console.log(arr)
                    arr.forEach(item => {
                        labels.push(item.label)
                        values.push(item.val)
                    })
                    this.tempLabels = labels
                    this.tempData = values
                    this.drawChart()
                })
            },
            //绘制温度计
            drawThermometer() {
                var ctx = this.$refs.thermometer.getContext('2d')
                ctx.beginPath()
                ctx.moveTo(50,320)
                ctx.lineTo(50,50)
                ctx.lineWidth = 5
                ctx.lineCap = 'round'
                ctx.strokeStyle = '#ccc'
                ctx.stroke()
                ctx.beginPath()
                ctx.arc(70,50,20,0,Math.PI,true)
                ctx.fillStyle = '#000'
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(90,50)
                ctx.lineTo(90,320)
                ctx.closePath()
                ctx.stroke()
                ctx.beginPath()
                ctx.arc(70,340,28.28,-0.25*Math.PI,-0.75*Math.PI,false)
                ctx.stroke()
                ctx.closePath()
            },
            //绘制温度计的度数线
            drawThermometerLine(T) {
                var ctx    = this.$refs.thermometer.getContext('2d'),
                    height = (T/100) * 290,
                    green  = Math.floor((1 - T/100) * 255),
                    red    = Math.floor(195 + (T/100) * 60)

                //绘制下方小圆点，根据温度改变颜色
                ctx.beginPath()
                ctx.arc(70,340,20,0,2*Math.PI,false)
                ctx.closePath()
                ctx.fillStyle = `rgb(${red},${green},0)`
                ctx.fill()
                ctx.closePath();

                ctx.beginPath()
                ctx.moveTo(70,340)
                ctx.lineTo(70,340 - height)
                ctx.lineWidth = 10
                ctx.strokeStyle = `rgb(${red},${green},0)`
                ctx.lineCap = 'round'
                ctx.stroke()
            },
            drawChart() {
                var ctx = this.$refs.temperatureChart.getContext('2d')
                new this.$Chart(ctx,{
                    type: 'line',
                    data: {
                        labels: this.tempLabels,
                        datasets: [{
                            label: '温度',
                            data: this.tempData,
                            backgroundColor : 'rgba(255, 99, 132, 0.7)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        }
                    }
                })
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
    .alignLeft {
        text-align: right
    }
</style>
