import React from 'react';

//not using this here yet:
import worldCountries from 'world-countries' //npm i world-countries

const countries = require('country-list')();

// console.log(countries.getName('IS'));  // Iceland
// console.log(countries.getCode('Norway')); // IS
//console.log(countries.getData())
const countriesNCodes = countries.getData()  // countriesNCodes
// console.log(countriesNCodes)   // [0].name   [0].code

// pseudocode:
// getCountryNames = () => {
//   //get country names
//   // returns an array of country names
// };
//
// getCountryData = (country_name) => {
//   // get country population data
// }
//
// getAllData = (arr_of_countries) => {
//   data = {}
//   arr_of_countries.map( country => {
//     data[country] = getCountryData(country);
//   })
// }


class Data extends React.Component {

  state={
    countryDataArray: []
  }

getCountryNamesArray = () => {
  const countriesArray = []
  for (let country of countriesNCodes) {
    countriesArray.push(country.name)
    //console.log(country.name)
  }
  return countriesArray  //got all countries
}

getCountryData = (name) => {
  return this.fetchPopulationData(name)
}

getAllData = (countriesArray) => {
  //let data = {}
  countriesArray.map(country => {
    return this.getCountryData(country) //  data[country] = this.getCountryData(country)
  })
  // .map(country => {
  //   if (data[country] === 'no-country-data') {
  //     delete data[country];
  //   }
  // })
}

// getPopGrowth = () => {
//   for (let country of countriesNCodes) {
//     console.log(country.name)
//     // this.set.state({
//     //   coutryWithData: {country.name: this.fetchPopulationData(country.name)}
//     // })
//     this.fetchPopulationData(country.name)
//   }
// }

componentDidMount() {
  // console.log("Mounted")
  this.getAllData(this.getCountryNamesArray())
}

//fetching data for each country:
fetchPopulationData = (country = "Lithuania") => {
  fetch('http://api.population.io:80/1.0/population/'
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
        this.setState({
          // countryDataArray: {...this.state.countryDataArray, country: data}
          countryDataArray: [...this.state.countryDataArray, countryData]
        }, console.log(this.state.countryDataArray) )
      } //if
    }
    //   this.setState({
    //     populationGrowth: [...this.state.populationGrowth, data["total_population"][1].population - data["total_population"][0].population]
    // })
  )
  .catch((error) => {
    //console.log(error)
  });
}

// Object.keys(countryData), countryData[country]['total_population'][1].population -
//    countryData[country]['total_population'][0].population

// console.log(Object.keys(object1));  //to get the keys

// if (countryData[country] === 'no-country-data') {
//   delete countryData[country];    //filter here the state
// }

// [{cat: "catV"}, {dog: "dogV"}].map(entry => {
//   Object.entries(entry).forEach(([key, val]) => {  //return value undefined
//     // console.log(Object.entries(entry).length)
//     console.log(key);
//     console.log(val);
//   })
// })

// Object.keys(myObj).forEach(key => {
//     console.log(key);          // the name of the current key.
//     console.log(myObj[key]);   // the value of the current key.
// });

render() {

  // let filteredCountryDataArray = this.state.countryDataArray.map(entry => {
  //   console.log(entry)
  // })

  // Object.entries(myObj).forEach(([key, val]) => {
  //     console.log(key);          // the name of the current key.
  //     console.log(val);          // the value of the current key.
  // });

  return (
    <div>
      {
        this.state.countryDataArray.map(entry => {
          Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
            return (
              <div>{key}</div>
              )
            // console.log(key);    //168 of null   array
            // console.log(val);
          })
        })
      }

    </div>
  )
}


}

export default Data
