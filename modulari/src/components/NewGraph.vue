<template>
  <div style="position: relative">
    <ModuleInfo
      :moduleInfo="clickedModuleInfo"
      :viewModuleInfo="viewModuleInfo"
      v-on:hide-module-info="hideModuleInfo"
    />

    <svg width="100%" height="100vh" id="test-graph">
      <defs>
        <marker
          id="arrow"
          viewBox="0 -5 10 10"
          refX="54"
          refY="0"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,-5 L10,0 L0,5" />
        </marker>
        <pattern
          id="innerGrid"
          :width="10"
          :height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="#CCCCCC7A"
            stroke-width="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          :width="100"
          :height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="100%"
            height="100%"
            fill="url(#innerGrid)"
            stroke="#CCCCCC7A"
            stroke-width="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100vh" fill="url(#grid)" />
      <g />
    </svg>

    <button class="legend-button" @click="openLegend()">
      <i class="far fa-question-circle"></i>
    </button>

    <Planner />

    <DeleteModule
      :moduleToDelete="clickedModuleInfo"
      v-on:delete-module="deleteModule()"
      v-on:clear-modules="$emit('clear-modules')"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import ModuleInfo from "./ModuleInfo";
import Planner from "./Planner";
import DeleteModule from "./DeleteModule";
import {
  defaultSettings,
  filterLevel,
  filterFaculty,
  filterNumOfMCs,
  filterExam,
} from "../assets/js/filterHelperMethods";

