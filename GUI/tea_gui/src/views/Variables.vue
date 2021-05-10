<template>
  <div>
    <div id="inputs">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <h1 v-if="$store.tea_data.length != 0" class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Now for some add-ins...</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
      <h1 v-if="$store.tea_data.length != 0" class="mt-4 mb-4" style="font-size:30px">Your variables:</h1>
      <b-row align-h="center">
        <b-col cols="2" class="mt-3" v-for="item in $store.tea_vars" :key="item.name"><strong>{{item.name}}</strong></b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="2" v-for="item in $store.tea_vars" :key="item.name">
          <b-form-select v-if="var_types" v-model="var_types[item.name]" @change="updateVar(item)">
            <b-form-select-option v-for="option in var_options" :key="option" :value="option">{{option}}</b-form-select-option>
          </b-form-select>
          <b-form-select v-if="categories[item.name] != undefined" v-model="cat_header">
            <b-form-select-option :value="null" disabled>Categories:</b-form-select-option>
            <b-form-select-option v-for="val in categories[item.name]" :key="val" :value="null" disabled>{{val}}</b-form-select-option>
          </b-form-select>
          <b-form-select disabled v-else v-model="cat_header">
            <b-form-select-option :value="null" disabled>None</b-form-select-option>
          </b-form-select>
          <b-row class="mt-1" align-h="center" v-for="(val,index) in tea_data[item.name]" :key="(val,index)">
            {{val}}
          </b-row>
          <!-- <b-button variant="primary" size="sm" class="mt-2" @click="modifyCol(item.name)" to="/variables">{{expandName[item.name]}}</b-button>  -->
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="2">
          <b-button v-if="$store.tea_data.length != 0" variant="primary" size="sm" class="mt-3" @click="expandAll()">{{expandAllName}}</b-button>
        </b-col>
      </b-row>
      <b-button v-if="$store.tea_data.length != 0" variant="info" class="mt-5 mb-5" to="/study_design">Submit</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Variables",
  data() {
    return {
      tea_file: "",
      tea_data: {},
      cat_header: null,
      val_header: null,
      var_options: ['nominal', 'ordinal', 'ratio', 'interval'],
      var_types: {},
      categories: {},
      expandName: {},
      expandAllName: "Expand All"
    }
  },
  methods: {
    updateVar(item) {
      let newVars = this.$store.tea_vars;
      for (var i = 0; i < newVars.length; i++) {
        if (newVars[i]['name'] === item.name) {
          newVars[i]['data type'] = this.var_types[item.name]
          if (this.var_types[item.name] === 'nominal' || this.var_types[item.name] === 'ordinal') {
            let newCat = new Set()
            this.$store.tea_data[item.name].forEach(val => {
              newCat.add(val)
            })
            newVars[i]['categories'] = Array.from(newCat)
            this.categories[item.name] = Array.from(newCat)
            // console.log('nom/ord ', this.categories)
          }
          else {
            delete newVars[i]['categories']
            this.categories[item.name] = undefined
            // console.log('rat/int ', this.categories)
          }
          break;
        }
      }
      this.$actions.set_tea_variables(newVars)
      this.$forceUpdate()
      //console.log("New: ", this.$store.tea_vars)
    },
    modifyCol(name) {
      if (this.expandName[name] === "Expand") {
        this.tea_data[name] = this.$store.tea_data[name].slice()
        this.expandName[name] = "Collapse"
      }
      else {
        this.tea_data[name] = this.$store.tea_data[name].slice()
        if (this.tea_data[name].length > 5) {
          this.tea_data[name].length = 5;
        }
        this.expandName[name] = "Expand"
      }
      this.$forceUpdate()
    },
    expandAll() {
      if (this.expandAllName === "Expand All") {
        this.expandAllName = "Collapse All"
        Object.keys(this.expandName).forEach(name => {
          this.expandName[name] = "Expand"
          this.modifyCol(name)
        })
      }
      else {
        this.expandAllName = "Expand All"
        Object.keys(this.expandName).forEach(name => {
          this.expandName[name] = "Collapse"
          this.modifyCol(name)
        })
      }
    }
  },
  computed: {
  },
  mounted() {
    this.tea_file = this.$store.file_name
    for (var i = 0; i < this.$store.tea_vars.length; i++) {
      this.var_types[this.$store.tea_vars[i]['name']] = this.$store.tea_vars[i]['data type']
      this.categories[this.$store.tea_vars[i]['name']] = this.$store.tea_vars[i]['categories']
    }
    Object.keys(this.$store.tea_data).forEach(header => {
      this.tea_data[header] = this.$store.tea_data[header].slice()
      if (this.tea_data[header].length > 5) {
        this.tea_data[header].length = 5;
      }
      this.expandName[header] = "Expand"
    })
    this.$forceUpdate()
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
