import React, { Component } from "react";
import PopGrowthData from "./PopGrowthData";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <PopGrowthData />
      </div>
    );
  }
}

export default App;
