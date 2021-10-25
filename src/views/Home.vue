<template>
    <Header/>
    <el-scrollbar ref="scrollbar" height="800px" always @scroll="scroll" style="display: flex">
      <div ref="inner">
        <el-main>
          <div class="main">
            <router-view/>
            <el-slider
                    v-model="value"
                    @input="inputSlider"
                    :max="max"
                    :format-tooltip="formatTooltip"
            ></el-slider>
          </div>
        </el-main>
        <el-footer>版权所有：育知大学</el-footer>
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
      max: 0,
      value: 0,
    }
  },
  mounted() {
    this.max = this.$refs.inner.clientHeight - 735
  },
  methods: {
    inputSlider(value) {
      this.$refs.scrollbar.setScrollTop(value)
    },
    scroll({ scrollTop }) {
      this.value = scrollTop
    },
    formatTooltip(value) {
      return `${value} px`
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
