<template>
   <div class="cameraContainer">
        <el-row :gutter="50">
            <el-col :span="16">
                <el-card>
                    <h1 slot="header" class="textAlign">
                        导航图
                    </h1>
                    <div id="map"></div>
                </el-card>                
            </el-col>
            <el-col :span="6">
                <el-card>
                    <h1 slot="header">
                        当前坐标
                    </h1>
                    <el-row>
                       <el-col :span="10">
                           当前经度
                       </el-col>                    
                       <el-col :span="10">
                           {{currLng}}
                       </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="10">
                           当前维度
                       </el-col>                    
                       <el-col :span="10">
                           {{currLat}}
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
                currLng: 0,
                currLat: 0
            }
        },
        mounted() {
            this.drawMap()
        },
        methods: {
            drawMap() {
                //目前基于浏览器定位，等gps模块安装好后会根据gps定位
                var that = this;
                var map = new BMap.Map("map");
                map.enableScrollWheelZoom(true);
                var point = new BMap.Point(114.02597366,22.54605355);
                map.centerAndZoom(point,12);

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        that.currLng = r.point.lng;
                        that.currLat = r.point.lat;
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
                //关于状态码
                //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
                //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
                //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
                //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
                //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
                //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
                //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
                //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
                //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
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
    #map {
        width: 100%;
        height: 60vh;
        border: 1px solid #777;
    }
</style>