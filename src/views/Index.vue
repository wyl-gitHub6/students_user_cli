<template>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src=item class="img">
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <el-button type="text"><h3>学校新闻</h3></el-button>
            </div>
          </template>
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2021/12/12" placement="top">
                <el-card>
                  <h4>我校与市有关单位联合举办的2021年度“巴林石雕”传承人群研修研习培训班开始</h4>
                  <p>2021/12/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/12/8" placement="top">
                <el-card>
                  <h4>离退休人员工作处开展“中华民族一家亲 浓浓重阳敬老情”欢度重阳节活动</h4>
                  <p>2021/12/8 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/12/6" placement="top">
                <el-card>
                  <h4>校友一行到我校附属医院考察交流并续签“研究生校外联合培养“</h4>
                  <p>2021/12/6 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/12/3" placement="top">
                <el-card>
                  <h4>我校召开临床医学专业认证工作周例会</h4>
                  <p>2021/12/3 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-button type="text"><h3>通知公告</h3></el-button>
            </div>
          </template>
          <div class="text item">
            <h4><i class="el-icon-info"></i>&nbsp;关于举办“校长杯”秋季大学生五人制足球比赛的通知</h4><p>2021/12/11</p>
          </div>
          <div class="text item">
            <h4><i class="el-icon-info"></i>&nbsp;图书馆关于再次征询纸质图书采购意见的通知</h4><p>2021/12/9</p>
          </div>
          <div class="text item">
            <h4><i class="el-icon-info"></i>&nbsp;关于对学生科技创新活动奖励评审结果进行公示的通知</h4><p>2021/12/7</p>
          </div>
        </el-card>
        <el-divider style="margin-top: 32px;margin-bottom: 32px;"></el-divider>
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-button type="text"><h3>院系动态</h3></el-button>
            </div>
          </template>
          <div class="text item">
            <h4><i class="el-icon-s-help"></i>&nbsp;经济与管理学院举办党务学习研讨暨教学业务</h4><p>2021/12/10</p>
          </div>
          <div class="text item">
            <h4><i class="el-icon-s-help"></i>&nbsp;经济与管理学院举办2021年“衡信杯”</h4><p>2021/12/8</p>
          </div>
          <div class="text item">
            <h4><i class="el-icon-s-help"></i>&nbsp;附属医院和临床医学院召开临床医学专业认证</h4><p>2021/12/6</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  <el-divider></el-divider>

  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <el-button type="text"><h3>专题网站及专栏</h3></el-button>
      </div>
    </template>
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="item in image" :key="item">
        <img :src=item class="img">
      </el-carousel-item>
    </el-carousel>
  </el-card>

  <el-divider></el-divider>

  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <el-button type="text"><h3>快速通道</h3></el-button>
      </div>
    </template>
    <div style="display: flex">
      <h1><el-tag>教育部</el-tag></h1>
      <h1><el-tag>内蒙古教育厅</el-tag></h1>
      <h1><el-tag>中国教育科研网</el-tag></h1>
      <h1><el-tag>校园学报</el-tag></h1>
      <h1><el-tag>图书馆</el-tag></h1>
      <h1><el-tag>就业网</el-tag></h1>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: "Index",
    data(){
      return{
        images:[require('../assets/img/1.jpg'),require('../assets/img/2.jpg'),require('../assets/img/3.jpg'),require('../assets/img/4.jpg')],
        image:[require('../assets/img/11.jpg'),require('../assets/img/12.jpg'),require('../assets/img/13.jpg'),require('../assets/img/14.jpg')],
      }
    }
  }
</script>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 15px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }

  .el-tag{
    margin-left: 100px;
    margin-right: 100px;
  }

  .img{
    width: 100%;
    height: 100%;
  }
</style>
