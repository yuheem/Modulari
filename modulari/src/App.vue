<template>
  <div id="app">
    <Header />

    <div id="app-features" style="position: relative">
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

        <NewGraph
          :nodes="nodes"
          :links="links"
          :modulesShown="modulesShown"
          :filtered="filtered"
          v-on:delete-module="deleteModule"
        />
      </div>

      <Legend />
    </div>
  </div>
</template>

<script>
import AddModules from "./components/AddModules";
import Sidebar from "./components/Sidebar";
import NewGraph from "./components/NewGraph";
import Header from "./components/layout/Header";
import Legend from "./components/Legend";
import {
  getModuleInfo,
  handlePrereqTree,
  getLevelOfModule,
} from "./assets/js/helper.js";
export default {
  name: "App",
  components: {
    AddModules,
    Sidebar,
    Header,
    NewGraph,
    Legend,
  },
  data() {
    return {
      invalidModuleCode: false,
      modulePresent: false,
      modulesShown: [],
      nodes: [],
      links: [],
      filtered: {
        level: "No filter",
        faculty: "No filter",
        numOfMCs: "No filter",
        exams: "No filter",
      },
    };
  },
  methods: {
    addModules(moduleCode) {
      const moduleToBeAdded = moduleCode.toUpperCase();
      const updateNodes = this.nodes;
      const updateLinks = this.links;
      // helper function that retrieves module information via a http request from nusmods
      getModuleInfo(moduleToBeAdded)
        .then((moduleInfo) => {
          this.invalidModuleCode = false;
          const moduleCode = moduleInfo.moduleCode;
          const exists = this.modulesShown.find(
            (module) => module.moduleCode === moduleCode
          );
          if (exists) {
            this.modulePresent = true;
          } else {
            this.modulePresent = false;
            this.modulesShown.push(moduleInfo);
            const moduleLevel = getLevelOfModule(moduleToBeAdded);
            updateNodes.push({
              name: moduleToBeAdded,
              level: moduleLevel,
              added: true,
            });
            const sourceId = updateNodes.findIndex(
              (node) => node.name === moduleToBeAdded
            );
            const tree = moduleInfo.prereqTree;
            // If module added has prerequisites
            if (tree) {
              // helper function that builds the prerequisite tree to be displayed
              handlePrereqTree(
                tree,
                sourceId,
                this.modulesShown,
                updateNodes,
                updateLinks,
                undefined,
                0
              );
            }
          }
        })
        // Checks for http request error in the event of invalid module code added
        .catch((e) => {
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
      const {
        filteredLevel,
        filteredFaculty,
        filteredNumOfMCs,
        filteredExams,
      } = filterDetails;
      this.filtered = {
        level: filteredLevel,
        faculty: filteredFaculty,
        numOfMCs: filteredNumOfMCs,
        exams: filteredExams,
      };
    },
    deleteModule(moduleToDelete) {
      this.nodes = this.nodes.filter(
        (module) => module.name !== moduleToDelete
      );
      this.links = this.links.filter(
        (link) =>
          link.source.name !== moduleToDelete &&
          link.target.name !== moduleToDelete
      );
      this.modulesShown = this.modulesShown.filter(
        (module) => module.moduleCode !== moduleToDelete
      );
    },
  },
};
</script>

<style>
#app,
#app-features {
  min-height: 100vh;
  font-family: sans-serif;
}
#main {
  padding: 10px;
}
b {
  margin: 0px;
  color: red;
}

button {
  outline: none;
}
</style>
