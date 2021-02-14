<template>
  <div>
    <div id="home">
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Welcome to TEA!</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
      <h1 class="mt-4 mb-4" style="font-weight:bold;">To start, select a file to brew!</h1>
      <b-row align-h="center">
        <b-col cols="8">
          <b-form-group label-size="sm" class="ml-5 mr-5">
            <b-form-file
              v-model="tea_input"
              :state="Boolean(tea_input)"
              accept=".csv"
              placeholder="Choose a .csv file or drop it here..."
              drop-placeholder="Drop .csv file here..."
              @change="loadTextFromFile"
            ></b-form-file>
            <p class="mt-2">Selected file: <b>{{$store.file_name}}</b></p>
            <b-button variant="info" class="mt-5" @click="loadVariables" to="/inputs">Submit</b-button> 
          </b-form-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      tea_input: [] 
    }
  },
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      this.$actions.set_file_name(file.name)
      this.$actions.set_file(file)
      const reader = new FileReader()
      reader.readAsText(file);
      reader.onload = e => this.parseData(e.target.result);
    },
    parseData(file) {
      let fileAsLines = file.split("\n")
      let headers = fileAsLines[0].split(",")
      let headerKeys = {}
      let teaData = {}
      var i = 0
      headers.forEach(header => {
        teaData[header.replace(/['"]+/g, '')] = []
        headerKeys[i] = header.replace(/['"]+/g, '')
        i++
      })
      for (i = 1; i < fileAsLines.length; i++) {
        let currLine = fileAsLines[i].split(",")
        for(var j = 0; j < currLine.length; j++) {
          teaData[headerKeys[j]].push(currLine[j].replace(/['"]+/g, ''))
        }
      }
      this.$actions.set_tea_data(teaData)
      this.$actions.set_header_keys(headerKeys)
      console.log(this.$store.tea_data)
    },
    loadVariables() {
      let variables = []
      console.log(Object.keys(this.$store.tea_data))
      Object.keys(this.$store.tea_data).forEach(header => {
        let variable = {}
        variable['name'] = header

        let dataCount = {}
        let totalVals = 0
        this.$store.tea_data[header].forEach(val => {
          totalVals++
          if (dataCount[val] == undefined) {
            dataCount[val] = 1;
          }
          else {
            dataCount[val]++
          }
        })
        if (totalVals/2 > Object.keys(dataCount).length) {
          variable['data type'] = 'nominal'
          variable['catagories'] = Object.keys(dataCount)
          // Ordinal????
        }
        else {
          Object.keys(dataCount).forEach(val => {
            if (val < 0) {
              variable['data type'] = 'interval'  // This is not correct
              return
            }
          })
          if (variable['data type'] == undefined) {
            variable['data type'] = 'ratio'
          }
        }
        variables.push(variable)
      })
      console.log(variables)
    }
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
