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
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
    <div>
        <NavigationBar />
        <Register />
        <Footer />
        <Login />
        <Categories />
        <Footer />
        <Recipes />
   
        <Footer />
    </div>,
    document.getElementById("container")
);
registerServiceWorker();