## 前言
------

​	项目的灵感来自皮克斯动画《机器人总动员》的主角瓦力 [wall.e]。一个在末日的废墟中幸存并日复一日清洁着地球的可爱机器人。

​	这是一个十分有趣的物联网项目！它运行在基于 arm 架构的 raspiberry(树莓派）开发板上。借助性能出色的 node 和多平台兼容的硬件框架johnny-five，我们创建了这个项目。
	此项目包括了服务端到前端程序，开发语言选用 javascript , 功能上包括了视频监控，温度数据采集，远程遥控，距离测量，gps 定位等功能。
欢迎对物联网感兴趣的开发人员 Issues

## 技术栈

> * johnny-five
> * vue
> * express
> * chart.js
> * mongoDB

------

## 目标功能
- [x] 支持视频实时监控 (完成)
- [x] 支持摄像头转动（完成）
- [x] 支持手动控制电机运行（完成）
- [x] 支持温度采集（完成）
- [ ] 支持gps定位
- [ ] 支持距离探测
- [ ] 支持循迹功能
- [ ] 支持自由巡航

## 环境配置和依赖
-  树莓派开发板（ Raspberry Pi 3 Model B ）
-  ubuntu mate16.0.4 操作系统
-  node && npm
-  [MJPG-streamer](http://shumeipai.nxez.com/2017/05/14/raspberry-pi-mjpg-streamer-installation.html)

## 运行项目

### 项目下载

```shell
git clone https://github.com/zexiplus/WALL.E.git

cd WALL.E

npm install

```
### 开发模式运行web界面程序
```shell
npm run dev

// then open the browser at http://localhost:1234
```
### 生产环境运行web界面程序
```shell
npm run build

npm run local

//then open the browser at http://localhost:2999
```
### 运行服务端程序
```shell
npm run board
```


## 材料准备

| 模块             |   价格 |  数量  |
| -------------- | ---: | :--: |
| 树莓派开发板         | ￥200 |  1   |
| 履带底盘           | ￥350 |  1   |
| AD转换器          |  ￥15 |  1   |
| 红外传感器          |   ￥3 |  6   |
| SG90舵机         |  ￥15 |  1   |
| 树莓派摄像头         |  ￥80 |  1   |
| 电池             |  ￥30 |  1   |
| gps模块          |  ￥50 |  1   |
| MPU6050集成传感器模块 |  ￥20 |  1   |

## 接线说明

接线参考图如下

![接线图例](https://github.com/zexiplus/WALL.E/blob/master/static/line.png?raw=true)

目前接入电路的模块有电机驱动模块，mpu6050 集成模块，servo 伺服电机模块，摄像头模块。

电机驱动模块接收 io 引脚发出的高低电平，输出 12v 的电压从而驱动电机。

servo 伺服电机模块用来转动摄像头，摄像头固定于伺服电机支撑的转轴上。

mpu6050 模块可以感知周边温度，测量加速度等。

由于 gps 模块的通信信道与 wifi 冲突，暂时无法引入，gps 定位会在之后的版本中完成。

本项目树莓派 io 引脚采用 wiringPi 编码，如图

![raspi引脚图](https://github.com/zexiplus/WALL.E/blob/master/static/pinDefine.png?raw=true)

接线描述：

伺服电机的信号线接树莓派开发板  1引脚（wiringPi编码，下同）

mpu6050传感器SCL接树莓派开发板  3引脚，SDA接  2引脚

电机驱动模块四个输入端分别接树莓派 21，22，23，24 引脚

## 项目展示

[WALL.E](https://zexiplus.github.io/WALL.E)

![温度模块](https://github.com/zexiplus/WALL.E/blob/master/static/tem.gif?raw=true)

![视频模块](https://github.com/zexiplus/WALL.E/blob/master/static/camTurn2.gif?raw=true)

![control](https://github.com/zexiplus/WALL.E/blob/master/static/run.gif?raw=true)


![实物展示1](https://raw.githubusercontent.com/zexiplus/WALL.E/master/static/seven.jpg)
![实物展示2](https://raw.githubusercontent.com/zexiplus/WALL.E/master/static/five.jpg)


## 项目维护人
- [float](https://github.com/zexiplus)

## 协议
GPL
