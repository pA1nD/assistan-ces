import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Events from './Events';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Events} />
    </Router>
  );
}

export default App;
