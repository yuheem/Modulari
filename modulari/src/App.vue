<template>
  <div id="app">
    <Header />

    <div id="app-features">
      <Sidebar v-on:filter-modules="filterGraph" />

      <div id="main">
        <button id="openSidebar" @click="openSidebar()" class="fas fa-angle-right"></button>
        <span>
          <p style="margin-bottom: 0px">
            <b v-if="invalidModuleCode">Invalid module code.</b>
            <b v-if="modulePresent">Module is already shown</b>
          </p>
          <AddModules v-on:add-module="addModules" />
        </span>

        <Graph :nodes="nodes" :links="links" />
      </div>
    </div>
  </div>
</template>

<script>
import AddModules from "./components/AddModules";
import Sidebar from "./components/Sidebar";
import Graph from "./components/Graph";
import Header from "./components/layout/Header";
import { getModuleInfo, handlePrereqTree } from "./assets/js/helper.js";

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
      invalidModuleCode: false,
      modulePresent: false,
      modulesShown: [],
      nodes: [],
      links: []
    };
  },
  methods: {
    addModules(moduleCode) {
      const moduleToBeAdded = moduleCode.toUpperCase();

      // helper function that retrieves module information via a http request from nusmods
      getModuleInfo(moduleToBeAdded)
        .then(moduleInfo => {
          this.invalidModuleCode = false;

          const moduleCode = moduleInfo.moduleCode;
          const exists = this.modulesShown.find(
            module => module.moduleCode === moduleCode
          );

          if (exists) {
            this.modulePresent = true;
          } else {
            this.modulePresent = false;
            this.modulesShown.push(moduleInfo);
            this.nodes.push({ name: moduleToBeAdded });
            const sourceId = this.nodes.findIndex(
              node => node.name === moduleToBeAdded
            );
            const tree = moduleInfo.prereqTree;

            // If module added has prerequisites
            if (tree) {
              // helper function that builds the prerequisite tree to be displayed
              handlePrereqTree(
                tree,
                sourceId,
                this.modulesShown,
                this.nodes,
                this.links
              );
            }
          }
        })
        // Checks for http request error in the event of invalid module code added
        .catch(e => {
          if (e.request) {
            this.invalidModuleCode = true;
            this.modulePresent = false;
          }
        });
    },
    openSidebar() {
      document.getElementById("app-features").style.display = "flex";
      document.getElementById("main").style.flex = "3";
      document.getElementById("sidebar").style.width = "1";
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
#app,
#app-features {
  min-height: 100vh;
}

#main {
  padding: 10px;
}

b {
  margin: 0px;
  color: red;
}
</style>
