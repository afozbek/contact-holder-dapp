/* eslint-disable no-undef */
import AppContext from "context/AppContext";
import { TransactionContext } from "context/TransactionContext";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Moralis from "moralis"
import { useMoralis } from "react-moralis";

var App = () => {
  const {
    web3Instance,
    smartContractInstance,
    account,
    getContractInstance
  } = useContext(TransactionContext)

  // const [moralisUser, setMoralisUser] = useState(null);
  const { authenticate, isAuthenticated, user: moralisUser } = useMoralis();

  useEffect(() => {
    Modal.setAppElement("body");

    // const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
    // const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;

    // Moralis.start({ serverUrl, appId });

    const init = async () => {
      if (!isAuthenticated) {
        await authenticate({ signingMessage: "Moralis Auth by Furkan Ozbek" });
      }
    }

    init();

    // loginMoralisUser()
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionList = await getUserTransactions(moralisUser);
      console.log({ transactionList })
    }

    if (moralisUser) {
      fetchTransactions()
    }
  }, [moralisUser])

  /* Authentication code */
  const loginMoralisUser = async () => {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({ signingMessage: "Moralis Auth by Furkan Ozbek" })

      console.log({ user })
      // .then(function (user) {
      //   console.log("logged in user:", user);
      //   console.log(user.get("ethAddress"));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }

    setMoralisUser(user)
  }

  const logoutMoralisUser = async () => {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  const getUserTransactions = async (user) => {
    // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));

    // run query
    const results = await query.find();
    console.log("user transactions:", results);
    return results
  }


  console.log({ moralisUser })

  return (
    <div className="app-container">
      {/* <h1>Welcome {user.get("username")}</h1> */}
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