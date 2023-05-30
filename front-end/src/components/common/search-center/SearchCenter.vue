<template>
  <div class="search-center">
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <div class="sub-title my-2 text-sm text-gray-600">
          Hãy nhập tên tài liệu !
        </div>
        <div class="search-box d-flex">
          <el-autocomplete
            v-model="state2"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            class="inline-input w-50"
            placeholder="Nhập tên tài liệu ..."
            @select="handleSelect"
          />
          <el-button>Tìm kiếm</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="search-result"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

interface RestaurantItem {
  value: string;
  link: string;
}

const state1 = ref("");
const state2 = ref("");

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

onMounted(() => {
  restaurants.value = loadAll();
});
</script>

<style scoped></style>
