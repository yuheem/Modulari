<template>
  <div id="legend">
    <button @click="closeLegend()" style="float: right">
      <i class="fas fa-times"></i>
    </button>

    <div style="display: flex">
      <div class="box">
        <svg width="100%" height="100%">
          <circle class="level1" r="25" cx="50" cy="50" />
          <text class="legendText" x="89" y="55">Level 1 modules</text>

          <circle class="level2" r="25" cx="300" cy="50" />
          <text class="legendText" x="339" y="55">Level 2 modules</text>

          <circle class="level3" r="25" cx="50" cy="150" />
          <text class="legendText" x="89" y="155">Level 3 modules</text>

          <circle class="level4" r="25" cx="300" cy="150" />
          <text class="legendText" x="339" y="155">Level 4 modules</text>

          <circle class="level5" r="25" cx="50" cy="250" />
          <text class="legendText" x="89" y="255">Level 5 modules</text>

          <circle class="level6" r="25" cx="300" cy="250" />
          <text class="legendText" x="339" y="255">Level 6 modules</text>

          <circle class="level8" r="25" cx="50" cy="350" />
          <text class="legendText" x="89" y="355">Level 8 modules</text>

          <circle class="added" r="25" cx="50" cy="450" />
          <text class="legendText" x="89" y="455">Nodes highlighted red indicate modules added</text>

          <text
            class="legendText"
            style="font-size: 25px"
            x="10"
            y="550"
          >Click on nodes to view module information:)</text>
        </svg>
      </div>
      <div class="box">
        <svg width="100vh" height="100%">
          <!-- Illustrate either or modules, represented as solid arrows -->
          <path d="M 170 150 L 120 50" />
          <path d="M 70 150 L 120 50" />
          <circle class="level1" r="25" cx="70" cy="150" />
          <circle class="level1" r="25" cx="170" cy="150" />
          <circle class="level2" r="25" cx="120" cy="50" />
          <text x="113" y="55">A</text>
          <text x="63" y="155">B</text>
          <text x="163" y="155">C</text>
          <text class="legendText" x="53" y="210">Either or arrows</text>
          <text class="legendText" x="13" y="240">(A requires either B or C)</text>

          <!-- Illustrate and modules, represented as dashed arrows -->
          <path class="and" d="M 420 150 L 370 50" />
          <path class="and" d="M 320 150 L 370 50" />
          <circle class="level5" r="25" cx="320" cy="150" />
          <circle class="level5" r="25" cx="420" cy="150" />
          <circle class="level6" r="25" cx="370" cy="50" />
          <text x="363" y="55">A</text>
          <text x="313" y="155">B</text>
          <text x="413" y="155">C</text>
          <text class="legendText" x="318" y="210">And arrows</text>
          <text class="legendText" x="263" y="240">(A requires both B and C)</text>

          <!-- Illustrate and-or modules, represented as coloured dashed arrows -->
          <path class="andor3 and" d="M 70 450 L 245 300" />
          <path class="andor3 and" d="M 170 450 L 245 300" />
          <path class="and" d="M 245 450 L 245 300" />
          <path class="andor1 and" d="M 320 450 L 245 300" />
          <path class="andor1 and" d="M 420 450 L 245 300" />
          <circle class="level4" r="25" cx="70" cy="450" />
          <circle class="level4" r="25" cx="170" cy="450" />
          <circle class="level4" r="25" cx="245" cy="450" />
          <circle class="level5" r="25" cx="320" cy="450" />
          <circle class="level5" r="25" cx="420" cy="450" />
          <circle class="level8" r="25" cx="245" cy="300" />
          <text x="238" y="305">A</text>
          <text x="63" y="455">B</text>
          <text x="163" y="455">C</text>
          <text x="238" y="455">D</text>
          <text x="313" y="455">E</text>
          <text x="413" y="455">F</text>
          <text class="legendText" x="145" y="510">Coloured "And" arrows</text>
          <text class="legendText" x="35" y="540">only one module in each coloured set is required</text>
          <text class="legendText" x="50" y="570">(A requires either B or C, either E or F, and D)</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  methods: {
    closeLegend() {
      document.getElementById("legend").style.display = "none";
    }
  }
};
</script>

<style scoped>
#legend {
  /* display: none; */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.726);
  z-index: 2;
}

button {
  cursor: pointer;
  float: right;
  border: 0;
  background: none;
  color: bisque;
  padding: 15px 25px;
}

.box {
  /* position: absolute; */
  width: 500px;
  height: 100vh;
  /* background: #1b1b1bac; */
  outline-color: blanchedalmond;
  margin: 30px;
  border: rgba(255, 255, 255, 0.658) 3px solid;
  padding: 10px;
  border-radius: 20px;
}

.legendText {
  fill: bisque;
  font-size: 20px;
  font-family: sans-serif;
}
</style>>