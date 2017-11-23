<template>
   <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        温度记录
                    </h1>
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
                currTemperature: 10
            }
        },
        mounted() {
            this.drawThermometer()
            this.drawThermometerLine(this.currTemperature)
            this.drawChart()
        },
        methods: {
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
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [{
                            label: '温度',
                            data: [12, 19, 30, 45, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
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
</style>