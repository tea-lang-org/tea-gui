<template>
  <div>
    <div id="study">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <h1 v-if="$store.tea_data.length != 0" class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Now for some add-ins...</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%  height:35%" /-->
      <b-row align-h="center">
        <b-col cols="4">
          <b-form-select v-if="$store.tea_data.length != 0" class="mb-4 mt-4" v-model="study_type" :options="sd_options" @change="updateVars"></b-form-select>
          <!-- <div class="mt-3">Selected: <strong>{{study_design}}</strong></div> -->
        </b-col>
      </b-row>    
      <b-row align-h="center" v-if="study_type">
        <b-col cols="4">
          <b-row class="mt-1" align-h="center"><strong>{{leftLabel}}</strong></b-row>
          <b-row align-h="center">
            <b-form-group
              class="mb-4 mt-1"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-model="left_vars"
                :options="vars"
                :aria-describedby="ariaDescribedby"
                stacked
                style="text-align:left "
                @change="updateLeftVars"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-row>
          <!-- <div class="mt-3">Selected: <strong>{{left_vars}}</strong></div> -->
        </b-col>
        <b-col cols="4">
          <b-row class="mt-1" align-h="center"><strong>{{rightLabel}}</strong></b-row>
          <b-row align-h="center">
            <b-form-group
              class="mb-4 mt-1"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-model="right_vars"
                :options="vars"
                :aria-describedby="ariaDescribedby"
                stacked
                style="text-align:left "
                @change="updateRightVars"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-row>
          <!-- <div class="mt-3">Selected: <strong>{{right_vars}}</strong></div> -->
        </b-col>
      </b-row>
      <div>
        <b-row align-h="center" v-if="study_type">
          <b-col cols="4">
            <b-row class="mt-2, mb-2" align-h="center"><strong>Current Assumptions:</strong></b-row>
            <b-row v-for="assumption in Object.keys(addedAssumptions)" :key="assumption" align-h="center">
              {{assumption + ": " + addedAssumptions[assumption]}}
              <b-button variant="danger" class="ml-1" size="sm" @click=deleteAssumption(assumption)>x</b-button>
            </b-row>
          </b-col>
          <b-col cols="4">
            <b-row class="mt-2, mb-2" align-h="center"><strong>Add Assumption:</strong></b-row>
            <b-form-select class="mt-2, mb-2" v-model="assumption" :options="assumptionsOptions"></b-form-select>

            <b-form-input v-if="assumption==='Type I (False Positive) Error Rate'" class="mt-2, mb-2" v-model="alpha" placeholder="Enter a value for alpha (0.05 default):"></b-form-input>
            <b-row v-if="assumption==='Type I (False Positive) Error Rate'" class="mt-2, mb-2" align-h="center">Alpha Value: {{alpha}}</b-row>

            <b-form-group
              class="mb-4 mt-1"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-if="assumption==='normal distribution'"
                class="mt-2, mb-2"
                v-model="norm_dist_vars"
                :options="vars"
                :aria-describedby="ariaDescribedby"
                stacked
                style="text-align:left "
              ></b-form-checkbox-group>
              <!-- <b-row v-if="assumption==='normal distribution'" class="mt-2, mb-2" align-h="center">Numeric Variables: {{norm_dist_vars.toString()}}</b-row> -->
            </b-form-group>

            <b-form-group
              class="mb-4 mt-1"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-if="assumption==='log normal distribution'"
                class="mt-2, mb-2"
                v-model="log_norm_dist_vars"
                :options="vars"
                :aria-describedby="ariaDescribedby"
                stacked
                style="text-align:left "
              ></b-form-checkbox-group>
              <!-- <b-row v-if="assumption==='normal distribution'" class="mt-2, mb-2" align-h="center">Numeric Variables: {{norm_dist_vars.toString()}}</b-row> -->
            </b-form-group>
            <b-button v-if="assumption" variant="info" class="mb-5" @click=submitAssumption()>Submit</b-button>
          </b-col>
        </b-row>
      </div>

      <b-button v-if="$store.tea_data.length != 0" variant="info" class="mt-5 mb-5" to="/hypothesize" @click=submit()>Submit</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Study",
  data() {
    return {
      tea_file: "",
      study_design: {},
      study_type: null,
      sd_options: [
        { value: null, text: 'Select a Study Design', disabled: true },
        { value: 'observational study', text: 'Observational' },
        { value: 'experiment',  text: 'Experimental'}
      ],
      leftLabel: "",
      rightLabel: "",
      left_vars: [],
      right_vars: [],
      vars: Object.keys(this.$store.tea_data),

      assumption : null,
      assumptionsOptions: [
        { value: null, text: 'Select an Assumption', disabled: true },
        { value: 'normal distribution', text: 'Normal Distribution' },
        { value: 'log normal distribution',  text: 'Log Normal Distribution'},
        { value: 'groups normally distributed',  text: 'Groups Normally Distributed'},
        { value: 'equal variance', text: 'Equal Variance' },
        { value: 'Type I (False Positive) Error Rate', text: 'Type I (False Positive) Error Rate'},
      ],
      alpha: 0.05,
      norm_dist_vars: [],
      log_norm_dist_vars: [],

      addedAssumptions : {}
    }
  },
  created() {
    if (this.vars.indexOf("") != null) {
      this.vars.splice(this.vars.indexOf(""), 1)
    }
  },
  methods: {
      /*    
        Study type: single select dropdown  can either be observational or experimental
        Contributor variables: checkbox select, can choose from the variables
        Outcome variables: checkbox select, can choose from the variables
      */
    updateVars() {
      if (this.study_type === 'observational study') {
        this.leftLabel = "Contributor Variables:"
        this.rightLabel = "Outcome Variables:"
      }
      else {
        this.leftLabel = "Independent Variables:"
        this.rightLabel = "Dependent Variables:"
      }
      this.left_vars = [] 
      this.right_vars = [] 
      this.$forceUpdate()
    },
    updateRightVars() {
      if (this.right_vars.length > 1 && this.study_type !== 'observational study') {
        this.right_vars.shift()
      }

      // TODO: Fix this  broken.
      if (this.left_vars.indexOf(this.right_vars[0]) !== -1 && this.study_type !== 'observational study') {
        console.log(this.left_vars)
        console.log(this.right_vars)
        this.left_vars.splice(this.left_vars.indexOf(this.right_vars[0]), 1)
      }
      this.$forceUpdate() 
    },
    updateLeftVars() {
      if (this.left_vars.indexOf(this.right_vars[0] !== -1) && this.study_type !== 'observational study') {
        console.log(this.left_vars) 
        console.log(this.right_vars) 
        this.right_vars = [] 
      }
      this.$forceUpdate()
    },
    submitAssumption() {
      if (this.assumption === "Type I (False Positive) Error Rate") {
        this.addedAssumptions["Type I (False Positive) Error Rate"] = this.alpha  
      }
      else if (this.assumption === "normal distribution" && this.norm_dist_vars.length > 0) {
        let valid = true
        let nDistList = [] 
        for (let i = 0; i < this.norm_dist_vars.length; i++) {
          let currAdd = []
          for (let j = 0; j < this.$store.tea_vars.length; j++) {
            if (this.$store.tea_vars[j]['name'] === this.norm_dist_vars[i]) {
              if (this.$store.tea_vars[j]['data type'] === 'nominal' || this.$store.tea_vars[j]['data type'] === 'ordinal') {
                alert("Selected variables must be numeric types!")
                valid = false
              }
              break
            }
          }
          currAdd.push(this.norm_dist_vars[i])
          nDistList.push(currAdd)
        }
        if (valid) {
          this.addedAssumptions["normal distribution"] = nDistList
        }
      }
      else if (this.assumption === "log normal distribution" && this.log_norm_dist_vars.length > 0) {
        let valid = true
        let logNDistList = [] 
        for (let i = 0; i < this.log_norm_dist_vars.length; i++) {
          let currAdd = []
          for (let j = 0; j < this.$store.tea_vars.length; j++) {
            if (this.$store.tea_vars[j]['name'] === this.log_norm_dist_vars[i]) {
              if (this.$store.tea_vars[j]['data type'] === 'nominal' || this.$store.tea_vars[j]['data type'] === 'ordinal') {
                alert("Selected variables must be numeric types!")
                valid = false
              }
              break
            }
          }
          currAdd.push(this.log_norm_dist_vars[i])
          logNDistList.push(currAdd)
        }
        if (valid) {
          this.addedAssumptions["log normal distribution"] = logNDistList
        }
      }
      // else if (this.assumption === "groups normally distributed") {

      // }
      // else if (this.assumption === "equal variance") {

      // }
      // console.log(this.addedAssumptions)
      this.$forceUpdate()  
    },
    deleteAssumption(assumption) {
      delete this.addedAssumptions[assumption]
      // console.log(this.addedAssumptions)
      this.$forceUpdate()  
    },
    submit() {
      this.study_design = {}
      //console.log(this.vars)
      if (this.study_type === 'observational study') {
        this.study_design['study type'] = 'observational study'
        if (this.left_vars.length > 0) {
          if (this.left_vars.length > 1) {
            this.study_design['contributor variables'] = this.left_vars
          }
          else {
            this.study_design['contributor variables'] = this.left_vars[0]
          }
        }
        this.study_design['outcome variables'] = this.right_vars
      }
      else {
        this.study_design['study type'] = 'experiment'
        if (this.left_vars.length > 0) {
          if (this.left_vars.length > 1) {
            this.study_design['independent variables'] = this.left_vars
          }
          else {
            this.study_design['independent variables'] = this.left_vars[0]
          }
        }
        this.study_design['dependent variables'] = this.right_vars
      }
      this.$actions.set_tea_study(this.study_design)
      this.$actions.set_tea_assumptions(this.addedAssumptions)

      console.log("Study Design: ", this.$store.tea_study_design)
      console.log("Assumptions: ", this.$store.tea_assumptions)
    }
  },
  mounted() {
    this.tea_file = this.$store.file_name
  }
}
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
  text-align: center; 
  color: #2c3e50; 
}
</style>
