<template>
  <el-header>
    <div class="header">
      <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              router
      >
        <el-menu-item index="#" style="font-size: 25px;">育知大学</el-menu-item>
        <el-menu-item index="#" style="margin-left: -90px;">
          <span v-html="$options.filters.formatDate(date)"></span>
        </el-menu-item>
        <el-menu-item index="/checkCourse" style="margin-left: -40px;">在线选课</el-menu-item>
        <el-menu-item index="/findCourse">我的选课</el-menu-item>
        <el-menu-item index="/findScore">查看成绩</el-menu-item>
        <el-menu-item index="/studentChat">学习探讨室</el-menu-item>
        <el-menu-item index="/studentInfo">学生信息</el-menu-item>
        <el-sub-menu :index="router">
          <template #title>
            <span @click="getRouter" style="color: #3498db;">{{student.studentName}}</span>
          </template>
          <el-menu-item style="margin:0" index="/student">账号信息</el-menu-item>
          <el-menu-item style="margin:0" index="/index" @click="logout()">注销</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

  </el-header>
</template>

<script>
  import { ElMessage } from 'element-plus';

  export default {
    name: "Header",
    data(){
      return{
        activeIndex: '/index',
        router:'',
        date:new Date(),

        student:JSON.parse(sessionStorage.getItem("student")),
      }
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000)
    },
    methods:{
      getRouter(){
        this.router = this.$route.path
      },
      logout(){
        sessionStorage.clear()
        this.$router.push("/")
        ElMessage.success({
          message: '注销成功!',
          type: 'success'
        });
      },
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '<span style="color: #1abc9c;margin:0 3px">年</span>' + MM + '<span style="color: #1abc9c;margin:0 3px">月</span>' + d + '<span style="color: #1abc9c;margin:0 3px">日</span> ' + h + ':' + m + ':' + s;
      }
    }
  }
</script>

<style scoped>
.header{
  width: 1500px;
  margin-left: 10vw;
}
.el-menu-item{
  font-family: 'Adobe 黑体 Std R',serif;
  margin-right: 5vw;
}

</style>
