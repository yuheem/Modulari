<template>
  <div>
    <button class="table-button" @click="openTable()">
      <i class="fas fa-table"></i>
    </button>

    <div id="table">
      <button @click="closeTable()" style="float: right">
        <i class="fas fa-times"></i>
      </button>

      <h3>Module planner</h3>

      <v-tabs
        v-model="tab"
        show-arrows
        height="30px"
        background-color="rgba(0, 0, 0, 0)"
        color="#FFFFFF"
        dark
      >
        <v-tab v-for="table in tables" :key="table.id">
          <Tab :tab="table" v-on:delete-tab="closeTab" />
        </v-tab>

        <button @click="addTab()" style="float: right">+</button>
      </v-tabs>

      <p v-if="this.tables.length === 0">
        -Press the plus button to create a new planner-
      </p>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="table in tables"
          :key="table.id"
          transition="false"
          reverse-transition="false"
        >
          <Table :table="table" :tables="tables" v-on:apply="emitToGraph" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import Tab from "./Tab";

export default {
  name: "Planner",
  components: {
    Table,
    Tab,
  },
  data() {
    return {
      tab: null,
      tables: [
        { id: 0, title: "Sem 1" },
        { id: 1, title: "Sem 2" },
      ],
    };
  },
  methods: {
    closeTable() {
      document.getElementById("table").style.display = "none";
    },
    openTable() {
      document.getElementById("table").style.display = "block";
    },
    closeTab(tab) {
      this.tables = this.tables.filter((table) => table.id !== tab);
    },
    addTab() {
      const newTab = { id: Math.random(), title: "" };
      this.tables.push(newTab);
    },
    emitToGraph(modules) {
      this.$emit("apply", modules);
    },
  },
};
</script>

<style scoped>
#table {
  display: none;
  position: absolute;
  top: 20px;
  right: 16px;
  width: 350px;
  background: rgba(2, 21, 126, 0.842);
  outline-color: black;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}

button {
  color: white;
}

h3 {
  color: white;
  font-size: 20px;
  margin: 0px 0px 10px 0px;
  text-align: center;
}

.table-button {
  position: absolute;
  top: 10px;
  right: 35px;
  border: 0;
  background: none;
  color: #3f7e69;
  cursor: pointer;
}

p {
  color: rgba(255, 255, 255, 0.815);
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
}
</style>
