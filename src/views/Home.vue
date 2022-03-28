<!--
 * @Description: 系统主页面
 * @Author: wyl
 * @Date: 2021-10-16 21:44:42
 * @LastEditors: wyl
 * @LastEditTime: 2022-03-26 23:30:27
-->
<template>
    <Header/>
    <el-scrollbar ref="scrollbar" height="800px" always @scroll="scroll" style="display: flex">
      <div ref="inner">
        <el-main>
          <div class="main">
            <router-view/>
          </div>
        </el-main>
        <el-footer>版权所有：育知大学 2021-2022</el-footer>
       </div>
    </el-scrollbar>
</template>

<script>
import Header from "../components/Header";
export default {
  name: 'Home',
  components:{
    Header
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
