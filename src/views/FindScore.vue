<!--
 * @Description: 
 * @Author: Wangyl
 * @Date: 2021-11-21 11:26:55
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-26 23:48:25
-->

<template>

  <el-button style="margin: 1%" type="primary" plain @click="exportFile(this.idStr,this.title)">导出成绩</el-button>
  <div id="pdfDom">
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>必修课成绩</span>
      </div>
    </template>
    <el-table
            :data="bTable.filter(data => !bSearch || data.course.courseName.toLowerCase().includes(bSearch.toLowerCase()))"
            style="width: 100%"
    >
      <el-table-column prop="course.courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="course.courseCredit" label="课程学分"> </el-table-column>
      <el-table-column prop="usualGrade" label="平时成绩">
        <template #default="scope">
          <span v-if="scope.row.usualGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.usualGrade != null">{{scope.row.usualGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="testGrade" label="考试成绩">
        <template #default="scope">
          <span v-if="scope.row.testGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.testGrade != null">{{scope.row.testGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="scoreGrade" label="最终成绩">
        <template #default="scope">
          <span v-if="scope.row.scoreGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.scoreGrade != null">{{scope.row.scoreGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="所得学分">
        <template #default="scope">
          <span v-if="scope.row.credit == 0" style="color: #e74c3c;">0</span>
          <span v-if="scope.row.credit == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.credit != null && scope.row.credit != 0" style="color: #">{{scope.row.credit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="bSearch" placeholder="输入必修课搜索" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-divider></el-divider>

  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>选修课成绩</span>
      </div>
    </template>
    <el-table
            :data="xTable.filter(data => !xSearch || data.course.courseName.toLowerCase().includes(xSearch.toLowerCase()))"
            style="width: 100%"
    >
      <el-table-column prop="course.courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="course.courseCredit" label="课程学分"> </el-table-column>
      <el-table-column prop="usualGrade" label="平时成绩">
        <template #default="scope">
          <span v-if="scope.row.usualGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.usualGrade != null">{{scope.row.usualGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="testGrade" label="考试成绩">
        <template #default="scope">
          <span v-if="scope.row.testGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.testGrade != null">{{scope.row.testGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="scoreGrade" label="最终成绩">
        <template #default="scope">
          <span v-if="scope.row.scoreGrade == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.scoreGrade != null">{{scope.row.scoreGrade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="所得学分">
        <template #default="scope">
          <span v-if="scope.row.credit == 0" style="color: #e74c3c;">0</span>
          <span v-if="scope.row.credit == null" style="color: #9b59b6;">未录入</span>
          <span v-if="scope.row.credit != null && scope.row.credit != 0">{{scope.row.credit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="xSearch" placeholder="输入选修课搜索" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<script>
  import request from "../utils/request";
  import {ElMessage} from "element-plus";
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  export default {
    name: "FindScore",
    data() {
      return {
        bTable:[],
        xTable: [],
        bSearch: '',
        xSearch: '',
        idStr:'pdfDom',
        title:'学生成绩',

        student:JSON.parse(sessionStorage.getItem("student")),
      }
    },
    methods:{
      // 导出成绩
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
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
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
      load(){
        if (this.student.classes.classesId == null || this.student.classes.classesId == ''){
          ElMessage.error({
            message: '尚未分班，暂无数据！',
            type: 'error'
          });
        }else{
          request.get('/api/score/findScore',{
            params:{
              classesId:this.student.classes.classesId,
              studentId:this.student.studentId
            }
          }).then(res=>{
            if (res.code == 0){
              this.bTable = Object.values(res.data)[0]
              this.xTable = Object.values(res.data)[1]
            }else{
              ElMessage.error({
                message: res.message,
                type: 'error'
              });
            }
          })
        }

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
