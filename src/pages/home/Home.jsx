import React from "react";
import CardContent from "../../components/card/CardContent";
import Jumbotron from "../../assets/Jumbotron.svg";
import { Container, Row } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <img src={Jumbotron} alt="jumbotron" className="d-flex mx-auto mb-5" />
      <div className="cardContainer">
        <CardContent className="d-flex mx-auto mb-5" />
      </div>
    </div>
  );
};

export default Home;
