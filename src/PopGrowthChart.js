import React, { Component } from 'react'
import { LineChart } from 'react-easy-chart'
// npm i react-easy-charts --save

// import PopAgeTable from './PopAgeTable'
import Select from 'react-select'

let totalPopChartData = []
let totalMalesChartData = []
let totalFemalesChartData = []

class PopGrowthChart extends Component {

  state = {
      interpolation: "linear",
      polar: false,
      //data: [],      //  [ {x: "Afghanistan", y: 2069}, {x: ..., y: ...} ]
      //selectedCountry: "Germany",
      totalPopChartData: [],
      totalMalesChartData: [],
      totalFemalesChartData: [],
      //data: [],     // data={ [data, data2, data3] }   // each data is an array
      selectedOption: '',    // added
      loading: true,
  }

  // `http://api.population.io:80/1.0/population/1980/Brazil/`

  fetchDecadesData = (year="2018", country="Lithuania") => {
    return fetch('http://api.population.io:80/1.0/population/'
    + `${year}/${country}/`)
    .then(res => res.json())
    .then(res => this.getReducedValueForEachYear(year, res))
    .then(() => this.setState({loading: false}))
  }

  getReducedValueForEachYear = (year, array) => {
    //console.log(year, array)
    let totalPop = []  // an array of 101 values
    let totalMales = []
    let totalFemales = []

    //get the array, got each entry get the total, then reduce it to a single value for the given year

    array.map(entry => {
      totalPop.push(entry.total / 1000000)
      totalMales.push(entry.males / 1000000)
      totalFemales.push(entry.females / 1000000)
    })

    let yearPlusTotalPop = {}       // {2018: 2817402}
    let yearPlusTotalMales = {}
    let yearPlusTotalFemales = {}

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    //gets the total pop for the given year for the given country
    yearPlusTotalPop[year] = totalPop.reduce(reducer)     // {2018: 2817402}
    yearPlusTotalMales[year] = totalMales.reduce(reducer)    // {2018: 1295220}
    yearPlusTotalFemales[year] = totalFemales.reduce(reducer)  // {2018: 1522182}

    totalPopChartData.push(yearPlusTotalPop)  //push to a global variable
    totalMalesChartData.push(yearPlusTotalMales)
    totalFemalesChartData.push(yearPlusTotalFemales)

    //console.log(totalPopChartData)
    // console.log(this.sortPopChartData(totalPopChartData))
    // console.log(this.sortPopChartData(totalMalesChartData))
    // console.log(this.sortPopChartData(totalFemalesChartData))

    if (totalPopChartData.length === 7 && totalMalesChartData.length === 7 && totalFemalesChartData.length === 7){
      this.setState({
        totalPopChartData: this.makeDataForCharts(this.sortPopChartData(totalPopChartData)),
        totalMalesChartData: this.makeDataForCharts(this.sortPopChartData(totalMalesChartData)),
        totalFemalesChartData: this.makeDataForCharts(this.sortPopChartData(totalFemalesChartData)),
      }, () => this.emptyGlobalVariables() )   // callback !!!!
    }
  }

  emptyGlobalVariables = () => {
    totalPopChartData = []
    totalMalesChartData = []
    totalFemalesChartData = []
  }

  makeDataForCharts = (array) => {
    //console.log(array)
    let data = []
    array.forEach(entry =>
      Object.entries(entry).forEach(([key, val]) => {
        data = [...data, {x: key,  y: val} ]   // {1990: 23456434}
      })
    )
    //console.log(data)
    return data
  }
  // [{1990: 23456434}, {1960: 23456434}, ...]

  //SORTS AN ARRAY OF OBJS BY KEY:
  sortPopChartData = (array) => {
    let stringified = array.map((element) => {
      return JSON.stringify(element)
    })
    //console.log(stringified)
    stringified.sort()
    return stringified.map((stringifiedElement) => {
      return JSON.parse(stringifiedElement)
    })
  }

  getSelectedCountriesChartData = (country) => {
    let decades = [1960, 1970, 1980, 1990, 2000, 2010, new Date().getFullYear()]
    decades.forEach(year => this.fetchDecadesData(year, country))
  }

  componentDidMount() {
    this.getSelectedCountriesChartData(this.props.selectedCountry)
  }

