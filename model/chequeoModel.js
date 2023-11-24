const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chequeoSchema = new Schema(
  {
    resultado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resultado",
      required: true,
    },
    puntajeNuevo: {
      type: Number,
      required: true,
    },
    descripcion: {
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

const ChequeoModel = mongoose.model("chequeo", chequeoSchema);
module.exports = ChequeoModel;
