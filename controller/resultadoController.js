require("mongoose");
const Resultado = require("../model/resultadoModel");

const getAllResultados = async (limit, offset) => {
  const resultados = await Resultado.find({}).limit(limit).skip(offset);

  return resultados;
};

const getResultado = async (id) => {
  const resultado = await Resultado.findOne({ _id: id });
  return resultado;
};

const addResultado = async (nroTurno, puntaje, observacion) => {
  const result = new Resultado({
    nroTurno: nroTurno,
    puntaje: puntaje,
    observacion: observacion,
  });

  let resultado = await result.save();
  console.log("resultado creado");
  console.log(resultado);
  return { resultado };
};

const editResultado = async (resultado) => {
  const result = await Resultado.findByIdAndUpdate(resultado._id, resultado, {
    new: true,
  });

  return result;
};

const deleteResultado = async (id) => {
  const result = await Resultado.findByIdAndDelete(id);

  return result;
};

module.exports = {
  getAllResultados,
  getResultado,
  addResultado,
  editResultado,
  deleteResultado,
  editResultado,
};
