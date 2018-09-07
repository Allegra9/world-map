import React from 'react';

const Navbar = () => {
  const styles = {
    nav: {
      background: '#000',
      color: '#f4df42',
      height: '200px',
      margin: '0 auto 100px 0',
    },
    title: {
      fontSize: '2.5em',
      padding: '40px 40px 25px 40px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.5em',
      textAlign: 'center',

    }
  }

  return (
    <div style={styles.nav}>
      <div style={styles.title}>Wrld</div>
      <div style={styles.subtitle}>Data is the first step to sustainable world</div>
    </div>
  )
}

export default Navbar
