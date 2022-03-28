<!--
 * @Description: 地图
 * @Author: Wangyl
 * @Date: 2021-11-20 14:08:20
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-26 23:51:27
-->

<template>
  <div id="all">
    <el-input
        type="text"
        id="suggestId"
        name="address_detail"
        placeholder="请输入想查看地址"
        v-model="address_detail"
        class="in"
       >
    </el-input>
    <div id="map"></div>
  </div>
</template>
<script>

export default {
  name: 'AddMap',
  data(){
    return {
      address_detail: null, //详细地址
      userLocation: {lng: "", lat: ""},
    }
  },
  methods: {
    nextTick() {

      let th = this
      // 创建Map实例
      let map = new BMap.Map("map");
      // 初始化地图,设置中心点坐标，
      let point = new BMap.Point(118.923837, 42.248231); // 创建点坐标，汉得公司的经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "suggestId"
            , "location": map
          })
      let myValue
      ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        let _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.address_detail = myValue
        setPlace();
      });

      function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
          th.userLocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(th.userLocation, 18);
          map.addOverlay(new BMap.Marker(th.userLocation));
        }

        let local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度)
        map.addEventListener("click", function (e) {
          console.log(e)
        })
      }

    },
  },
  mounted() {
    this.nextTick()
  }

}
</script>
<style scoped>
#map{
  width: 900px;
  height: 650px;
  font-family: "微软雅黑";
  border:1px solid green;
  float: right;
  margin: 20px;
}
.in{
  width: 400px;
  margin-top: 50px;
  margin-left: 50px;
}
</style>

