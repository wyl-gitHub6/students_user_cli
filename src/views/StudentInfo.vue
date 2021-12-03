<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>学生信息</span>
        <el-button type="primary" plain @click="model = true">编辑信息</el-button>
      </div>
    </template>
    <el-descriptions column="3" border>
      <el-descriptions-item label="姓名" label-align="right" align="center">
        {{student.studentName}}
      </el-descriptions-item>
      <el-descriptions-item label="年龄" label-align="right" align="center">
        {{student.studentAge}}
      </el-descriptions-item>
      <el-descriptions-item label="性别" label-align="right" align="center">
        <span v-if="student.studentSex == 0">男</span>
        <span v-if="student.studentSex == 1">女</span>
      </el-descriptions-item>
      <el-descriptions-item label="民族" label-align="right" align="center">
        {{student.studentNational}}</el-descriptions-item>
      <el-descriptions-item label="身份证号" label-align="right" align="center">
        {{student.studentCard}}</el-descriptions-item>
      <el-descriptions-item label="手机号" label-align="right" align="center">
        {{student.studentPhone}}</el-descriptions-item>
      <el-descriptions-item label="邮箱" label-align="right" align="center">
        {{student.studentEmail}}</el-descriptions-item>
      <el-descriptions-item label="院系" label-align="right" align="center">
        {{college}}</el-descriptions-item>
      <el-descriptions-item label="专业" label-align="right" align="center">
        {{professional}}</el-descriptions-item>
      <el-descriptions-item label="年级" label-align="right" align="center">
        {{grade}}</el-descriptions-item>
      <el-descriptions-item label="班级" label-align="right" align="center">
        {{classes}}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <!--弹框开始-->
  <div>
    <el-dialog title="编辑信息" v-model="model" width="25%" center>
      <el-form :label-position="labelPosition" label-width="80px" :model="student_form"
               :rules="rules"
               ref="ruleForm">

        <el-input v-model="student_form.studentId" v-if="isShow"></el-input>
        <el-form-item label="学号" prop="studentNum" :rules="[
                { required: true, message: '不能为空'},
                { type: 'number', message: '学号为数字值'}]">
          <el-input v-model.number="student_form.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input v-model="student_form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="studentAge" :rules="[
                { required: true, message: '不能为空'},
                { type: 'number', message: '年龄为数字值'}]">
          <el-input v-model.number="student_form.studentAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="studentSex">
          <el-radio v-model="student_form.studentSex" :label="0">男</el-radio>
          <el-radio v-model="student_form.studentSex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="studentNational">
          <el-input v-model="student_form.studentNational"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="studentCard">
          <el-input v-model="student_form.studentCard"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="studentPhone">
          <el-input v-model="student_form.studentPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="studentEmail">
          <el-input v-model="student_form.studentEmail"></el-input>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="model = false">取 消</el-button>
          <el-button type="primary" @click="edit('ruleForm')">修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import request from "../utils/request";
  import { ElMessage } from 'element-plus';

  export default {
    name: "StudentInfo",
    data() {
      return {
        stu:JSON.parse(sessionStorage.getItem("student")),
        college:'',
        professional:'',
        grade:'',
        classes:'',

        student:{},
        student_form:{},
        labelPosition:'right',
        model:false,
        isShow:false,

        rules:{
          studentName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          studentSex:[
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          studentCard: [
            { required: true, message: '请按照身份证格式输入', trigger: 'blur' },
            {
              validator:function (rule,value,callback) {
                if (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)==false){
                  callback(new Error("身份证格式错误"));
                }else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          studentPhone: [
            { required: true,
              message: '请输入联系方式',
              trigger: 'blur'
            },
            {
              validator:function (rule,value,callback) {
                if (/^1[3456789]\d{9}$/.test(value)==false){
                  callback(new Error("手机号格式错误"));
                }else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          studentNational:[
            { required: true, message: '请输入民族', trigger: 'blur' },
          ],
          studentEmail:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ]

        },
      }
    },
    methods:{
      load() {
        this.college = this.stu.classes.grade.professional.college.collegeName
        this.professional = this.stu.classes.grade.professional.professionalName
        this.grade = this.stu.classes.grade.gradeName
        this.classes = this.stu.classes.classesName

        request.get('/api/student/findById',{
          params:{
            studentId:this.stu.studentId
          }
        }).then(res=>{
          if (res.code == 0){
            this.student_form = res.data
            this.student = res.data
          }else{
            console.log(res.message)
          }
        })
      },
      edit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.model = false
            request.put('/api/student/update',this.student_form).then(res=>{
              if(res.code == 0){
                ElMessage.success({
                  message: res.message,
                  type: 'success'
                });
                this.load();
              }else{
                ElMessage.error({
                  message: res.message,
                  type: 'error'
                });
              }
            })
          } else {
            ElMessage.error({
              message: "请添加完整信息",
              type: 'error'
            });
            return false
          }
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
  .el-descriptions{
    font-size: 25px;
  }
.el-button{
  margin-left: 5%;
}
</style>
