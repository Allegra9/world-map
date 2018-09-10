import React, { Component } from 'react'
import { PieChart } from 'react-easy-chart'

class PopAgeTable extends Component {

  state = {
    country: this.props.country,
    data: [],
    data2050: [],
  }

  getData = (year, array) => {
    console.log(year, array)
    let group1 = []
    let group2 = []
    let group3 = []
    let group4 = []
    let hundred

    let data = {}

    array.map(entry => {
      if (entry.age < 15){
        group1.push(entry.total)
      }
      if (entry.age >= 15 && entry.age < 25){
        group2.push(entry.total)
      }
      if (entry.age >= 25 && entry.age < 65){
        group3.push(entry.total)
      }
      if (entry.age > 65){
        group4.push(entry.total)
      }
      if (entry.age === 100){
        hundred = entry.total
      }
    })

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    console.log(group1.reduce(reducer))  // 15 entries
    console.log(group2.reduce(reducer))  // 10 entries
    console.log(group3.reduce(reducer))  // 40 entries
    console.log(group4.reduce(reducer))  // 35 entries
    console.log(hundred) // number

    data = [
      {key: '0-14', value: group1.reduce(reducer), color: "pink"},
      {key: '15-24', value: group2.reduce(reducer), color: "pink"},
      {key: '25-64', value: group3.reduce(reducer), color: "blue"},
      {key: '65+', value: group4.reduce(reducer), color: "navy"},
    ]
    //console.log(data)

    if (year === 2018){
      this.setState({
        data: data
      }, () => console.log(this.state.data))
    }else {
      this.setState({
        data2050: data
      }, () => console.log(this.state.data2050))
    }

  }

  fetchAgeData = (year="2018", country="Lithuania") => {
    return fetch(`http://api.population.io/1.0/population/${year}/${country}/`)
    .then(res => res.json())
    .then(data => this.getData(year, data))
    //.catch(error => console.log(error))

    // .then(() => this.setState({loading: false}))
  }

  getSelectedCountriesData = (country) => {
    console.log('getSelectedCountriesData:', country)
    this.fetchAgeData(2018, country)
    this.fetchAgeData(2050, country)
    // this.setState({
    //   data: this.fetchAgeData(2018, country),
    //   data2050: this.fetchAgeData(2050, country),
    // }, () => console.log(this.state))
  }

  // setState anytime this.props.country changes ?

  componentDidMount() {
    console.log("Country I'm fetching for: ", this.props.country)
    this.getSelectedCountriesData(this.props.country)
  }

  componentDidUpdate(prevProps) {  // compares before updating
    if (prevProps.country !== this.props.country){
      console.log("Country I'm fetching for: ", this.props.country)
      this.getSelectedCountriesData(this.props.country)
    }
  }

  render() {

    return (
      <div>
        Data table here for {this.props.country}

      2018:
        <PieChart
         labels
         size={300}
         innerHoleSize={100}
         data={this.state.data}
        />

      2050:
        <PieChart
         labels
         size={301}
         innerHoleSize={100}
         data={this.state.data2050}
        />

      </div>
    )
  }
}

export default PopAgeTable

// {
//   "females": 1457841,
//   "country": "Brazil",
//   "age": 0,
//   "males": 1523360,
//   "year": 2018,
//   "total": 2981206
// },
