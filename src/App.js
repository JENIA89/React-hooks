import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
