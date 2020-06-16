<template>
  <div id="app">
    <AddModules v-on:add-module="generateTree" />
    <Sidebar />
  </div>
</template>

<script>
import AddModules from "./components/AddModules";
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: {
    AddModules,
    Sidebar
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  align-items: stretch;
}
</style>
