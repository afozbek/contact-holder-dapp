import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "scss/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "pages/ContactList";
import ContactItem from "components/ContactList/ContactItem";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/contacts" element={<ContactList />}>
            {/* <Route path=":contactId" element={<ContactItem />} /> */}
          </Route>

          <Route path="*"
            element={
              <main >
                <p> nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
