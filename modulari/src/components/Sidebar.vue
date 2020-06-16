<template>
  <div id="sidebar">
    <h4>Filter by:</h4>
    <form>
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
  }
};
</script>

<style scoped>
#sidebar {
  min-width: 250px;
  max-width: 250px;
}
ul {
  list-style: none;
}
</style>