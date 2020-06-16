<template>
  <div>
    <form>
      <input type="text" name="addModules" placeholder="Input module to generate prerequisite tree" />
      <input type="submit" value="+" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddModules"
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

input[type="submit"] {
  flex: 2;
}
</style>