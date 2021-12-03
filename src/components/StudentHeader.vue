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
        <el-menu-item index="/checkCourse">在线选课</el-menu-item>
        <el-menu-item index="/findCourse">我的选课</el-menu-item>
        <el-menu-item index="/findScore">查看成绩</el-menu-item>
        <el-menu-item index="/studentChat">学习探讨室</el-menu-item>
        <el-menu-item index="/studentInfo">学生信息</el-menu-item>
        <el-sub-menu :index="router">
          <template #title>
            <span @click="getRouter" style="color: #3498db;font-size: 20px;">{{student.studentName}}</span>
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

        student:JSON.parse(sessionStorage.getItem("student")),
      }
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
  }
</script>

<style scoped>
.header{
  width: 1500px;
  margin-left: 10vw;
}
.el-menu-item{
  font-family: 'Adobe 黑体 Std R';
  margin-right: 6vw;
}


</style>
