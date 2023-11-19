import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./reducers";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import "./index.css";


const store = configureStore({
  reducer: rootReducer,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    

      <App />
      <Toaster/>
  
  </Provider>
  </BrowserRouter>
);
