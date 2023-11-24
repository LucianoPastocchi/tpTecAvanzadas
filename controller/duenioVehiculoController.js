require("mongoose");
const DuenioVehiculo = require("../model/duenioVehiculoModel");

const getAllDueniosVehiculo = async (limit, offset) => {
  const dueniosVehiculos = await DuenioVehiculo.find({})
    .limit(limit)
    .skip(offset);

  return dueniosVehiculos;
};

const getDuenioVehiculo = async (id) => {
  const duenioVehiculo = await DuenioVehiculo.findOne({ _id: id });
  return duenioVehiculo;
};

const addDuenioVehiculo = async (DNI, patente) => {
  const duenio = new DuenioVehiculo({
    DNI: DNI,
    patente: patente,
  });

  let duenioVehiculo = await duenio.save();
  console.log("duenio vehiculo creado");
  console.log(duenioVehiculo);
  return { duenioVehiculo };
};

const editDuenioVehiculo = async (duenioVehiculo) => {
  const result = await DuenioVehiculo.findByIdAndUpdate(
    duenioVehiculo._id,
    duenioVehiculo,
    {
      new: true,
    }
  );

  return result;
};

const deleteDuenioVehiculo = async (id) => {
  const result = await DuenioVehiculo.findByIdAndDelete(id);

  return result;
};

module.exports = {
  getAllDueniosVehiculo,
  getDuenioVehiculo,
  addDuenioVehiculo,
  editDuenioVehiculo,
  deleteDuenioVehiculo,
  editDuenioVehiculo,
};
