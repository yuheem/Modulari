<template>
  <div>
    <svg width="100%" height="100vh" id="test-graph" v-if="nodes.length !== 0">
      <!-- <rect></rect> -->
      <defs>
        <marker
          id="arrow"
          viewBox="0 -5 10 10"
          refX="30"
          refY="0"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,-5 L10,0 L0,5" />
        </marker>
      </defs>

      <g id="links">
        <path
          v-for="link in links"
          :key="link.index"
          marker-end="url(#arrow)"
          stroke="grey"
          stroke-width="1.5px"
          v-bind:d="
            `M ${link.source.x},${link.source.y} L ${link.target.x},${link.target.y}`
          "
        />
      </g>

      <g v-for="node in nodes" :key="node.name">
        <circle fill="lightblue" v-bind:transform="`translate(${node.x},${node.y})`" r="20" />
        <text
          font="10px san-serif"
          color="black"
          x="0"
          y="0.31em"
          text-anchor="middle"
          v-bind:transform="`translate(${node.x},${node.y})`"
        >{{node.name}}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3-force";

export default {
  name: "TestGraph",
  props: ["nodes", "links"],
  data() {
    return {
      simulation: null,
      forceProperties: {
        charge: {
          strength: -300,
          distanceMin: 100,
          distanceMax: 200
        },
        collide: {
          strength: 0.7,
          iterations: 1,
          radius: 35
        },
        forceX: {
          strength: 0.1,
          x: 0.5
        },
        forceY: {
          strength: 0.35,
          y: 0.5
        },
        link: {
          enabled: true,
          distance: 100,
          iterations: 1
        }
      }
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
  },
  methods: {
    updateSimulation() {
      this.simulation.nodes(this.nodes);
      this.simulation.force("link").links(this.links);
      console.log("yay");
    },
    setForceProperties() {
      const element = document.getElementById("test-graph");
      const width = element.getBoundingClientRect().width;
      const height = element.getBoundingClientRect().height;

      this.simulation
        .force("center")
        .x(width / 2)
        .y(height / 2);

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
        .x(width / 2);
      this.simulation
        .force("y")
        .strength(this.forceProperties.forceY.strength)
        .y(height / 2);

      console.log("settings done");

      this.simulation.alpha(1).restart();

      console.log("simulation restart");
    }
  },
  watch: {
    nodes: {
      handler() {
        this.updateSimulation();
        this.setForceProperties();
      }
    },
    forceProperties: {
      handler() {
        this.setForceProperties;
      }
    }
  }
};
</script>

<style scoped>
#test-graph {
  width: 100%;
  height: 100vh;
}

text {
  font: 10px san-serif;
  color: black;
}
</style>
