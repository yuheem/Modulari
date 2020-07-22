<template>
  <div id="table">
    <v-tabs height="30px" background-color="rgba(0, 0, 0, 0)" color="#FFFFFF">
      <v-tab v-for="n in 3" :key="n">{{ n }}</v-tab>
    </v-tabs>
    <v-container>
      <v-row>
        <v-col v-for="n in 4" :key="n" cols="6">
          <v-text-field
            color="#FFFFFF"
            dense="true"
            placeholder="Module code"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <!-- <form>
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
      <input type="text" placeholder="module code" />
    </form> -->
  </div>
</template>

<script>
export default {
  name: "Table",
};
</script>

<style scoped>
#table {
  /* display: grid;
  grid-template-columns: auto auto; */
  /* justify-content: space-evenly; */
  position: absolute;
  top: 20px;
  right: 16px;
  width: 350px;
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
}</style
>>
