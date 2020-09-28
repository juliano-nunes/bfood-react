import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './views/Search/Search'
import Home from './views/Home/Home'
import HeaderComponent from './shared/layout/Header'
import FooterComponent from './shared/layout/Footer'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch className="page">
          <Route path="/search/:city">
            <HeaderComponent />
            <Search/>
          </Route>
          <Route path="/">
            <HeaderComponent isTransparentHeader={true} />
            <Home/>
          </Route>
        </Switch>

        <FooterComponent />
      </Router>

    </div>
  );
}
