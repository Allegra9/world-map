import React from 'react';
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";  // npm i react-jvectormap
import PopAgeTable from './PopAgeTable'

const PopGrowthMap = ({ ...props, mapData, countryClick, countryClicked }) => {

  const handleClick = (e, countryCode) => {
    console.log(countryCode)
    countryClick(countryCode)
  }

  const styles = {
    noData: {
      textAlign: 'center',
    },
  }

  return (
    <div>
    <VectorMap
      map={"world_mill"}
      backgroundColor="transparent"
      zoomOnScroll={false}
      containerStyle={{
        width: "100%",
        height: "420px"
      }}
      onRegionClick={handleClick}
      containerClassName="map"
      regionStyle={{
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        },
        hover: {
          "fill-opacity": 0.8,
          cursor: 'pointer'
        },
        selected: {
          fill: '#2938bc'
        },
        selectedHover: {
        }
      }}
      regionsSelectable={true}
      markerSelected={true}
      series={{
        regions: [
          {
            values: mapData,
            scale: ["#146804", "#ff0000"],
            normalizeFunction: "polynomial"
          }
        ]
      }}
    />
  {
    countryClicked.length > 0 ?
        countryClicked !== 'Greenland' &&
        countryClicked !== 'Venezuela, Bolivarian Republic of' &&
        countryClicked !== 'Bolivia, Plurinational State of' &&
        countryClicked !== 'Iran, Islamic Republic of' &&
        countryClicked !== 'Egypt' &&
        countryClicked !== 'Tanzania, United Republic of' &&
        countryClicked !== 'Yemen' &&
        countryClicked !== 'Syrian Arab Republic' &&
        countryClicked !== 'Congo, the Democratic Republic of the' &&
        countryClicked !== "Côte d'Ivoire" &&
        countryClicked !== "Korea, Republic of" &&
        countryClicked !== "Korea, Democratic People's Republic of" &&
        countryClicked !== "Viet Nam" &&
        countryClicked !== "Lao People's Democratic Republic" &&
        countryClicked !== "Moldova, Republic of" &&
        countryClicked !== "Macedonia, the Former Yugoslav Republic of" &&
        countryClicked !== "Netherlands" &&
        countryClicked !== "Taiwan, Province of China" &&
        countryClicked !== "Slovakia" &&
        countryClicked !== "Kosovo"
        ?
        <PopAgeTable country={countryClicked} />
        : <h2 style={styles.noData}>No data for {countryClicked}</h2>
      : null
  }

    </div>
  );
}

export default PopGrowthMap;

//import worldCountries from 'world-countries' //npm i world-countries
//let worldCountries = require("world-countries")  //npm i world-countries
//import countries from 'country-list'  // npm i country-list

//import UserForm from './UserForm'

// const countries = require('country-list')();
//
// console.log(countries.getName('IS'));  // Iceland
// console.log(countries.getCode('Norway')); // IS
// //console.log(countries.getData())
// const countriesNCodes = countries.getData()
// console.log(countriesNCodes)

// console.log(worldCountries)  //capital too
// console.log(worldCountries.length)  //250
//
// let countriesCCa2 = worldCountries.map(country => country.cca2)
// console.log(countriesCCa2)
//
// let countriesNames = worldCountries.map(country => country.name.common)
// console.log(countriesNames)
//
// let countriesFlags = worldCountries.map(country => country.flag)
// console.log(countriesFlags)

//ES6:
// Object.keys(myObj).forEach(key => {
//     console.log(key);          // the name of the current key.
//     console.log(myObj[key]);   // the value of the current key.
// });

//ES7:
// Object.entries(myObj).forEach(([key, val]) => {
//     console.log(key);          // the name of the current key.
//     console.log(val);          // the value of the current key.
// });
