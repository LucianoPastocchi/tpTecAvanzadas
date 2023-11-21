require("mongoose");
const Chequeo = require("../model/chequeoModel");
const Chequeo = require("../model/chequeoModel");

const getAllChequeos = async (limit, offset) => {
  const chequeos = await Chequeo.find({}).limit(limit).skip(offset);

  return chequeos;
};

const getChequeo = async (id) => {
  const chequeo = await Chequeo.findOne({ _id: id });
  return chequeo;
};

const addChequeo = async (resultado, puntajeNuevo, descripcion) => {
  const Chequeo = new Chequeo({
    resultado: resultado,
    puntajeNuevo: puntajeNuevo,
    descripcion: descripcion,
  });

  let chequeo = await Chequeo.save();
  console.log("chequeo creado");
  console.log(chequeo);
  return { chequeo };
};

const editChequeo = async (chequeo) => {
  const result = await Chequeo.findByIdAndUpdate(chequeo._id, chequeo, {
    new: true,
  });

  return result;
};

const deleteChequeo = async (id) => {
  const result = await Chequeo.findByIdAndDelete(id);

  return result;
};

module.exports = {
  getAllChequeos,
  getChequeo,
  addChequeo,
  editChequeo,
  deleteChequeo,
  editChequeo,
};
