<!--
 * @Description: 教师信息
 * @Author: Wangyl
 * @Date: 2021-11-27 12:30:01
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-27 00:00:38
-->

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>教师信息</span>
        <el-button type="primary" plain @click="model = true,toEdit()">编辑信息</el-button>
      </div>
    </template>
    <el-descriptions column="3" border>
      <el-descriptions-item label="姓名" label-align="right" align="center">
        {{teacher.teacherName}}
      </el-descriptions-item>
      <el-descriptions-item label="教工编号" label-align="right" align="center">
        {{teacher.teacherNum}}
      </el-descriptions-item>
      <el-descriptions-item label="年龄" label-align="right" align="center">
        {{teacher.teacherAge}}
      </el-descriptions-item>
      <el-descriptions-item label="性别" label-align="right" align="center">
        <span v-if="teacher.teacherSex == 0">男</span>
        <span v-if="teacher.teacherSex == 1">女</span>
      </el-descriptions-item>
      <el-descriptions-item label="民族" label-align="right" align="center">
        {{teacher.teacherNational}}</el-descriptions-item>
      <el-descriptions-item label="身份证号" label-align="right" align="center">
        {{teacher.teacherCard}}</el-descriptions-item>
      <el-descriptions-item label="手机号" label-align="right" align="center">
        {{teacher.teacherPhone}}</el-descriptions-item>
      <el-descriptions-item label="邮箱" label-align="right" align="center">
        {{teacher.teacherEmail}}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <!--弹框开始-->
  <div>
    <el-dialog title="编辑信息" v-model="model" width="25%" center>
      <el-form :label-position="labelPosition" label-width="80px" :model="teacher_form"
               :rules="rules"
               ref="ruleForm">

        <el-input v-model="teacher_form.teacherId" v-if="isShow"></el-input>
        <el-form-item label="职工编号" prop="teacherNum">
          <el-input v-model="teacher_form.teacherNum" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="teacher_form.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="teacherAge" :rules="[
                { required: true, message: '不能为空'},
                { type: 'number', message: '年龄必须为数字值'}]">
          <el-input v-model.number="teacher_form.teacherAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="teacherSex">
          <el-radio v-model="teacher_form.teacherSex" :label="0">男</el-radio>
          <el-radio v-model="teacher_form.teacherSex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="民族" prop="teacherNational">
          <el-input v-model="teacher_form.teacherNational"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="teacherCard">
          <el-input v-model="teacher_form.teacherCard"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="teacherPhone">
          <el-input v-model="teacher_form.teacherPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="teacherEmail">
          <el-input v-model="teacher_form.teacherEmail"></el-input>
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
    name: "TeacherInfo",
    data() {
      return {
        tea:JSON.parse(sessionStorage.getItem("teacher")),
        teacher:{},

        rules:{
          teacherName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          teacherSex:[
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          teacherCard: [
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
          teacherPhone: [
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
          teacherNational:[
            { required: true, message: '请输入民族', trigger: 'blur' },
          ],
          teacherEmail:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ]

        },
        teacher_form:{},
        labelPosition:'right',
        model:false,
        isShow:false,
      }
    },
    methods:{
      load() {
        request.get('/api/teacher/findById',{
          params:{
            teacherId:this.tea.teacherId
          }
        }).then(res=>{
          if (res.code == 0){
            this.teacher = res.data
          }else{
            console.log(res.message)
          }
        })
      },
      toEdit(){
         request.get('/api/teacher/findById',{
          params:{
            teacherId:this.tea.teacherId
          }
        }).then(res=>{
          if (res.code == 0){
            this.teacher_form = res.data
          }else{
            console.log(res.message)
          }
        })
      },
      edit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.model = false
            request.put('/api/teacher/update',this.teacher_form).then(res=>{
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
