import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import { useState } from "react";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";


const promise = loadStripe('pk_test_51PS1RH08GuQqUq6kTKPhN0spyApCjZvPRkDjI0lkhU8UnA5Hp9VrIGK9DuEU3vqoQsyI7wJNChqCww54dpFSX0cR00mI63CE8D');


function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<>
            <Header />
            <Home />
          </>} />
          <Route path="/orders"
            element={<>
              <Header />
              <Orders />
            </>}
          />
          <Route path="/checkout" element={<>
            <Header />
            <Checkout />
          </>} />
          <Route path="/payment"
            element={<>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>}
          />
          <Route path="/login" element={<><Login /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
