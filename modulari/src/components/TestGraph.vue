<template>
  <div>
    <svg width="100%" height="100vh" id="test-graph">
      <defs>
        <marker
          id="arrow"
          viewBox="0 -5 10 10"
          refX="60"
          refY="0"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,-5 L10,0 L0,5" />
        </marker>
      </defs>
      <rect width="100%" height="100vh" fill="blanchedalmond" />
      <g />
    </svg>
  </div>
</template>

<script>
// try using the entire d3
import * as d3 from "d3";

export default {
  name: "TestGraph",
  props: ["nodes", "links"],
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
          distanceMax: 2000
        },
        collide: {
          strength: 0.7,
          iterations: 1,
          radius: 100
        },
        forceX: {
          strength: 0.1,
          x: 0.5
        },
        forceY: {
          strength: 0.2,
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
      const nodeCoord = node => {
        return "translate(" + node.x + "," + node.y + ")";
      };
      const linkCoord = link => {
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

      this.graph.selectAll("path").remove();
      this.graph
        .selectAll("path")
        .data(this.simulation.force("link").links())
        .join("path")
        .attr("marker-end", "url(#arrow)")
        .attr("stroke", "grey")
        .attr("stoke-width", "1.5px");

      this.graph.selectAll("circle").remove();
      this.graph
        .selectAll("circle")
        .data(this.simulation.nodes())
        .join("circle")
        .attr("fill", "lightblue")
        .attr("r", "30")
        .call(
          d3
            .drag()
            .on("start", this.nodeDragStart)
            .on("drag", this.nodeDrag)
            .on("end", this.nodeDragEnd)
        );

      this.graph.selectAll("text").remove();
      this.graph
        .selectAll("text")
        .data(this.simulation.nodes())
        .join("text")
        .attr("color", "black")
        .attr("font", "10px san-serif")
        .attr("x", "0")
        .attr("y", "0.31em")
        .attr("text-anchor", "middle")
        .text(d => d.name);

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
    }
  },
  watch: {
    nodes: {
      handler() {
        this.updateSimulation();
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
