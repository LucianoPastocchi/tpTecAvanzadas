const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resultadoSchema = new Schema(
  {
    turno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turno",
      required: true,
    },
    puntaje: {
      type: int,
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
