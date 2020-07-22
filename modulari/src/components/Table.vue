<template>
  <div>
    <form id="table">
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Table",
};
</script>

<style scoped>
#table {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
  position: absolute;
  top: 20px;
  right: 16px;
  width: 250px;
  background: rgba(117, 75, 75, 0.842);
  outline-color: black;
  margin: 10px;
  border: black 2px solid;
  padding: 10px;
  border-radius: 5px;
}

input[type="text"] {
  width: 100px;
  margin: 5px;
  /* border-bottom: black solid; */
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid;
  color: white;
}

::placeholder {
  color: white;
  opacity: 0.7;
}
</style>>