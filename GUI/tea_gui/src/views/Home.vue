<template>
  <div>
    <div id="home">
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Welcome to TEA!</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
      <h1 class="mt-4 mb-4" style="font-weight:bold;">To start, select a file to brew!</h1>
      <b-form-file
        v-model="tea_input"
        :state="Boolean(tea_input)"
        accept=".csv"
        placeholder="Choose a .csv file or drop it here..."
        drop-placeholder="Drop .csv file here..."
      ></b-form-file>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      tea_input: null
    }
  },
  methods: {
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
