import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Events from "./Events";
import { FirebaseProvider } from "./Firebase";

const App = () => {
  return (
    <Router>
      <FirebaseProvider>
        <Route exact path="/:location/:date" component={Events} />
      </FirebaseProvider>
    </Router>
  );
};

export default App;
