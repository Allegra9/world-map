import React from 'react';
import PopGrowthData from './PopGrowthData'

import Navbar from './Navbar'
import FooterBar from './Footer'

//import Globe from './Globe'
import ReactDOM from 'react-dom';

class App extends React.Component {

  state={
    entered: true,
  }

  handleClick = () => {
    this.setState({
      entered: !this.state.entered
    }, () => this.hideGlobe() )
  }

  hideGlobe = () => {
    console.log('why not HIDDEN ?????')
    document.querySelector('canvas').remove()
    //document.getElementById('globe').remove()
  }

  render() {

    const styles = {       // style={styles.container}
      btn: {
        backgroundColor: '#000',
        color: '#d6d0b1',
        padding: '10px 30px',
        fontSize: '2.5em',
        borderRadius: '5px',
        position: 'absolute',
        marginTop: '300px',
        left: '45%',
      },
      mainDiv: {
        marginBottom: 0,

      }
    }

    return (
      <div>

        {this.state.entered ?

        <div style={styles.mainDiv}>
          <Navbar />
        <PopGrowthData />

        </div>
        :
        <div>
          { /* remove the GLOBE */ }
          <button onClick={this.handleClick} style={styles.btn}>Enter</button>
        </div>

        }

      </div>
    )
  }

}

export default App

// return (
//   <div>
//
//     {this.state.entered ?
//
//     <div style={styles.mainDiv}>
//       <Navbar />
//     <PopGrowthData />
//
//     </div>
//     :
//     <div>
//       { /* remove the GLOBE */ }
//       <button onClick={this.handleClick} style={styles.btn}>Enter</button>
//     </div>
//
//     }
//
//   </div>
// )

//  add <Footer />    somewhere !!!!!

//ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('globe'));
//ReactDOM.unmountComponentAtNode(document.getElementById('globe'))

//ReactDOM.render(<App />, document.getElementById('globe'));
