<!--
 * @Description: 查看班级信息
 * @Author: Wangyl
 * @Date: 2021-11-24 22:18:46
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-28 21:34:28
-->

<template>

  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>所带班级</span>
      </div>
    </template>
    <el-table
            :data="tableDate.filter(data => !tableDate || data.classesName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
    >
      <el-table-column prop="classesId" label="Id" v-if="isShow"></el-table-column>
      <el-table-column prop="classesNum" label="班级编号"></el-table-column>
      <el-table-column prop="classesName" label="班级名称"> </el-table-column>
      <el-table-column prop="classesAllNumber" label="人数限额"> </el-table-column>
      <el-table-column prop="classesNumber" label="当前人数">
        <template #default="scope">
          <span v-if="scope.row.classesNumber == 0" style="color: red">0</span>
          <span v-if="scope.row.classesNumber != 0" style="color: #20a0ff">{{scope.row.classesNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span v-if="scope.row.classesNumber == scope.row.classesAllNumber" style="color: red">已满</span>
          <span v-if="scope.row.classesNumber != scope.row.classesAllNumber" style="color: #20a0ff">未满</span>
        </template>
      </el-table-column>
      <el-table-column prop="grade.professional.college.collegeName" label="所属院系"> </el-table-column>
      <el-table-column prop="grade.professional.professionalName" label="所属专业"> </el-table-column>
      <el-table-column prop="grade.gradeName" label="所属年级"> </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="输入班级名称搜索" />
        </template>
        <template #default="scope">
          <el-button type="primary" plain @click="findStudent(scope.row.classesId)">查看学生</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>

  <el-dialog title="学生信息" v-model="studentShow" width="70%" center>
    <el-table
            :data="studentTable.filter(data => !studentSearch || data.studentName.toLowerCase().includes(studentSearch.toLowerCase()))"
            style="width: 100%"
    >
      <el-table-column prop="id" label="Id" v-if="isShow"></el-table-column>
      <el-table-column prop="studentNum" label="学号"></el-table-column>
      <el-table-column prop="studentName" label="姓名"> </el-table-column>
      <el-table-column prop="studentAge" label="年龄"> </el-table-column>
      <el-table-column prop="studentNational" label="民族"> </el-table-column>
      <el-table-column prop="studentSex" label="性别" width="100px;">
        <template #default="scope">
          <span v-if="scope.row.studentSex == 0" style="color: #20a0ff">男</span>
          <span v-if="scope.row.studentSex == 1" style="color: #1abc9c">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentCard" label="身份证号" width="170px;"> </el-table-column>
      <el-table-column prop="studentEmail" label="邮箱" width="170px;"> </el-table-column>
      <el-table-column prop="studentPhone" label="手机号" > </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="studentSearch" size="mini" placeholder="输入学生姓名搜索" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
  import request from "../utils/request";

  export default {
    name: "FindClasses",
    data(){
      return{
        search:'',
        tableDate:[],
        isShow:false,
        studentShow:false,
        studentTable:[],
        studentSearch:'',

        teacher:JSON.parse(sessionStorage.getItem("teacher")),
      }
    },
    methods:{
      findStudent(val){
        this.studentTable = []
        request.get('/api/student/findByClassesId',{
          params:{
            classesId:val
          }
        }).then(res=>{
          this.studentShow = true
          this.studentTable = res.data.list
        })
      },
      load(){
        request.get('/api/classes/findByTeacherId',{
          params:{
            teacherId:this.teacher.teacherId
          }
        }).then(res=>{
          this.tableDate= res.data
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
