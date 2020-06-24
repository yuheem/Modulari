<template>
  <div id="sidebar">
    <button id="closeSidebar" @click="closeSidebar()">x</button>
    <h4>Filter by:</h4>
    <FilterOptions v-on:filter-modules="filterOptions" />
  </div>
</template>

<script>
import FilterOptions from "./FilterOptions";

export default {
  name: "Sidebar",
  components: {
    FilterOptions
  },
  methods: {
    closeSidebar() {
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("openSidebar").style.display = "inline-block";
    },
    filterOptions(filterDetails) {
      this.$emit("filter-modules", filterDetails);
    }
  }
};
</script>

<style scoped>
#sidebar {
  display: none;
  padding: 10px;
  background: rgba(17, 17, 17, 0.781);
  color: #ccc;
}

button {
  cursor: pointer;
  float: right;
}
</style>