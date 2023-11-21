require("mongoose");
const Turno = require("../model/turnoModel");

const getAllTurnos = async (limit, offset) => {
  const turnos = await Turno.find({}).limit(limit).skip(offset);

  return turnos;
};

const getTurno = async (id) => {
  const turno = await Turno.findOne({ _id: id });
  return turno;
};

const addTurno = async (fecha, usuario, vehiculo, patenteVehiculo) => {
  const Turno = new Turno({
    fecha: fecha,
    usuario: usuario,
    vehiculo: vehiculo,
    patenteVehiculo: patenteVehiculo,
  });

  let turno = await Turno.save();
  console.log("turno creado");
  console.log(turno);
  return { turno };
};

const editTurno = async (turno) => {
  const result = await Turno.findByIdAndUpdate(turno._id, turno, { new: true });

  return result;
};

const deleteTurno = async (id) => {
  const result = await Turno.findByIdAndDelete(id);

  return result;
};

const editUsuario = async (usuario, id) => {
  const result = await Turno.findByIdAndUpdate(
    id,
    { $set: { usuario: usuario } },
    { new: true }
  );
  return result;
};

const editVehiculo = async (vehiculo, id) => {
  const result = await Turno.findByIdAndUpdate(
    id,
    { $set: { vehiculo: vehiculo } },
    { new: true }
  );
  return result;
};

module.exports = {
  getAllTurnos,
  getTurno,
  addTurno,
  editTurno,
  deleteTurno,
  editUsuario,
  editVehiculo,
};
