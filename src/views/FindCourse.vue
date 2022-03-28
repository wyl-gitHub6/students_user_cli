<!--
 * @Description: 查看课程信息
 * @Author: Wangyl
 * @Date: 2021-11-21 20:50:57
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-28 21:34:43
-->

<template>

  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>我的选课</span>
      </div>
    </template>
    <el-table
            :data="tableList.filter(data => !search || data.course.courseName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
    >
      <el-table-column prop="course.courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="course.courseCredit" label="课程学分"> </el-table-column>
      <el-table-column prop="course.courseDesc" label="课程描述"> </el-table-column>
      <el-table-column prop="course.startTime" label="开课日期"> </el-table-column>
      <el-table-column prop="course.endTime" label="结束日期"> </el-table-column>
      <el-table-column prop="state" label="选课状态">
        <template #default="scope">
          <span v-if="scope.row.state == 0" style="color: #20a0ff">已选择</span>
          <span v-if="scope.row.state == 1" style="color: red">已取消</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="输入选修课搜索" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
  import request from "../utils/request";
  import {ElMessage} from "element-plus";

  export default {
    name: "FindCourse",
    data() {
      return {
        tableList:[],
        search: '',

        student:JSON.parse(sessionStorage.getItem("student")),
      }
    },
    methods:{
      load(){
        request.get('/api/score/findCourse',{
          params:{
            studentId:this.student.studentId
          }
        }).then(res=>{
          this.tableList = res.data
        })
      },
    },
    created() {
      this.load()
    }
  }
</script>

<style scoped>
  *{
    font-family: "Adobe 黑体 Std R";
  }
</style>
