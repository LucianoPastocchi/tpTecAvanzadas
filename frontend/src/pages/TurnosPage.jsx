import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TopNav from "../components/TopNav";
import { Link, useNavigate } from "react-router-dom";

//AGREGAR OBSERVACION DEL CHEQUEO Y RESULTADO
const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [turnos, setTurnos] = useState([]);

  const [rol, setRol] = useState(
    window.localStorage.getItem("rol").replace(/['"]+/g, "")
  );

  const navigate = useNavigate();

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

  const eliminarTurno = async (turno) => {
    fetch(`http://localhost:4000/turnos/${turno}/delete`, {
      method: "DELETE",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
    })
      .then((response) => {
        window.location.reload();
        alert("Turno eliminado correctamente");
        //window.open("login.html");
        //this.close();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al eliminar el turno", err);
        alert("Error al eliminar el turno " + err);
      });
  };

  useEffect(() => {
    getTurnos();
  }, []);

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
                  <li className="turno-row">{turno.puntaje}</li>
                  {turno.puntaje > 0 && (
                    <li className="turno-row">
                      {turno.puntaje > 60 ? "APROBADO" : "DESAPROBADO"}
                    </li>
                  )}

                  {turno.puntaje > 60 ? (
                    <li>
                      <h4>TRAMITE FINALIZADO</h4>
                    </li>
                  ) : (
                    <li>
                      {rol === "admin" && (
                        <div>
                          {turno.puntaje > 0 ? (
                            <Link
                              className="btn"
                              to={{ pathname: "/chequeo/" + turno.id }}
                            >
                              Chequear
                            </Link>
                          ) : (
                            <Link
                              className="btn"
                              to={{ pathname: "/calificar/" + turno.id }}
                            >
                              Calificar
                            </Link>
                          )}
                        </div>
                      )}
                    </li>
                  )}
                  <li className="turno-row">
                    <button
                      className="btn"
                      onClick={() => eliminarTurno(turno.id)}
                    >
                      Eliminar
                    </button>
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
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }

  .turno-item {
    padding: 10px;
    width: 100px;
    margin-right: 10px;
  }

  .container {
    position: absolute;
    top: 0vh;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .btn {
      display: flex;
      width: 70px;
      padding: 5px;
      font-weight: bolder;
      background-color: yellow;
      gap: 2rem;
      cursor: pointer;
      margin-top: 30px;
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
    h4 {
      color: yellow;
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
