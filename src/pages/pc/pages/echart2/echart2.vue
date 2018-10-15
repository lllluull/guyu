<template>
  <div class="mian">
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="ecScatterInit" canvasId="scatter" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

let scatterChart;

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      ecScatterInit: this.initChart,
      somenumb: []
    }
  },
  methods: {
    initChart(canvas, width, height) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(scatterChart);
    scatterChart.setOption(this.optiontop);
    return scatterChart; // 返回 chart 后可以自动绑定触摸操作
    }
  },
  computed: {
    optiontop() {
      return {
          backgroundColor: "#ffffff",
          color: ["red", "red"],
          tooltip: {},
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          title:{
            text:'我的读书偏好',
            left: '5%' ,
            textStyle:{
                //文字颜色
                color:'red',
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
          radar: {
            // shape: 'circle',
            indicator: [{
              name: '小说',
              max: 500
            },
            {
              name: '历史',
              max: 500
            },
            {
              name: '散文',
              max: 500
            },
            {
              name: '经济',
              max: 500
            },
            {
              name: '哲学',
              max: 500
            },
            {
              name: '其他',
              max: 500
            }
            ]
          },
          series: [{
            name: '得分',
            type: 'radar',
            data: [{
              value: this.somenumb,
              name: '得分'
            }
            ]
          }]
      }
    }
  },
  mounted() {
    this.somenumb = [130, 340, 100, 400, 390, 120]
    // this.initChart
  },
}
</script>

<style scoped>
.echarts-wrap {
  width: 100%;
  height: 300px;
}
.mian{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
