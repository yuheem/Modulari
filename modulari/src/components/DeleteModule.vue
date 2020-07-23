<template>
  <div>
    <button @click="checkValidModule()" class="delete-button">
      <i class="far fa-trash-alt"></i>
    </button>

    <v-snackbar v-model="alert" timeout="-1" dense multi-line>
      {{"No module detected." + "\n" + "Click on a module in the graph before clicking me to delete the module."}}
      <button
        @click="alert = false"
        style="margin: 5px"
      >
        <i class="far fa-times-circle fa-lg"></i>
      </button>
    </v-snackbar>

    <v-snackbar v-model="confirm" timeout="-1" dense top>
      {{`Delete module ${this.module}?`}}
      <button
        @click="confirm = false"
        class="do-not-confirm-button"
      >
        <i class="far fa-times-circle fa-lg"></i>
      </button>

      <button @click="deleteModule()" class="confirm-button">
        <i class="far fa-check-circle fa-lg"></i>
      </button>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "DeleteModule",
  props: ["moduleToDelete"],
  data() {
    return {
      alert: false,
      confirm: false,
      module: "",
    };
  },
  methods: {
    checkValidModule() {
      if (this.moduleToDelete) {
        this.module = this.moduleToDelete.moduleCode;
        this.alert = false;
        this.confirm = true;
      } else {
        this.alert = true;
      }
    },
    deleteModule() {
      this.confirm = false;

      this.$emit("delete-module");
    },
  },
};
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 10px;
  right: 60px;
  border: 0;
  background: none;
  color: #f33737;
  cursor: pointer;
}

.confirm-button {
  float: right;
  margin: 5px;
  color: #00ff00;
}

.do-not-confirm-button {
  float: right;
  margin: 5px;
  color: #ff0026;
}
</style>>