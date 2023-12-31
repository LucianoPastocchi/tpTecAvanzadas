const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resultadoSchema = new Schema(
  {
    nroTurno: {
      type: String,
      required: true,
    },
    puntaje: {
      type: Number,
      required: true,
    },
    observacion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
  },
});

const Resultado = mongoose.model("resultado", resultadoSchema);
module.exports = Resultado;
