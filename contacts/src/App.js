import AppContext from "context/AppContext";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

var App = () => {
  const [account, setAccount] = useState();

  const [web3Instance, setWeb3Instance] = useState(null);
  const [smartContractInstance, setSmartContractInstance] = useState(null);

  useEffect(() => {
    async function load() {

      const web3 = await getWeb3Instance();
      const contactList = await getContractInstance(web3);

      setWeb3Instance(web3)
      setSmartContractInstance(contactList)
    }

    load();
  }, []);

  // Returns contactSmartContractInstance
  const getContractInstance = async (web3) => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    // Instantiate smart contract using ABI and address.
    return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  const getWeb3Instance = async () => {
    const localGanacheRPCUrl = "http://localhost:7545"
    return new Web3(Web3.givenProvider || localGanacheRPCUrl);
  }

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