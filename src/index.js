import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from './Context/listContext';

const el = document.getElementById('root')

const root = ReactDOM.createRoot(el)


root.render(
    <Provider>
        <Router >
            <App />
        </Router>
    </Provider>
)