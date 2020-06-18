<template>
  <div id="sidebar">
    <button id="closeSidebar" @click="closeSidebar()">x</button>
    <h4>Filter by:</h4>
    <form @submit="filter">
      <ul>
        <li>
          <label for="level">Level:</label>
          <input type="text" name="level" placeholder="No filter" />
        </li>
        <li>
          <label for="faculty">Faculty:</label>
          <input type="text" name="faculty" placeholder="No filter" />
        </li>
        <li>
          <label for="numOfMCs">Number of MCs:</label>
          <input type="text" name="numOfMCs" placeholder="No filter" />
        </li>
        <li>
          <label for="exams">Exams:</label>
          <input type="text" name="exams" placeholder="No filter" />
        </li>
      </ul>

      <input type="submit" value="Filter" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      level: "",
      faculty: "",
      numOfMCs: "",
      exams: ""
    };
  },
  methods: {
    closeSidebar() {
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("openSidebar").style.display = "inline-block";
    }
  }
};
</script>

<style scoped>
#sidebar {
  display: none;
}
ul {
  list-style: none;
  padding: 0px;
}
button {
  cursor: pointer;
  float: right;
}

input[type="submit"] {
  float: right;
}
</style>