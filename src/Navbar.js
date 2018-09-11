import React from 'react';

const Navbar = () => {
  const styles = {
    nav: {
      background: '#000',
      color: '#d6d0b1',
      height: '230px',
      margin: '0 auto 100px 0',
    },
    title: {
      fontSize: '6em',
      padding: '40px 40px 40px 0px',
      // paddingBottom: '40px',
      // paddingTop: 0,
      textAlign: 'left',
      marginTop: '-10px',
      // border: 'solid 1px #000',
      // border: 'solid 3px #fff',
      position: 'absolute',
    },
    subtitle: {
      fontSize: '1em',
      textAlign: 'left',
      paddingLeft: '200px',
    },
    img: {
      height: 'auto',
      width: '250px',
      marginTop: '20px',
    },
    w: {
      fontSize: '1.4em',
    }
  }

  return (
    <div style={styles.nav}>
      <span>
        <img src='https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d8f2a26e920f903d68359038bd4cf588/large.gif' style={styles.img}/>
      </span>

      <span style={styles.title} className="title">
        <span style={styles.w}>W</span>rld
      </span>
      <div style={styles.subtitle} className="subtitle">
        Data is the first step to sustainable world
      </div>

    </div>
  )
}

export default Navbar

// <img src='http://www.lunawebs.com/clients/teleplan/globes/golden_globe_spinning_lg_nwm.gif' style={styles.img}/>

//  http://www.lunawebs.com/clients/teleplan/globes/golden_globe_spinning_lg_nwm.gif

//    https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d8f2a26e920f903d68359038bd4cf588/large.gif
//    https://i.gifer.com/AYvD.gif

// <span style={styles.subtitle}>Data is the first step to sustainable world</span>
