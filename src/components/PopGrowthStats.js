import React from "react";
import worldCountries from "world-countries";

class PopGrowthStats extends React.Component {
  state = {
    countries: [],
    daily: [],
    weekly: [],
    yearly: [],
    in10yrs: [],
    reducedDaily: null
  };

  getState = () => {
    this.setState({
      countries: this.sortedCountries(),
      daily: this.sortedProps(),
      weekly: this.getWeekly(),
      yearly: this.getYearly(),
      in10yrs: this.get10Years(),
      reducedDaily: this.reducedDaily()
    });
  };

  reducedDaily = () => {
    let daily = this.sortedProps();
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return daily.reduce(reducer);
  };

  sortedCountries = () => {
    let obj = { ...this.props.growthDaily };
    let objValuesSortedArray = Object.values(obj).sort((a, b) => b - a);
    console.log(objValuesSortedArray); // typeof: object,  but it's an array with number values !!!
    //  obj is    [42559, 13967, 13621, 10710, ...]
    //for each of this value I need to get the key country
    let sortedCountriesArray = [];
    objValuesSortedArray.forEach(value => {
      sortedCountriesArray.push(this.getKeyByValue(obj, value));
    });
    // Kuwait, Botswana, Djibouti, Albania, Luxembourg, Maldives, Fiji, Guyana,
    // Georgia, French Polynesia, Guadeloupe, Samoa, Antigua and Barbuda,
    // Aruba, Martinique, Croatia     // 169 ans 147    22  wrong/duplicates
    console.log(sortedCountriesArray.length); // 169
    //console.log(sortedCountriesArray)  // array of arrays

    //let flattened = sortedCountriesArray.reduce((acc, val) => acc.concat(val), []) // 227
    let flattened = this.flattenArray(sortedCountriesArray);

    console.log(this.getUniqArray(flattened));
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
    const countries = Object.values(this.state.countries);
    const daily = Object.values(this.state.daily);
    const weekly = Object.values(this.state.weekly);
    const yearly = Object.values(this.state.yearly);
    const in10yrs = Object.values(this.state.in10yrs);

    //console.log(this.props.growthDaily)
    //console.log("Countries:", this.state.countries)
    // console.log(this.state.daily)
    // console.log(this.state.weekly)
    // console.log(this.state.yearly)
    // console.log(this.state.in10yrs)

    //console.log(this.state.reducedDaily)   // 192011     * 7, * 365, * 3650

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

    return (
      <div>
        <div style={styles.topDiv}>
          <p className="subtitle">
            Current world's population growth is
            <span style={styles.span}>{this.state.reducedDaily}</span> people
            per day,
            <span style={styles.span}>
              {Math.floor(this.state.reducedDaily * 7)}
            </span>{" "}
            per week,
            <span style={styles.span}>
              {Math.floor(this.state.reducedDaily * 360)}
            </span>{" "}
            per year.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <span style={styles.countryColumn}>
            <ul style={styles.ulCountries}>
              <li>
                <h3 className="subtitle">Country</h3>
              </li>
              {countries.map(country => (
                <li
                  style={styles.liCountry}
                  id={country}
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
              {daily.map(daily => (
                <li style={styles.li}>{daily.toLocaleString()}</li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">Weekly</h3>
              </li>
              {weekly.map(weekly => (
                <li style={styles.li}>{weekly.toLocaleString()}</li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">Yearly</h3>
              </li>
              {yearly.map(yearly => (
                <li style={styles.li}>{yearly.toLocaleString()}</li>
              ))}
            </ul>
          </span>

          <span style={styles.dataColumn4}>
            <ul style={styles.ul}>
              <li>
                <h3 className="subtitle">10 years</h3>
              </li>
              {in10yrs.map(tenYrs => (
                <li style={styles.li}>{tenYrs.toLocaleString()}</li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    );
  }
}

export default PopGrowthStats;
