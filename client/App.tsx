import React from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {
  return <div style={styles.container}>
    <h1>Hello World</h1>
  </div>
};

const styles = {
  container: {
    height: '100%',
    overflow: 'auto',
  },
};

export default hot(App);
