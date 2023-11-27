import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../components/TopNav";

const CalificarPage = () => {
  const [motor, setMotor] = useState(0);
  const [capot, setCapot] = useState(0);
  const [chasis, setChasis] = useState(0);
  const [ruedas, setRuedas] = useState(0);
  const [aceite, setAceite] = useState(0);
  const [parabrisas, setParabrisas] = useState(0);
  const [ventanas, setVentanas] = useState(0);
  const [puertas, setPuertas] = useState(0);

  const navigate = useNavigate();

  const { turnoId } = useParams();

  const calificar = async () => {
    let puntajeFinal =
      parseInt(motor) +
      parseInt(capot) +
      parseInt(chasis) +
      parseInt(ruedas) +
      parseInt(aceite) +
      parseInt(parabrisas) +
      parseInt(ventanas) +
      parseInt(puertas);

    const puntaje = {
      puntaje: puntajeFinal,
    };
    fetch(`http://localhost:4000/turnos/${turnoId}/edit`, {
      method: "PUT",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(puntaje),
    })
      .then((response) => {
        response.json();
        alert("Turno calificado correctamente");
        console.log(JSON.stringify(puntaje));
        //window.open("login.html");
        navigate("/");
        //this.close();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al calificar el turno", err);
        alert("Error al calificar el turno " + err);
      });
  };

  return (
    <Container>
      <div className="content">
        <TopNav />
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
                onChange={(e) => setMotor(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado del capot</h2>
              <input
                type="number"
                name="estadoCapot"
                min={1}
                max={10}
                onChange={(e) => setCapot(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado del chasis</h2>
              <input
                type="number"
                name="estadoChasis"
                min={1}
                max={10}
                onChange={(e) => setChasis(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ruedas</h2>
              <input
                type="number"
                name="estadoRuedas"
                min={1}
                max={10}
                onChange={(e) => setRuedas(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado del aceite</h2>
              <input
                type="number"
                name="estadoAceite"
                min={1}
                max={10}
                onChange={(e) => setAceite(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado del parabrisas</h2>
              <input
                type="number"
                name="estadoParabrisas"
                min={1}
                max={10}
                onChange={(e) => setParabrisas(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado de las ventanas</h2>
              <input
                type="number"
                name="estadoVentanas"
                min={1}
                max={10}
                onChange={(e) => setVentanas(e.target.value)}
              />
            </div>
            <div className="input_form">
              <h2>Estado de las puertas</h2>
              <input
                type="number"
                name="estadoPuertas"
                min={1}
                max={10}
                onChange={(e) => setPuertas(e.target.value)}
              />
            </div>
          </div>
          <button onClick={calificar}>Calificar</button>
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
    h1 {
      margin-top: 120px;
    }
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

export default CalificarPage;
