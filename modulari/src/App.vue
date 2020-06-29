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
      
      function addModule(moduleCode, modulesShown, nodes, links) {
        axios
          .get(
            "https://api.nusmods.com/v2/" +
              `${academicCalendar.getAcadYear(new Date())}` +
              `/modules/${moduleCode.toUpperCase()}.json`
          )
          .then(res => {
            modulesShown.push(res.data);
            nodes.push({ name: moduleCode })
            const sourceId = nodes.findIndex(node => node.name === moduleCode)
            const fulfillReq = res.data.fulfillRequirements
            if (fulfillReq) {
              fulfillReq.forEach(moduleCode => {
                axios
                  .get(
                    "https://api.nusmods.com/v2/" +
                      `${academicCalendar.getAcadYear(new Date())}` +
                      `/modules/${moduleCode.toUpperCase()}.json`
                  )
                  .then(res => {
                    modulesShown.push(res.data);
                  })
                nodes.push({ name: moduleCode })
                const targetId = nodes.findIndex(node => node.name === moduleCode)
                links.push({ sid: sourceId, tid: targetId })
              })
            }

            const tree = res.data.prereqTree
            if (tree) {
              if (tree.and) {
                tree.and.forEach(node => {
                  if (node.or) {
                    node.or.forEach(moduleCode => {
                      axios
                        .get(
                          "https://api.nusmods.com/v2/" +
                            `${academicCalendar.getAcadYear(new Date())}` +
                            `/modules/${moduleCode.toUpperCase()}.json`
                        )
                        .then(res => {
                          modulesShown.push(res.data);
                        })
                      nodes.push({ name: moduleCode })
                      const targetId = nodes.findIndex(node => node.name === moduleCode)
                      links.push({ sid: sourceId, tid: targetId })
                    })
                  } else {
                      axios
                        .get(
                          "https://api.nusmods.com/v2/" +
                            `${academicCalendar.getAcadYear(new Date())}` +
                            `/modules/${node.toUpperCase()}.json`
                        )
                        .then(res => {
                          modulesShown.push(res.data);
                        })
                      nodes.push({ name: node })
                      const targetId = nodes.findIndex(n => n.name === node)
                      links.push({ sid: sourceId, tid: targetId })
                  }
                })
              } else {
                tree.forEach(moduleCode => {
                      axios
                        .get(
                          "https://api.nusmods.com/v2/" +
                            `${academicCalendar.getAcadYear(new Date())}` +
                            `/modules/${moduleCode.toUpperCase()}.json`
                        )
                        .then(res => {
                          modulesShown.push(res.data);
                        })
                      nodes.push({ name: moduleCode })
                      const targetId = nodes.findIndex(node => node.name === moduleCode)
                      links.push({ sid: sourceId, tid: targetId })
                  
                })
              }
            }
          })
          // if module code is invalid
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
