import React from 'react';
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";  // npm i react-jvectormap

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


// let mapData = {
//   AU: 5000,  //cca2 code here ? https://www.npmjs.com/package/world-countries;
//   BR: 0,
//   CA: 0,
//   DE: 1300,
//   FR: 540,
//   GB: 690,
//   GE: 200,
//   IN: 20,
//   RO: 600,
//   RU: 30,
//   US: 0,
//   AT: 20000,
//   CN: 10,
//   IN: 10,
//   SA: 10,
//   RS: 10,
//   BT: 10,
//   EG: 10,
//
//   SE: 0,
//   FI: 0,
//   ES: 0,
//   NZ: 0,
//   BR: 0,
//   FR: 0,
//   PR: 0,

//   US: 2,
//   US: -10,
//   LU: -10,
//   PL: -10,
//   CZ: -10,
//   HR: -10,
//   RU: -10,
//
//};

// console.log(mapData)
// console.log(countriesCCa2[67])
// console.log(countriesNames[42])
// console.log(countriesFlags[42])

// let obj = {
//     [countriesCCa2[7]]: 1000  // UAE
// }

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


const PopGrowthMap = ({ ...props, mapData }) => {

  //console.log(mapData)
  //console.log(typeof (Object.values(mapData)[0])) //number

  // scale: ["#468c53", "#db2b08"],
  //scale: ["#5faf50", "#f94a18"],
  // scale: ["#125b04", "#ff0000"],   dark

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
    </div>
  );
}

export default PopGrowthMap;
