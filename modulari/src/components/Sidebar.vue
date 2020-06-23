<template>
  <div id="sidebar">
    <button id="closeSidebar" @click="closeSidebar()">x</button>
    <h4>Filter by:</h4>
    <FilterOptions v-on:filter-modules="$emit('filter-modules', filterDetails)" />
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
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("openSidebar").style.display = "inline-block";
    }
  }
};
</script>

<style scoped>
#sidebar {
  display: none;
}

button {
  cursor: pointer;
  float: right;
}
</style>