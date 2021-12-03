<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <input  v-if="show" type="text" v-model="username">
        <br>
        <div>
          <el-button type="primary" plain @click="conectWebSocket()" style="margin-left: 30px;">进入学习室</el-button>
          <el-button type="danger" plain @click="closeWebSocket()" style="margin-left: 30px;">退出学习室</el-button>
        </div>
        <br>
        <div class="bg-purple-light" style="border:1px solid #387eb0;height: 500px;">
          <el-scrollbar height="500px">
            <p class="btn" v-for="item in message">{{ item }}</p>
          </el-scrollbar>
        </div>
        <br>
        <el-input v-model="text" placeholder="输入信息" class="el-input-group"></el-input>
        <el-button type="success" plain @click="send()" style="margin-left: 30px">发送消息</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" style="height: 700px;"></div>
    </el-col>
  </el-row>
</template>

<script>
  import {ElMessage} from 'element-plus';
  export default {
    name: "StudentChat",
    data(){
      return{
        show:false,
        websocket:'',
        message:[],
        text:'',
        innerHTML:'',
        count:0,/*进入代表1  退出0*/
        patient_list:[],
        username:JSON.parse(sessionStorage.getItem("student")).studentName,
      }
    },
    methods: {
      setMessageInnerHTML(innerHTML) {
        let _this = this;
        _this.message.push(innerHTML)
      },
      //关闭连接
      closeWebSocket() {
        if (this.count == 0){
          ElMessage.warning({
            message: '快进来探讨学习吧~',
            type: 'warning',
          })
          return
        }
        this.count--
        this.websocket.close();
      },
      //发送消息
      send() {
        let _this = this;
        if (_this.count == 0){
          ElMessage.warning({
            message: '要先进入学习室哦~',
            type: 'warning',
          })
          return
        }
        if (_this.text == ""){
          ElMessage.warning({
            message: '不能发送空白信息哦~',
            type: 'warning',
          })
          return
        }
        this.websocket.send(_this.text);
      },
      conectWebSocket() {
        let _this = this;

        if (this.count != 0){
          ElMessage.warning({
            message: '已进入学习室~',
            type: 'warning',
          })
          return
        }
        this.count++
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          this.websocket = new WebSocket("ws://localhost:8080/websocket/" + this.username);
        } else {
          alert('Not support websocket')
        }
        //连接发生错误的回调方法
        this.websocket.onerror = function () {
          _this.setMessageInnerHTML("error");
        };
        //连接成功建立的回调方法
        this.websocket.onopen = function (event) {
          _this.message.push('欢迎进入学习室')
        }
        //接收到消息的回调方法
        this.websocket.onmessage = function (event) {
          _this.setMessageInnerHTML(event.data);
        }
        //连接关闭的回调方法
        this.websocket.onclose = function () {
          _this.message.push('退出学习室')
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          this.websocket.close();
        }
      },

    }
  }
</script>

<style>
  .bg-purple-light {
    background: #e5e9f2;
  }
  .el-input-group{
    width: 330px;
    margin-left: 260px;
  }
  .btn{
    width: 200px;
    padding:6px;
    background-color: #428bca;
    border-color: #357ebd;
    color: #fff;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -khtml-border-radius: 10px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    font-weight: 800;
    font-size:80%
  }
</style>
