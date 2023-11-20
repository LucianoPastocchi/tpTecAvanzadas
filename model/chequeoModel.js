const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resultadoSchema = new Schema(
  {
    resultado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resultado",
      required: true,
    },
    puntajeNuevo: {
      type: int,
      required: true,
    },
    descripcion: {
      type: int,
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

const Chequeo = mongoose.model("chequeo", chequeoSchema);
module.exports = Chequeo;
