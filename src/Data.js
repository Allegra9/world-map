import React from 'react';

//not using this here yet:
import worldCountries from 'world-countries' //npm i world-countries

const countries = require('country-list')();

// console.log(countries.getName('IS'));  // Iceland
// console.log(countries.getCode('Norway')); // IS
//console.log(countries.getData())
const countriesNCodes = countries.getData()  // countriesNCodes
// console.log(countriesNCodes)   // [0].name   [0].code

class Data extends React.Component {

  state={
    countryDataArray: []
  }

getCountryNamesArray = () => {
  const countriesArray = []
  for (let country of countriesNCodes) {
    countriesArray.push(country.name)
  }
  return countriesArray
}

getCountryData = (name) => {
  return this.fetchPopulationData(name)
}

getAllData = (countriesArray) => {
  let length = countriesArray.length  //how many countries to fetch for
  let finalData = []
  countriesArray.forEach((country) => {
    this.getCountryData(country)   //fetch
    .then((countryData) => {
        finalData.push(countryData)
        length--     //decrease
        if (length === 0) { //only set state when fetched for all the countries
          this.setState({
            countryDataArray: finalData.filter(obj => Object.keys(obj).length !== 0)
          })
        }
    })
  })
}

componentDidMount() {
  this.getAllData(this.getCountryNamesArray())
}

// afterSetStateFinished = () => {
//   this.state.countryDataArray.map(entry =>
//     Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
//       console.log(key);    //168 of null   array
//       console.log(val['total_population'][1].population -
//       val['total_population'][0].population );
//     })
//   )
// }

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

render() {

  console.log(this.state.countryDataArray)

  return (
    <div>
      {

      }

    </div>
  )
}


} //class

export default Data


// this.state.countryDataArray.map(entry =>
//   Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
//     console.log(key);    //168 of null   array
//     console.log(val['total_population'][1].population -
//     val['total_population'][0].population );
//   })
// )


// let response = await fetch('http://api.population.io:80/1.0/population/'
// + `${country}/today-and-tomorrow/`)
// // console.log("RESPONSE", response)
// let data;
// if (response.ok) {
//   data = await response.json()
// } else {
//   data ='no-country-data'
// }
// // console.log("DATA", data)
// let countryData = {}
// if (data !== 'no-country-data') {
//   countryData[country] = data
// }
// console.log("COUNTRY DATA", countryData)
//
// return countryData
