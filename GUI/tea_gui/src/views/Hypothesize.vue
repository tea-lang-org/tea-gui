<template>
  <div>
    <div id="study">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <b-row align-h="center">
        <b-col cols="8">
          <b-form-input id="input-default" v-model="hypothesis" placeholder="Enter a hypothesis:"></b-form-input>
        </b-col>
      </b-row>
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Time to brew!</h1>
      <b-button v-if="activate()" variant="info" class="mb-5" size="lg" @click=hypothesize()>Brew</b-button>
      <div style="white-space: pre;" class="mb-4">{{results}}</div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Hypothesize",
  data() {
    return {
      tea_file: this.$store.file_name,
      hypothesis: "",
      results: ""
    }
  },
  created() {
  },
  methods: {
    activate() {
      return (this.$store.tea_vars != null) && (this.$store.tea_study_design != null)
    },
    hypothesize() {
      this.$actions.set_tea_hypothesis(this.hypothesis)

      // in readme: npm install axios@0.18.0 --save
      let path = 'http://localHost:5000/hypothesize'
      axios.post(path, {
        tea_file: this.$store.tea_file,
        tea_data: this.$store.tea_data,
        tea_vars: this.$store.tea_vars,
        tea_study_design: this.$store.tea_study_design,
        tea_assumptions: this.$store.tea_assumptions,
        tea_hypothesis: this.$store.tea_hypothesis
      })
      .then((res) => {
        this.results= res.data
        console.log(this.results)
      })
      .catch((error) => {
        console.log(error)
        alert("Error running tea.hypothesize()")
      })
    }
  },
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