  getCountries = () => {    // gets countries array
    //console.log(this.props.growthDaily)
    let obj = {...this.props.growthDaily}
    let allCountriesArray = []
    Object.entries(obj).forEach(([key, val]) => {
      //console.log(key)
      allCountriesArray.push(key)
    })
    //console.log(allCountriesArray)   // all countries array
    return this.makeSelectObj(allCountriesArray)
  }

  makeSelectObj = (array) => {  // makes an array of options for the select
    //console.log(array)
    let selectOptions = []
    array.forEach(entry => {
      let obj = {}
      obj['value'] = entry, obj['label'] = entry  // {value: "Zimbabwe", label: "Zimbabwe"}
      selectOptions = [...selectOptions, obj]
    })
    return selectOptions
  }

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ];

  handleChange = (selectedOption) => {    // added
    this.props.selectCountry(Object.values(selectedOption)[0])
    this.setState({
      loading: true
    }, () => this.getSelectedCountriesChartData(Object.values(selectedOption)[0]))

    //console.log(Object.values(selectedOption)[0])

    // this.setState({
    //   selectedOption: Object.values(selectedOption)[0]
    // }, () => console.log(`Option selected:`, this.state.selectedOption)  )
    // console.log(`Option selected:`, selectedOption)
  }

  // getGlobe = () => {
  //   document.getElementById('globe').append('body')
  // }

  render() {
    const styles = {       // style={styles.container}
      table: {
        border: '1px #000 solid',
        padding: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        paddingRight: '5%',
      },
      chart: {
        display: 'inline-block',
        margin: '0 auto',
      },
      h2: {
        textAlign: 'center',
        gridColumnStart: '1',
        gridColumnEnd: '3',
      },
      h4: {
        textAlign: 'center',
      },
      select: {
        gridColumnStart: '1',
        gridColumnEnd: '3',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },

    }

    //  isMulti={true}

    return (
      <div>
      {
        this.props.selectedCountry && !this.state.loading ?

      <div style={styles.table}>
        <div style={styles.select}>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.getCountries()}
            placeholder='Select a country...'
            isSearchable={true}
          />
        </div>

        <h2 style={styles.h2}>Charts for {this.props.selectedCountry}:</h2>

        <div style={styles.chart} class="chart">
          <h4 style={styles.h4}>Population growth (millions):</h4>
          <LineChart
            axes
            xTicks={6}
            yTicks={10}
            grid
            verticalGrid
            interpolate={'cardinal'}
            lineColors={['red']}
            width={580}
            height={350}
            data={[this.state.totalPopChartData]}
          />
        </div>

        <div style={styles.chart} class="chart">
          <h4 style={styles.h4}>Females and males (millions):</h4>
          <LineChart
            style={styles.chart}
            axes
            xTicks={6}
            yTicks={10}
            grid
            verticalGrid
            interpolate={'cardinal'}
            lineColors={['blue', 'red']}
            width={580}
            height={350}
            data={[this.state.totalMalesChartData, this.state.totalFemalesChartData]}
          />
        </div>
      </div>  //select

      : <h1>LOADING...</h1>
      }
      </div>
    )
  }
}

export default PopGrowthChart


//  <h1>LOADING...</h1>


// <Select
//   value={this.state.selectedOption}
//   onChange={this.handleChange}
//   options={this.getCountries()}
//   placeholder='Select a country...'
//   isMulti={true}         can do mulitple select options
//   isSearchable={true}    will search if country name includes the input
// />


//   data={[data, data2, data3]}


// {1960: 2748343}
// {1970: 3100143}
// {1980: 3380306}
// {1990: 3697393}
// {2000: 3486373}
// {2010: 3122835}
// {2018: 2817402}

// new Date().getFullYear()    // current year


// state = {
//     interpolation: "linear",
//     polar: false,
//     //data: [],      //  [ {x: "Afghanistan", y: 2069}, {x: ..., y: ...} ]
// }
//
// // makeDataXnYfromProps = () => {
// //   let data = []
// //   //let coordsObj = {x, y}
// //   let x;  let y;
// //   Object.entries(this.props.data).forEach(([key, val]) => {
// //     // coordsObj ={x: key,  y: val}
// //     // console.log("iter", coordsObj)
// //     data = [...data, {x: key,  y: val} ]    // {x: "Zimbabwe", y: 1039}
// //   })
// //   console.log(data)   //  [ {x: "Afghanistan", y: 2069}, {x: ..., y: ...} ]
// //   //return data
// //   this.setState({
// //     data: data
// //   })
// // }
//
// componentDidMount() {
//   //this.makeDataXnYfromProps()
// }
