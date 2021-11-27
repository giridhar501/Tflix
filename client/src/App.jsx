import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import { CoursesContextProvider } from "./context/CoursesContext";
const App = () => {
  return (
    <CoursesContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </CoursesContextProvider>
  );
};

export default App;
