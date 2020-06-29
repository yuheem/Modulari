<template>
  <div id="app">
    <Header />

    <div id="app-features">
      <Sidebar v-on:filter-modules="filterGraph" />

      <div id="main">
        <button id="openSidebar" @click="openSidebar()" class="fas fa-angle-right"></button>
        <span>
          <p v-if="invalidModuleCode" style="margin-bottom: 0px">
            <b>Invalid module code.</b>
          </p>
          <AddModules v-on:add-module="generateGraph" />
        </span>

        <Graph :nodes="nodes" :links="links" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import academicCalendar from "./assets/js/academicCalendar.js";
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
      invalidModuleCode: false,
      modulesShown: [],
      nodes: [],
      links: [],
    };
  },
  methods: {
    generateGraph(moduleCode) {
      // Retrieve module information from NUSMods
      console.log(academicCalendar.getAcadYear(new Date()));
      console.log(moduleCode.toUpperCase());

      function getModuleInfo(moduleCode) {
        return axios
          .get(
            "https://api.nusmods.com/v2/" +
              `${academicCalendar.getAcadYear(new Date())}` +
              `/modules/${moduleCode.toUpperCase()}.json`
          )
          .then(res => res.data)
          .catch(e => {
            if (e.request) {
              this.invalidModuleCode = true;
            }
          })
      }

      function handlePrereqTree(tree, sourceId, modulesShown, nodes, links) {
        if (tree.and) {
          tree.and.forEach(n => handlePrereqTree(n, sourceId, modulesShown, nodes, links))
        } else if (tree.or) {
          tree.or.forEach(n => handlePrereqTree(n, sourceId, modulesShown, nodes, links))
        } else {
          getModuleInfo(tree)
            .then(moduleInfo => {
              const moduleCode = moduleInfo.moduleCode
              const exists = modulesShown.find(module => module.moduleCode === moduleCode)
              if (!exists) {
              modulesShown.push(moduleInfo)
              nodes.push({ name: moduleCode})
              const targetId = nodes.findIndex(node => node.name === moduleCode)
              links.push({ sid: sourceId, tid: targetId })
              }

              const newSourceId = nodes.findIndex(node => node.name === moduleCode)
              const newTree = moduleInfo.prereqTree
              if (tree) {
                handlePrereqTree(newTree, newSourceId, modulesShown, nodes, links)
              }
            })
        }
      }
      
      function addModule(moduleCode, modulesShown, nodes, links) {
        getModuleInfo(moduleCode)
          .then(moduleInfo => {
            modulesShown.push(moduleInfo);
            nodes.push({ name: moduleCode })
            const sourceId = nodes.findIndex(node => node.name === moduleCode)
            const tree = moduleInfo.prereqTree
            if (tree) {
              handlePrereqTree(tree, sourceId, modulesShown, nodes, links)
            }
          })
        console.log(modulesShown);
      }

      addModule(moduleCode.toUpperCase(), this.modulesShown, this.nodes, this.links)
      console.log(this.nodes)
      console.log(this.links)
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
