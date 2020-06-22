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

button[type="submit"] {
  width: 10px;
  padding: 12px 20px;
  margin: 8px 0;
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>