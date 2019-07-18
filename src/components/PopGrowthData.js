import React, { Component } from "react";

import PopGrowthMap from "./PopGrowthMap";
import PopGrowthStats from "./PopGrowthStats";
import PopGrowthChart from "./PopGrowthChart";
import Spinner from "./spinner";
import List from "@material-ui/icons/KeyboardBackspace";
import "../App.css";

// const countries = require("country-list");
const { getCode, getName, getData } = require("country-list");

const countriesNCodes = getData();
//console.log(countriesNCodes); // [0].name   [0].code

class PopGrowthData extends Component {
  state = {
    countryDataCodes: {}, // {AF: 2069, AL: 22, ...}
    countryDataNames: {}, // {Algeria: 1790, ...}
    selectedCountry: "",
    countryClickedOnMap: ""
  };
  //   {Canada: { total_population: [{...},{...}] } }

  countryClickOnMap = countryCode => {
    if (countryCode !== "XK") {
      let country = getName(countryCode);
      this.setState(
        {
          countryClickedOnMap: country
        },
        () => console.log(this.state.countryClickedOnMap)
      );
    } else {
      this.setState(
        {
          countryClickedOnMap: "Kosovo"
        },
        () => console.log(this.state.countryClickedOnMap)
      );
    }
  };

  selectCountry = country => {
    this.setState(
      {
        selectedCountry: country
      },
      () => console.log(this.state.selectedCountry)
    ); // set
  };

  //get all countries:
  getCountryNamesArray = () => {
    const countriesArray = [];
    //console.log(countriesNCodes);
    for (let country of countriesNCodes) {
      countriesArray.push(country.name);
    }
    // console.log(countriesArray);
    return countriesArray;
  };

  //fetch for each country:
  getCountryData = country => {
    return this.fetchPopulationData(country);
  };

  //get data for each country and set the state:
  getAllData = countriesArray => {
    let length = countriesArray.length; //how many countries to fetch for
    let finalData = [];
    countriesArray.forEach(country => {
      this.getCountryData(country) //fetch
        .then(countryData => {
          finalData.push(countryData);
          length--; //decrease
          if (length === 0) {
            //only set state when fetched for all the countries
            if (finalData) {
              console.log(finalData);
              finalData = finalData.filter(obj =>
                obj !== undefined || obj !== null
                  ? Object.keys(obj).length !== 0
                  : console.log(obj)
              ); //get rid of empty objs
              //return this.getCountryDataCodesObject(finalData)
              this.setState({
                countryDataCodes: this.getCountryDataCodesObject(finalData),
                countryDataNames: this.getCountryDataNamesObject(finalData)
              });
            }
          }
        });
    });
  };

  componentDidMount() {
    this.getAllData(this.getCountryNamesArray());
  }

  //reformating the data for the state, to be passed as props:  {code: data}
  getCountryDataCodesObject = finalData => {
    //console.log(finalData)
    let countryCodeGrowthData = {};
    finalData = finalData.map(entry =>
      Object.entries(entry).forEach(([key, val]) => {
        // country: population_data arr w 2 objs
        //console.log(key);    //168 or 169
        //key = getCode(key)
        //val = val['total_population'][1].population - val['total_population'][0].population
        countryCodeGrowthData[getCode(key)] =
          val["total_population"][1].population -
          val["total_population"][0].population +
          1000; //so no negative values for the map   // Japan is currently at -960
        //entry[key] = val
      })
    );
    return countryCodeGrowthData;
  };

  //reformating the data for the state, to be passed as props:   {countryName: data}
  getCountryDataNamesObject = finalData => {
    //console.log(finalData)
    let countryCodeGrowthData = {};
    finalData = finalData.map(entry =>
      Object.entries(entry).forEach(([key, val]) => {
        countryCodeGrowthData[key] =
          val["total_population"][1].population -
          val["total_population"][0].population;
        //entry[key] = val
      })
    );
    return countryCodeGrowthData;
  };

  // http://54.72.28.201:80/1.0/countries
  // http://api.population.io:80/1.0/population/
  fetchPopulationData = (country = "Lithuania") => {
    return fetch(
      "http://54.72.28.201:80/1.0/population/" +
        `${country}/today-and-tomorrow/`
    )
      .then(res => {
        if (res.ok) {
          // res.status code
          return res.json();
        } else {
          return "no-country-data";
        }
      })
      .then(data => {
        let countryData = {};
        if (data !== "no-country-data") {
          countryData[country] = data;
        }
        return countryData;
      })
      .catch(error => {
        //console.log(error)
      });
  };

  handleBtnClick = () => {
    this.setState(
      {
        selectedCountry: ""
      },
      () => console.log(this.state.selectedCountry)
    );
  };

  render() {
    const styles = {
      div: {
        marginTop: "100px"
      }
    };
    const {
      countryDataCodes,
      countryDataNames,
      countryClickedOnMap,
      selectedCountry
    } = this.state;
    return (
      <div>
        {Object.keys(countryDataCodes).length > 0 ? (
          <div>
            <PopGrowthMap
              mapData={countryDataCodes}
              countryClick={this.countryClickOnMap}
              countryClicked={countryClickedOnMap}
            />

            {selectedCountry !== "" ? (
              <div style={styles.div}>
                <div className="btn">
                  <div onClick={this.handleBtnClick}>
                    <List />
                  </div>
                  <div style={{ paddingLeft: 5 }} onClick={this.handleBtnClick}>
                    Back to population growth projection table
                  </div>
                </div>
                <PopGrowthChart
                  selectedCountry={selectedCountry}
                  growthDaily={countryDataNames}
                  selectCountry={this.selectCountry}
                />
              </div>
            ) : (
              <div>
                <PopGrowthStats
                  growthDaily={countryDataNames}
                  selectCountry={this.selectCountry}
                />
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
} //class

export default PopGrowthData;

// <div style={styles.select}>
//   Search country's charts:
//   <Select
//     value={this.state.selectedCountry}
//     onChange={this.handleChange}
//     options={options}
//   />
// </div>

//   <button onClick={this.handleBtnClick}>See charts for an individual country</button>

//   <PopGrowthChart data={this.state.countryDataNames}/>

// this.state.countryDataCodes.map(entry =>
//   Object.entries(entry).forEach(([key, val]) => {  // country: population_data arr w 2 objs
//     console.log(key);    //168 of null   array
//     console.log(val['total_population'][1].population -
//     val['total_population'][0].population );
//   })
// )

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

// handleChange = (selectedOption) => {
//   this.setState({
//     selectedCountry: selectedOption
//   }, () => this.getCountryOptions() )
//   //() => console.log(this.state.selectedCountry))
// }

//MAKE THIS STRUCTURE:
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ];

// getCountryOptions = () => {
//   if (this.state.countryDataNames.length > 0){    // {Algeria: 1790, ...}
//     let countries = []
//     Object.entries(this.state.countryDataNames).forEach(([key, val]) => {
//       countries = [countries, key]
//     })
//     console.log(countries)
//     return countries
//   }else {
//     console.log("this.state.countryDataNames.length < 0")
//   }
// }
