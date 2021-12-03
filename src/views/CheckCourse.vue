<template>

  <el-steps :active=num align-center>
    <el-step
            title="步骤1"
            description="浏览课程信息"
    ></el-step>
    <el-step
            title="步骤2"
            description="注：每位同学每学期只能学习三门选修课程！！!"
    ></el-step>
    <el-step
            title="步骤3"
            description="选择课程点击学习"
    ></el-step>
  </el-steps>

  <el-carousel :interval="5000" type="card" height="550px">
    <el-carousel-item v-for="item in courseList" :key="item">
      <el-tooltip
              class="item"
              effect="dark"
              content="快来学习我吧~~"
              placement="top"
      >
      <el-card shadow="hover" :body-style="{ padding: '10px'}">
        <img :src="item.courseImg" class="image" />
        <h2>{{item.courseName}}</h2>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-tag>课程周期：{{ item.startTime }} - {{item.endTime}}</el-tag>
          </el-col>
          <el-col :span="12" :offset="6">
            <el-tag>授课教师：{{item.teacher.teacherName}}</el-tag>
          </el-col>
          <el-col :span="12" :offset="6">
            <el-tag>限制人数：{{item.number}}</el-tag>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-button type="primary" plain style="margin-left: 110px;" @click="check(item.courseName,item.courseId)">学习</el-button>
      </el-card>
      </el-tooltip>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import request from "../utils/request";
  import { ElMessage } from 'element-plus';

  export default {
    name: "CheckCourse",
    data(){
      return{
        currentDate: new Date(),
        courseList:[],
        num:1,
        student:JSON.parse(sessionStorage.getItem("student")),
      }
    },
    methods:{
      check(courseName,courseId){
        this.$confirm('确认学习<<'+courseName+'>>这门课程吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         request.get('/api/score/insert',{
           params:{
             studentId:this.student.studentId,
             courseId:courseId
           }
         }).then(res=>{
           if (res.code == 0){
             ElMessage.success({
               message: res.message,
               type: 'success'
             });
           }else{
             ElMessage.error({
               message: res.message,
               type: 'error'
             });
           }
         })
        })
      },
      load(){
        request.get('/api/course/findByCourseState',{
          params:{
            courseState:1
          }
        }).then(res=>{
          this.courseList = res.data
        })
      },
    },
    mounted() {
      setInterval(() => {
        if (this.num < 4){
          this.num++;
        }
        if (this.num == 4){
          this.num = 1;
        }
      }, 2000)
    },
    created() {
      this.load()
    }
  }


</script>

<style scoped>

  .el-card{
    width: 300px;
    height: 500px;
    /*margin-left: 55px;*/
    margin-left: 230px;
    margin-top: 25px;
    border: #74b9ff solid 1px;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .el-tag{
    margin-left: 3px;
    margin-top: 5px;
  }
</style>
