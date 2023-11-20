const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const turnoSchema = new Schema(
  {
    fecha: {
      type: String,
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      default: ["user"],
    },
    vehiculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: true,
      default: ["vehiculo"],
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
