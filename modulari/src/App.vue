<template>
  <div id="app">
    <Header />
    <AddModules v-on:add-module="generateTree" />
    <Sidebar />
  </div>
</template>

<script>
import AddModules from "./components/AddModules";
import Sidebar from "./components/Sidebar";
import Header from "./components/layout/Header";

export default {
  name: "App",
  components: {
    AddModules,
    Sidebar,
    Header
  },
  data() {
    return {
      moduleData: []
    };
  },
  methods: {
    generateTree(moduleCode) {
      // testing functionality
      this.moduleData = [...this.moduleData, moduleCode];
      console.log(this.moduleData);
    }
  }
};
</script>

<style>
</style>