export default {
  name: "NewGraph",
  components: {
    ModuleInfo,
    Planner,
    DeleteModule,
  },
  props: ["nodes", "links", "modulesShown", "filtered"],
  data() {
    return {
      width: null,
      height: null,
      graph: null,
      simulation: null,
      forceProperties: {
        charge: {
          strength: -2000,
          distanceMin: 1,
          distanceMax: 2000,
        },
        collide: {
          strength: 0.7,
          iterations: 1,
          radius: 200,
        },
        forceX: {
          strength: 0.1,
          x: 0.5,
        },
        forceY: {
          strength: 0.2,
          y: 0.5,
        },
        link: {
          enabled: true,
          distance: 100,
          iterations: 1,
        },
      },
      viewModuleInfo: false,
      clickedModuleInfo: null,
    };
  },
  created() {
    console.log("simulation start!");
    this.simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink())
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide())
      .force("center", d3.forceCenter())
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", this.tick);

    console.log("simulation creation complete!");

    this.setForceProperties();
    console.log("force properties set");
  },
  mounted() {
    this.width = document
      .getElementById("test-graph")
      .getBoundingClientRect().width;
    this.height = document
      .getElementById("test-graph")
      .getBoundingClientRect().height;

    this.graph = d3.select("g");

    d3.select("svg").call(
      d3.zoom().on("zoom", () => {
        this.graph.attr("transform", d3.event.transform);
      })
    );
  },
  methods: {
    tick() {
      console.log("tick");
      const nodeCoord = (node) => {
        return "translate(" + node.x + "," + node.y + ")";
      };
      const linkCoord = (link) => {
        return (
          "M " +
          link.target.x +
          "," +
          link.target.y +
          " L" +
          link.source.x +
          "," +
          link.source.y
        );
      };

      this.graph.selectAll("path").attr("d", linkCoord);
      this.graph.selectAll("circle").attr("transform", nodeCoord);
      this.graph.selectAll("text").attr("transform", nodeCoord);
    },
    updateSimulation() {
      this.simulation.nodes(this.nodes);
      this.simulation.force("link").links(this.links);

      console.log("nodes and links set");

      this.graph.selectAll("path").remove();
      this.graph
        .selectAll("path")
        .data(this.simulation.force("link").links())
        .join("path")
        .classed("and", (d) =>
          d.type === "and" || d.type === "andor" ? true : false
        )
        .classed("andor0", (d) =>
          d.type === "andor" && d.num === 0 ? true : false
        )
        .classed("andor1", (d) =>
          d.type === "andor" && d.num === 1 ? true : false
        )
        .classed("andor2", (d) =>
          d.type === "andor" && d.num === 2 ? true : false
        )
        .classed("andor3", (d) =>
          d.type === "andor" && d.num === 3 ? true : false
        );

      this.graph.selectAll("circle").remove();
      this.graph
        .selectAll("circle")
        .data(this.simulation.nodes())
        .join("circle")
        .attr("id", (d) => d.name)
        .attr("r", "50")
        .attr("class", (d) => "level" + d.level)
        .classed("added", (d) => {
          if (d.added) {
            return true;
          }

          return false;
        })
        .call(
          d3
            .drag()
            .on("start", this.nodeDragStart)
            .on("drag", this.nodeDrag)
            .on("end", this.nodeDragEnd)
        )
        .on("click", this.showModuleInfo)
        .on("mouseover", this.showRelatedModules)
        .on("mouseout", this.showFilteredModules);

      this.graph.selectAll("text").remove();
      this.graph
        .selectAll("text")
        .data(this.simulation.nodes())
        .join("text")
        .attr("x", "0")
        .attr("y", "0.31em")
        .attr("text-anchor", "middle")
        .text((d) => d.name)
        .on("mouseover", this.showRelatedModules)
        .on("mouseout", this.showFilteredModules);

      this.simulation.alpha(1).restart();

      console.log("simulation restart after updating data");
    },
    setForceProperties() {
      this.simulation
        .force("center")
        .x(this.width / 2)
        .y(this.height / 2);

      this.simulation
        .force("charge")
        .strength(this.forceProperties.charge.strength)
        .distanceMin(this.forceProperties.charge.distanceMin)
        .distanceMax(this.forceProperties.charge.distanceMax);

      this.simulation
        .force("collide")
        .strength(this.forceProperties.collide.strength)
        .radius(this.forceProperties.collide.radius)
        .iterations(this.forceProperties.collide.iterations);

      this.simulation
        .force("x")
        .strength(this.forceProperties.forceX.strength)
        .x(this.width / 2);
      this.simulation
        .force("y")
        .strength(this.forceProperties.forceY.strength)
        .y(this.height / 2);

      console.log("settings done");

      this.simulation.alpha(1).restart();

      console.log("simulation restart");
    },
    nodeDragStart(node) {
      if (!d3.event.active) {
        this.simulation.alphaTarget(0.3).restart();
      }

      node.fx = node.x;
      node.fy = node.y;
    },
    nodeDrag(node) {
      node.fx = d3.event.x;
      node.fy = d3.event.y;
    },
    nodeDragEnd(node) {
      if (!d3.event.active) {
        this.simulation.alphaTarget(0).restart();
      }

      node.fx = null;
      node.fy = null;
    },
    showModuleInfo(moduleData) {
      d3.select("#overlay").attr("display", "block");
      this.viewModuleInfo = true;
      const moduleInfo = this.modulesShown[moduleData.index];

      this.clickedModuleInfo = moduleInfo;
    },
    hideModuleInfo(hideInfo) {
      this.viewModuleInfo = hideInfo;
      this.clickedModuleInfo = null;
    },
    getRelatedNodesAndLinks(module) {
      this.defaultGraph();
      const relatedNodes = [];
      relatedNodes.push(module);

      const allLinks = this.simulation.force("link").links();
      allLinks.forEach((link) => {
        if (link.source === module || link.target === module) {
          if (!relatedNodes.find((nodes) => nodes === link.source)) {
            relatedNodes.push(link.source);
          }
          if (!relatedNodes.find((nodes) => nodes === link.target)) {
            relatedNodes.push(link.target);
          }
        }
      });

      return relatedNodes;
    },
    showRelatedModules(module) {
      const nodes = this.getRelatedNodesAndLinks(module);

      this.graph.selectAll("path").classed("faded", true);
      this.graph
        .selectAll("path")
        .filter((link) => link.source === module || link.target === module)
        .classed("highlight", true);

      this.graph.selectAll("circle").classed("faded", true);
      this.graph
        .selectAll("circle")
        .filter((node) => nodes.indexOf(node) > -1)
        .classed("highlight", true);

      this.graph.selectAll("text").classed("faded", true);
      this.graph
        .selectAll("text")
        .filter((node) => nodes.indexOf(node) > -1)
        .classed("highlight", true);

      this.simulation.alphaTarget(0).restart();
    },
    defaultGraph() {
      this.graph
        .selectAll("path")
        .classed("faded", false)
        .classed("highlight", false);
      this.graph
        .selectAll("circle")
        .classed("faded", false)
        .classed("highlight", false);
      this.graph
        .selectAll("text")
        .classed("faded", false)
        .classed("highlight", false);

      this.simulation.restart();
    },
    showFilteredModules() {
      // Reset classes of nodes
      this.defaultGraph();

      if (!defaultSettings(this.filtered)) {
        const filteredNodes = [];

        this.modulesShown.forEach((module) => {
          const fulfilFilterOptions =
            filterLevel(module, this.filtered.level) &&
            filterFaculty(module, this.filtered.faculty) &&
            filterNumOfMCs(module, this.filtered.numOfMCs) &&
            filterExam(module, this.filtered.exams);

          if (fulfilFilterOptions) {
            filteredNodes.push(module);
          }
        });

        this.graph.selectAll("path").classed("faded", true);
        this.graph
          .selectAll("path")
          .filter((link) => {
            const source = this.modulesShown[link.source.index];
            const target = this.modulesShown[link.target.index];

            return (
              filteredNodes.indexOf(source) > -1 &&
              filteredNodes.indexOf(target) > -1
            );
          })
          .classed("highlight", true);

        this.graph.selectAll("circle").classed("faded", true);
        this.graph
          .selectAll("circle")
          .filter((node) => {
            const module = this.modulesShown[node.index];
            return filteredNodes.indexOf(module) > -1;
          })
          .classed("highlight", true);

        this.graph.selectAll("text").classed("faded", true);
        this.graph
          .selectAll("text")
          .filter((node) => {
            const module = this.modulesShown[node.index];
            return filteredNodes.indexOf(module) > -1;
          })
          .classed("highlight", true);

        this.simulation.alphaTarget(0).restart();
      } else {
        this.defaultGraph();
      }
    },
    openLegend() {
      document.getElementById("legend").style.display = "block";
    },
    deleteModule() {
      const moduleToDelete = this.clickedModuleInfo.moduleCode;

      this.$emit("delete-module", moduleToDelete);

      this.hideModuleInfo();
    },
  },
  watch: {
    links: {
      handler() {
        this.updateSimulation();
      },
    },
    nodes: {
      handler() {
        this.updateSimulation();
      },
    },
    forceProperties: {
      handler() {
        this.setForceProperties();
      },
    },
    filtered: {
      handler() {
        this.showFilteredModules();
      },
    },
  },
};
</script>

<style>
#test-graph {
  width: 100%;
  height: 100vh;
}

text {
  font: 20px san-serif;
  color: black;
}

circle {
  stroke: black;
  stroke-width: 3;
}

.level1 {
  fill: #ff828c;
}

.level2 {
  fill: #fac292;
}

.level3 {
  fill: #fdf4ab;
}

.level4 {
  fill: #e2f0cb;
}

.level5 {
  fill: #b5ead7;
}

.level6 {
  fill: #aab3f3;
}

.level8 {
  fill: #dbb5f7;
}

path {
  marker-end: url(#arrow);
  stroke: black;
  stroke-width: 2px;
}

.andor0 {
  stroke: #fe6b64;
}

.andor1 {
  stroke: #02a566;
}

.andor2 {
  stroke: #6b34ec;
}

.andor3 {
  stroke: #a03567;
}

.and {
  stroke-dasharray: 10;
}

.faded {
  opacity: 0.2;
}

.highlight {
  opacity: 1;
}

.added {
  stroke: rgb(231, 97, 19);
  stroke-width: 5px;
}

.legend-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: none;
  cursor: pointer;
}
</style>
