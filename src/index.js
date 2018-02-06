import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/styles.css";
import Register from "./components/register";
import Login from "./components/login";
import PageCounter from "./components/page_counter";
import Categories from "./components/categories";
import Recipes from "./components/recipes";
import NavigationBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
        <Router>
            <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/categories/" component={Categories} />

        
        </Switch>
   </Router>,
    document.getElementById("container")
);
registerServiceWorker();