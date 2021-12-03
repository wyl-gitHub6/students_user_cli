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
        <el-menu-item index="/score">成绩录入</el-menu-item>
        <el-menu-item index="/statistical">成绩统计</el-menu-item>
        <el-menu-item index="/findClasses">所带班级</el-menu-item>
        <el-menu-item index="/teacherChat">学习探讨室</el-menu-item>
        <el-menu-item index="/teacherInfo">教师信息</el-menu-item>
        <el-sub-menu :index="router">
          <template #title>
            <span @click="getRouter" style="color: #3498db;font-size: 20px;">{{teacher.teacherName}}</span>
          </template>
          <el-menu-item style="margin:0" index="/teacher">账号信息</el-menu-item>
          <el-menu-item style="margin:0" index="/index" @click="logout()">注销</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

  </el-header>
</template>

<script>
  import { ElMessage } from 'element-plus';

  export default {
    name: "TeacherHeader",
    data(){
      return{
        activeIndex: '/index',
        router:'',

        teacher:JSON.parse(sessionStorage.getItem("teacher")),
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
