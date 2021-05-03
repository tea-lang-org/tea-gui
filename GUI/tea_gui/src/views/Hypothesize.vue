<template>
  <div>
    <div id="study">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Time to brew!</h1>
      <b-button variant="info" class="mb-5" size="lg" @click=hypothesize()>Brew</b-button>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Hypothesize",
  data() {
    return {
      tea_file: "",
    }
  },
  created() {
  },
  methods: {
    hypothesize() {
      // in readme: npm install axios@0.18.0 --save
      let path = 'http://localHost:5000/hypothesize'
      axios.post(path, {
        tea_file: this.$store.tea_file,
        tea_data: this.$store.tea_data,
        tea_vars: this.$store.tea_vars,
        tea_study_design: this.$store.tea_study_design,
        tea_assumptions: this.$store.tea_assumptions,
      })
      .then((res) => {
        this.hypothesisData = res.data
        console.log(this.hypothesisData)
      })
      .catch((error) => {
        console.log(error)
        alert("Error running tea.hypothesize()")
      })
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
