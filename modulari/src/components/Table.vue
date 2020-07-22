<template>
  <div id="table">
    <button @click="closeTable()" style="float: right">
      <i class="fas fa-times"></i>
    </button>

    <h3>Module planner</h3>

    <v-tabs
      height="30px"
      background-color="rgba(0, 0, 0, 0)"
      color="#FFFFFF"
      dark
    >
      <v-tab v-for="n in 3" :key="n">{{ n }}</v-tab>
    </v-tabs>

    <p v-if="this.modulesToTake.length === 0">
      -Press the plus button below to add modules-
    </p>

    <v-container style="margin: 10px 0px">
      <v-row dense>
        <v-col v-for="input in modulesToTake" :key="input.id" cols="6">
          <v-text-field
            v-model="input.module"
            color="#FFFFFF"
            dense
            placeholder="Module code"
            outlined
            dark
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-btn @click="addTextBox()" outlined dark rounded class="v-btn">+</v-btn>

    <v-btn @click="removeTextBox()" outlined dark rounded class="v-btn"
      >-</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      modulesToTake: [
        { id: 0, module: "" },
        { id: 1, module: "" },
        { id: 2, module: "" },
        { id: 3, module: "" },
        { id: 4, module: "" },
      ],
    };
  },
  methods: {
    closeTable() {
      document.getElementById("table").style.display = "none";
    },
    addTextBox() {
      const id = this.modulesToTake.length;
      const newTextBox = { id: id, module: "" };
      this.modulesToTake.push(newTextBox);
    },
    removeTextBox() {
      this.modulesToTake.pop();
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
  /* border: grey 3px solid; */
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

.v-btn {
  margin: 5px;
  float: right;
}

p {
  color: rgba(255, 255, 255, 0.815);
  text-align: center;
  margin-top: 50px;
}
</style>
