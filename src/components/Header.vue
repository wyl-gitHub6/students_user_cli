<template>
  <el-header>
    <div class="header">
      <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              router
      >
        <el-menu-item index="/index" style="font-size: 25px;">育知大学</el-menu-item>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/map">校园位置</el-menu-item>
        <el-menu-item index="#" @click="security()">教师中心</el-menu-item>
        <el-menu-item index="#1" @click="security()">学生中心</el-menu-item>
        <el-menu-item index="#2" @click="security()">学习探讨室</el-menu-item>
        <el-menu-item :index="router">
          <el-button type="primary" plain  @click="show = true,title='用户登录',state=false,getRouter()">登录</el-button>
        </el-menu-item>
      </el-menu>
    </div>

    <!--登录弹框-->
    <!--登录-->
    <el-dialog v-model="show" width="30%" center>
      <div class="el-div">
        <h2 style="margin-left: 210px;">{{title}}</h2>
      <el-form
              v-if="state == false"
              :model="roleForm"
              :rules="rules"
              ref="roleForm"
              label-width="80px"
              class="demo-ruleForm">
        <el-form-item prop="role" style="margin-left: 2vw;">
          <el-radio v-model="roleForm.role" label="1" border>教师</el-radio>
          <el-radio v-model="roleForm.role" label="2" border>学生</el-radio>
        </el-form-item>
        <el-form-item label="账号" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="roleForm.password"></el-input>
        </el-form-item>
          <el-link type="primary" style="margin-left: 7vw;font-size: 20px;" @click="title='重置密码',state=true">忘记密码？点击重置</el-link>
      <el-form-item style="margin-top: 1vh;margin-left: 3vw">
        <el-button type="success" @click="login('roleForm')">确 定</el-button>
        <el-button type="primary" @click="resetForm('roleForm')">重 置</el-button>
      </el-form-item>
      </el-form>

      <!--找回密码-->
      <el-form
              v-if="state"
              :model="roleForm"
              :rules="rules"
              ref="roleForm"
              label-width="80px"
              class="demo-ruleForm">
        <el-form-item prop="role" style="margin-left: 2vw;">
          <el-radio v-model="roleForm.role" label="1" border>教师</el-radio>
          <el-radio v-model="roleForm.role" label="2" border>学生</el-radio>
        </el-form-item>
        <el-form-item label="账号" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="roleForm.email" style="width: 210px;"></el-input>
          <el-button type="primary" style="margin-left: 20px;" @click="sendEmail()">发送</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="roleForm.code" style="width: 210px;"></el-input>
          <el-button style="margin-left: 20px;" @click="resetForm('roleForm')">重置</el-button>
        </el-form-item>
        <el-link type="primary" style="margin-left: 9vw;font-size: 20px;" @click="title='用户登录',state=false">返回登录</el-link>
        <el-form-item style="margin-top: 1vh;margin-left: 5vw">
          <el-button type="success" v-if="teacher.teacherPassword != ''" @click="go('roleForm')">确 定</el-button>
          <el-button type="success" v-if="student.studentPassword != ''" @click="to('roleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-dialog>

  </el-header>
</template>

