<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import * as echarts from 'echarts';
import store from '@/store';
import { IDocument, IType } from '@/common/model';

const chartBarRef = ref<HTMLDivElement | null>(null);
const chartPieRef = ref<HTMLDivElement | null>(null);
let chartBarInstance: echarts.ECharts | null = null;
let chartPieInstance: echarts.ECharts | null = null;
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await store.dispatch('getDocuments')
  await store.dispatch('getDocumentTypes')
  await store.dispatch('getRequests')
  createBarChart();
  createPieChart()
  loading.value = false
});
const allDocuments = computed<IDocument[]>(() => store.state.documents)
const allDocumentTypes  = computed<IType[]>(() => store.state.documentTypes)
const allRequestApprove = computed(() => store.state.requests.filter((req: any) => req.status === 2))

const datasBar = computed(() => {
  const typeDatas = allDocumentTypes.value.map((type: IType) => {
      const documentDatas = allDocuments.value.filter((document: IDocument) => document.documentTypeId === type._id)
       const dataObj = {...type, documentDatas: documentDatas}
       return dataObj
    })
    console.log(typeDatas)
  return typeDatas
  })

  const datas = computed(() => {
    const typeDatas = allDocumentTypes.value.map((type: IType) => {
       const documentDatas = allRequestApprove.value.filter((document: IDocument) => document.documentTypeId === type._id)
       const dataObj = {value: documentDatas.length, name: type.title}
       return dataObj
    })
    return typeDatas
  })

function createBarChart() {
  const chartDom = chartBarRef.value;
  if (!chartDom) return;

  chartBarInstance = echarts.init(chartDom);



  const chartOptions: echarts.EChartsOption = {
    grid: { containLabel: true },
    xAxis: {
    // max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: datasBar.value.map((data: any) => data.title),
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    // max: 2 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      type: 'bar',
      data: datasBar.value.map((data: any) => data.documentDatas.length),
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
  };

  chartBarInstance.setOption(chartOptions);
}
function createPieChart() {
  const chartDom = chartPieRef.value;


  if (!chartDom) return;

  chartPieInstance = echarts.init(chartDom);

  const chartOptions: echarts.EChartsOption = {
tooltip: {
  trigger: 'item'
},
series: [
  {
    type: 'pie',
    radius: '50%',
    data: datas.value,
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }
]
  }

  chartPieInstance.setOption(chartOptions);
}

// Trước khi component bị hủy, hủy bỏ biểu đồ
onBeforeUnmount(() => {
  if (chartBarInstance) {
    chartBarInstance.dispose();
    chartBarInstance = null;
  }
  if (chartPieInstance) {
    chartPieInstance.dispose();
    chartPieInstance = null;
  }
});
</script>
<template>
  <el-scrollbar>
    <div v-loading="loading" class="charts-wrapper">
      <h3>Thống kê tài liệu theo thể loại</h3>
      <div ref="chartBarRef" class="chart-bar" style="height: 600px; width: 100%;"></div>
      <h3>Thống kê tài liệu do người dùng đóng góp</h3>
      <div
        ref="chartPieRef"
        style="width: 100%; height: 400px; margin-top: 30px;"></div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.charts-wrapper {
  margin: 20px 0;
  padding: 20px 0;
  box-shadow: 0px 0px 6px #00000029;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;

}
</style>
<style lang="scss">
.chart-bar {
  // canvas {
  //   position: absolute !important;
  //   left: 30px !important;
  // }
}
</style>
