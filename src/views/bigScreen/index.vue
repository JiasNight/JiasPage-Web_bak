<template>
  <div class="view-container">
    <div class="container-title">数据大屏</div>
    <div class="container-content">
      <div ref="chartMap" class="chart-map"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { $ref } from 'vue/macros';
import * as echarts from 'echarts';
import 'echarts-gl';
import china from '../../../public/map/china.json';
let chartMap: HTMLElement = $ref();
let mapChart;
const initChinaMapChart = () => {
  mapChart = echarts.init(chartMap);
  echarts.registerMap('china', china);
  // 3. 设置图表 option
  let option = {
    backgroundColor: '#000f1e',
    geo: {
      type: 'map',
      map: 'china',
      show: false
    },
    geo3D: {
      map: 'china',
      show: true,
      boxWidth: 200,
      boxHeight: 4, //4:没有bar. 30:有bar,bar最高度30，按比例分配高度
      regionHeight: 10,
      shading: 'lambert',
      viewControl: {
        projection: 'perspective',
        autoRotate: false,
        damping: 0,
        rotateSensitivity: 2, //旋转操作的灵敏度
        rotateMouseButton: 'left', //旋转操作使用的鼠标按键
        zoomSensitivity: 2, //缩放操作的灵敏度
        panSensitivity: 2, //平移操作的灵敏度
        panMouseButton: 'right', //平移操作使用的鼠标按键
        distance: 200, //默认视角距离主体的距离
        center: [0, 0, 0],
        animation: true,
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut'
      },

      label: {
        // 标签的相关设置
        show: false
      },

      itemStyle: {
        color: '#0fbcf9',
        areaColor: '#025894',
        opacity: 0.8,
        borderWidth: 1,
        borderColor: '#81ecec'
      },
      emphasis: {
        label: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14,
            backgroundColor: 'transparent' // 字体背景色
          }
        },
        shading: 'lambert',
        borderColor: '#333',
        borderWidth: 2,
        itemStyle: {
          color: '#5c7cfa',
          areaColor: '#5c7cfa'
        }
      },
      light: {
        main: {
          intensity: 1, //光照强度
          shadow: true,
          shadowQuality: 'ultra'
        },
        ambient: {
          intensity: 0.2
        }
      }
    },
    series: [
      {
        type: 'scatter3D',
        coordinateSystem: 'geo3D',
        zlevel: 3,
        symbol: 'pin',
        symbolSize: 100,
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            textStyle: {
              color: '#fff',
              fontSize: 14,
              backgroundColor: 'transparent' // 字体背景色
            }
          }
        },
        data: [[102.712251, 25.040609, 1000]],
        itemStyle: {
          //坐标点颜色
          color: '#e03131',
          shadowBlur: 20,
          shadowColor: '#fff'
        },
        emphasis: {
          itemStyle: {
            //坐标点颜色
            color: '#1ca1d2'
          }
        }
      }
    ]
  };
  mapChart.setOption(option);
};

onMounted(() => {
  initChinaMapChart();
});
</script>

<style lang="scss" scoped>
.view-container {
  width: 100vw;
  height: 100%;
  background-image: url('@/assets/images/bigScreen/big-background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  .container-title {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: aliceblue;
  }
  .chart-map {
    width: 50%;
    height: 80vh;
    margin: 0 auto;
    border: 1px solid #f0f0ff;
  }
}

// 媒体查询响应式页面
@media screen {
}
</style>
