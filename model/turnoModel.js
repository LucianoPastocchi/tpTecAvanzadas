const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const turnoSchema = new Schema(
  {
    fecha: {
      type: String,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
    patenteVehiculo: {
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

const Turno = mongoose.model("turno", turnoSchema);
module.exports = Turno;
