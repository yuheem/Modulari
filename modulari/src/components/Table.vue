<template>
  <div id="tab-content">
    <button @click="editTitle" v-if="edit">
      <i class="fas fa-pen"></i>
    </button>

    <button @click="editTitle" v-if="!edit">
      <i class="fas fa-check"></i>
    </button>

    <v-text-field
      v-model="table.title"
      color="#FFFFFF"
      placeholder="Name this planner"
      dark
      :disabled="edit"
    ></v-text-field>

    <v-alert v-if="alert" type="warning" dense color="#ff0026" outlined
      >This title already exists.</v-alert
    >

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
  props: ["table", "tables"],
  data() {
    return {
      modulesToTake: [
        { id: 0, module: "" },
        { id: 1, module: "" },
        { id: 2, module: "" },
        { id: 3, module: "" },
        { id: 4, module: "" },
      ],
      edit: true,
      alert: false,
    };
  },
  methods: {
    addTextBox() {
      const id = this.modulesToTake.length;
      const newTextBox = { id: id, module: "" };
      this.modulesToTake.push(newTextBox);
    },
    removeTextBox() {
      this.modulesToTake.pop();
    },
    editTitle() {
      if (this.noRepeatedTitles(this.table.title) && !this.edit) {
        this.alert = true;
      } else {
        this.alert = false;
        this.edit = !this.edit;
        return this.edit;
      }
    },
    noRepeatedTitles(inputTitle) {
      const validate = this.tables.some(
        (tab) => tab.title === inputTitle && tab.id !== this.table.id
      );
      console.log(validate);
      return validate;
    },
  },
};
</script>

<style scoped>
#tab-content {
  background: rgba(2, 21, 126, 0.842);
  padding: 5px;
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

button {
  float: right;
  color: white;
  margin: 20px 0px 0px 0px;
}
</style>
