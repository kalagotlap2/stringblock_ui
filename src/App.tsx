import React from "react";
import "./App.scss";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PublicLayout from "./app/shared/components/layouts/public.layout";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="" component={PublicLayout} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
