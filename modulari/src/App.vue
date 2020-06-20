<template>
  <div id="app">
    <div id="main">
      <button id="openSidebar" @click="openSidebar()" class="fas fa-angle-right"></button>
      <Header />
      <AddModules v-on:add-module="generateGraph" />
      <Graph />
    </div>
    <div>
      <Sidebar v-on:filter-modules="filterGraph" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import academicCalendar from "./assets/js/academicCalendar.js"
import AddModules from "./components/AddModules";
import Sidebar from "./components/Sidebar";
import Graph from "./components/Graph";
import Header from "./components/layout/Header";

export default {
  name: "App",
  components: {
    AddModules,
    Sidebar,
    Header,
    Graph
  },
  data() {
    return {
      modulesShownInGraph: []
    };
  },
  methods: {
    generateGraph(moduleCode) {
      // Retrieve module information from NUSMods
      console.log(academicCalendar.getAcadYear(new Date()));
      console.log(moduleCode.toUpperCase());
      axios
        .get("https://api.nusmods.com/v2/" +
          `${academicCalendar.getAcadYear(new Date())}` +
          `/modules/${moduleCode.toUpperCase()}.json`)
        .then(res => this.modulesShownInGraph.push(res.data))
        .catch(err => console.log(err));
      console.log(this.modulesShownInGraph);
    },
    openSidebar() {
      document.getElementById("main").style.marginLeft = "25%";
      document.getElementById("sidebar").style.width = "25%";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("openSidebar").style.display = "none";
    },
    filterGraph(filterDetails) {
      // Test if data was transferred correctly
      const {
        filteredLevel,
        filteredFaculty,
        filteredNumOfMCs,
        filteredExams
      } = filterDetails;

      console.log(
        filteredLevel,
        filteredFaculty,
        filteredNumOfMCs,
        filteredExams
      );
    }
  }
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
