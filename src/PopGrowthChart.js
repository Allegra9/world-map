import React, { Component } from 'react';

//import { VictoryChart, VictoryScatter, VictoryLine } from 'victory';
// npm i victory --save

import {LineChart} from 'react-easy-chart';
// npm i react-easy-charts --save

const data = [
  { x: 1960, y: 0 },
  { x: 1970, y: 2000000 },
  { x: 1980, y: 100 },
  { x: 1990, y: 44 },
  { x: 2000, y: 33 },
  { x: 2010, y: 55 }
];

const data2 = [
  {x: 1960, y: 2748343},
  {x: 1970, y: 3100143},
  {x: 1980, y: 3380306},
  {x: 1990, y: 3697393},
  {x: 2000, y: 3486373},
  {x: 2010, y: 3122835},
  {x: 2020, y: 2817402}
];

const data3 = [
  {x: 1960, y: 2743},
  {x: 1970, y: 31043},
  {x: 1980, y: 33806},
  {x: 1990, y: 369703},
  {x: 2000, y: 347773},
  {x: 2010, y: 3135},
  {x: 2020, y: 28172}
];

const totalPopChartData = []
const totalMalesChartData = []
const totalFemalesChartData = []

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
  }

  // `http://api.population.io:80/1.0/population/1980/Brazil/`

  fetchDecadesData = (year="2018", country="Lithuania") => {
    return fetch('http://api.population.io:80/1.0/population/'
    + `${year}/${country}/`)
    .then(res => res.json())
    .then(res => this.getReducedValueForEachYear(year, res))
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
    //console.log(this.sortedPopChartData(totalPopChartData)  )


    if (totalPopChartData.length === 7 && totalMalesChartData.length === 7 && totalFemalesChartData.length === 7){
      this.setState({
        totalPopChartData: this.makeDataForCharts(this.sortedPopChartData(totalPopChartData)),
        totalMalesChartData: this.makeDataForCharts(this.sortedPopChartData(totalMalesChartData)),
        totalFemalesChartData: this.makeDataForCharts(this.sortedPopChartData(totalFemalesChartData)),
      }, () => console.log(this.state))   // callback !!!!
    }
  }

  makeDataForCharts = (array) => {
    console.log(array)
    let data = []
    array.forEach(entry =>
      Object.entries(entry).forEach(([key, val]) => {
        data = [...data, {x: key,  y: val} ]   // {1990: 23456434}
      })
    )
    console.log(data)
    return data
  }
  // [{1990: 23456434}, {1960: 23456434}, ...]

  //SORTS AN ARRAY OF OBJS BY KEY:
  sortedPopChartData = (array) => {
    let stringified = array.map((element) => {
      return JSON.stringify(element)
    })
    console.log(stringified)
    stringified.sort()
    return stringified.map((stringifiedElement) => {
      return JSON.parse(stringifiedElement)
    })
  }

  getSelectedCoutriesChartData = (country) => {
    let decades = [1960, 1970, 1980, 1990, 2000, 2010, new Date().getFullYear()]
    decades.forEach(year => this.fetchDecadesData(year, country))
  }

  componentDidMount() {
    //set state with this.props.selectedCountry, then call this:

    this.getSelectedCoutriesChartData(this.props.selectedCountry)
  }

  render() {
    const styles = {       // style={styles.container}
      chart: {
        height: '400px',
        width: "80%",
        //border: '1px #000 solid',
        margin: 50,
        padding: 70,
      },
    }

    return (
      <div style={styles.chart}>
      {
        this.props.selectedCountry ?

        <div>

          <h2>Charts for {this.props.selectedCountry}:</h2>

          Population growth (millions)
          <LineChart
            axes
            grid
            verticalGrid
            interpolate={'cardinal'}
            lineColors={['red', 'blue', 'green']}
            width={700}
            height={350}
            data={[this.state.totalPopChartData]}
          />

        Females and males (millions)
          <LineChart
            axes
            grid
            verticalGrid
            interpolate={'cardinal'}
            lineColors={['red', 'blue', 'green']}
            width={700}
            height={350}
            data={[this.state.totalMalesChartData, this.state.totalFemalesChartData]}
          />
        </div>
      : null
      }
      </div>
    );
  }
}

export default PopGrowthChart



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



// <InterpolationSelect
//   currentValue={this.state.interpolation}
//   values={this.state.polar ? polarInterpolations : cartesianInterpolations }
//   onChange={(event) => this.setState({ interpolation: event.target.value })}
// />
// <input
//   type="checkbox"
//   id="polar"
//   value={this.state.polar}
//   onChange={
//     (event) => this.setState({
//       polar: event.target.checked,
//       interpolation: "linear"
//     })
//   }
//   style={{ marginLeft: 25, marginRight: 5 }}
// />
// <label htmlFor="polar">polar</label>
// <VictoryChart polar={this.state.polar} height={390} width={1500}>
//   <VictoryLine
//     interpolation={this.state.interpolation} data={data}
//     style={{ data: { stroke: "#c43a31" } }}
//   />
// <VictoryScatter data={data}
//     size={5}
//     style={{ data: { fill: "#c43a31" } }}
//   />
//
//   <VictoryLine
//     interpolation={this.state.interpolation} data={data2}
//     style={{ data: { stroke: "#c43a31" } }}
//   />
// <VictoryScatter data={data2}
//     size={5}
//     style={{ data: { fill: "#c43a31" } }}
//   />
// </VictoryChart>

// const cartesianInterpolations = [
//   "basis",
//   "bundle",
//   "cardinal",
//   "catmullRom",
//   "linear",
//   "monotoneX",
//   "monotoneY",
//   "natural",
//   "step",
//   "stepAfter",
//   "stepBefore"
// ];
//
// const polarInterpolations = [
//   "basis",
//   "cardinal",
//   "catmullRom",
//   "linear"
// ];
//
// const InterpolationSelect = ({ currentValue, values, onChange }) => (
//   <select onChange={onChange} value={currentValue} style={{ width: 75 }}>
//     {values.map(
//       (value) => <option value={value} key={value}>{value}</option>
//     )}
//   </select>
// );
