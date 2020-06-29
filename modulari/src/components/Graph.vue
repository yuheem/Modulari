<template>
  <div id="Graph" :style="myStyle">
    <h1>Graph</h1>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
export default {
  name: "Graph",
  components: { 
    D3Network
  },
  props: {
    nodes: Array,
    links: Array
  },
  computed: {
    options() {
      return {
        canvas: false,
        force: 6000,
        nodeSize: 25,
        fontSize: 20,
        size: {
          h: 700,
        },
        nodeLabels: true,
        linkLabels: false,
        linkWidth: 2
      }
    }
  },
  data() {
    return {
      myStyle: {
        backgroundColor: "#D3D3D3"
      }
    }
  }
};

</script>

<style src="vue-d3-network/dist/vue-d3-network.css">
</style>
