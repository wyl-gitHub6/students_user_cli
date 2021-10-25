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
        <el-menu-item index="/index" style="margin-left: 7vw;">首页</el-menu-item>
        <el-menu-item index="3" style="margin-left: 3vw;">校园概括</el-menu-item>
        <el-menu-item index="4" style="margin-left: 3vw;">处理中心</el-menu-item>
        <el-menu-item index="5" style="margin-left: 3vw;">校园位置</el-menu-item>
        <el-sub-menu index="6" style="margin-left: 3vw;">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/checkCourse" style="margin-left: 3vw;">选课</el-menu-item>
        <el-menu-item index="4" style="margin-left: 3vw;">订单管理</el-menu-item>
        <el-menu-item style="margin-left: 6vw;" :index=router v-if="student==null && teacher==null">
          <el-button type="primary" plain  @click="show = true,title='用户登录',state=false,getRouter()">登录</el-button>
        </el-menu-item>
        <el-sub-menu :index=router v-if="null != student || null != teacher">
          <template #title>
            <span v-if="null != student" @click="getRouter" style="color: #3498db;font-size: 20px;">{{student.studentName}}</span>
            <span v-if="null != teacher" @click="getRouter" style="color: #3498db;font-size: 20px;">{{teacher.teacherName}}</span>
          </template>
          <el-menu-item index="2-1">个人信息</el-menu-item>
          <el-menu-item index="/index" @click="logout()">注销</el-menu-item>
        </el-sub-menu>
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
          <el-input v-model="roleForm.password"></el-input>
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
        <el-form-item label="邮箱" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="password">
          <el-input v-model="roleForm.password"></el-input>
        </el-form-item>
        <el-link type="primary" style="margin-left: 9vw;font-size: 20px;" @click="title='用户登录',state=false">返回登录</el-link>
        <el-form-item style="margin-top: 1vh;margin-left: 3vw">
          <el-button type="success" @click="login('roleForm')">确 定</el-button>
          <el-button type="primary" @click="resetForm('roleForm')">重 置</el-button>
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
        },
        student:JSON.parse(sessionStorage.getItem("student")),
        teacher:JSON.parse(sessionStorage.getItem("teacher")),
      }
    },
    methods:{
      getRouter(){
        this.router = this.$route.path
      },
      logout(){
        sessionStorage.clear()
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
  .el-sub-menu,
  .el-menu-item{
    font-family: 'Adobe 黑体 Std R';
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
