<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
  import { use } from "echarts/core";
  import { GridComponent } from 'echarts/components';
  import { BarChart } from 'echarts/charts';
  import { CanvasRenderer } from "echarts/renderers";
  import { PieChart } from "echarts/charts";
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from "echarts/components";
  import VChart, { THEME_KEY } from "vue-echarts";
  import { ref, defineComponent } from "vue";
  import request from "../utils/request";

  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    BarChart
  ]);

  export default defineComponent({
    name: "ScoreStatistical",
    components: {
      VChart
    },
    provide: {
      [THEME_KEY]: ""
    },
    setup: () => {
      const option = ref({
        title: {
          text: '学生各科成绩统计图'
        },
        tooltip: {},
        legend: {
          data:['优秀','良好','及格','不及格']
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
          {
            name:'优秀',
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
          },
          {
            name:'良好',
            type: 'bar',
            data: [26, 24, 18, 22, 23, 20, 27]
          },
          {
            name:'及格',
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
          },
          {
            name:'不及格',
            type: 'bar',
            data: [26, 24, 18, 22, 23, 20, 27]
          }
        ]

      })
      const teacher = ref(JSON.parse(sessionStorage.getItem("teacher")))
      return { option,teacher };
    },
    methods:{
      load(){
        request.get('/api/score/statistical/'+this.teacher.teacherId).then(res=>{
          console.log(res.data)
          this.option.xAxis.data = res.data.courseName
          this.option.series[0].data = res.data.yx
          this.option.series[1].data = res.data.lh
          this.option.series[2].data = res.data.jg
          this.option.series[3].data = res.data.bjg
        })
      }
    },
    created() {
      this.load()
    }
  });
</script>

<style scoped>
  .chart {
    height: 600px;
  }
</style>
