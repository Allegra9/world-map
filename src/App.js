import React, { Component } from "react";
import PopGrowthData from "./components/PopGrowthData";
import Navbar from "./components/Navbar";

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
