import React from 'react';
import PopGrowthData from './PopGrowthData'
import Navbar from './Navbar'

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <PopGrowthData />
      </div>
    )
  }
}

export default App
