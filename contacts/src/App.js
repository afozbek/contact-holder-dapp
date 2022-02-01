import ContactItem from "components/ContactList/ContactItem";
import AppContext from "context/AppContext";
import ContactList from "pages/ContactList";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

var App = () => {
  const [account, setAccount] = useState();

  const [smartContractInstance, setSmartContractInstance] = useState(null);

  useEffect(() => {
    async function load() {

      const contactList = await getContractInstance();

      setSmartContractInstance(contactList)
      // set contact list to state variable.
    }

    load();
  }, []);

  // Returns contactSmartContractInstance
  const getContractInstance = async () => {
    const localGanacheRPCUrl = "http://localhost:7545"
    const web3 = new Web3(Web3.givenProvider || localGanacheRPCUrl);
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    // Instantiate smart contract using ABI and address.
    return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  return (
    <div className="app-container">
      <div className="account">
        <strong>{account}</strong>
      </div>
      <AppContext.Provider value={{
        account,
        smartContractInstance,
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