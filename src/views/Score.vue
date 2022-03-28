<!--
 * @Description: 教师按必修课或选修课录入学生成绩
 * @Author: wyl
 * @Date: 2021-11-06 13:26:27
 * @LastEditors: wyl
 * @LastEditTime: 2022-03-26 23:33:24
-->
<template>
  <div>
    <el-row>
      <el-col
              :span="8"
              v-for="(item, index) in courseList"
              :key="item"
              :offset="2"
      >
        <el-card :body-style="{ padding: '10px' }">
          <img
                  :src=item.courseImg
                  class="image"
          />
          <div style="padding: 14px;">
            <el-tag>{{item.courseName}}</el-tag>
            <el-tag v-if="item.courseState == 0" style="margin-left: 1vw">必修课</el-tag>
            <el-tag v-if="item.courseState == 1" style="margin-left: 1vw">选修课</el-tag>
            <div style="margin-top: 2vh">
              <el-button type="primary" plain v-if="item.courseState == 0" @click="findClasses(item.courseId)">录入成绩</el-button>
              <el-button type="success" plain v-if="item.courseState == 0" @click="findScore(item.courseId)">查看成绩</el-button>
              <el-button type="primary" plain v-if="item.courseState == 1" @click="findStudent(item.courseId)">录入成绩</el-button>
              <el-button type="success" plain v-if="item.courseState == 1" @click="findScore(item.courseId)">查看成绩</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--查看班级弹框-->
    <el-dialog title="班级信息" v-model="classesShow" width="70%" center>
      <el-table
              :data="tableData.filter(data => !classesSearch || data.classesName.toLowerCase().includes(classesSearch.toLowerCase()))"
              style="width: 100%"
      >
        <el-table-column prop="id" label="Id" v-if="isShow"></el-table-column>
        <el-table-column prop="classesNum" label="班级编号"></el-table-column>
        <el-table-column prop="classesName" label="班级名称"> </el-table-column>
        <el-table-column prop="classesAllNumber" label="人数限额"> </el-table-column>
        <el-table-column prop="grade.professional.college.collegeName" label="所属院系"> </el-table-column>
        <el-table-column prop="grade.professional.professionalName" label="所属专业"> </el-table-column>
        <el-table-column prop="grade.gradeName" label="所属年级"> </el-table-column>
        <el-table-column prop="teacher.teacherName" label="教导教师"> </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="classesSearch" size="mini" placeholder="输入班级名称搜索" />
          </template>
          <template #default="scope">
            <el-button type="primary" @click="this.classesShow=false,findStudentByClasses(scope.row.classesId)" plain>查看学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--查看学生弹窗-->
    <el-dialog title="学生信息" v-model="studentShow" width="70%" center>

      <!--录入成绩弹窗-->
      <el-dialog
              width="25%"
              title="成绩录入"
              v-model="innerVisible"
              append-to-body
              center
      >
        <el-form :model="score"
                 :rules="rules"
                  ref="score">
          <el-form-item label="平时成绩" :label-width="formLabelWidth" prop="usualGrade">
            <el-input v-model="score.usualGrade" @input="test" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="考试成绩" :label-width="formLabelWidth" prop="testGrade">
            <el-input v-model="score.testGrade" @input="test" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最终成绩" :label-width="formLabelWidth">
            <el-input v-model="score.scoreGrade" autocomplete="off" readonly></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="entry('score')">确 定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </span>
        </template>
      </el-dialog>

      <el-table
              :data="studentTable.filter(data => !studentSearch || data.studentName.toLowerCase().includes(studentSearch.toLowerCase()))"
              style="width: 100%"
      >
        <el-table-column prop="id" label="Id" v-if="isShow"></el-table-column>
        <el-table-column prop="studentNum" label="学号"></el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="studentAge" label="年龄"> </el-table-column>
        <el-table-column prop="studentNational" label="民族"> </el-table-column>
        <el-table-column prop="studentSex" label="性别">
          <template #default="scope">
            <span v-if="scope.row.studentSex == 0" style="color: #20a0ff">男</span>
            <span v-if="scope.row.studentSex == 1" style="color: #1abc9c">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="studentCard" label="身份证号" width="170px;"> </el-table-column>
        <el-table-column prop="studentEmail" label="邮箱" width="170px;"> </el-table-column>
        <el-table-column prop="studentPhone" label="手机号" > </el-table-column>
        <el-table-column prop="classes.classesName" label="所在班级">
          <template #default="scope">
            <span v-if="scope.row.classes.classesName == null" style="color: #20a0ff">未分班</span>
            <span v-if="scope.row.classes.classesName != null" style="color: #1abc9c">{{scope.row.classes.classesName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="studentSearch" size="mini" placeholder="输入学生姓名搜索" />
          </template>
          <template #default="scope">
            <el-button type="primary" @click="innerVisible = true,score={usualGrade:0,testGrade:0,scoreGrade:0,studentId:'',courseId:''},goEntry(scope.row)" plain>录入成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 查看成绩弹窗 -->
    <el-dialog v-model="scoreShow" width="70%" center>
      <template #title>
        <div>
          <el-button type="primary" plain @click="exportFile(this.idStr,this.title)">导出成绩</el-button>
        </div>
      </template>
      <el-table id="pdfDom"
              :data="scoreTable.filter(data => !scoreSearch || data.student.studentName.toLowerCase().includes(scoreSearch.toLowerCase()))"
              style="width: 100%"
      >
        <el-table-column prop="student.studentNum" label="学生学号"> </el-table-column>
        <el-table-column prop="student.studentName" label="学生姓名"> </el-table-column>
        <el-table-column prop="course.courseName" label="课程名称" width="200px"> </el-table-column>
        <el-table-column prop="course.courseCredit" label="课程学分"> </el-table-column>
        <el-table-column prop="usualGrade" label="平时成绩">
          <template #default="scope">
            <span v-if="scope.row.usualGrade == null">未录入</span>
            <span v-if="scope.row.usualGrade != null">{{scope.row.usualGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="testGrade" label="考试成绩">
          <template #default="scope">
            <span v-if="scope.row.testGrade == null">未录入</span>
            <span v-if="scope.row.testGrade != null">{{scope.row.testGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreGrade" label="最终成绩">
          <template #default="scope">
            <span v-if="scope.row.scoreGrade == null">未录入</span>
            <span v-if="scope.row.scoreGrade != null">{{scope.row.scoreGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="credit" label="所得学分">
          <template #default="scope">
            <span v-if="scope.row.credit == null">未录入</span>
            <span v-if="scope.row.credit != null">{{scope.row.credit}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="scoreSearch" placeholder="输入学生姓名" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import request from '../utils/request'
  import { ElMessage } from 'element-plus';
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'

  export default {
    name: "Score",
    data(){
      return{
        teacher:JSON.parse(sessionStorage.getItem("teacher")),
        courseList:[],
        classesShow:false,
        studentShow:false,
        scoreShow:false,
        scoreTable:[],
        tableData:[],
        scoreSearch:'',
        classesSearch:'',
        studentSearch:'',
        isShow:false,
        studentTable:[],
        innerVisible:false,
        score:{usualGrade:0,testGrade:0,scoreGrade:0,studentId:'',courseId:''},
        formLabelWidth: '80px',
        courseId:'',
        studentId:'',
        classesId:'',
        /*状态  0 必修课录入  1选修课录入*/
        state:'',
        idStr:'pdfDom',
        title:'学生成绩',

        rules: {
          usualGrade: [
            { required: true, message: '不可为空', trigger: 'blur' },
            {
              validator:function (rule,value,callback) {
                if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)==false){
                  callback(new Error("请输入整数"));
                }else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          testGrade:[
            { required: true, message: '不可为空', trigger: 'blur' },
            {
              validator:function (rule,value,callback) {
                if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)==false){
                  callback(new Error("请输入整数"));
                }else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods:{
      /*导出成绩*/
      exportFile(idStr, title){
        html2Canvas(document.querySelector('#' + idStr), {
          // allowTaint: true,
          useCORS: true
        }).then(function(canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89
          //生成pdf的html页面高度
          let leftHeight = contentHeight
          //页面偏移
          let position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          // canvas.crossOrigin="anonymous";
          let pageData = canvas.toDataURL('image/jpeg', 1.0);

          let PDF = new JsPDF('', 'pt', 'a4')
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              //arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
              PDF.addImage(pageData, 'JPEG', 50, 50, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                //避免添加空白页
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
        })
      },
      /*查看班级*/
      findClasses(courseId){
        request.get('/api/arrang/findByCourseId',{
          params:{
            courseId:courseId
          }
        }).then(res=>{
          this.tableData = res.data
          this.courseId = courseId
          this.state = 0
          this.classesShow = true
        })
      },
      /*查看班级下的学生*/
      findStudentByClasses(classesId){
        request.get('/api/student/findByClasses',{
          params:{
            classesId:classesId,
            courseId:this.courseId
          }
        }).then(res=>{
          if (res.code == -1){
            ElMessage.error({
              message: res.message,
              type: 'error'
            });
            this.studentTable = []
            this.studentShow = false
            return false;
          }
          this.studentTable = res.data
          this.classesId = classesId
          this.studentShow = true
        })
      },

      /*查看选修课学生*/
      findStudent(courseId){
        request.get('/api/score/findByCourse',{
          params:{
            courseId:courseId
          }
        }).then(res=>{
          if (res.code == -1){
            ElMessage.error({
              message: res.message,
              type: 'error'
            });
            this.studentTable = []
            this.studentShow = false
            return false;
          }
          this.studentTable = res.data[0].studentList
          this.courseId = courseId
          this.state = 1
          this.studentShow = true
        })
      },
      goEntry(row){
        this.studentId = row.studentId
      },
      /*录入成绩*/
      entry(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.score.studentId = this.studentId
            this.score.courseId = this.courseId
            request.put('/api/score/entry',this.score).then(res=>{
              /*刷新选修课学生*/
              if (this.state == 1){
                this.findStudent(this.courseId)
              }
              /*刷新必修课学生*/
              if (this.state == 0){
                this.findStudentByClasses(this.classesId)
              }
              this.innerVisible = false
              ElMessage.success({
                message: res.message,
                type: 'success'
              });
            })
          } else {
            return false
          }
        })
      },
      /*查看成绩*/
      findScore(val){
        request.get('/api/score/findScoreByCourseId',{
          params:{
            courseId:val
          }
        }).then(res=>{
          if (res.code == -1){
            ElMessage.error({
              message: res.message,
              type: 'error'
            });
            this.scoreTable = []
            return
          }
          this.scoreTable = res.data
          this.scoreShow = true

        })
      },
      load(){
        request.get('/api/course/findByTeacherId',{
          params:{
            teacherId:this.teacher.teacherId
          }
        }).then(res=>{
          if (res.code == 0){
            this.courseList = res.data
          }else{
            ElMessage.error({
              message: res.message,
              type: 'error'
            });
            return
          }
        })
      }
    },
    computed:{
      /*计算最终成绩*/
      test(){
        this.score.scoreGrade = this.score.usualGrade*0.3+this.score.testGrade*0.7
      }
    },
    created() {
      this.load()
    }
  }
</script>

<style scoped>
  .image {
    width: 100%;
    height: 200px;
    display: block;
  }
  .el-card{
    width: 300px;
    height: 350px;
    /*margin-left: 55px;*/
    margin-left: 230px;
    margin-top: 25px;
    border: #74b9ff solid 1px;
  }
  *{
    font-family: "Adobe 黑体 Std R";
  }

</style>
