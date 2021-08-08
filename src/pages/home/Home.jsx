import React from "react";
import CardContent from "../../components/card/CardContent";
import Jumbotron from "../../assets/Jumbotron.svg";

import "./Home.css";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="homeContainer">
      <Helmet>
        <title>Home | WaysBean</title>
      </Helmet>
      <img src={Jumbotron} alt="jumbotron" className="d-flex mx-auto mb-5" />
      <div className="cardContainer">
        <CardContent className="d-flex mx-auto mb-5" />
      </div>
    </div>
  );
};

export default Home;
