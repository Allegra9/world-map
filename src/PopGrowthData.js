import React from 'react';
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";  // npm i react-jvectormap
import PopGrowthMap from './PopGrowthMap'
import PopGrowthStats from './PopGrowthStats'
import PopGrowthChart from './PopGrowthChart'

//not using this here yet:
import worldCountries from 'world-countries' //npm i world-countries

const countries = require('country-list')();

// console.log(countries.getName('IS'));  // Iceland
// console.log(countries.getCode('Norway')); // IS
//console.log(countries.getData())
const countriesNCodes = countries.getData()  // countriesNCodes
// console.log(countriesNCodes)   // [0].name   [0].code

class PopGrowthData extends React.Component {

  state={
    countryDataCodes: {},     // {AF: 2069, AL: 22, ...}
    countryDataNames: {},     // {Algeria: 1790, ...}
    buttonClicked: true,
  }
  //   {Canada: { total_population: [{...},{...}] } }

//get all countries:
getCountryNamesArray = () => {
  const countriesArray = []
  for (let country of countriesNCodes) {
    countriesArray.push(country.name)
  }
  return countriesArray
}

//fetch for each country:
getCountryData = (name) => {
  return this.fetchPopulationData(name)
}

//get data for each country and set the state:
getAllData = (countriesArray) => {
  let length = countriesArray.length  //how many countries to fetch for
  let finalData = []
  countriesArray.forEach((country) => {
    this.getCountryData(country)   //fetch
    .then((countryData) => {
        finalData.push(countryData)
        length--     //decrease
        if (length === 0) { //only set state when fetched for all the countries
          finalData = finalData.filter(obj => Object.keys(obj).length !== 0) //get rid of empty objs
          //return this.getCountryDataCodesObject(finalData)
          this.setState({
            countryDataCodes: this.getCountryDataCodesObject(finalData),
            countryDataNames: this.getCountryDataNamesObject(finalData)
          })
        }
    })
  })
}

componentDidMount() {
  this.getAllData(this.getCountryNamesArray())
}

//reformating the data for the state, to be passed as props:  code: data
getCountryDataCodesObject = (finalData) => {
  console.log(finalData)
  let countryCodeGrowthData = {}
  finalData = finalData.map(entry =>
    Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
      //console.log(key);    //168 or 169
      //key = countries.getCode(key)
      //val = val['total_population'][1].population - val['total_population'][0].population
      countryCodeGrowthData[countries.getCode(key)] = (val['total_population'][1].population
      - val['total_population'][0].population) + 1000    //so no negative values for the map
      //entry[key] = val
    })
  )
  return countryCodeGrowthData
}

//reformating the data for the state, to be passed as props:   countryName: data
getCountryDataNamesObject = (finalData) => {
  //console.log(finalData)
  let countryCodeGrowthData = {}
  finalData = finalData.map(entry =>
    Object.entries(entry).forEach(([key, val]) => {
      countryCodeGrowthData[key] = (val['total_population'][1].population
      - val['total_population'][0].population)
      //entry[key] = val
    })
  )
  return countryCodeGrowthData
}

fetchPopulationData = (country = "Lithuania") => {
  return fetch('http://api.population.io:80/1.0/population/'
  + `${country}/today-and-tomorrow/`)
    .then(res => {
      if (res.ok) {   // res.status code
        return res.json()
      } else {
        return 'no-country-data'
      }
    })
    .then(data => {
      let countryData = {}
      if (data !== 'no-country-data') {
        countryData[country] = data
      }
      return countryData
    }
  ).catch((error) => {
    //console.log(error)
  });
}

//   this.setState({
//     populationGrowth: [...this.state.populationGrowth, data["total_population"][1].population - data["total_population"][0].population]
// })

// Object.keys(countryData), countryData[country]['total_population'][1].population -
//    countryData[country]['total_population'][0].population

// console.log(Object.keys(object1));  //to get the keys
// Object.keys(obj).length !== 0  //if not empty

// Object.keys(myObj).forEach(key => {
//     console.log(key);          // the name of the current key.
//     console.log(myObj[key]);   // the value of the current key.
// });

  handleBtnClick = () => {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    })
    console.log(this.state.buttonClicked)
  }

render() {

  console.log(this.state.countryDataCodes)
  //before we pass the state as props here, I need to get the lowest negative value
  //and increase every value by that number  // did 1000 just in case
  //so that it becomes zero and all others keep the proportion

  const styles = {       // style={styles.container}
    div: {
      //backgroundColor: '#000',
      marginTop: '100px',
    },
  }

  return (
    <div>
      {
        Object.keys(this.state.countryDataCodes).length > 0
        ?
        <div>
          <PopGrowthMap mapData={this.state.countryDataCodes}/>

          {
            this.state.buttonClicked ?
            <div style={styles.div}>
              <button onClick={this.handleBtnClick}>Go back to stats</button>
              <PopGrowthChart />
            </div>
            :
            <div>
              <button onClick={this.handleBtnClick}>See charts for an individual country</button>
              <PopGrowthStats growthDaily={this.state.countryDataNames}/>
            </div>
          }
        </div>
        : <h1>LOADING...</h1>
      }
    </div>
  )
}


} //class

export default PopGrowthData


//   <PopGrowthChart data={this.state.countryDataNames}/>


// this.state.countryDataCodes.map(entry =>
//   Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
//     console.log(key);    //168 of null   array
//     console.log(val['total_population'][1].population -
//     val['total_population'][0].population );
//   })
// )
