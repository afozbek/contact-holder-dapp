import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "scss/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "pages/ContactList";
import AddNewContact from "pages/AddNewContact";

import dotenv from "dotenv"
import { TransactionContextProvider } from "context/TransactionContext";

dotenv.config()

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <TransactionContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="contacts" element={<ContactList />}>
              {/* <Route path=":contactId" element={<ContactItem />} /> */}

            </Route>
            <Route path="newContact" element={<AddNewContact />} />

            <Route path="*"
              element={
                <main >
                  <p> nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </TransactionContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
