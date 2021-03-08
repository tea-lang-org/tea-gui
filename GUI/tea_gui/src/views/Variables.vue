<template>
  <div>
    <div id="inputs" v-if="var_types">
      <h2 class="mb-4 mt-4" style="font-size:20px">Selected File: <b>{{tea_file}}</b></h2>
      <h1 class="mb-4 mt-4" style="font-weight:bold; font-size:50px">Now for some add-ins...</h1>
      <!--img alt="TEA_Logo" src="../assets/TEA_Logo.png" style="width:35%; height:35%" /-->
      <h1 class="mt-4 mb-4" style="font-size:30px">Your variables:</h1>
      <div v-if="var_types">
      <b-row v-for="item in $store.tea_vars" :key="item.name" align-h="center">
        <b-col cols="2">
          <p>{{item.name}}</p>
        </b-col>
        <b-col cols="3">
          <!-- <b-form-select v-model="val_header" :options="$store.tea_data[item.name]">
            <b-form-select-option :value="null" disabled>Values:</b-form-select-option>
          </b-form-select> -->
          <b-form-select v-model="val_header">
            <b-form-select-option :value="null" disabled>Values:</b-form-select-option>
            <b-form-select-option v-for="val in $store.tea_data[item.name]" :key="val" :value="null" disabled>{{val}}</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col cols="3">
          <b-form-select v-model="var_types[item.name]" @change="updateVar(item)">
            <b-form-select-option v-for="option in var_options" :key="option" :value="option">{{option}}</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col cols="3">
          <b-form-select v-model="cat_header">
            <b-form-select-option :value="null" disabled>Catagories:</b-form-select-option>
            <b-form-select-option v-for="val in catagories[item.name]" :key="val" :value="null" disabled>{{val}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      </div>

      <div>
        <b-row align-h="center">
          <b-col cols="6">
          </b-col>
        </b-row>
      </div>

      <b-button variant="info" class="mt-5" to="/study_design">Submit</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Variables",
  data() {
    return {
      tea_file: "",
      cat_header: null,
      val_header: null,
      // var_options: [
      //   { value: 'nominal',   text: 'Nominal' },
      //   { value: 'ordinal',   text: 'Ordinal'},
      //   { value: 'ratio',     text: 'Ratio' },
      //   { value: 'interval',  text: 'Interval'}
      // ],
      var_options: ['nominal', 'ordinal', 'ratio', 'interval'],
      var_types: {},
      catagories: {},
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
            newVars[i]['catagories'] = Array.from(newCat)
            this.catagories[item.name] = Array.from(newCat)
            console.log('nom/ord ', this.catagories)
          }
          else {
            delete newVars[i]['catagories']
            this.catagories[item.name] = undefined
            console.log('rat/int ', this.catagories)
          }
          break;
        }
      }
      this.$actions.set_tea_variables(newVars)
      //console.log("New: ", this.$store.tea_vars)
    }
  },
  computed: {

  },
  created() {
    this.tea_file = this.$store.file_name
    for (var i = 0; i < this.$store.tea_vars.length; i++) {
      this.var_types[this.$store.tea_vars[i]['name']] = this.$store.tea_vars[i]['data type']
      this.catagories[this.$store.tea_vars[i]['name']] = this.$store.tea_vars[i]['catagories']
    }
    //console.log(this.var_types)
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
