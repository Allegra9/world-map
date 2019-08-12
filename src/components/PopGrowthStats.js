import React from "react";
import worldCountries from "world-countries";

class PopGrowthStats extends React.Component {
  state = {
    countries: [],
    daily: [],
    weekly: [],
    yearly: [],
    in10yrs: []
  };

  getState = () => {
    this.setState({
      countries: this.sortedCountries(),
      daily: this.sortedProps(),
      weekly: this.getWeekly(),
      yearly: this.getYearly(),
      in10yrs: this.get10Years()
    });
  };

  // reducedDaily = () => {
  //   let daily = this.sortedProps();
  //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
  //   return daily.reduce(reducer);
  // };

  sortedCountries = () => {
    let obj = { ...this.props.growthDaily };
    let objValuesSortedArray = Object.values(obj).sort((a, b) => b - a);
    //console.log(objValuesSortedArray); // typeof: object,  but it's an array with number values !!!
    //  obj is    [42559, 13967, 13621, 10710, ...]
    //for each of this value I need to get the key country
    let sortedCountriesArray = [];
    objValuesSortedArray.forEach(value => {
      sortedCountriesArray.push(this.getKeyByValue(obj, value));
    });
    // Kuwait, Botswana, Djibouti, Albania, Luxembourg, Maldives, Fiji, Guyana,
    // Georgia, French Polynesia, Guadeloupe, Samoa, Antigua and Barbuda,
    // Aruba, Martinique, Croatia     // 169 ans 147    22  wrong/duplicates
    console.log(sortedCountriesArray.length); // 169   // now 172
    //console.log(sortedCountriesArray)  // array of arrays

    //let flattened = sortedCountriesArray.reduce((acc, val) => acc.concat(val), []) // 227
    let flattened = this.flattenArray(sortedCountriesArray);

    // console.log(this.getUniqArray(flattened));
    return this.getUniqArray(flattened);
  };

  getKeyByValue = (object, value) => {
    //find will give multiple and too little, filter all but bit too many
    //hence I need to flatten and get unique values after
    return Object.keys(object).filter(key => object[key] === value);
  };

  flattenArray = array => {
    return array.reduce((acc, val) => acc.concat(val), []);
  };

  getUniqArray = array => {
    return array.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  };

  sortedProps = () => {
    //sorts the prop values in descending order
    let obj = { ...this.props.growthDaily };
    let sortedObj = {};
    sortedObj = Object.values(obj).sort((a, b) => b - a);
    return sortedObj;
  };

  multiplyBy = num => {
    let obj = this.sortedProps();
    Object.entries(obj).forEach(([key, val]) => {
      obj[key] = val * num;
    });
    return obj;
  };

  getWeekly = () => this.multiplyBy(7);

  getYearly = () => this.multiplyBy(365);

  get10Years = () => this.multiplyBy(3650);

  getAFlag = countryToFind => {
    if (countryToFind === "Congo") {
      let countriesNames = worldCountries.find(
        country => country.name.common === "DR Congo"
      );
      return countriesNames.flag;
    } else if (countryToFind === "Czech Republic") {
      let countriesNames = worldCountries.find(
        country => country.name.common === "Czechia"
      );
      return countriesNames.flag;
    } else if (countryToFind === "Brunei Darussalam") {
      let countriesNames = worldCountries.find(
        country => country.name.common === "Brunei"
      );
      return countriesNames.flag;
    } else if (countryToFind === "Sao Tome and Principe") {
      let countriesNames = worldCountries.find(
        country => country.name.common === "São Tomé and Príncipe"
      );
      return countriesNames.flag;
    } else if (countryToFind === "Russian Federation") {
      let countriesNames = worldCountries.find(
        country => country.name.common === "Russia"
      );
      return countriesNames.flag;
    } else if (countryToFind === "World") {
      return "❤️";
    } else {
      let countriesNames = worldCountries.find(
        country => country.name.common === countryToFind
      );
      //console.log(countriesNames.flag)
      return countriesNames.flag;
    }
  };

