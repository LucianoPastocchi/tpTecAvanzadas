import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";
//import SliderContainer from "../components/SliderContainer";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    try {
      const response = await fetch("http://localhost:4000/turnos", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(response.status);

      if (response.status !== 401 && response.status !== 500) {
        const data = await response.json();
        console.log("data");
        console.log(data);
        setTurnos(data);
      }
    } catch (err) {
      console.log("Error al obtener los turnos", err);
      alert("Error al obtener los turnos" + err);
    }
  };

  useEffect(() => {
    getTurnos();
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true); //si no scrolleo
    return () => (window.onscroll = null);
  };

  return (
    <HomeContainer>
      <div className="home">
        <TopNav isScrolled={isScrolled} />
        <div className="container">
          <h1>Turnos</h1>
          <div className="turnosMap">
            <ul className="turnos-list">
              {turnos.map((turno) => (
                <div className="turno-item" key={turno.id}>
                  <li className="turno-row">{turno.fecha}</li>
                  <li className="turno-row">{turno.hora}</li>
                  <li>
                    <button onClick={null}>Calificar</button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <SliderContainer movies={movies} /> */}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  position: relative;
  .turno-row {
    color: yellow;
    margin-bottom: 20px;
  }
  .turnosMap {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    top: 20vh;
    left: 5vh;
  }

  .turnos-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .turno-item {
    padding: 10px;
    width: calc(25% - 20px);
  }

  .container {
    position: absolute;
    top: 0vh;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    button {
      display: flex;
      width: 70px;
      padding: 5px;
      font-weight: bolder;
      background-color: yellow;
      gap: 2rem;
      cursor: pointer;
    }
    h1 {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      color: yellow;
      margin: 100px;
    }
    .playBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap: 1rem;
      padding: 0.9rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: none;
      cursor: pointer;
    }
    .moreBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: black;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap: 1rem;
      padding: 0.9rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: 0.1rem solid white;
      cursor: pointer;
    }
  }
`;

export default HomePage;
