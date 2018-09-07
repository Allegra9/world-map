import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      background: '#000',
      color: '#f4df42',
      height: '200px',
      margin: '0 auto 100px 0',
    },
    text: {
      fontSize: '1.2em',
      padding: '80px',
      textAlign: 'center',
    },
  }

  return (
    <div style={styles.footer}>
      <div style={styles.text}>Powered by <a href='http://api.population.io/'>
        World Population API</a></div>
    </div>
  )
}

export default Footer
