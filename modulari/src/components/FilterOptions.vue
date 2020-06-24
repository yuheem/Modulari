<template>
  <div id="filter-options">
    <form @submit="filterModules">
      <ul>
        <!-- Filter modules by level -->
        <li>
          <label for="level">Level:</label>
          <select v-model="level" name="level">
            <option selected>{{NO_FILTER}}</option>
            <option v-for="lvl in levelOptions" v-bind:key="lvl.id">{{lvl.level}}</option>
          </select>
        </li>

        <!-- Filter modules by faculty -->
        <li>
          <label for="faculty">Faculty:</label>
          <select v-model="faculty" name="faculty">
            <option selected>{{NO_FILTER}}</option>
            <option v-for="fac in facultyOptions" :key="fac.id">{{fac.faculty}}</option>
          </select>
        </li>

        <!-- Filter modules by number of MCs -->
        <li>
          <label for="numOfMCs">Number of MCs:</label>
          <select v-model="numOfMCs" name="numOfMCs">
            <option selected>{{NO_FILTER}}</option>
            <option v-for="mc in numOfMCsOptions" v-bind:key="mc.id">{{mc.MCs}}</option>
          </select>
        </li>

        <!-- Filter modules by whether modules is examinable -->
        <li>
          <label for="exams">Exams:</label>
          <select v-model="exams" name="exams">
            <option selected>{{NO_FILTER}}</option>
            <option>No Exams</option>
          </select>
        </li>
      </ul>

      <input type="submit" value="Filter" />
    </form>
  </div>
</template>

<script>
export default {
  name: "FilterOptions",
  data() {
    return {
      NO_FILTER: "No filter",
      level: "",
      faculty: "",
      numOfMCs: "",
      exams: "",
      levelOptions: [
        { id: 1, level: "1000" },
        { id: 2, level: "2000" },
        { id: 3, level: "3000" },
        { id: 4, level: "4000" },
        { id: 5, level: "5000" },
        { id: 6, level: "6000" },
        { id: 7, level: "7000" },
        { id: 8, level: "8000" }
      ],
      facultyOptions: [
        { id: 1, faculty: "Arts and Social Science" },
        { id: 2, faculty: "Computing" },
        { id: 3, faculty: "Cont and Lifelong Education" },
        { id: 4, faculty: "Dentistry" },
        { id: 5, faculty: "Design and Environment" },
        { id: 6, faculty: "Duke-NUS Medical School" },
        { id: 7, faculty: "Engineering" },
        { id: 8, faculty: "Institute of Systems Science" },
        { id: 9, faculty: "Law" },
        { id: 10, faculty: "LKY School and Public Policy" },
        { id: 11, faculty: "Logistics Inst-Asia Pac" },
        { id: 12, faculty: "Multi Disciplinary Programme" },
        { id: 13, faculty: "NUS" },
        { id: 14, faculty: "NUS Business School" },
        { id: 15, faculty: "Residential College" },
        { id: 16, faculty: "Risk Management Institute" },
        { id: 17, faculty: "Science" },
        { id: 18, faculty: "SSH School of Public Health" },
        { id: 19, faculty: "Temasek Defence Sys. Institute" },
        { id: 20, faculty: "University Scholars Programme" },
        { id: 21, faculty: "Yale-NUS College" },
        { id: 22, faculty: "Yong Loo Lin Sch of Medicine" },
        { id: 23, faculty: "YST Conservatory of Music" }
      ],
      numOfMCsOptions: [
        { id: 1, MCs: "0-3 MCs" },
        { id: 2, MCs: "4 MCs" },
        { id: 3, MCs: "5-8 MCs" },
        { id: 4, MCs: "More than 8 MCs" }
      ]
    };
  },
  methods: {
    filterModules(event) {
      event.preventDefault();
      let filterDetails = {
        filteredLevel: this.level,
        filteredFaculty: this.faculty,
        filteredNumOfMCs: this.numOfMCs,
        filteredExams: this.exams
      };

      // Send filter details up to parent
      this.$emit("filter-modules", filterDetails);
    }
  },
  created() {
    this.level = this.NO_FILTER;
    this.faculty = this.NO_FILTER;
    this.numOfMCs = this.NO_FILTER;
    this.exams = this.NO_FILTER;
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

label {
  display: block;
}

select {
  display: block;
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgb(241, 239, 216);
}
</style>>