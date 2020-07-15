<template>
  <div id="overlay" v-if="this.viewModuleInfo">
    <button @click="closeModuleInfo()" style="float: right">
      <i class="fas fa-times"></i>
    </button>
    <p>{{this.moduleInfo.moduleCode}}</p>
    <p>{{this.moduleInfo.title}}</p>
    <p>{{`Number of MCs: ${this.moduleInfo.moduleCredit}`}}</p>
    <p>{{`Exam: ${this.getExamInfo(this.moduleInfo)}`}}</p>

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
      to find out more about the module
    </p>
  </div>
</template>

<script>
import { format } from "date-fns";

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
    },
    getExamInfo(moduleInfo) {
      if (moduleInfo.semesterData.length === 0) {
        return "Exam information not available for the current semester";
      }

      const examinable = "examDate" in moduleInfo.semesterData[0];

      // If module is examinable, retrieve the date of the exam and convert it from ISO to long date format
      if (examinable) {
        const examDate = moduleInfo.semesterData[0].examDate;
        const longExamDate = format(new Date(examDate), "d MMMM yyyy");
        return longExamDate;
      }

      // If module is non-examinable
      return "No exam";
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
  height: 320px;
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

a {
  font-family: sans-serif;
}
</style>