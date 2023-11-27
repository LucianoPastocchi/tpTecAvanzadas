import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    fecha: "",
    hora: "",
    DNI: "",
    patente: "",
  });

  const fecha = useRef(Date.now());
  const hora = useRef("");
  const patente = useRef("");

  const turnoData = {
    fecha: fecha.current.value,
    hora: hora.current.value,
    usuario: window.localStorage.getItem("userId").replace(/['"]+/g, ""),
    patenteVehiculo: patente.current.value,
  };

  const navigate = useNavigate();

  const handleTurno = async () => {
    fetch("http://localhost:4000/turnos/create", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(turnoData),
    })
      .then((response) => {
        response.json();
        alert("Turno creado correctamente");
        console.log(JSON.stringify(turnoData));
        //window.open("login.html");
        navigate("/login");
        //this.close();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al crear el turno", err);
        alert("Error al crear el turno " + err);
      });
  };

  return (
    <Container>
      <div className="content">
        <TopNav />
        <div className="body">
          <div className="text">
            <h1>Solicitar turno</h1>
          </div>

          <div className="form">
            <div className="input_form">
              <h2>Fecha del turno</h2>
              <input
                type="date"
                placeholder="Ingrese su fecha de nacimiento"
                name="fecha"
                value={formValues.fecha}
                ref={fecha}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Hora del turno</h2>
              <input
                type="time"
                name="hora"
                value={formValues.hora}
                ref={hora}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Patente</h2>
              <input
                placeholder="Ingrese patente"
                type="text"
                name="patente"
                value={formValues.patente}
                ref={patente}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <button onClick={handleTurno}>Solicitar</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
  }
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2rem;
    color: yellow;
    h1 {
      padding: 0rem 20rem;
    }
    h4 {
      margin-top: 1.5rem;
    }
    h6 {
      margin-top: 1.5rem;
    }
  }
  .form {
    display: grid;
    width: 60%;
    margin-top: 1.5rem;
    grid-template-columns: "1fr";
    h2 {
      margin-right: 20px;
    }
    button {
      margin: 30px;
    }
  }
  .input_form {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  input {
    color: black;
    padding: 1rem;
    font-size: 1rem;
    width: 20rem;
    &:focus {
      outline: none;
    }
    margin: 20px;
    border: solid black;
    background-color: yellow;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: yellow;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 1.05rem;
    width: 20rem;
    font-weight: bolder;
  }
`;

export default SignUpPage;
