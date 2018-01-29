import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Register from "./components/register";
import Login from "./components/login";
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
    </div>,
    document.getElementById("container")
);
registerServiceWorker();