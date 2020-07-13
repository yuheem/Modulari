<template>
  <div id="overlay" v-if="this.viewModuleInfo">
    <button @click="closeModuleInfo()" style="float: right">
      <i class="fas fa-times"></i>
    </button>
    <p>{{this.moduleInfo.moduleCode}}</p>
    <p>{{this.moduleInfo.title}}</p>
    <p>{{`Number of MCs: ${this.moduleInfo.moduleCredit}`}}</p>
    <p>{{'Exam: '}}</p>

    <p v-if="checkSU()">
      <i class="far fa-check-circle" style="color: #77DD77"></i>
      Has SU option
    </p>
    <p v-else>
      <i class="far fa-times-circle" style="color: #FE6B64"></i>
      Has no SU option
    </p>
    <p>
      <a href="https:nusmods.com">Click me</a>
      to find out more about the module test test test
    </p>
  </div>
</template>

<script>
export default {
  name: "ModuleInfo",
  props: ["moduleInfo", "viewModuleInfo"],
  methods: {
    closeModuleInfo() {
      document.getElementById("overlay").style.display = "none";
      const hideInfo = !this.viewModuleInfo;

      this.$emit("hide-module-info", hideInfo);
    },
    checkSU() {
      return "attributes" in this.moduleInfo;
    }
  }
};
</script>

<style scoped>
#overlay {
  /* display: none; */
  position: absolute;
  top: 16px;
  left: 16px;
  width: 250px;
  height: 300px;
  background: #ccccccac;
  outline-color: black;
  margin: 10px;
  border: rgba(0, 0, 0, 0.658) 3px solid;
  padding: 10px;
  border-radius: 20px;
}

button {
  border: 0;
  background: none;
}

p {
  line-height: 1.5em;
}

.info {
  width: 200px;
  height: 300px;
  fill: #ccccccac;
  stroke: black;
  margin: 10px;
}

.texts {
  /* display: block; */
  font-size: small;
  /* width: 200px; */
  max-inline-size: 200px;
}

a {
  font-family: sans-serif;
}
</style>