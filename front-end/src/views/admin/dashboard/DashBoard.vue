<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import DashBoardCard from './DashBoardCard.vue';
import DashBoardCharts from './DashBoardCharts.vue';
import store from '@/store';

const loading = ref(false)

onMounted(async () => {


})
</script>
<template>
    <div v-loading="loading" class="dashboard d-flex flex-column">
      <DashBoardCard></DashBoardCard>
      <DashBoardCharts></DashBoardCharts>
    </div>
</template>
<style scoped lang="scss">
</style>
