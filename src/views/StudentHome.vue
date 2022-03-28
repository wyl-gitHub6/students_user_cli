<!--
 * @Description: 学生主页面
 * @Author: Wangyl
 * @Date: 2021-11-17 22:59:01
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-03-28 21:35:24
-->

<template>
    <StudentHeader/>
    <el-scrollbar ref="scrollbar" height="800px" always @scroll="scroll" style="display: flex">
      <div ref="inner">
        <el-main>
          <div class="main">
            <router-view/>
          </div>
        </el-main>
        <el-footer>版权所有：育知大学</el-footer>
       </div>
    </el-scrollbar>
</template>

<script>
import StudentHeader from "../components/StudentHeader";
export default {
  name: 'StudentHome',
  components:{
    StudentHeader
  },
  data(){
    return{
    }
  },
  methods: {
    scroll({ scrollTop }) {
      this.value = scrollTop
    },
  },
}
</script>

<style>
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
    width: 1500px;
    margin-left: 11vw;
  }

  .main{
    width: 1500px;
    margin-left: 10vw;
  }
</style>
