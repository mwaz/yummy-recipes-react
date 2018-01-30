import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/styles.css";
import Register from "./components/register";
import Login from "./components/login";
import Categories from "./components/categories";
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
    </div>,
    document.getElementById("container")
);
registerServiceWorker();