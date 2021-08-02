import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/navbar/Header";
import AddProduct from "./pages/addproduct/AddProduct";
import DetailProduct from "./pages/detailproduct/DetailProduct";
import Home from "./pages/home/Home";
import "./App.css";
import PrivateRoute from "./components/privateroute/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <PrivateRoute exact path="/add-product" component={AddProduct} />
      </Switch>
    </Router>
  );
};

export default App;
