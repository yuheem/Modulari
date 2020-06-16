<template>
  <div id="add-modules">
    <form @submit="addModule">
      <input
        type="text"
        v-model="moduleCode"
        name="moduleCode"
        placeholder="Input the module code to generate prerequisite tree"
      />
      <input type="submit" value="+" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddModules",
  data() {
    return {
      moduleCode: ""
    };
  },
  methods: {
    addModule(event) {
      event.preventDefault();
      let moduleToBeAdded = this.moduleCode;

      // Send module code to parent
      this.$emit("add-module", moduleToBeAdded);

      // Clear input text
      this.moduleCode = "";
    }
  }
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