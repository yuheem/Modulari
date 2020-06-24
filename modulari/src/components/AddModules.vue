<template>
  <div id="add-modules">
    <form @submit="addModule">
      <input
        type="text"
        v-model="moduleCode"
        name="moduleCode"
        placeholder="Input the module code to generate prerequisite tree"
      />
      <button type="submit" class="fas fa-plus"></button>
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
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 100;
  padding: 12px 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  flex: 2;
  padding: 12px 20px;
  margin: 8px 0;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>