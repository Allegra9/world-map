import React, { Component } from 'react';

import { VictoryChart, VictoryScatter, VictoryLine } from 'victory';
// npm i victory --save

//this.props.selectedCountry

const data = [
  { x: 1960, y: 0 },
  { x: 1970, y: 2000 },
  { x: 1980, y: 100 },
  { x: 1990, y: 44 },
  { x: 2000, y: 33 },
  { x: 2010, y: 55 }
];

const cartesianInterpolations = [
  "basis",
  "bundle",
  "cardinal",
  "catmullRom",
  "linear",
  "monotoneX",
  "monotoneY",
  "natural",
  "step",
  "stepAfter",
  "stepBefore"
];

const polarInterpolations = [
  "basis",
  "cardinal",
  "catmullRom",
  "linear"
];

const InterpolationSelect = ({ currentValue, values, onChange }) => (
  <select onChange={onChange} value={currentValue} style={{ width: 75 }}>
    {values.map(
      (value) => <option value={value} key={value}>{value}</option>
    )}
  </select>
);

class PopGrowthChart extends Component {

  state = {
      interpolation: "linear",
      polar: false,
      //data: [],      //  [ {x: "Afghanistan", y: 2069}, {x: ..., y: ...} ]
  }

  // `http://api.population.io:80/1.0/population/1980/Brazil/`

  fetchDecadesData = (year="1960", country="Lithuania") => {
    return fetch('http://api.population.io:80/1.0/population/'
    + `${year}/${country}/`)
    .then(res => res.json())
    .then(res => res.map(entry => console.log(entry.total)) )
  }




  // makeDataXnYfromProps = () => {
  //   let data = []
  //   //let coordsObj = {x, y}
  //   let x;  let y;
  //   Object.entries(this.props.data).forEach(([key, val]) => {
  //     // coordsObj ={x: key,  y: val}
  //     // console.log("iter", coordsObj)
  //     data = [...data, {x: key,  y: val} ]    // {x: "Zimbabwe", y: 1039}
  //   })
  //   console.log(data)   //  [ {x: "Afghanistan", y: 2069}, {x: ..., y: ...} ]
  //   //return data
  //   this.setState({
  //     data: data
  //   })
  // }

  componentDidMount() {
    //this.makeDataXnYfromProps()
    this.fetchDecadesData()
  }

  render() {
    const styles = {       // style={styles.container}
      chart: {
        height: '400px',
        width: "100%",
        border: '1px #000 solid',
        marginTop: 50,
      },
    }

    console.log(this.props.data)   // {Algeria: 1790, ...}

    return (
      <div style={styles.chart}>
        <InterpolationSelect
          currentValue={this.state.interpolation}
          values={this.state.polar ? polarInterpolations : cartesianInterpolations }
          onChange={(event) => this.setState({ interpolation: event.target.value })}
        />
        <input
          type="checkbox"
          id="polar"
          value={this.state.polar}
          onChange={
            (event) => this.setState({
              polar: event.target.checked,
              interpolation: "linear"
            })
          }
          style={{ marginLeft: 25, marginRight: 5 }}
        />
        <label htmlFor="polar">polar</label>
        <VictoryChart polar={this.state.polar} height={390} width={1500}>
          <VictoryLine
            interpolation={this.state.interpolation} data={data}
            style={{ data: { stroke: "#c43a31" } }}
          />
        <VictoryScatter data={data}
            size={5}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default PopGrowthChart




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
