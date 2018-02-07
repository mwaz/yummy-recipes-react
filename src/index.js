import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/styles.css";
import Register from "./components/register";
import Login from "./components/login";
import Categories from "./components/categories";
import Private from "./containers/private.js";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
        <Router>
            <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
            <Private exact path="/categories/" component={Categories} />

        
        </Switch>
   </Router>,
    document.getElementById("container")
);
registerServiceWorker();