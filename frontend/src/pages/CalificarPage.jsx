import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    fecha: "",
    hora: "",
    DNI: "",
    patente: "",
  });

  const turnoData = {};

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
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Calificar turno</h1>
          </div>

          <div className="form">
            <div className="input_form">
              <h2>Estado del motor</h2>
              <input
                type="number"
                name="estadoMotor"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado del capot</h2>
              <input
                type="number"
                name="estadoCapot"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado del chasis</h2>
              <input
                type="number"
                name="estadoChasis"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.fecha]: e.target.value,
                  })
                }
              />
            </div>

            <div className="input_form">
              <h1>PUNTAJE FINAL</h1>
            </div>
          </div>
          <button onClick={handleTurno}>Calificar</button>
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
    grid-template-columns: repeat(2, 1fr);
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
    width: 30px;
    &:focus {
      outline: none;
    }
    margin: 20px;
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
