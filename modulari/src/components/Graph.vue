<template>
  <div id="Graph">
    <h1>Graph</h1>
    <svg width="1024" height="768">
      <g class="links"></g>
      <g class="nodes"></g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    nodes: Array,
    links: Array
  }
};

</script>

<style scoped>
</style>
