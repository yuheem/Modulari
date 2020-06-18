<template>
  <div id="app">
    <Header />
    <AddModules v-on:add-module="generateTree" />
    <Sidebar />
  </div>
</template>

<script>
import axios from "axios";

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
      modulesShownInGraph: []
    };
  },
  methods: {
    generateTree(moduleCode) {
      // Retrieve module information from NUSMods
      axios
        .get(`https://api.nusmods.com/v2/2019-2020/modules/${moduleCode}.json`)
        .then(res => this.modulesShownInGraph.push(res.data))
        .catch(err => console.log(err));
      console.log(this.modulesShownInGraph);
    }
  }
};
</script>

<style>
</style>
