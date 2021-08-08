import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/navbar/Header";
import AddProduct from "./pages/addproduct/AddProduct";
import DetailProduct from "./pages/detailproduct/DetailProduct";
import Home from "./pages/home/Home";
import "./App.css";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/dashboard/Dashboard";
import Loader from "./components/loader/Loader";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Shipping from "./pages/shipping/Shipping";
import Profile from "./pages/profile/Profile";

const App = () => {
  const { state, dispatch } = useContext(UserContext);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      setAuthToken(token);
      const getProfile = await API.get("/user/profile");
      // console.log(getProfile);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { ...getProfile.data.data },
      });
      dispatch({
        type: "UPDATE_CART",
      });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };
  useEffect(() => {
    checkUser();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <Route exact path="/loader" component={Loader} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/add-product" component={AddProduct} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/shipping" component={Shipping} />
      </Switch>
    </Router>
  );
};

export default App;
