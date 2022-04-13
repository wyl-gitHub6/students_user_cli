<!--
 * @Description: 学生在线学习室
 * @Author: Wangyl
 * @Date: 2021-11-20 14:50:22
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-04-13 22:41:38
-->

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
          <el-button type="info" plain style="margin-left: 15vw;">当前在线人数：{{number}}</el-button>
        </div>
        <br>
        <div class="bg-purple-light" style="border:1px solid #387eb0;height: 500px;">
          <el-scrollbar height="500px">
            <!--进入-->
            <p class="sysMsg"  v-for="item in intoMessage">
              {{ item }}
            </p>

            <div v-for="(item,index) in message">
              <div class="el-row" style="padding: 5px 0">
                <div class="el-col-24" :style="ids[index] == student.studentId?'text-align: right;':'text-align: left;'">
                  <span class="person">{{user[index]}}</span>
                  <p class="msg" :style="ids[index] == student.studentId?'background:#1abc9c;':'background:#ef8201;'">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <!--退出-->
            <p class="sysMsg" v-for="item in outMessage">
              {{ item }}
            </p>
          </el-scrollbar>
        </div>
        <br>
        <el-input v-model="text" placeholder="输入信息" class="el-input-group"></el-input>
        <el-button type="success" plain @click="send()" style="margin-left: 50px;">发送消息</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" style="height: 700px;"></div>
    </el-col>
  </el-row>

  <!--弹框-->
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
        intoMessage:[],
        outMessage:[],
        text:'',
        innerHTML:'',
        /*进入代表1  退出0*/
        count:0,
        /*用户列表*/
        patient_list:[],
        student:JSON.parse(sessionStorage.getItem("student")),
        username:'',
        user:[],
        ids:[],
        number:"0",
        model:false,
      }
    },
    methods: {

      load(){
        this.username = this.student.studentId+',学生 '+this.student.studentName
        this.intoWebSocket()
      },
      setMessageInnerHTML(innerHTML) {
        let _this = this;
        let res = JSON.parse(innerHTML)
        if (res.message !== ""){
          _this.message.push(res.message)
        }
        if (res.username != null){
          _this.user.push(res.username)
        }
        if (res.id != null){
          _this.ids.push(res.id)
        }
        if (res.data != null)
        _this.number = res.data
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
        this.intoMessage = []
        this.outMessage = []
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
        _this.text = ""
      },
      intoWebSocket() {
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
          //this.websocket = new WebSocket("ws://localhost:8080/websocket/" + this.username);
          this.websocket = new WebSocket("ws://192.168.153.133:9000/websocket/" + this.username);
        } else {
          alert('Not support websocket')
        }
        //连接发生错误的回调方法
        this.websocket.onerror = function () {
          _this.setMessageInnerHTML("error");
        };
        //连接成功建立的回调方法
        this.websocket.onopen = function (event) {
          _this.intoMessage.push('欢迎进入学习室')
        }
        //接收到消息的回调方法
        this.websocket.onmessage = function (event) {
          _this.setMessageInnerHTML(event.data);
        }
        //连接关闭的回调方法
        this.websocket.onclose = function () {
          _this.outMessage.push('退出学习室')
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          this.websocket.close();
        }
      },
    },
    created(){
      this.load()
    },
    /**
     * @Author: Wangyl
     * @msg: 监听页面离开  关闭连接 
     * @param {*} to
     * @param {*} from
     * @param {*} next
     * @return {*}
     */    
    beforeRouteLeave(to, from, next) {
      this.closeWebSocket()
      next()
    },
  }
</script>

<style>
  .bg-purple-light {
    background: #e5e9f2;
  }
  .el-input-group{
    width: 600px;
  }
  .msg{
    display:inline-block;
    margin: 0 0 5px 10px;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
    border: 1px solid transparent;
    font-weight: 800;
    font-size:80%
  }
  .sysMsg{
    width: 200px;
    text-align: center;
    margin: 10px auto;
    background: blueviolet;
    border-radius:10px;
    color:#fff;
    padding:5px 10px;
    border: 1px solid transparent;
    font-weight: 800;
    font-size:80%
  }
  .person{
    background:#3498db;
    border-radius:10px;
    padding:5px
  }

</style>
