import React, { Component } from "react";
import PopGrowthData from "./components/PopGrowthData";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <PopGrowthData /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