  componentDidMount() {
    this.getState();
  }

  handleClick = e => {
    this.props.selectCountry(e.target.id);
    console.log(e.target.id);
  };

  render() {
    const styles = {
      // style={styles.container}
      gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto"
      },
      countryColumn: {
        width: "300px",
        border: "1px #000 solid",
        margin: "50px 0",
        borderRadius: "10px 0 0 10px",
        //background: "rgb(34,195,45)",
        background:
          "linear-gradient(0deg, rgba(34,195,45,1) 13%, rgba(253,45,45,1) 100%)"
      },
      dataColumn: {
        width: "150px",
        border: "1px #000 solid",
        margin: "50px 0",
        //background: "rgb(34,195,45)",
        background:
          "linear-gradient(0deg, rgba(34,195,45,1) 13%, rgba(253,45,45,1) 100%)"
      },
      dataColumn4: {
        width: "150px",
        border: "1px #000 solid",
        margin: "50px 0",
        borderRadius: "0 10px 10px 0",
        //background: "rgb(34,195,45)",
        background:
          "linear-gradient(0deg, rgba(34,195,45,1) 13%, rgba(253,45,45,1) 100%)"
      },
      ul: {
        listStyle: "none",
        textAlign: "right",
        paddingRight: "20px"
      },
      ulCountries: {
        listStyle: "none"
      },
      li: {
        borderBottom: "1px #000 solid",
        padding: "4px"
      },
      liCountry: {
        borderBottom: "1px #000 solid",
        cursor: "pointer"
      },
      topDiv: {
        padding: "15px",
        width: "65%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        textAlign: "center",
        borderBottom: "1px #000 solid"
      },
      span: {
        padding: "15px",
        marginLeft: "8px",
        fontWeight: "900",
        color: "red"
      }
    };

    const { countries, daily, weekly, yearly, in10yrs } = this.state;

    const countriesArr = Object.values(countries);
    const dailyArr = Object.values(daily);
    const weeklyArr = Object.values(weekly);
    const yearlyArr = Object.values(yearly);
    const in10yrsArr = Object.values(in10yrs);

    const numberWithCommas = num =>
      num !== null && num !== undefined
        ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : null;
    const dailyNum = numberWithCommas(dailyArr[0]);
    const weeklyNum = numberWithCommas(dailyArr[0] * 7);
    const yearlyNum = numberWithCommas(dailyArr[0] * 365);

    return (
      <div>
        <div style={styles.topDiv}>
          <p className="subtitle">
            Current world's population growth is
            <span style={styles.span}>{dailyNum}</span> people per day,
            <span style={styles.span}>{weeklyNum}</span> per week,
            <span style={styles.span}>{yearlyNum}</span> per year.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <span style={styles.countryColumn}>
            <ul style={styles.ulCountries}>
              <li>
                <h3 className="subtitle">Country</h3>
              </li>
              {countriesArr.map(country => (
                <li
                  style={styles.liCountry}
                  id={country}
                  key={country}
                  onClick={this.handleClick}
                  className="subtitle-link"
                >
                  {this.getAFlag(country)} {country}
                </li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">Daily</h3>
              </li>
              {dailyArr.map(daily => (
                <li style={styles.li} key={daily + Math.random(199)}>
                  {daily.toLocaleString()}
                </li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">Weekly</h3>
              </li>
              {weeklyArr.map(weekly => (
                <li style={styles.li} key={weekly + Math.random(199)}>
                  {weekly.toLocaleString()}
                </li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">Yearly</h3>
              </li>
              {yearlyArr.map(yearly => (
                <li style={styles.li} key={yearly + Math.random(199)}>
                  {yearly.toLocaleString()}
                </li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn4}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">10 years</h3>
              </li>
              {in10yrsArr.map(tenYrs => (
                <li style={styles.li} key={tenYrs + Math.random(199)}>
                  {tenYrs.toLocaleString()}
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    );
  }
}

export default PopGrowthStats;