<script>
  import request from "../utils/request";
  import { ElMessage } from 'element-plus';

  export default {
    name: "Header",
    data(){
      return{
        activeIndex: '/index',
        show:false,
        router:'',
        roleForm:{},
        title:'',
        state:true,
        teacher:{teacherPassword:''},
        student:{studentPassword:''},
        emailCode:'',

        rules: {
          role: [
            { required: true, message: '请选择身份', trigger: 'change' },
          ],
          name: [
            { required: true, message: '不可为空', trigger: 'change' },
          ],
          password: [
            { required: true, message: '不可为空', trigger: 'change' },
          ],
          email: [
            { required: true, message: '不可为空', trigger: 'change' },
          ],
          code: [
            { required: true, message: '不可为空', trigger: 'change' },
          ],
        },
      }
    },
    methods:{
      sendEmail(){
        if (this.roleForm.role == null || this.roleForm.role == ""){
          ElMessage.error({
            message: '请选择身份',
            type: 'error'
          });
          return
        }
        if (this.roleForm.email == null || this.roleForm.email == ""){
          ElMessage.error({
            message: '请输入绑定邮箱',
            type: 'error'
          });
          return
        }
        if (this.roleForm.role == 1){
          if (this.roleForm.name == null || this.roleForm.name == ""){
            ElMessage.error({
              message: '请输入职工编号',
              type: 'error'
            });
            return
          }
          request.get('/api/teacher/sendEmail',{
            params:{
              teacherNum:this.roleForm.name,
              emailAddress:this.roleForm.email
            }
          }).then(res=>{
            if (res.code == 0){
              ElMessage.success({
                message: res.message,
                type: 'success'
              });
              this.emailCode = res.data.code
              this.teacher = res.data
            }else{
              ElMessage.error({
                message: res.message,
                type: 'error'
              });
            }
          })
        }

        if (this.roleForm.role == 2){
          if (this.roleForm.name == null || this.roleForm.name == ""){
            ElMessage.error({
              message: '请输入学号',
              type: 'error'
            });
            return
          }
          request.get('/api/student/sendEmail',{
            params:{
              studentNum:this.roleForm.name,
              emailAddress:this.roleForm.email
            }
          }).then(res=>{
            if (res.code == 0){
              ElMessage.success({
                message: res.message,
                type: 'success'
              });
              this.emailCode = res.data.code
              this.student = res.data
            }else{
              ElMessage.error({
                message: res.message,
                type: 'error'
              });
            }
          })
        }

      },
      security(){
        if (this.student.studentPassword == '' && this.teacher.teacherPassword == ''){
          this.$confirm('要先登录哦, 是否继续?', '提示', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            this.show = true
            this.title='用户登录'
            this.state=false
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消登录',
            })
          })
        }
      },
      getRouter(){
        this.router = this.$route.path
      },
      login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.roleForm.role == 1){
              request.get('/api/teacher/login',{
                params:{
                  teacherNum:this.roleForm.name,
                  password:this.roleForm.password
                }
              }).then(res=>{
                if (res.code == 0){
                  ElMessage.success({
                    message: res.message,
                    type: 'success'
                  });
                  //vue中提供了使用cookie域和session域的使用
                  sessionStorage.setItem("teacher",JSON.stringify(res.data))
                  this.show = false
                  this.$router.push('/teacherHome')
                }else{
                  ElMessage.error({
                    message: res.message,
                    type: 'error'
                  });
                }
              })
            }else{
              request.get('/api/student/login',{
                params:{
                  studentNum:this.roleForm.name,
                  password:this.roleForm.password
                }
              }).then(res=>{
                if (res.code == 0){
                  ElMessage.success({
                    message: res.message,
                    type: 'success'
                  });
                  sessionStorage.setItem("student",JSON.stringify(res.data))
                  this.show = false
                  this.$router.push('/studentHome')
                }else{
                  ElMessage.error({
                    message: res.message,
                    type: 'error'
                  });
                }
              })
            }
          } else {
            return false
          }
        })
      },
      go(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.roleForm.code != this.emailCode){
              ElMessage.error({
                message: '验证码错误！',
                type: 'error'
              });
              return ;
            }
            this.teacher.teacherPassword = '123'
            request.put('/api/teacher/update',this.teacher).then(res=>{
              if (res.code == 0){
                ElMessage.success({
                  message: '密码重置成功',
                  type: 'success'
                });
                this.teacher = {teacherPassword: ''}
                this.roleForm = {}
              }
            })

          }else{
            return false
          }
        })
      },
      to(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.roleForm.code != this.emailCode){
              ElMessage.error({
                message: '验证码错误！',
                type: 'error'
              });
              return ;
            }
            this.student.studentPassword = '123'
            request.put('/api/student/update',this.student).then(res=>{
              if (res.code == 0){
                ElMessage.success({
                  message: '密码重置成功',
                  type: 'success'
                });
                this.student = {studentPassword: ''}
                this.roleForm = {}
              }
            })

          }else{
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
    margin-right: 7vw;
  }

  .el-input{
    width: 300px;
  }

  .el-div{
    width: 500px;
    margin: auto;
    background: rgba( 255, 255, 255, 0.15 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2.5px );
    -webkit-backdrop-filter: blur( 2.5px );
    border-radius: 90px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }

  .demo-ruleForm{
    margin-left: 35px;
    margin-top: 15px;
  }

</style>
