import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const email = useRef("");
  const fecNacimiento = useRef("");
  const password = useRef("");

  const userData = {
    email: email.current.value,
    fecNacimiento: fecNacimiento.current.value,
    isActive: true,
    roles: "user",
    password: password.current.value,
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    fetch("http://localhost:4000/users/create", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json();
        alert("Usuario creado correctamente");
        console.log(JSON.stringify(userData));
        //window.open("login.html");
        navigate("/login");
        //this.close();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al crear usuario", err);
        alert("Error al crear el usuario " + err);
      });
  };

  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (currentUser) navigate("/");
  // });

  return (
    <Container>
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Revisión vehicular anual</h1>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              name="email"
              value={formValues.email}
              ref={email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              name="fecNacimiento"
              value={formValues.fecNacimiento}
              ref={fecNacimiento}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.fecNacimiento]: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Ingrese contraseña"
              name="password"
              value={formValues.password}
              ref={password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <button onClick={handleSignIn}>Sign Up</button>
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
  }
  input {
    color: black;
    padding: 2rem;
    font-size: 1rem;
    width: 30rem;
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
