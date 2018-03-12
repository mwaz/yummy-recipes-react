import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import './styles/styles.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Categories from './components/category/Categories';
import Recipes from './components/recipe/Recipes';
import Private from './containers/Private';
import NotFound from './components/common/NotFound';

/**
 * Component to handle all the routes and display them to the user according
 * to the URL's
 */

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Register} />
      <Route exact path="/login" component={Login} />
      <Private exact path="/categories/" component={Categories} />
      <Private exact path="/categories/:category_id/recipes/" component={Recipes} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('container'),
);
registerServiceWorker();
