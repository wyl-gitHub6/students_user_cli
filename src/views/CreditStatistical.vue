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
    name: "CreditStatistical",
    components: {
      VChart
    },
    provide: {
      [THEME_KEY]: ""
    },
    setup: () => {
      const option = ref({
        title: {
          text: '学生各科平均学分统计图'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
        yAxis: {
            type: 'value'
          },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                },
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ]
      })
      const teacher = ref(JSON.parse(sessionStorage.getItem("teacher")))
      return { option,teacher };
    },
    methods:{
      load(){
        request.get("/api/score/findCreditStatistical/"+this.teacher.teacherId).then(res=>{
          if (res.code == 0){
            this.option.series[0].data = res.data.credit
            this.option.xAxis.data = res.data.courseName
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
