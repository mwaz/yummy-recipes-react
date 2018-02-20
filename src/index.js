import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/styles.css";
import Register from "./components/auth-front/register.js";
import Login from "./components/auth-front/login.js";
import Categories from "./components/categories-front/categories.js";
import Recipes from "./components/recipes-front/recipes.js";
import Private from "./containers/private.js";
import Public from "./containers/public.js";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
        <Router>
            <Switch>
            <Route exact path="/" component={Register} />
            <Public exact path="/login" component={Login} />
            <Private exact path="/categories/" component={Categories} />
            <Private exact path="/categories/:category_id/recipes/" component={Recipes} />

            
        </Switch>
   </Router>,
    document.getElementById("container")
);
registerServiceWorker();