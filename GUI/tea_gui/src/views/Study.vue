<template>
  <div>
    <div id="study">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Now for some add-ins...</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
      <h1 class="mt-4 mb-4" style="font-size:30px">Your Study Type:</h1>
    
      <div>
        <b-row align-h="center">
          <b-col cols="6">
          </b-col>
        </b-row>
      </div>

      <b-button variant="info" class="mt-5" @click=test()>Submit</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Study",
  data() {
    return {
      tea_file: ""
    }
  },
  methods: {
      /*    
        Study type: single select dropdown; can either be observational or experimental
        Contributor variables: checkbox select, can choose from the variables
        Outcome variables: checkbox select, can choose from the variables
      */
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
