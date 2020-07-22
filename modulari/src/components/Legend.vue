<template>
  <div id="legend">
    <button @click="closeLegend()" style="float: right">
      <i class="fas fa-times"></i>
    </button>

    <div style="display: flex">
      <div class="box">
        <svg width="100%" height="100%">
          <circle class="level1" r="25" cx="50" cy="50" />
          <text class="legendText" x="89" y="55">Level 1000 modules</text>

          <circle class="level2" r="25" cx="300" cy="50" />
          <text class="legendText" x="339" y="55">Level 2000 modules</text>

          <circle class="level3" r="25" cx="50" cy="150" />
          <text class="legendText" x="89" y="155">Level 3000 modules</text>

          <circle class="level4" r="25" cx="300" cy="150" />
          <text class="legendText" x="339" y="155">Level 4000 modules</text>

          <circle class="level5" r="25" cx="50" cy="250" />
          <text class="legendText" x="89" y="255">Level 5000 modules</text>

          <circle class="level6" r="25" cx="300" cy="250" />
          <text class="legendText" x="339" y="255">Level 6000 modules</text>

          <circle class="level8" r="25" cx="50" cy="350" />
          <text class="legendText" x="89" y="355">Level 8000 modules</text>

          <circle class="added" r="25" cx="300" cy="350" />
          <text class="legendText" x="339" y="355">Modules added</text>

          <rect
            class="info"
            width="100"
            height="150"
            rx="10"
            ry="10"
            x="25"
            y="400"
          />
          <text style="font: 15px san-serif" x="35" y="440">Module code</text>
          <text style="font: 15px san-serif" x="60" y="460">Title</text>
          <text style="font: 15px san-serif" x="45" y="480">Exam info</text>
          <text style="font: 15px san-serif" x="50" y="500">SU info</text>
          <text style="font: 15px san-serif" x="35" y="520">Prerequisites</text>

          <text class="legendText" style="font-size: 18px" x="140" y="475">
            Click on circles to view module information
          </text>
        </svg>
      </div>
      <div class="box">
        <svg width="100%" height="100%">
          <!-- Illustrate either or modules, represented as solid arrows -->
          <path d="M 170 150 L 120 50" />
          <path d="M 70 150 L 120 50" />
          <circle class="level1" r="25" cx="70" cy="150" />
          <circle class="level1" r="25" cx="170" cy="150" />
          <circle class="level2" r="25" cx="120" cy="50" />
          <text x="113" y="55">A</text>
          <text x="63" y="155">B</text>
          <text x="163" y="155">C</text>
          <text class="legendText" x="60" y="210">Either or arrows</text>
          <text class="legendText" x="25" y="240">
            (A requires either B or C)
          </text>

          <!-- Illustrate and modules, represented as dashed arrows -->
          <path class="and" d="M 420 150 L 370 50" />
          <path class="and" d="M 320 150 L 370 50" />
          <circle class="level5" r="25" cx="320" cy="150" />
          <circle class="level5" r="25" cx="420" cy="150" />
          <circle class="level6" r="25" cx="370" cy="50" />
          <text x="363" y="55">A</text>
          <text x="313" y="155">B</text>
          <text x="413" y="155">C</text>
          <text class="legendText" x="325" y="210">And arrows</text>
          <text class="legendText" x="273" y="240">
            (A requires both B and C)
          </text>

          <!-- Illustrate and-or modules, represented as coloured dashed arrows -->
          <path class="andor3 and" d="M 70 450 L 245 300" />
          <path class="andor3 and" d="M 170 450 L 245 300" />
          <path d="M 245 450 L 245 300" />
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
          <text class="legendText" x="160" y="510">Coloured "And" arrows</text>
          <text class="legendText" x="65" y="540">
            only one module in each coloured set is required
          </text>
          <text class="legendText" x="55" y="570">
            (A requires just D or, either B or C and either E or F)
          </text>
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
    },
  },
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
  width: 550px;
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
  font-size: 17px;
  font-family: sans-serif;
}

.info {
  fill: #ccccccac;
  stroke: black;
  stroke-width: 3px;
}</style
>>
