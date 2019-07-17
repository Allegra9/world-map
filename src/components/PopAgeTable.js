import React, { Component } from "react";
import { PieChart } from "react-easy-chart";
import "../App.css";

class PopAgeTable extends Component {
  state = {
    country: this.props.country,
    data2018: [],
    data2050: [],
    peopleOver100in2018: 0,
    peopleOver100in2050: 0
  };

  getData = (year, array) => {
    console.log(year, array);
    let group1 = [];
    let group2 = [];
    let group3 = [];
    let group4 = [];
    let hundred = [];

    let data = {};

    array.map(entry => {
      if (entry.age < 15) {
        group1.push(entry.total);
      }
      if (entry.age >= 15 && entry.age < 25) {
        group2.push(entry.total);
      }
      if (entry.age >= 25 && entry.age < 65) {
        group3.push(entry.total);
      }
      if (entry.age >= 65) {
        group4.push(entry.total);
      }
      if (entry.age >= 100) {
        hundred.push(entry.total);
      }
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    console.log(group1.reduce(reducer)); // 15 entries
    console.log(group2.reduce(reducer)); // 10 entries
    console.log(group3.reduce(reducer)); // 40 entries
    console.log(group4.reduce(reducer)); // 35 entries
    console.log(hundred.reduce(reducer)); //

    data = [
      { key: "0-14", value: group1.reduce(reducer), color: "pink" },
      { key: "15-24", value: group2.reduce(reducer), color: "pink" },
      { key: "25-64", value: group3.reduce(reducer), color: "blue" },
      { key: "65+", value: group4.reduce(reducer), color: "navy" }
    ];
    //console.log(data)

    const numberWithCommas = num =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const peopleOver100 = numberWithCommas(hundred.reduce(reducer));

    if (year === 2018) {
      this.setState(
        {
          data2018: data,
          peopleOver100in2018: peopleOver100
        },
        () => console.log(this.state.data)
      );
    } else {
      this.setState(
        {
          data2050: data,
          peopleOver100in2050: peopleOver100
        },
        () => console.log(this.state.data2050)
      );
    }
  };

  fetchAgeData = (year = "2018", country = "Lithuania") => {
    return fetch(`http://54.72.28.201/1.0/population/${year}/${country}/`)
      .then(res => res.json())
      .then(data => this.getData(year, data));
    //.catch(error => console.log(error))
    // .then(() => this.setState({loading: false}))
  };

  getSelectedCountriesData = country => {
    //console.log("getSelectedCountriesData:", country);
    this.fetchAgeData(2018, country);
    this.fetchAgeData(2050, country);
  };

  componentDidMount() {
    const { country } = this.props;
    console.log("Country I'm fetching for: ", country);
    this.getSelectedCountriesData(country);
  }

  componentDidUpdate(prevProps) {
    // compares before updating
    if (prevProps.country !== this.props.country) {
      console.log("Country I'm fetching for: ", this.props.country);
      this.getSelectedCountriesData(this.props.country);
    }
  }

  render() {
    const styles = {
      table: {
        border: "1px #000 solid",
        borderRadius: "10px",
        marginTop: "100px",
        marginLeft: "5%",
        marginRight: "5%",
        padding: "50px",
        display: "grid",
        gridTemplateColumns: "auto auto",
        overflow: "auto"
      },
      pie: {
        display: "inline-block",
        margin: "0 auto"
      },
      h2: {
        textAlign: "center",
        gridColumnStart: "1",
        gridColumnEnd: "3"
      }
    };

    const {
      data2018,
      data2050,
      peopleOver100in2018,
      peopleOver100in2050
    } = this.state;
    const { country } = this.props;
    return (
      <div style={styles.table}>
        <h2 style={styles.h2}>Age Dependency charts for {country}:</h2>
        <div style={styles.pie} class="pie">
          <h4>2018:</h4>
          <PieChart labels size={300} innerHoleSize={100} data={data2018} />
          <h4 style={styles.h2}>
            People 100+ years old: {peopleOver100in2018}
          </h4>
        </div>

        <div style={styles.pie} class="pie">
          <h4>2050 (projected):</h4>
          <PieChart labels size={301} innerHoleSize={100} data={data2050} />
          <h4 style={styles.h2}>
            People 100+ years old: {peopleOver100in2050}
          </h4>
        </div>
      </div>
    );
  }
}

export default PopAgeTable;

// {
//   "females": 1457841,
//   "country": "Brazil",
//   "age": 0,
//   "males": 1523360,
//   "year": 2018,
//   "total": 2981206
// },
