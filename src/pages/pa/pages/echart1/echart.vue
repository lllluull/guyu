<template>
  <div class="main">
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="bar" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

let barChart;

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      ecBarInit: this.initChart,
      somenumb: []
    }
  },
  methods: {
    initChart(canvas, width, height) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
    barChart.setOption(this.optiontop);
    return barChart; // 返回 chart 后可以自动绑定触摸操作
    }
  },
  computed: {
    optiontop() {
      return {
          backgroundColor: '#fff',
          color: ['#37a2da', '#32c5e9', '#67e0e3'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['读书量']
          },
          grid: {
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          },
          yAxis: {
            x: 'center',
            type: 'value'
          },
          title:{
            text:'今年读书统计',
            left: 'center',
            textStyle:{
                //文字颜色
                color:'#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle:'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight:'bold',
                //字体系列
                fontFamily:'sans-serif',
                //字体大小
        　　　　 fontSize:18
              }
          },
          series: [
            {
              name: '读书',
              type: 'line',
              smooth: 'true',
              data: this.somenumb,
            }
          ]
      }
    }
  },
  mounted() {
    this.somenumb = [3, 2, 3, 3, 3, 5, 7]
    // this.initChart
  },
}
</script>

<style scoped>
.echarts-wrap {
  width: 100%;
  height: 300px;
}
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
