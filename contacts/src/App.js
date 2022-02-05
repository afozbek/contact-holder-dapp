/* eslint-disable no-undef */
import AppContext from "context/AppContext";
import { TransactionContext } from "context/TransactionContext";
import { useContext, useEffect } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

var App = () => {
  const {
    web3Instance,
    smartContractInstance,
    account,
    getContractInstance
  } = useContext(TransactionContext)

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <div className="app-container">
      <div className="account">
        <strong>{account}</strong>
      </div>
      <AppContext.Provider value={{
        account,
        smartContractInstance,
        web3Instance,
        getContractInstance
      }}>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem", cursor: "pointer" }}>
          <Link to="/">Home</Link> {" - "}
          <Link to="/contacts">Contact List</Link> {" - "}
        </nav>

        <Outlet />
      </AppContext.Provider>


    </div>
  );
}

export default App;