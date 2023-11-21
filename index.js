const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

const UsrController = require("./controllers/userController");
const TurnoController = require("./controller/turnoController.js");
const VehiculoController = require("./controller/vehiculoController.js");
const DuenioVehiculoController = require("./controller/duenioVehiculoController.js");
const ResultadoController = require("./controller/resultadoController.js");
const ChequeoController = require("./controller/chequeoController.js");

//Conexión a la base
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Funcionando");
});
app.post("/", (req, res) => {
  res.send("Llamada post");
});

//-------------------------------------------------------------------------------------------------------
// LOGIN
//-------------------------------------------------------------------------------------------------------
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await AuthController.login(email, password);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).send("No puede estar aqui");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS USER
//-------------------------------------------------------------------------------------------------------

//Get de todos los usuarios
app.get("/users", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await UsrController.getAllUsers(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un usuario
app.get(
  "/users/:id",
  /*Middleware.verify*/ async (req, res) => {
    let userId = req.params.id;

    try {
      user = await UsrController.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo usuario
app.post(
  "/users/create",
  /*Middleware.verify*/ async (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    let myCharacters = req.body.myCharacters;

    try {
      const result = await UsrController.addUser(
        name,
        lastname,
        email,
        isActive,
        password,
        myCharacters
      );
      if (result) {
        res.status(201).send("Usuario creado correctamente");
      } else {
        res.status(409).send("El usuario ya existe");
      }
    } catch (error) {
      res.status(500).send("Error al crear el usuario");
    }
  }
);

//Edito usuario
app.put(
  "/users/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const user = { _id: req.params.id, ...req.body };

    try {
      const result = await UsrController.editUser(user);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

// Elimino un usuario
app.delete(
  "/users/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await UsrController.deleteUser(req.params.id);
      if (result) {
        res.status(200).send("Usuario borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el usuario.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

// Edito roles del usuario
app.put(
  "/users/:id/editRoles",
  /*Middleware.verify*/ async (req, res) => {
    const roles = req.body.roles;
    try {
      const result = await UsrController.editRoles(roles, req.params.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Edito isActive
app.put(
  "/users/:id/editActive",
  /*Middleware.verify*/ async (req, res) => {
    const isActive = req.body.isActive;
    try {
      const result = await UsrController.editActive(isActive, req.params.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS Turno
//-------------------------------------------------------------------------------------------------------

//Get de todos los turnos
app.get("/turnos", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await TurnoController.getAllTurnos(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un turno
app.get(
  "/turnos/:id",
  /*Middleware.verify*/ async (req, res) => {
    let turnoId = req.params.id;

    try {
      turno = await Turno.getTurno(turnoId);
      res.status(200).json(turno);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo turno
app.post(
  "/turnos/create",
  /*Middleware.verify*/ async (req, res) => {
    let fecha = req.body.fecha;
    let usuario = req.body.usuario;
    let vehiculo = req.body.vehiculo;
    let patenteVehiculo = req.body.patenteVehiculo;

    try {
      const result = await TurnoController.createTurno(
        fecha,
        usuario,
        vehiculo,
        patenteVehiculo
      );
      if (result) {
        res.status(201).send("Turno creado correctamente");
      }
    } catch (error) {
      res.status(500).send("Error al crear el turno");
    }
  }
);

//Edito turno
app.put(
  "/turnos/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const turno = { _id: req.params.id, ...req.body };

    try {
      const result = await TurnoController.editTurno(turno);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El turno no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino turno
app.delete(
  "/turnos/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await TurnoController.deleteTurno(req.params.id);
      if (result) {
        res.status(200).send("Turno borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el turno.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS Vehiculo
//-------------------------------------------------------------------------------------------------------

//Get de todos los vehiculos
app.get("/vehiculo", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await VehiculoController.getAllVehiculos(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un vehiculo
app.get(
  "/vehiculos/:id",
  /*Middleware.verify*/ async (req, res) => {
    let vehiculoId = req.params.id;

    try {
      vehiculo = await VehiculoController.getVehiculo(vehiculoId);
      res.status(200).json(vehiculo);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo vehiculo
app.post(
  "/vehiculos/create",
  /*Middleware.verify*/ async (req, res) => {
    let patente = req.body.patente;
    let duenioVehiculo = req.body.duenioVehiculo;

    try {
      const result = await VehiculoController.createVehiculo(
        patente,
        duenioVehiculo
      );
      if (result) {
        res.status(201).send("Vehiculo creado correctamente");
      }
    } catch (error) {
      res.status(500).send("Error al crear el turno");
    }
  }
);

//Edito vehiculo
app.put(
  "/vehiculos/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const vehiculo = { _id: req.params.id, ...req.body };

    try {
      const result = await VehiculoController.editVehiculo(vehiculo);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El vehiculo no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino vehiculo
app.delete(
  "/vehiculos/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await VehiculoController.deleteVehiculo(req.params.id);
      if (result) {
        res.status(200).send("Vehiculo borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el vehiculo.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS DuenioVehiculo
//-------------------------------------------------------------------------------------------------------

//Get de todos los duenios vehiculos
app.get("/duenioVehiculo", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await DuenioVehiculoController.getAllDueniosVehiculo(
      limit,
      offset
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un duenio vehiculo
app.get(
  "/duenioVehiculo/:id",
  /*Middleware.verify*/ async (req, res) => {
    let duenioVehiculoId = req.params.id;

    try {
      duenioVehiculoId = await DuenioVehiculoController.getDuenioVehiculo(
        duenioVehiculoId
      );
      res.status(200).json(duenioVehiculoId);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo duenio vehiculo
app.post(
  "/dueniosVehiculo/create",
  /*Middleware.verify*/ async (req, res) => {
    let DNI = req.body.patente;
    let vehiculo = req.body.vehiculo;

    try {
      const result = await DuenioVehiculoController.addVehiculo(
        patente,
        vehiculo
      );
      if (result) {
        res.status(201).send("Duenio vehiculo creado correctamente");
      }
    } catch (error) {
      res.status(500).send("Error al crear el turno");
    }
  }
);

//Edito duenio vehiculo
app.put(
  "/dueniosVehiculo/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const duenioVehiculo = { _id: req.params.id, ...req.body };

    try {
      const result = await DuenioVehiculoController.editDuenioVehiculo(
        duenioVehiculo
      );
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El duenio vehiculo no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino duenio vehiculo
app.delete(
  "/dueniosVehiculo/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await DuenioVehiculoController.deleteDuenioVehiculo(
        req.params.id
      );
      if (result) {
        res.status(200).send("Duenio vehiculo borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el duenio vehiculo.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS Resultado
//-------------------------------------------------------------------------------------------------------

//Get de todos los resultados
app.get("/resultado", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await ResultadoController.getAllResultados(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un resultado
app.get(
  "/resultado/:id",
  /*Middleware.verify*/ async (req, res) => {
    let resultadoId = req.params.id;

    try {
      resultadoId = await ResultadoController.getDuenioVehiculo(resultadoId);
      res.status(200).json(resultadoId);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo resultado
app.post(
  "/resultado/create",
  /*Middleware.verify*/ async (req, res) => {
    let turno = req.body.patente;
    let puntaje = req.body.vehiculo;
    let observacion = req.body.observacion;

    try {
      const result = await ResultadoController.addResultado(
        turno,
        puntaje,
        observacion
      );
      if (result) {
        res.status(201).send("Resultado creado correctamente");
      }
    } catch (error) {
      res.status(500).send("Error al crear el turno");
    }
  }
);

//Edito resultado
app.put(
  "/resultado/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const resultado = { _id: req.params.id, ...req.body };

    try {
      const result = await ResultadoController.editResultado(resultado);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El resultado no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino resultado
app.delete(
  "/resultado/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await ResultadoController.deleteResultado(req.params.id);
      if (result) {
        res.status(200).send("Resultado borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el resultado");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS Chequeo
//-------------------------------------------------------------------------------------------------------

//Get de todos los chequeos
app.get("/chequeo", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await ChequeoController.getAllChequeos(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un chequeo
app.get(
  "/chequeo/:id",
  /*Middleware.verify*/ async (req, res) => {
    let chequeoId = req.params.id;

    try {
      chequeoId = await ChequeoController.getChequeo(chequeoId);
      res.status(200).json(chequeoId);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo chequeo
app.post(
  "/chequeo/create",
  /*Middleware.verify*/ async (req, res) => {
    let resultado = req.body.resultado;
    let puntajeNuevo = req.body.puntajeNuevo;
    let descripcion = req.body.descripcion;

    try {
      const result = await ChequeoController.addChequeo(
        resultado,
        puntajeNuevo,
        descripcion
      );
      if (result) {
        res.status(201).send("Chequeo creado correctamente");
      }
    } catch (error) {
      res.status(500).send("Error al crear el chequeo");
    }
  }
);

//Edito chequeo
app.put(
  "/chequeo/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const chequeo = { _id: req.params.id, ...req.body };

    try {
      const result = await ChequeoController.editChequeo(chequeo);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El chequeo no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino chequeo
app.delete(
  "/chequeo/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await ChequeoController.deleteChequeo(req.params.id);
      if (result) {
        res.status(200).send("Chequeo borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el chequeo");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);
