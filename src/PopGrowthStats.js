import React from 'react';

class PopGrowthStats extends React.Component {

  state={
    countries: {},  //set state !!!
    daily: {},
    weekly: {},
    yearly: {},
    in10yrs: {},
  }

  getState = () => {
    //this.sortedCountries()
    //this.getSortedCountriesList()
    this.setState({
      countries: this.sortedCountries(),
      daily: this.sortedProps(),    // this.props.growthDaily,
      weekly: this.getWeekly(),
      yearly: this.getYearly(),
      in10yrs: this.get10Years(),
    })
  }

  sortedCountries = () => {   // make this work !!!
    let obj = {...this.props.growthDaily}
    let objValuesSortedArray = Object.values(obj).sort((a,b) => b-a )
    console.log(objValuesSortedArray )   // typeof: object,  but it's an array with number values !!!
    //  obj is    [42559, 13967, 13621, 10710, ...]
    //for each of this value I need to get the key country
    //objValuesSortedArray.forEach(value => console.log("value", value))
    //console.log(obj)
    let sortedCountriesArray = []
    objValuesSortedArray.forEach(value => {
      //if (sortedCountriesArray.indexOf(this.getKeyByValue(obj, value)) === -1) {
        sortedCountriesArray.push(this.getKeyByValue(obj, value)  )
        //this.getKeyByValue(obj, value)
      // } else {
      //   console.log( this.getKeyByValue(obj, value) )
      // }
    })
    // Kuwait, Botswana, Djibouti, Albania, Luxembourg, Maldives, Fiji, Guyana,
    // Georgia, French Polynesia, Guadeloupe, Samoa, Antigua and Barbuda,
    // Aruba, Martinique, Croatia     // 169 ans 147    22  wrong
    console.log(sortedCountriesArray.length)   // 169
    //console.log(sortedCountriesArray)  // array of arrays

    //let flattened = sortedCountriesArray.reduce((acc, val) => acc.concat(val), []) // 227
    let flattened = this.flattenArray(sortedCountriesArray)

    console.log(this.getUniqArray(flattened))
    return this.getUniqArray(flattened)
  }

  flattenArray = (array) => {
    return array.reduce((acc, val) => acc.concat(val), [])
  }

  getUniqArray = (array) => {
    return array.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  }

  getKeyByValue = (object, value) => {
    //find will give multiple and too little, filter all but bit too many
    //hence I need to flatten and get unique values after
    return Object.keys(object).filter(key => object[key] === value)
  }

  sortedProps = () => {   //sorts the prop values in desending order
    let obj = {...this.props.growthDaily}
    let sortedObj = {}
    sortedObj = Object.values(obj).sort((a,b) => b-a )
    return sortedObj
  }

  getWeekly = () => {
    let obj =  this.sortedProps()
    Object.entries(obj).forEach(([key, val]) => {
      obj[key] = val * 10
    })
    return obj
  }

  getYearly = () => {
    //let obj = {...this.props.growthDaily}  // copies the object, same as Object.assign
    let obj =  this.sortedProps()
    Object.entries(obj).forEach(([key, val]) => {
      obj[key] = val * 365
    })
    return obj
  }

  get10Years = () => {
    let obj =  this.sortedProps()
    Object.entries(obj).forEach(([key, val]) => {
      obj[key] = val * 3650
    })
    return obj
  }

  componentDidMount() {
    this.getState()
  }


  render() {

    //const countries = Object.keys(this.props.growthDaily)
    //const countries = this.state.countries
    const countries = Object.values(this.state.countries)
    const daily = Object.values(this.state.daily)
    const weekly = Object.values(this.state.weekly)
    const yearly = Object.values(this.state.yearly)
    const in10yrs = Object.values(this.state.in10yrs)

    console.log(countries)

    console.log(this.props.growthDaily)
    console.log(this.state.countries)   //empty
    console.log(this.state.daily)
    console.log(this.state.weekly)
    console.log(this.state.yearly)
    console.log(this.state.in10yrs)

    const styles = {       // style={styles.container}
      gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto",
        //gridGap: "10px",
        //border: '1px #000 solid',
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        //margin: "100px 30px",
        //marginTop: "100px",
      },
      countryColumn: {
        //display: "flex",
        width: "300px",
        border: '1px #000 solid',
        margin: "50px 0",
        //justifyContent: "space-around",
        background: "rgb(34,195,45)",
        background: "linear-gradient(0deg, rgba(34,195,45,1) 13%, rgba(253,45,45,1) 100%)",
      },
      dataColumn: {
        //display: "flex",
        width: "150px",
        border: '1px #000 solid',
        margin: "50px 0",
        //justifyContent: "space-around",
        background: "rgb(34,195,45)",
        background: "linear-gradient(0deg, rgba(34,195,45,1) 13%, rgba(253,45,45,1) 100%)",
      },
      ul: {
        listStyle: "none",
      },
      li: {
        borderBottom: '1px #000 solid',
      },
    }

    return (
      <div style={styles.gridContainer}>
        <span style={styles.countryColumn}>
          <ul style={styles.ul}>
            <li><h3>Country</h3></li>
            {
              countries.map(country =>
                <li style={styles.li}>{country}</li>)
            }
          </ul>
        </span>

        <span style={styles.dataColumn}>
          <ul style={styles.ul}>
            <li><h3>Daily</h3></li>
            {
              daily.map(daily =>
                <li style={styles.li}>{daily}</li>)
            }
          </ul>
        </span>

        <span style={styles.dataColumn}>
          <ul style={styles.ul}>
            <li><h3>Weekly</h3></li>
            {
              weekly.map(weekly =>
                <li style={styles.li}>{weekly}</li>)
            }
          </ul>
        </span>

        <span style={styles.dataColumn}>
          <ul style={styles.ul}>
            <li><h3>Yearly</h3></li>
            {
              yearly.map(yearly =>
                <li style={styles.li}>{yearly}</li>)
            }
          </ul>
        </span>

        <span style={styles.dataColumn}>
          <ul style={styles.ul}>
            <li><h3>10 years</h3></li>
            {
              in10yrs.map(tenYrs =>
                <li style={styles.li}>{tenYrs}</li>)
            }
          </ul>
        </span>
      </div>
    )

  }
}

export default PopGrowthStats

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
