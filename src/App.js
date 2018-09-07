import React from 'react';
import PopGrowthData from './PopGrowthData'

import Navbar from './Navbar'
import FooterBar from './Footer'

//import Globe from './Globe'
import ReactDOM from 'react-dom';

class App extends React.Component {

  state={
    entered: false,
  }

  handleClick = () => {
    this.setState({
      entered: !this.state.entered
    }, () => this.hideGlobe() )
  }

  hideGlobe = () => {
    console.log('why not HIDDEN ?????')
    document.getElementById('globe').style.display = "none !important"
    document.getElementById('globe').remove()
  }

  render() {

    const styles = {       // style={styles.container}
      btn: {
        backgroundColor: '#000',
        color: '#f4df42',
        padding: '10px 30px',
        fontSize: '2.5em',
        borderRadius: '5px',
      }
    }

    return (
      <div>
        <Navbar />

        {this.state.entered ?

        <PopGrowthData />
        :
        <div>
          { /* remove the GLOBE */ }
          <button onClick={this.handleClick} style={styles.btn}>Enter</button>
        </div>
        }

        <FooterBar />
      </div>
    )
  }

}

export default App

//ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('globe'));
//ReactDOM.unmountComponentAtNode(document.getElementById('globe'))

//ReactDOM.render(<App />, document.getElementById('globe'));
