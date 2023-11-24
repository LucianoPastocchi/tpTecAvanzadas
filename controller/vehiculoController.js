require("mongoose");
const Vehiculo = require("../model/vehiculoModel");

const getAllVehiculos = async (limit, offset) => {
  const vehiculos = await Vehiculo.find({}).limit(limit).skip(offset);

  return vehiculos;
};

const getVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findOne({ _id: id });
  return vehiculo;
};

const addVehiculo = async (patente, duenioVehiculo) => {
  const rodado = new Vehiculo({
    patente: patente,
    duenioVehiculo: duenioVehiculo,
  });

  let vehiculo = await rodado.save();
  console.log("vehiculo creado");
  console.log(vehiculo);
  return { vehiculo };
};

const editVehiculo = async (vehiculo) => {
  const result = await Vehiculo.findByIdAndUpdate(vehiculo._id, vehiculo, {
    new: true,
  });

  return result;
};

const deleteVehiculo = async (id) => {
  const result = await Vehiculo.findByIdAndDelete(id);

  return result;
};

module.exports = {
  getAllVehiculos,
  getVehiculo,
  addVehiculo,
  editVehiculo,
  deleteVehiculo,
  editVehiculo,
};
