<!--
 * @Description: 成绩统计图
 * @Author: Wangyl
 * @Date: 2021-11-27 11:56:22
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-04-30 15:10:45
-->

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
          data:['优秀(90-100)','良好(80-99)','中等(70-89)','及格(60-69)','不及格(0-59)'],
        },
        xAxis: {
          data: [],
          axisLine: {
              lineStyle:{
                color:'#34495e',
                width:1
              }
            }
        },
        yAxis: {
          axisLine: {
              lineStyle:{
                color:'#34495e',
              }
            }
        },
        series: [
          {
            name:'优秀(90-100)',
            type: 'bar',
            data: []
          },
          {
            name:'良好(80-99)',
            type: 'bar',
            data: []
          },
           {
            name:'中等(70-89)',
            type: 'bar',
            data: []
          },
          {
            name:'及格(60-69)',
            type: 'bar',
            data: []
          },
          {
            name:'不及格(0-59)',
            type: 'bar',
            data: []
          }
        ]

      })
      const teacher = ref(JSON.parse(sessionStorage.getItem("teacher")))
      return { option,teacher };
    },
    methods:{
      load(){
        request.get('/api/score/statistical/'+this.teacher.teacherId).then(res=>{

          if( res.code == 0){
            this.option.xAxis.data = res.data.courseName
            this.option.series[0].data = res.data.yx
            this.option.series[1].data = res.data.lh
            this.option.series[2].data = res.data.zd
            this.option.series[3].data = res.data.jg
            this.option.series[4].data = res.data.bjg
          }else{
            ElMessage.error({
                message: res.message,
                type: 'error'
            });
          }
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
