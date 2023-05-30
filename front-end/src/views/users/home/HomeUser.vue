<script setup lang="ts">
import { computed, ref } from "vue";
import DocumentList from "../../../components/common/document/DocumentList.vue";
import Layout from "../../../components/common/layout/LayoutHomeUser.vue";

const selectedItem = ref("");

const selectedItemComponent = computed(() => {
  switch (selectedItem.value) {
    case "item1":
      return "Item1Content";
    case "item2":
      return "Item2Content";
    case "item3":
      return "Item3Content";
    default:
      return null;
  }
});

const handleItemClick = (item: any) => {
  selectedItem.value = item;
};
</script>
<template>
  <div class="home-user">
    <layout></layout>
    <div class="container">
      <document-list></document-list>
    </div>
  </div>
  <footer></footer>
</template>
<style scoped></style>
